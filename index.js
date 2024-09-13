import {
  generateEnglishNounAdjectiveByStringSeed,
  generateItalianFullnameByStringSeed,
} from "./namegen.js";

import { readData, updateColumnData } from "./sheet.js";
import { translateSetWithGemini } from "./translation.js";

// DEVICES
{
  const startRow = 34;
  const ID_COLUMN_RANGE = `Devices!D${startRow}:D`;
  const FUNNY_NAME_COLUMN_RANGE = `Devices!G${startRow}:G`;

  const data = await readData(ID_COLUMN_RANGE);
  const funnyNames = [];
  for (const [id] of data) {
    // empty cell in the interval of valid cells
    if (!id) {
      funnyNames.push("");
      continue;
    }
    const funnyName = generateEnglishNounAdjectiveByStringSeed(id);
    funnyNames.push(funnyName);
  }
  const funnyNamesTranslated = await translateSetWithGemini(funnyNames);
  await updateColumnData(FUNNY_NAME_COLUMN_RANGE, funnyNamesTranslated);
}

// LUCI
{
  const ID_COLUMN_RANGE = "Luci!E2:E";
  const FUNNY_NAME_COLUMN_RANGE = "Luci!G2:G";

  const data = await readData(ID_COLUMN_RANGE);
  const funnyNameTranslated = [];
  for (const [id] of data) {
    // empty cell in the interval of valid cells
    if (!id) {
      funnyNameTranslated.push("");
      continue;
    }
    funnyNameTranslated.push(generateItalianFullnameByStringSeed(id));
  }
  await updateColumnData(FUNNY_NAME_COLUMN_RANGE, funnyNameTranslated);
}

// TAPPARELLE
{
  const ID_COLUMN_RANGE = "Tapparelle!E2:E";
  const FUNNY_NAME_COLUMN_RANGE = "Tapparelle!G2:G";

  const data = await readData(ID_COLUMN_RANGE);
  const funnyNameTranslated = [];
  for (const [id] of data) {
    // empty cell in the interval of valid cells
    if (!id) {
      funnyNameTranslated.push("");
      continue;
    }
    funnyNameTranslated.push(generateItalianFullnameByStringSeed(id));
  }
  await updateColumnData(FUNNY_NAME_COLUMN_RANGE, funnyNameTranslated);
}
