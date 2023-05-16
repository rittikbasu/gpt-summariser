// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai-api";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // get prompt from request body
  const prompt = req.body.prompt;

  const openai = new OpenAI(process.env.OPENAI_API_KEY);
  // const prompt = "10 fun facts about Next.js:";
  const maxTokens = 256;
  const temperature = 1;
  const topP = 1;
  const presencePenalty = 0;
  const frequencyPenalty = 0;
  const bestOf = 1;
  const n = 1;
  const stream = false;
  // const stop = ["\n", " Human:", " AI:"];

  openai
    .complete({
      engine: "davinci",
      prompt,
      maxTokens,
      temperature,
      topP,
      presencePenalty,
      frequencyPenalty,
      bestOf,
      n,
      stream,
    })
    .then((response) => {
      res.status(200).json({ name: response.data.choices[0].text });
    });
}
