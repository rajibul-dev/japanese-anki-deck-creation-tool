export default `For every grammar pattern you provide, return the following fields for your Anki deck creation for Japanese learning, formatted without headings and separated by triple bars (|||). Ensure the fields are in the specified order.

# Fields

- **grammar**: The same pattern that you provided.
- **explanation**: A concise description in English of how the grammar is structured, such as 'V-て after'.
- **meaning**: An English explanation of the grammar's meaning, emphasizing practical usage over theoretical description, such as "After ～. Usually this means 'right/just after'."
- **ex1_ja to ex10_ja**: Ten example sentences using the grammar pattern, written in Japanese. Ensure the examples have ascending complexity, with at least one complex and useful sentence.
- **ex1_en to ex10_en**: English translations of the example sentences.
- **note**: Additional helpful information or interesting connections to other grammar patterns, written in English.

# Example Sentence Instruction

Create three example sentences with ascending complexity to reflect real-life human experiences. Provide learner-friendly, realistic, and engaging sentences. Ensure at least one of the ten examples is complex, practical, and longer than the rest, not poetic.

# Output Format

grammar|||explanation|||meaning|||ex1_ja|||ex1_en||| ex2_ja|||ex2_en|||ex3_ja|||ex3_en|||ex4_ja|||ex4_en|||ex5_ja|||ex5_en|||ex6_ja|||ex6_en|||ex7_ja|||ex7_en|||ex8_ja|||ex8_en|||ex9_ja|||ex9_en|||ex10_ja|||ex10_en|||note

# Example

Input: 
～てから 

Output: 
～てから|||V-て after|||After ～. Usually this means “right/just after”.|||肉を焼いてから野菜を入れてください。|||Put the vegetables in after cooking the meat.|||食べてから走らない方が良いですよ。|||You should not run just after eating.|||映画を見てから、友達と食事に行きました。|||I went out to eat with my friends after watching a movie.|||資料を読み終わってから、プレゼンテーションを始めます。|||I will start the presentation after I finish reading the materials.|||勉強してから寝ると、頭がすっきりします。|||If you study before sleeping, your mind feels clear.|||買い物をしてから家に帰るつもりです。|||I plan to go home after doing some shopping.|||旅行を終えてから、たくさんの写真を見せてください。|||Please show me many pictures after your trip.|||運動してから、ご飯を食べるのが好きです。|||I like to eat after exercising.|||朝ごはんを食べてから、仕事に行きます。|||I will go to work after having breakfast.|||掃除を終えてから、友達を招待する予定です。|||I plan to invite my friends over after I finish cleaning.|||The construction 'V-てから' emphasizes the sequence of actions, often indicating a causal relationship between the two actions.

total 24 fields, should be in order, DO NOT MESS THIS UP
I keep seeing you're providing 9 examples... 10 please!!!
`;

// grammar,explanation,meaning,ex1_ja,ex1_en, ex2_ja,ex2_en,ex3_ja,ex3_en,ex4_ja,ex4_en,ex5_ja,ex5_en,ex6_ja,ex6_en,ex7_ja,ex7_en,ex8_ja,ex8_en,ex9_ja,ex9_en,ex10_ja,ex10_en,note
