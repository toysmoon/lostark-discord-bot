import { Message, MessageActionRow, MessageButton } from 'discord.js';
import getUserData from '../database/getUserData';

export default async function getTodo(id: string, msg: Message) {
  const characters = await getUserData(id);
  console.log('characters::' + characters);

  const components = characters.map((c) => {
    const row = new MessageActionRow();
    const button = new MessageButton()
      .setLabel(c.name)
      .setURL(`https://loawa.com/char/${c.name}`)
      .setStyle('LINK');

    const chaos = new MessageButton()
      .setCustomId(`${c.name}-chaos`)
      .setLabel('카오스')
      .setStyle('PRIMARY');

    row.addComponents(button);
    row.addComponents(chaos);

    return row;
  });

  const row = new MessageActionRow();
  const button = new MessageButton()
    .setCustomId('primary')
    .setLabel('Primary')
    .setStyle('PRIMARY');

  row.addComponents(button);

  msg.reply({ content: '오늘의 할일', components: components });
}
