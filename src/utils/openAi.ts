import { Configuration, OpenAIApi } from "openai"
const configuration = new Configuration({
    organization: "org-YuIRgm8UHndqVksAj5YXuIop",
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const getOpenAIResponse = async (prompt: string) => {
  try {
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
    return {
      data: response.data.choices[0]?.text ?? ''
    }
  } catch (e) {
    return {
      data: (e as unknown as any)?.message ?? 'error'
    }
  }
}