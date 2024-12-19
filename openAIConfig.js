import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateGPTResponse({
  input,
  functionalityPrompt,
  responseFormat = "text",
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: [
          {
            type: "text",
            text: functionalityPrompt,
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: input,
          },
        ],
      },
    ],
    response_format: {
      type: responseFormat,
    },
    temperature: 1,
    max_completion_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content;
}
