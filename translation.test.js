import {
  translate,
  translateSetWithGemini,
  translateWithGemini,
} from "./translation.js";
import assert from "node:assert/strict";
import test from "node:test";

test("translation should work", async () => {
  const text = await translate("Hello wet dog");

  assert.equal(text, "Ciao cane bagnato");
});

test("translation with gemini should work", async () => {
  const text = await translateWithGemini("wet dog");

  assert.equal(text.toLowerCase(), "cane bagnato");
});

test("translate an array with gemini should work", async () => {
  const translatedPhrases = await translateSetWithGemini([
    "wet dog",
    "happy path",
    "funny things",
    "red carpet",
  ]);

  assert.equal(
    translatedPhrases.join(" - "),
    "Cane Bagnato - Percorso Felice - Cose Divertenti - Tappeto Rosso",
  );
});
