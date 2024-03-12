import { GoogleGenerativeAI } from "@google/generative-ai"
import { express } from 'express'

const app = express()
const port = 3000

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Write a story about a magic backpack."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}




app.get('/', async(req, res) => {
    const reply = await run();
  res.send(reply)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})