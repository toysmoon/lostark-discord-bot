import Character from '@/bot/database/Character';
import getUserData from '@/bot/database/getUserData';
import { todoCounter } from '@/bot/database/todoChecker';
import { Message, MessageActionRow, MessageButton } from 'discord.js';

export default async function getTodo(id: string, msg: Message) {
  const characters = await getUserData(id);
  const components = getCharacterButtonList(characters);

  msg.reply({ content: '오늘의 할일', components });
}

export function getCharacterButtonList(characters: Character[]) {
  const row = new MessageActionRow();

  characters
    .map((c) => ({
      name: c.name,
      count: todoCounter(c),
    }))
    .forEach((c) => {
      const button = new MessageButton()
        .setCustomId(`${c.name}-user`)
        .setLabel(`${c.name}(${c.count})`)
        .setStyle('PRIMARY');

      row.addComponents(button);
    });

  return [row];
}
