import { isKanji } from "wanakana";

export function fixFuriganaSyntax(sentenceWithFurigana) {
  const noSpaceSentence = sentenceWithFurigana.replaceAll(" ", ""); // Remove all spaces
  let result = "";
  let lastKanjiStart = -1; // Position of first Kanji in a block

  for (let i = 0; i < noSpaceSentence.length; i++) {
    const char = noSpaceSentence[i];

    if (isKanji(char)) {
      // If we encounter a Kanji, track its position (only for first in a block)
      if (lastKanjiStart === -1) {
        lastKanjiStart = result.length;
      }
    }

    if (char === "[") {
      // ✅ Only add space before the first Kanji in a block, but not at the start of the sentence
      if (lastKanjiStart > 0) {
        result =
          result.slice(0, lastKanjiStart) + " " + result.slice(lastKanjiStart);
      }
      lastKanjiStart = -1; // Reset tracking
    }

    result += char;
  }

  return result;
}

// 🛠 **Test Cases**
const testCases = [
  {
    input:
      "二[ふた]人[り]そのパーティーには、私[わたし]たち二[ふた]人[り]が一緒[いっしょ]に行[い]",
  },
  { input: "   今日[きょう]は 良[よ]い天気[てんき] ですね。" },
  { input: "私[わたし]の名[な]前[まえ] は 田中[たなか]です。" },
  { input: "彼[かれ]は    学生[がくせい] で す。" },
  { input: "これ は ペン[ぺん] です。" },
  { input: "次[つぎ]の 駅[えき]   で降[お]ります。" },
  { input: "私[わたし]の本[ほん] です。" },
  { input: "本[ほん]日[じつ] の予定[よてい] を 教[おし]えて ください。" },
];

// Run the function and format results in a table
console.table(
  testCases.map(({ input }) => ({
    Input: input,
    Output: fixFuriganaSyntax(input),
  }))
);
