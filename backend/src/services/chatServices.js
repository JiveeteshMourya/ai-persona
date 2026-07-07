import { OpenAI } from "openai";
import dotenv from "dotenv";
import {
  SYSTEM_PROMPT_HITESH_SIR,
  SYSTEM_PROMPT_JIVEETESH,
  SYSTEM_PROMPT_PIYUSH_SIR,
} from "./PersonaSystemPrompts.js";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
    You have to analyze the user's input carefully and then you need to breakdown the problem into multiple sub problems before coming on to the final result. Always breakdown the users intention and how to solve that problem and then step by step solve it.

    We are going to follow a pipeline of "INITIAL", "THINK", "ANALYZE", "TOOL_REQUEST" and "OUTPUT" pipeline.

    The Pipeline:
    - "INITIAL" when user gives an input, we will have an initial thought process on what this user is trying to ask.
    - "THINK" this is where we are going to think about how to solve this and then start to breakdown the problem
    - "ANALYZE" this is where we will analyze the solution and also verify if the output is correct
    - "THINK" we can go back to think mode where we can now see if any sub problem remains and think
    - "ANALYZE" again analyze the problem and get onto a solution
    - "OUTPUT" this is where we can end and give the final solution to the user.

    Rules:
    - Always output one step at a time and wait for other step before proceeding.
    - Always maintain the sequence of pipeline as given in example.
    - Always follow JSON output format strictly.
    - Always write JSON parsable output

    Output Format: 
    { "step" : "INITIAL" | "THINK" | "ANALYZE" | "OUTPUT", "text": "<The Actual Text>" }

    Rules:
    - Always output one step at a time and wait for other step before proceeding.
    - Always maintain the sequence of pipeline as given in example.
    - Always follow JSON output format strictly.
    - Always write JSON parsable output
`;

export const chatService = async (prompt, chatType) => {
  let personaSystemPrompt = "";
  switch (chatType) {
    case "hitesh-sir":
      {
        personaSystemPrompt = SYSTEM_PROMPT_HITESH_SIR;
      }
      break;
    case "piyush-sir":
      {
        personaSystemPrompt = SYSTEM_PROMPT_PIYUSH_SIR;
      }
      break;
    case "jiveetesh":
      {
        personaSystemPrompt = SYSTEM_PROMPT_JIVEETESH;
      }
      break;
  }
  const MESSAGES_DB = [{ role: "system", content: `${SYSTEM_PROMPT} ${personaSystemPrompt}` }];
  MESSAGES_DB.push({ role: "user", content: prompt });

  while (true) {
    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: MESSAGES_DB,
    });

    const rawResult = result.choices[0].message.content;
    const parsedResult = JSON.parse(rawResult);

    MESSAGES_DB.push({ role: "assistant", content: rawResult });

    // console.log(`🤖 (${parsedResult.step}) : ${parsedResult.text}`);

    if (parsedResult.step.toLowerCase() === "output") return parsedResult;
  }
};
