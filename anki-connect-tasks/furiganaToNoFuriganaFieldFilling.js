import {
  getFullNoteData,
  getNoteIDs,
  updateNoteFields,
} from "./ankiConnect.js";

// Helper function to remove furigana and clean up spaces
function stripFurigana(text) {
  // Remove furigana inside square brackets
  let strippedText = text.replace(/\[.*?\]/g, "");

  // Remove spaces before or after the text where furigana was removed
  strippedText = strippedText.replace(/\s+/g, "").trim();

  return strippedText;
}

async function processNotesByNoteTypeMultiFields(noteType, fieldPairs) {
  try {
    // Step 1: Construct a query to fetch all notes of the specified note type
    const query = `note:"${noteType}"`;
    const noteIDs = await getNoteIDs(query);

    if (noteIDs.length === 0) {
      console.log("No notes found with the specified criteria.");
      return;
    }

    // Step 2: Retrieve full note information
    const notes = await getFullNoteData(noteIDs);

    // Step 3: Process each note
    for (const note of notes) {
      let updatedFields = {};

      for (const [furiganaField, nonFuriganaField] of fieldPairs) {
        const furiganaText = note.fields[furiganaField]?.value || "";

        if (furiganaText.trim()) {
          // Manipulate the text (strip furigana)
          const cleanedText = stripFurigana(furiganaText);

          // Add the updated field to the batch update
          updatedFields[nonFuriganaField] = cleanedText;
        }
      }

      // Step 4: Update the note with all processed fields
      if (Object.keys(updatedFields).length > 0) {
        await updateNoteFields(note.noteId, updatedFields);
        console.log(
          `Updated note ${note.noteId}:`,
          JSON.stringify(updatedFields, null, 2)
        );
      }
    }

    console.log("All notes processed successfully.");
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

const fieldPairs = [
  ["ex1_ja_furigana", "ex1_ja"],
  ["ex2_ja_furigana", "ex2_ja"],
  ["ex3_ja_furigana", "ex3_ja"],
  ["ex4_ja_furigana", "ex4_ja"],
  ["ex5_ja_furigana", "ex5_ja"],
  ["ex6_ja_furigana", "ex6_ja"],
  ["ex7_ja_furigana", "ex7_ja"],
  ["ex8_ja_furigana", "ex8_ja"],
  ["ex9_ja_furigana", "ex9_ja"],
  ["ex10_ja_furigana", "ex10_ja"],
];

const grammarFuriganaFieldPair = [["grammar_furigana", "grammar"]];

// processNotesByNoteTypeMultiFields(
//   "passjapanesetest.com: JLPT Grammar",
//   fieldPairs
// );

processNotesByNoteTypeMultiFields(
  "passjapanesetest.com: JLPT Grammar",
  grammarFuriganaFieldPair
);
