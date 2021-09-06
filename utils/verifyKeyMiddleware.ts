import { NextApiRequest, NextApiResponse } from 'next';
import nacl from 'tweetnacl';
import { TextEncoder } from 'util';

const LocalTextEncoder =
  typeof TextEncoder === 'undefined'
    ? require('util').TextEncoder
    : TextEncoder;

function valueToUint8Array(
  value: Uint8Array | ArrayBuffer | Buffer | string,
  format?: string
): Uint8Array {
  if (value == null) {
    return new Uint8Array();
  }

  if (typeof value === 'string') {
    if (format === 'hex') {
      const matches = value.match(/.{1,2}/g);
      if (matches == null) {
        throw new Error('Value is not a valid hex string');
      }
      const hexVal = matches.map((byte: string) => parseInt(byte, 16));
      return new Uint8Array(hexVal);
    } else {
      return new LocalTextEncoder('utf-8').encode(value);
    }
  }

  try {
    if (Buffer.isBuffer(value)) {
      value.buffer.slice(value.byteOffset, value.byteOffset + value.length);
      return new Uint8Array(value);
    }
  } catch (ex) {
    // Runtime doesn't have Buffer
  }

  if (value instanceof ArrayBuffer) {
    return new Uint8Array(value);
  }

  if (value instanceof Uint8Array) {
    return value;
  }

  throw new Error(
    'Unrecognized value type, must be one of: string, Buffer, ArrayBuffer, Uint8Array'
  );
}

function concatUint8Arrays(arr1: Uint8Array, arr2: Uint8Array): Uint8Array {
  const merged = new Uint8Array(arr1.length + arr2.length);
  merged.set(arr1);
  merged.set(arr2, arr1.length);
  return merged;
}

function verifyKey(
  body: Uint8Array | ArrayBuffer | Buffer | string,
  signature: Uint8Array | ArrayBuffer | Buffer | string,
  timestamp: Uint8Array | ArrayBuffer | Buffer | string,
  clientPublicKey: Uint8Array | ArrayBuffer | Buffer | string
): boolean {
  try {
    console.log('signature:' + signature);
    console.log('clientPublicKey:' + clientPublicKey);

    const timestampData = valueToUint8Array(timestamp);
    const bodyData = valueToUint8Array(body);
    const message = concatUint8Arrays(timestampData, bodyData);

    const signatureData = valueToUint8Array(signature, 'hex');
    const publicKeyData = valueToUint8Array(clientPublicKey, 'hex');
    return nacl.sign.detached.verify(message, signatureData, publicKeyData);
  } catch (ex) {
    console.error('[discord-interactions]: Invalid verifyKey parameters', ex);
    return false;
  }
}

export default function verifyKeyMiddleware(
  clientPublicKey: string
): (req: NextApiRequest, res: NextApiResponse) => Promise<boolean> {
  if (!clientPublicKey) {
    throw new Error('You must specify a Discord client public key');
  }

  return async function (req: NextApiRequest, res: NextApiResponse) {
    console.log(req.headers);
    const timestamp = (req.headers['X-Signature-Timestamp'] ?? '') as string;
    const signature = (req.headers['X-Signature-Ed25519'] ?? '') as string;

    function onBodyComplete(rawBody: Buffer) {
      if (!verifyKey(rawBody, signature, timestamp, clientPublicKey)) {
        res.statusCode = 401;
        res.end('[discord-interactions] Invalid signature');
        return false;
      }

      const body = JSON.parse(rawBody.toString('utf-8')) || {};
      if (body.type === 1) {
        res.setHeader('Content-Type', 'application/json');
        res.end(
          JSON.stringify({
            type: 1,
          })
        );
        return false;
      }

      req.body = body;
      return true;
    }

    if (req.body) {
      if (Buffer.isBuffer(req.body)) {
        return onBodyComplete(req.body);
      } else if (typeof req.body === 'string') {
        return onBodyComplete(Buffer.from(req.body, 'utf-8'));
      } else {
        return onBodyComplete(Buffer.from(JSON.stringify(req.body), 'utf-8'));
      }
    } else {
      return new Promise((resolve) => {
        const chunks: Array<Buffer> = [];
        req.on('data', (chunk) => {
          chunks.push(chunk);
        });
        req.on('end', () => {
          const rawBody = Buffer.concat(chunks);
          const result = onBodyComplete(rawBody);
          resolve(result);
        });
      });
    }
  };
}
