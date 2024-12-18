export async function ankiConnect(action, params = {}, version = 6) {
  const response = await fetch("http://localhost:8765", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, version, params }),
  });
  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }
  return result.result;
}

export async function getNoteIDs(query) {
  return await ankiConnect("findNotes", { query }, 6);
}

export async function getFullNoteData(noteIDs) {
  return await ankiConnect("notesInfo", { notes: noteIDs }, 6);
}
