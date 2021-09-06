import getUserData from '@/bot/database/getUserData';
import setUserData from '@/bot/database/setUserData';
import { Interaction } from 'discord.js';
import { makeTodoButtons } from './getCharacterTodo';

export default async function updateCharacterTodo(
  name: string,
  type: string,
  interaction: Interaction
) {
  if (!interaction.isButton()) return;
  await setUserData(name, type);

  const characters = await getUserData(interaction.user.id);
  const character = characters.find((c) => c.name === name);
  if (!character) {
    return null;
  }

  await interaction.deferUpdate();
  await interaction.editReply({
    content: `${character.level} ${name} 의 할일`,
    components: makeTodoButtons(character),
  });
}
