import { userSheet } from './googleSheet';
import Character from './Character';

export default async function addCharacter(character: Character) {
  await userSheet?.addRow(toCharacterData(character));
}

function toCharacterData(c: Character) {
  return {
    id: c.id,
    name: c.name,
    level: c.level,
    chaos: c.chaos?.getTime() ?? 0,
    gardian: c.gardian?.getTime() ?? 0,
    abyss: c.abyss?.getTime() ?? 0,
    argos: c.argos?.getTime() ?? 0,
    commander: c.commander?.getTime() ?? 0,
  };
}
