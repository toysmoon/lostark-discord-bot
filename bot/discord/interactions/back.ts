import getUserData from '@/bot/database/getUserData';
import { Interaction } from 'discord.js';
import { getCharacterButtonList } from '../command/getTodo';

export default async function back(interaction: Interaction) {
  if (!interaction.isButton()) return;
  const characters = await getUserData(interaction.user.id);
  const components = getCharacterButtonList(characters);

  await interaction.deferUpdate();
  await interaction.editReply({ content: '오늘의 할일', components });
}
