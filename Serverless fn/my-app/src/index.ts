import { Hono } from 'hono'
import { env, getRuntimeKey } from 'hono/adapter'
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = new Hono();

async function run(content: any) {
  // For text-only input, use the gemini-pro model
  const {GEMINI_API} = env(content)
  const genAI = new GoogleGenerativeAI(GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Write a line."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text
}

app.get('/', async (c) => {

  // const {GEMINI_API} = env(c)
  const ans = await run(c);
  console.log(ans)
  console.log("my key:")
  return c.json({
      message: 'Live!',
      Quote: ans
  })
})


export default app;