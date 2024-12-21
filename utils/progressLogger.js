export function progressLogger(total, i) {
  console.log(
    `Progress: ${i + 1}/${total} (${Math.round(((i + 1) / total) * 100)}%)`
  );
}
