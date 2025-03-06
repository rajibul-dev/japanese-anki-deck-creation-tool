import { isKanji } from "wanakana";

export function fixFuriganaSyntax(sentenceWithFurigana) {
  const noSpaceSentence = sentenceWithFurigana.replaceAll(" ", "");
  let result = "";
  let lastKanjiStart = -1; // Track the first Kanji before `[`

  for (let i = 0; i < noSpaceSentence.length; i++) {
    const char = noSpaceSentence[i];

    if (isKanji(char)) {
      // If we encounter Kanji, mark its position (only the first in a block)
      if (lastKanjiStart === -1) {
        lastKanjiStart = result.length; // Store position in result
      }
    }

    if (char === "[") {
      const prevChar = noSpaceSentence[i - 1];

      // Insert space before the first Kanji in the block, **except at the start of the sentence**
      if (lastKanjiStart !== -1 && noSpaceSentence.indexOf(prevChar) !== 0) {
        result =
          result.slice(0, lastKanjiStart) + " " + result.slice(lastKanjiStart);
      }
      lastKanjiStart = -1; // Reset Kanji tracking
    }

    result += char;
  }

  return result;
}

// 🛠 **Test Cases**
console.log(
  fixFuriganaSyntax(
    "二[ふた]人[り]そのパーティーには、私[わたし]たち二[ふた]人[り]が一緒[いっしょ]に行[い]くつもりです。"
  )
);
