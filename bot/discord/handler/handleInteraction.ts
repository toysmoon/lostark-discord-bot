import { Interaction } from 'discord.js';
import back from '../interactions/back';
import getCharacterTodo from '../interactions/getCharacterTodo';
import updateCharacterTodo from '../interactions/updateCharacterTodo';

export default async function handleInteraction(interaction: Interaction) {
  if (!interaction.isButton()) return;

  const [name, type] = interaction.customId.split('-');
  switch (type) {
    case 'user':
      getCharacterTodo(name, interaction);
      break;
    case 'back':
      back(interaction);
      break;
    default:
      updateCharacterTodo(name, type, interaction);
      break;
  }
}
