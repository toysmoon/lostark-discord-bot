import Character from '@/bot/database/Character';
import getUserData from '@/bot/database/getUserData';
import todoChecker from '@/bot/database/todoChecker';
import { Interaction, MessageActionRow, MessageButton } from 'discord.js';

export default async function getCharacterTodo(
  name: string,
  interaction: Interaction
) {
  if (!interaction.isButton()) return;
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

export function makeTodoButtons(c: Character) {
  const todo = todoChecker(c);
  console.log(c);

  const day = new MessageActionRow();
  day.addComponents(
    new MessageButton()
      .setCustomId(`${c.name}-chaos`)
      .setLabel('카오스')
      .setStyle('PRIMARY')
      .setDisabled(!todo.chaos)
  );
  day.addComponents(
    new MessageButton()
      .setCustomId(`${c.name}-gardian`)
      .setLabel('가디언')
      .setStyle('PRIMARY')
      .setDisabled(!todo.gardian)
  );

  const week = new MessageActionRow();
  week.addComponents(
    new MessageButton()
      .setCustomId(`${c.name}-abyss`)
      .setLabel('어비스')
      .setStyle('PRIMARY')
      .setDisabled(!todo.abyss)
  );
  week.addComponents(
    new MessageButton()
      .setCustomId(`${c.name}-argos`)
      .setLabel('아르고스')
      .setStyle('PRIMARY')
      .setDisabled(!todo.argos)
  );
  week.addComponents(
    new MessageButton()
      .setCustomId(`${c.name}-commander`)
      .setLabel('군단장')
      .setStyle('PRIMARY')
      .setDisabled(!todo.commander)
  );

  const backRow = new MessageActionRow();

  backRow.addComponents(
    new MessageButton()
      .setCustomId(`${c.name}-back`)
      .setLabel('뒤로가기')
      .setStyle('SECONDARY')
  );

  return [day, week, backRow];
}
