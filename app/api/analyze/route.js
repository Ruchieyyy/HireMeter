import Groq from "groq-sdk";

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
try {
const body = await req.json();

```
const { transcript, question } = body;

const prompt = `
```

Question:
${question}

Candidate Answer:
${transcript}

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

* Nervous Fresher
* Walking Wikipedia
* Corporate Robot
* Future Team Lead
* Jugaad Engineer

hrThoughts should be funny but realistic.
`;

```
const completion =
  await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

const response =
  completion.choices[0].message.content;

return Response.json({
  feedback: response,
});
```
} catch (error) {

  console.error("GROQ ERROR:", error);

  return Response.json({
    error: error.message || JSON.stringify(error)
  });

}
 
}
