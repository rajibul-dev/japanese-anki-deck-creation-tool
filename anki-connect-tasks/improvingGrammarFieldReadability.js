import {
  getFullNoteData,
  getNoteIDs,
  updateNoteFields,
} from "./ankiConnect.js";

function slashToLineBreak(str) {
  return str.replaceAll("/", "<br>");
}

async function fromSlashToLineBreakOnFrontField(noteType) {
  // query the notetype
  const query = `note:"${noteType}"`;
  const noteIDs = await getNoteIDs(query);

  if (noteIDs.length === 0) {
    console.log("No notes found with the specified criteria.");
    return;
  }

  const notes = await getFullNoteData(noteIDs);

  let count = 0;

  for (const note of notes) {
    if (note.fields.grammar.value.includes("/")) {
      const grammarField = note.fields.grammar.value;
      const grammarFuriganaField = note.fields.grammar_furigana.value;

      const updatedFields = {
        grammar: slashToLineBreak(grammarField),
        grammar_furigana: slashToLineBreak(grammarFuriganaField),
      };

      await updateNoteFields(note.noteId, updatedFields);
      console.log(
        `Updated note ${note.noteId}:`,
        JSON.stringify(updatedFields, null, 2)
      );

      count++;
    }
  }

  console.log(`Operation successful! Improved ${count} cards' readability.`);
}

fromSlashToLineBreakOnFrontField("passjapanesetest.com: JLPT Grammar");
