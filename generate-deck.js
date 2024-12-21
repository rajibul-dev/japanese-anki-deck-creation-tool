import fs from "node:fs/promises";
import { generateGPTResponse } from "./openAIConfig.js";
import { convertRawResultToCSVRow } from "./utils/csvHelpers.js";
import n2VocabRemaining from "./card-inputs/n2VocabRemaining.js";
import n3Vocab from "./card-inputs/n3Vocab.js";
import n1Vocab from "./card-inputs/n1Vocab.js";
import vocabDeckPrompt from "./functionality-prompts/vocabDeckPrompt.js";
import { progressLogger } from "./utils/progressLogger.js";

const N2_VOCAB_REMAINING_FILE_PATH = "./cooked-csvs/N2-vocab-remainings.csv";
const N3_VOCAB_FILE_PATH = "./cooked-csvs/N3-vocab.csv";
const N1_VOCAB_FILE_PATH = "./cooked-csvs/N1-vocab.csv";
const testFilePath = "./cooked-csvs/test.csv";

const testingWords = ["わりあいに", "割算", "割と", "割引", "椀", "ワンピース"];

async function deckWriting(systemPrompt, inputData, filePath) {
  const file = await fs.open(filePath, "w");
  const total = inputData.length;

  for (let i = 0; i < total; i++) {
    const word = inputData[i];

    const cardDataRaw = await generateGPTResponse({
      functionalityPrompt: systemPrompt,
      input: word,
    });

    const csvRow = convertRawResultToCSVRow(cardDataRaw);

    file.appendFile(`${csvRow}\n`);

    // Log progress as a percentage
    progressLogger(total, i);
  }

  await file.close(); // Ensure file is closed after completion
  console.log("Operation successful!");
}

// deckWriting(vocabDeckPrompt, n2VocabRemaining, N2_VOCAB_REMAINING_FILE); DONE
// deckWriting(vocabDeckPrompt, n3Vocab, N3_VOCAB_FILE_PATH); DONE
// deckWriting(vocabDeckPrompt, n1Vocab, N1_VOCAB_FILE); DONE
