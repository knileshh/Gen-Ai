import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { env, getRuntimeKey } from 'hono/adapter'
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = new Hono();

app.use(cors())

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

  const ans = await run(c);
  return c.json({
      message: 'Live!',
      Quote: ans
  })
})

app.get('/v1', async (c) => {

  const ans = await run(c);
  console.log(ans)
  return c.text(ans)
})


export default app;