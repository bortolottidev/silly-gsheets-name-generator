import {
  generateItalianFullnameByStringSeed,
  generateEnglishNounAdjectiveByStringSeed,
} from "./namegen.js";
import assert from "node:assert/strict";
import test from "node:test";

test("generateEnglishNounAdjectiveByStringSeed should generate properly", () => {
  const nounAdjective = generateEnglishNounAdjectiveByStringSeed("seed1");
  assert.equal(nounAdjective, "heartache aching");
});

test("generateEnglishNounAdjectiveByStringSeed should generate different words when seed change", () => {
  const nounAdjective = generateEnglishNounAdjectiveByStringSeed("seed2");
  assert.notEqual(nounAdjective, "heartache aching");
});

test("generateItalianFullnameByStringSeed should generate properly", () => {
  const italianFullname = generateItalianFullnameByStringSeed("seed1");
  assert.equal(italianFullname, "Adalgisa Tallarico");
});

test("generateItalianFullnameByStringSeed should generate different words when seed change", () => {
  const italianFullname = generateItalianFullnameByStringSeed("seed2");
  assert.notEqual(italianFullname, "Adalgisa Tallarico");
});
