import { userSheet } from './googleSheet';

export default async function setUserData(name: string, type: string) {
  const rows = await userSheet.getRows();
  const row = rows.find((row) => row.name == name);

  if (row) {
    row[type] = new Date().getTime();
    row.save();
  }
}
