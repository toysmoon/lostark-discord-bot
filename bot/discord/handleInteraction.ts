import { Interaction } from 'discord.js';
import setUserData from '../database/setUserData';

export default async function handleInteraction(interaction: Interaction) {
  if (!interaction.isButton()) return;
  const [name, type] = interaction.customId.split('-');
  await setUserData(name, type);

  await interaction.deferUpdate();
  await interaction.editReply({
    content: `${name} ${type} 완료`,
    components: [],
  });
}
