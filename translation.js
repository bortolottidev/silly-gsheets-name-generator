import translatte from "translatte";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "./env.js";

const ITALIAN = "it";

export const translate = async (textToTranslate) => {
  const translated = await translatte(textToTranslate, { to: ITALIAN });
  return translated.text;
};

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/**
 * Translate an english text to italia with Gemini API
 *
 * @param {string} textToTranslate
 * @returns {Promise<string>} translated text
 */
export const translateWithGemini = async (textToTranslate) => {
  const prompt = `Traduci in italiano il seguente testo inglese e scrivi solo le parole della risposta: '${textToTranslate}'`;

  const { response } = await model.generateContent(prompt);
  return response.text().trim();
};

/**
 * Translate a set of english text to italia set with Gemini API
 *
 * @param {Array<string>} phrases set of english phrase
 * @returns {Promise<Array<string>>} translated set
 */
export const translateSetWithGemini = async (phrases) => {
  const textToTranslate = phrases.join(" | ");
  const prompt = `Traduci la sequenza di frasi che ti darò separate dal simbolo | in italiano. Per ogni frase usa massimo 2 parole.Scrivi solo le risposte separate dal simbolo |: "${textToTranslate}". Ogni parola della risposta deve avere la prima lettera maiuscola`;

  const { response } = await model.generateContent(prompt);
  return response
    .text()
    .split("|")
    .map((phrase) => String.prototype.trim.apply(phrase))
    .filter(Boolean);
};
