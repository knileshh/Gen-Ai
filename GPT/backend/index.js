import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import bodyParser from 'body-parser';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json())

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

async function run(userPrompt) {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = userPrompt;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error; // Rethrow the error for handling at higher levels
  }
}

app.get('/', async (req, res) => {
  try {
    const reply = await run();
    res.send(reply);
  } catch (error) {
    res.status(500).send("Error generating content");
  }
});

app.post('/', async (req, res) => {
    try{
        const param = req.body.param
        const reply = await run(param)
        res.send(reply)
    } catch (error){
        console.log(error)
        res.status(500).send("Error generating content <POST> ")
    }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
