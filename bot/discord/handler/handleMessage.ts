import { Message } from 'discord.js';
import add from '../command/add';
import getTodo from '../command/getTodo';

enum MESSAGE_TYPE {
  TODO = '!할일',
  ADD = '!추가',
}

export default function handleMessage(msg: Message) {
  const message = msg.content.split(' ')[0];
  switch (message) {
    case MESSAGE_TYPE.TODO:
      getTodo(msg.author.id, msg);
      break;
    case MESSAGE_TYPE.ADD:
      add(msg.author.id, msg);
      break;
  }
}
