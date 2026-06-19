import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export async function POST(req) {
  try {
    const body = await req.json();

    const { transcript, question } = body;

    const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

   const prompt = `
Question:
${question}

Answer:

The transcript comes from speech recognition and may contain transcription mistakes.

Do not penalize minor speech-to-text errors.

Return ONLY valid JSON.

{
  "persona": "",
  "confidence": 0,
  "confidenceTip": "",
  "communication": 0,
  "communicationTip": "",
  "technical": 0,
  "technicalTip": "",
  "hireProbability": 0,
  "hrThoughts": "",
  "hrImpression": "",
  "weakness": "",
  "improvements": [
    "",
    "",
    ""
  ]
}

Persona must be ONE of:

- Nervous Fresher
- Walking Wikipedia
- Corporate Robot
- Future Team Lead
- Jugaad Engineer

hrThoughts should be funny but realistic.
`;

let result;

for (let attempt = 0; attempt < 3; attempt++) {

  try {

    result =
      await model.generateContent(
        prompt
      );

    break;

  } catch (error) {

    if (attempt === 2)
      throw error;

    await new Promise(
      resolve =>
        setTimeout(resolve, 4000)
    );

  }

}

const response =
  result.response.text();

return Response.json({
  feedback: response,
});

} catch (error) {

  console.error(error);

  return Response.json({
    error:
      "🤖 AI interviewer is currently busy. Please try again in a few seconds."
  });

}

}