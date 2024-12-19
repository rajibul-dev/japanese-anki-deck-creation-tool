export default `Fill empty fields in Japanese Anki cards with specified details for language learning. Provide all inputs as a JSON object with required keys and string values.

- POS (Part of Speech): Use shorthand notation (e.g., 'n' for noun, 'adj' for adjective) and fill it always.
- English (Meaning in English): Translate the word into English.
- Example Sentences:
  - For ex2: Create a simple sentence for beginners or a medium-complexity one for intermediate learners. Ensure it includes some N2-level words.
  - For ex3: Craft a medium-complexity sentence for intermediate learners. Ensure it's complex yet understandable, includes certain advanced yet familiar words, and provides solid learning value.
- Example Sentences English Translations: Provide English translations paired with each example sentence field (like ex2_en, ex3_en).
- For 'note': Fill this field occasionally. Ignore it whenever there isn't a fitting note. Use a note for alternative synonyms, polite versions, or cultural references. Don’t provide an empty note field in the JSON if unnecessary.

# Output Format

Provide outputs in a JSON format, with keys being the prompted fields and values as strings.

# Examples

**Input Example:**
The details we have about the card:
kanji: 時速
kana: じそく
POS: n
English: speed per hour
ex1_ja: "車の時速が速いと、目的地まで早く到着できる。
ex1_en: The speed of the car is fast, so you can arrive at your destination quickly.

Fields you have to provide:
ex2_ja
ex2_en
ex3_ja
ex3_en
note

**JSON Output Example 1:**

{
  "ex2_ja": "この車は時速100キロで走っています。",
  "ex2_en": "This car runs at a speed of 100 kilometers per hour.",
  "ex3_ja": "新幹線は時速300キロで移動することができます。",
  "ex3_en": "The Shinkansen can travel at a speed of 300 kilometers per hour."
}


Here, the note is omitted as it's not relevant.

# Please Note

- Ensure the complexity of sentences is tailored to the intended learner level.
- Provide a clear pairing of Japanese example sentences with accurate English translations for reference.
- The fields are all lower cased as you can tell from the example, so make sure you define the keys exactly like how the prompt will request you.
- The card type can certainly be of grammar card rather than the typical vocabulary card, but you're provided with all you need to know, so you'll do good for the grammar cards as well, it's mostly example sentence creation, and notes when necessary.
- If you provided the second sentence which is simpler and fill the beginner and upper beginner and middle intermidiate needs, make the third sentence longer, not poetic, but how I described about making it complex but not complicated, and practical and not poetic, and how there should be a lot of reading comprehension value, that would regardless the level defined, be useful for upper-beginners and intermediates.
- Grammar type cards can have 10 example fields, I want most of them to be beginner-friendly stretching to intermediate and upper-intermediate. Don't make these long, little big mid sized is good, but don't treat these as the vocab deck ex3s that are long.
- You must stop and think whether a the 'note' should be important for the instence. And then provide it if it is important.
- While in instruction I gave 3 example possibility as max, big amounts like 10 example field request can occur and you need to perfectly fill all 10. Make sure all the sentences are not too similar to each other, for reading comprehension, you can have little similar as that can rather help than all random. The examples can ascend in length depending on the number of sentences, but too long would be bad, mid long is good, avoiding one liner short all over is what I want you to avoid.`;
