import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { userSheet } from './googleSheet';
import Character from './Character';

export default async function getUserData(id: string): Promise<Character[]> {
  const rows = await userSheet.getRows();
  return rows.filter((row) => row.id == id).map(toCharacterFromRow);
}

function toCharacterFromRow(row: GoogleSpreadsheetRow): Character {
  return {
    id: row.id,
    name: row.name,
    level: row.level,
    chaos: new Date(Number(row.chaos)),
    gardian: new Date(Number(row.gardian)),
    abyss: new Date(Number(row.abyss)),
    argos: new Date(Number(row.argos)),
    commander: new Date(Number(row.commander)),
  };
}
