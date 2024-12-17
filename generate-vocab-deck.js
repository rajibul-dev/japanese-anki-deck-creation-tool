import fs from "node:fs/promises";
import { generateGPTResponse } from "./openAIConfig.js";
import { convertRawResultToCSVRow } from "./utils/csvHelpers.js";
import n2VocabRemaining from "./card-inputs/n2VocabRemaining.js";

const N2_VOCAB_REMAINING_FILE = await fs.open(
  "./cooked-csvs/N2-vocab-remainings.csv",
  "w"
);
const testFile = await fs.open("./cooked-csvs/test.csv", "w");

const PROMPT = `Provide clean, formatted outputs for a Japanese word, including its Kanji, Kana reading, Part of Speech (POS), and English translation. Additionally, create three example sentences with ascending complexity to reflect real-life human experiences. These sentences should be learner-friendly, realistic, and engaging.

Ensure that all output is formatted with field values separated by "|||" without any headings or extra formatting.

# Steps

1. **Kanji:** Identify and extract the Kanji form of the word.
2. **Kana (Reading):** Provide the Kana representation of the word.
3. **POS (Part of Speech):** Determine the part of speech using shorthand notation (e.g., 'n' for noun, 'adj' for adjective).
4. **Translation (Meaning in English):** Translate the word into English.
5. **Example Sentences:**
   - Create a simple sentence for beginners.
   - Develop a medium-complexity sentence for intermediate learners.
   - Craft a complex, vivid, and engaging sentence for advanced learners, capturing diverse and immersive contexts. Complex but not complicated.
6. **Example Sentences English Translations:** For the three sentences that you generated, provide the English translation for each.

Output each field value, including example sentences, separated by "|||".

# Examples

**Input:** 時速

**Output Example:**

時速|||じそく|||n|||speed per hour (speed in terms of distance covered per hour)|||車の時速が速いと、目的地まで早く到着できる。|||The speed of the car is fast, so you can arrive at your destination quickly.|||新幹線の時速が300キロだと聞いて、とても驚いた。|||I was shocked to hear that the bullet train travels at 300 km/h.|||遠い彼の故郷に住む家族を訪ねるために、高速道路を利用し時速120キロで走る車の窓から、広がる風景を楽しんだ。|||I enjoyed the landscape from the window of a car driving at 120 km/h on the highway to visit the family living in his distant hometown.

**Input:** 明るい

**Output Example:**

明るい|||あかるい|||adj|||bright; cheerful|||彼女の部屋は太陽の光で明るい。|||Her room is bright with sunlight.|||新しい先生はとても明るく、学生たちは喜んでいる。|||The new teacher is very cheerful, and the students are happy.|||彼女の明るい性格は、困難な時でも周りの人々に希望をもたらし、前向きな影響を与えている。|||Her bright personality brings hope and has a positive influence on those around, even in difficult times.

# Notes

- Avoid overuse of a single theme across example sentences for diversity.
- Ensure that sentences reflect diverse, relatable topics and convey human experiences.
- The third sentence should provide engaging and complex scenarios without overcomplicating the language.`;

const testingWords = ["わりあいに", "割算", "割と", "割引", "椀", "ワンピース"];

async function deckWriting(inputData, file) {
  const total = inputData.length;

  for (let i = 0; i < total; i++) {
    const word = inputData[i];

    const cardDataRaw = await generateGPTResponse({
      functionalityPrompt: PROMPT,
      input: word,
    });

    const csvRow = convertRawResultToCSVRow(cardDataRaw);

    file.appendFile(`${csvRow}\n`);

    // Log progress as a percentage
    console.log(
      `Progress: ${i + 1}/${total} (${Math.round(((i + 1) / total) * 100)}%)`
    );
  }
}

// deckWriting(n2VocabRemaining, N2_VOCAB_REMAINING_FILE); DONE
