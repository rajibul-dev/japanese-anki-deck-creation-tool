import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: [
        {
          type: "text",
          text: "Provide clean, formatted outputs for a Japanese word, including its Kanji, Kana reading, Part of Speech (POS), and English translation. Additionally, create three example sentences with ascending complexity to reflect real-life human experiences. These sentences should be learner-friendly, realistic, and engaging.\n\nEnsure that all output is formatted with field values separated by \"|||\" without any headings or extra formatting. \n\n# Steps\n\n1. **Kanji:** Identify and extract the Kanji form of the word.\n2. **Kana (Reading):** Provide the Kana representation of the word.\n3. **POS (Part of Speech):** Determine the part of speech using shorthand notation (e.g., 'n' for noun, 'adj' for adjective).\n4. **Translation (Meaning in English):** Translate the word into English.\n5. **Example Sentences:**\n   - Create a simple sentence for beginners.\n   - Develop a medium-complexity sentence for intermediate learners.\n   - Craft a complex, vivid, and engaging sentence for advanced learners, capturing diverse and immersive contexts. Complex but not complicated.\n\n# Output Format\n\nOutput each field value, including example sentences, separated by \"|||\".\n\n# Examples\n\n**Input:** 時速\n\n**Output Example:**\n\n時速|||じそく|||n|||speed per hour (speed in terms of distance covered per hour)|||車の時速が速いと、目的地まで早く到着できる。|||新幹線の時速が300キロだと聞いて、とても驚いた。|||遠い彼の故郷に住む家族を訪ねるために、高速道路を利用し時速120キロで走る車の窓から、広がる風景を楽しんだ。(Note: This sentence is intentionally longer and more descriptive, suitable for an advanced learner.)\n\n**Input:** 明るい\n\n**Output Example:**\n\n明るい|||あかるい|||adj|||bright; cheerful; clear|||部屋の中が明るいと気分も明るくなる。|||彼女の明るい性格のおかげで、どんな場面でも笑顔が絶えない。|||明るい未来を信じて、彼は仕事を辞めて新しい挑戦を始める決心をした。(Note: This sentence should be vivid and immersive, providing a rich context.)\n\n# Notes\n\n- Avoid overuse of a single theme across example sentences for diversity.\n- Ensure that sentences reflect diverse, relatable topics and convey human experiences.\n- The third sentence should provide engaging and complex scenarios without overcomplicating the language.",
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "憧れる",
        },
      ],
    },
    {
      role: "assistant",
      content: [
        {
          type: "text",
          text: "憧れる|||あこがれる|||v|||to long for; to yearn for; to admire|||彼女はずっと有名な歌手に憧れている。|||私は大学に進学することに憧れて、毎日頑張って勉強している。|||彼は世界一周旅行に憧れを抱き、貯金を始め、異文化の人々と出会うための準備を着々と進めている。",
        },
      ],
    },
  ],
  response_format: {
    type: "text",
  },
  temperature: 1,
  max_completion_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
