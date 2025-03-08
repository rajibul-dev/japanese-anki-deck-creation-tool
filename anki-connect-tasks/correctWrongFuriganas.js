import fs from "node:fs/promises";
import { FURIGANA_CORRECTION_PROMPT } from "../functionality-prompts/fillingMissingFields.js";
import { generateGPTResponse } from "../openAIConfig.js";
import { fixFuriganaSyntax } from "../utils/fixFuriganaSyntax.js";
import {
  getFullNoteData,
  getNoteIDs,
  updateNoteFields,
} from "./ankiConnect.js";
import { progressLogger } from "../utils/progressLogger.js";

async function correctWrongFurigana({ queryType = "deck", noteOrDeckName }) {
  // Construct a query to fetch all notes or deck that's specified
  const query = `${queryType}:"${noteOrDeckName}"`;
  const noteIDs = await getNoteIDs(query);

  // Retrieve full note information
  const notes = await getFullNoteData(noteIDs);
  if (!notes) return console.log("No cards need filling.");
  const total = notes.length;

  // Loop through each note
  for (let i = 0; i < total; i++) {
    const note = notes[i];
    const fieldKeys = Object.keys(note.fields);

    let noteInformation = "";
    let furiganaFieldsToCorrect = [];

    for (const key of fieldKeys) {
      const value = note.fields[key].value;

      if (!key.includes("en")) {
        noteInformation += `${key}: ${value}\n`;
      }

      if (key.includes("furigana")) {
        furiganaFieldsToCorrect.push(key);
      }
    }

    const userMessage = `The details we have about the card:\n${noteInformation}\nThe furigana fields you have to correct and provide in the JSON format: ${furiganaFieldsToCorrect.join(
      ", "
    )}`;

    try {
      const response = await generateGPTResponse({
        functionalityPrompt: FURIGANA_CORRECTION_PROMPT,
        input: userMessage,
        responseFormat: "json_object",
      });

      let updatedFields = JSON.parse(response);

      // ✅ **Fix furigana syntax before updating**
      let hasChanges = false;

      for (const field of furiganaFieldsToCorrect) {
        if (updatedFields[field]) {
          const correctedFurigana = fixFuriganaSyntax(updatedFields[field]);

          // Only update if the correction changes the field
          if (correctedFurigana !== updatedFields[field]) {
            updatedFields[field] = correctedFurigana;
            hasChanges = true;
          }
        }
      }

      // ✅ **Update only if there are actual changes**
      if (hasChanges && Object.keys(updatedFields).length > 0) {
        await updateNoteFields(note.noteId, updatedFields);
        progressLogger(total, i);
      } else {
        console.log("Nothing to change in this card, skipping.");
        continue;
      }
    } catch (error) {
      console.error(error.message);

      const reportFileHandle = await fs.open(
        "../txt-records/failed-automation-manager.txt",
        "a" // ✅ Append mode instead of "w" (overwrite)
      );

      await reportFileHandle.appendFile(
        `${userMessage}\n----------------------------\n`
      );

      await reportFileHandle.close();
    }
  }
  console.log("Operation completed!");
}

(async () => {
  // VOCABULARY
  // await correctWrongFurigana({
  //   noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N5 Vocabulary",
  // }); // done
  // console.log("Completed processing JLPT N5 Vocabulary");

  await correctWrongFurigana({
    noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N4 Vocabulary",
  });
  console.log("Completed processing JLPT N4 Vocabulary");

  await correctWrongFurigana({
    noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N3 Vocabulary",
  });
  console.log("Completed processing JLPT N3 Vocabulary");

  await correctWrongFurigana({
    noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N2 Vocabulary",
  });
  console.log("Completed processing JLPT N2 Vocabulary");

  await correctWrongFurigana({
    noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N1 Vocabulary",
  });
  console.log("Completed processing JLPT N1 Vocabulary");

  // GRAMMAR
  await correctWrongFurigana({
    noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N5 Grammar",
  });
  console.log("Completed processing JLPT N5 Grammar");

  await correctWrongFurigana({
    noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N4 Grammar",
  });
  console.log("Completed processing JLPT N4 Grammar");

  await correctWrongFurigana({
    noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N3 Grammar",
  });
  console.log("Completed processing JLPT N3 Grammar");

  await correctWrongFurigana({
    noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N2 Grammar",
  });
  console.log("Completed processing JLPT N2 Grammar");

  await correctWrongFurigana({
    noteOrDeckName: "The Ultimate Japanese Learning Deck::JLPT N1 Grammar",
  });
  console.log("Completed processing JLPT N1 Grammar");
})();
