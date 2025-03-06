import fs from "node:fs/promises";
import fillingMissingFields from "../functionality-prompts/fillingMissingFields.js";
import { generateGPTResponse } from "../openAIConfig.js";
import { progressLogger } from "../utils/progressLogger.js";
import {
  getFullNoteData,
  getNoteIDs,
  updateNoteFields,
} from "./ankiConnect.js";

async function processNoteDeckAndFill({ queryType = "deck", noteOrDeckName }) {
  // Construct a query to fetch all notes or deck that's specified
  const query = `${queryType}:"${noteOrDeckName}"`;
  const noteIDs = await getNoteIDs(query);

  // Retrieve full note information
  const notes = await getFullNoteData(noteIDs);
  if (!notes) return console.log("No cards needs filling.");
  const total = notes.length;

  // loop and do the task
  for (let i = 0; i < total; i++) {
    const note = notes[i];

    const fieldKeys = Object.keys(note.fields);

    let whatWeKnowAboutTheCard = "";
    let fieldsToGenerate = "";

    // Check if every field is filled (ignoring 'note' and 'lovable_video_reference')
    const areAllFieldsCovered = fieldKeys
      .filter(
        (key) =>
          key !== "lovable_video_reference" &&
          key !== "note" &&
          !key.includes("_furigana")
      ) // Exclude ignored fields
      .every((key) => {
        const value = note.fields[key].value;
        return Boolean(value); // Check if the field has a truthy value
      });

    // If all fields are covered, skip to the next iteration
    if (areAllFieldsCovered) {
      console.log("All fields are covered! Skipping to the next card.");
      continue;
    }

    for (const key of fieldKeys) {
      const value = note.fields[key].value;

      if (key !== "lovable_video_reference" && !key.includes("_furigana")) {
        if (value === "") {
          fieldsToGenerate += `${key}\n`;
        } else {
          whatWeKnowAboutTheCard += `${key}: ${value}\n`;
        }
      }
    }

    // send chatgpt the prompt and get the updated fields object
    const prompt = `The details we have about the card:\n${whatWeKnowAboutTheCard}\nFields you have to provide:\n${fieldsToGenerate}`;

    try {
      const response = await generateGPTResponse({
        functionalityPrompt: fillingMissingFields,
        // functionalityPrompt: fixNotesAndExplanationFieldsInJapanese,
        input: prompt,
        responseFormat: "json_object",
      });

      const updatedFields = JSON.parse(response);

      // update the fields with ankiconnect's function
      if (Object.keys(updatedFields).length > 0) {
        await updateNoteFields(note.noteId, updatedFields);

        // console.log(prompt);
        // console.table(updatedFields);

        // Log progress as a percentage
        progressLogger(total, i);
      } else {
        console.log(
          "Nothing to change in this card, skipping to the next one."
        );
        continue;
      }
    } catch (error) {
      console.error(error.message);

      const reportFileHandle = await fs.open(
        "../txt-records/failed-automation-manager.txt",
        "w"
      );

      await reportFileHandle.appendFile(
        `${prompt}\n----------------------------\n`
      );

      await reportFileHandle.close();
    }
  }

  console.log("Operation completed!");
}

// done
// processNoteDeckAndFill({
//   noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N5 Vocabulary",
// });
// processNoteDeckAndFill({
//   noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N5 Grammar",
// });
// processNoteDeckAndFill({
//   noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N4 Grammar",
// });
// processNoteDeckAndFill({
//   noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N4 Vocabulary",
// });
// (async () => {
//   await processNoteDeckAndFill({
//     noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N3 Vocabulary",
//   });
//   console.log("Completed processing JLPT N3 Vocabulary");

//   await processNoteDeckAndFill({
//     noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N2 Vocabulary",
//   });
//   console.log("Completed processing JLPT N2 Vocabulary");

//   await processNoteDeckAndFill({
//     noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N1 Vocabulary",
//   });
//   console.log("Completed processing JLPT N1 Vocabulary");

//   await processNoteDeckAndFill({
//     noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N3 Grammar",
//   });
//   console.log("Completed processing JLPT N3 Grammar");
// })();

// a single note looks like

/*
const lhs = {
  noteId: 1525236156540,
  profile: "Rajibul (main)",
  tags: [],
  fields: {
    kanji: { value: "あっち", order: 0 },
    kana: { value: "あっち", order: 1 },
    pos: { value: "pn,adj-no", order: 2 },
    english: { value: "that way; over there", order: 3 },
    ex1_ja: { value: "あっちにエレベーターがあるよ。", order: 4 },
    ex1_en: { value: "There is an elevator over there.", order: 5 },
    ex2_ja: { value: "", order: 6 },
    ex2_en: { value: "", order: 7 },
    ex3_ja: { value: "", order: 8 },
    ex3_en: { value: "", order: 9 },
    note: { value: "", order: 10 },
    lovable_video_reference: { value: "", order: 11 },
    kanji_furigana: { value: "あっち", order: 12 },
    ex1_ja_furigana: { value: "あっちにエレベーターがあるよ。", order: 13 },
    ex2_ja_furigana: { value: "", order: 14 },
    ex3_ja_furigana: { value: "", order: 15 },
  },
  modelName: "passjapanesetest.com: JLPT Vocabulary+",
  mod: 1734000836,
  cards: [1525236157227],
};
*/
