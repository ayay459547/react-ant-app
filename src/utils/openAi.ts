import { Configuration, OpenAIApi } from "openai"
const configuration = new Configuration({
    organization: "org-YuIRgm8UHndqVksAj5YXuIop",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const getOpenAIResponse = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${prompt}`,
    max_tokens: 100,
    temperature: 0.5,
    // top_p: 1.0,
    // frequency_penalty: 0.5,
    // presence_penalty: 0.0,
    // stop: ["You:"],
  })
  let text = ''
  console.log(response)
  if (response.data.choices) {
    text = response.data.choices[0]?.text ?? ''
  } else {
    text = (response as unknown as any).data?.error?.message ?? ''
  }
  return Promise.resolve({
    data: text
  })
}