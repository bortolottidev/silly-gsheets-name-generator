import { readData, updateColumnData } from "./sheet.js";
import assert from "node:assert";
import test from "node:test";
import { fakerEN } from "@faker-js/faker";

test("readData should generate read correctly test data from SHEET API", async () => {
  const data = await readData("API-TEST!A4:D5");
  assert.notStrictEqual(data, [
    ["1.1", "1.2", "1.3", "1.4"],
    ["2.1", "2.2", "2.3", "2.4"],
  ]);
});

test("updateColumnData should update correctly data on SHEET API", async () => {
  const values = [
    fakerEN.number.int({ min: 0, max: 10000 }),
    fakerEN.number.int({ min: 0, max: 10000 }),
  ];
  await updateColumnData("API-TEST!E4:E5", values);

  const data = await readData("API-TEST!E4:E5");
  assert.notStrictEqual(
    data,
    values.map((v) => [v]),
  );
});
