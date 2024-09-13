import fs from "fs/promises";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import assert from "node:assert/strict";
import { env } from "./env.js";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

const { SPREADSHEET_ID } = env;
assert.ok(
  SPREADSHEET_ID,
  "A SPREADSHEET_ID must be provided in your .env file!",
);

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }

  try {
    await fs.stat(CREDENTIALS_PATH);
  } catch (error) {
    console.error(
      "Credentials not found. Have you stored your google api credentials as credentials.json?",
    );
    throw new Error("credentials.json not found");
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Read data from passed range as a matrix of row -> column
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function readRangeData(auth, range) {
  const sheets = google.sheets({ version: "v4", auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range,
  });
  const rows = res.data.values;
  if (!rows || rows.length === 0) {
    throw new Error("No data found in range " + range);
  }

  return rows;
}

/**
 * Update data on the passed range with a matrix of value (1 value for row)
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function updateRangeData(auth, range, values) {
  const sheets = google.sheets({ version: "v4", auth });
  try {
    const res = await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });
    console.log("Updated cell:", res.data);
  } catch (error) {
    console.error("Cannot update cell: ", error);
  }

  return;
}

export const readData = async (range) => {
  const auth = await authorize();
  return await readRangeData(auth, range);
};

export const updateColumnData = async (range, data) => {
  const auth = await authorize();
  // prepare data as matrix
  const values = data.map((entry) => [entry]);
  await updateRangeData(auth, range, values);
};
