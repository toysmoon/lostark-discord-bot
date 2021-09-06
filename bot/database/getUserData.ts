import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { userSheet } from './googleSheet';
import Character from './Character';

export default async function getUserData(id: string): Promise<Character[]> {
  console.log(id);
  const rows = await userSheet.getRows();
  return rows.filter((row) => row.id == id).map(toCharacterFromRow);
}

function toCharacterFromRow(row: GoogleSpreadsheetRow): Character {
  console.log(row.id, row.name);
  return {
    id: row.id,
    name: row.name,
    level: row.level,
    chaos: new Date(row.chaos),
    gardian: new Date(row.gardian),
    abyss: new Date(row.abyss),
    argos: new Date(row.argos),
    commander: new Date(row.commander),
  };
}
