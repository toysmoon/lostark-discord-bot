import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';

// Initialize the sheet - doc ID is the long id in the sheets URL

export let userSheet: GoogleSpreadsheetWorksheet;

export default async function initGoogleSheet() {
  const { GS_CLIENT_EMAIL, GS_PRIVATE_KEY, GS_DOC_ID } = process.env;

  if (GS_CLIENT_EMAIL && GS_PRIVATE_KEY && GS_DOC_ID) {
    const doc = new GoogleSpreadsheet(GS_DOC_ID);
    await doc.useServiceAccountAuth({
      client_email: GS_CLIENT_EMAIL,
      private_key: GS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();

    userSheet = doc.sheetsByTitle['user'];
  }
}
