import { Message } from 'discord.js';
import addCharacter from '../../database/addCharacter';

export default async function add(id: string, msg: Message) {
  const [, sLevel, name] = msg.content.split(' ');
  const level = Number(sLevel);
  const date = new Date(0);

  addCharacter({
    id,
    name,
    level,
    chaos: date,
    gardian: date,
    abyss: date,
    argos: date,
    commander: date,
  });

  msg.reply(`${level} ${name} 추가되었습니다.`);
}
