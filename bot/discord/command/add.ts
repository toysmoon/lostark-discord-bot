import { Message } from 'discord.js';
import addCharacter from '../../database/addCharacter';

export default async function add(id: string, msg: Message) {
  const [, sLevel, name] = msg.content.split(' ');
  const level = Number(sLevel);

  addCharacter({ id, name, level });
  msg.reply(`${level} ${name} 추가되었습니다.`);
}
