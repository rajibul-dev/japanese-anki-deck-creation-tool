export function escapeCSV(field) {
  if (field.includes(",") || field.includes("\n") || field.includes('"')) {
    return `"${field.replace(/"/g, '""')}"`;
  }

  return field;
}

export function convertRawResultToCSVRow(rawData) {
  return rawData
    .split("|||")
    .map((field) => escapeCSV(field))
    .join(",");
}
