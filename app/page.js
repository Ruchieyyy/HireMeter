"use client";

import {
  useState,
  useEffect,

} from "react";

export default function Home() {

  const [transcript, setTranscript] =
    useState("");

  const [feedback, setFeedback] =
    useState("");

  const [analysis, setAnalysis] =
  useState(null);

  const [listening, setListening] =
    useState(false);

  const [loading, setLoading] =
  useState(false);

const questions = [
  "Tell me about yourself",
  "What are your strengths?",
  "Explain OOP concepts",
  "Why should we hire you?",
  "Describe a difficult project",
  "What is DBMS?",
  "Explain API vs REST API",
];

const [question, setQuestion] =
  useState("");

useEffect(() => {

  const randomQuestion =
    questions[
      Math.floor(
        Math.random() * questions.length
      )
    ];

  setQuestion(randomQuestion);

}, []);
  

  const startListening = () => {
    setTranscript("");
    setAnalysis(null);
    setFeedback("");
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    const recognition =
      new SpeechRecognition();

    window.currentRecognition =
  recognition;

    recognition.continuous = true;

    recognition.interimResults = true;

    recognition.lang = "en-US";

    recognition.onresult = (event) => {

      let text = "";

      for (
        let i = 0;
        i < event.results.length;
        i++
      ) {

        text +=
          event.results[i][0].transcript;

      }

      setTranscript(text);

    };

    recognition.start();

    setListening(true);

    setTimeout(() => {

      recognition.stop();

      setListening(false);

    }, 90000);
  };

 const analyzeAnswer = async () => {

  try {

    setLoading(true);

    const res = await fetch(
      "/api/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          transcript,
          question,
        }),
      }
    );

    const data = await res.json();

    if (data.error) {

      setLoading(false);

      alert(data.error);

      return;
    }

    const cleaned =
      (data.feedback || "")
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const parsed =
      JSON.parse(cleaned);

    setAnalysis(parsed);

  } catch (err) {

    console.error(err);

    setFeedback(
      "Network error. Please try again."
    );

  } finally {

    setLoading(false);

  }

};
  

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white p-10">

      <h1 className="text-6xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text">
        HireMeter
      </h1>
      <p className="text-zinc-400 text-xl mb-8">
  Measure your interview potential before recruiters do.
</p>

      <div className="bg-zinc-900 p-6 rounded-2xl mb-6">

        <h2 className="text-2xl mb-4">
          Interview Question
        </h2>

        <p className="text-lg">
          {question}
        </p>

      </div>

      <button
        onClick={startListening}
        className="bg-blue-500 hover:bg-blue-600 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl mb-6 shadow-lg shadow-blue-500/30"
      >
        {listening
          ? "🎤 Listening..."
          : "Start Answer"}
      </button>
<button
  onClick={() => {

    if (
      window.currentRecognition
    ) {

      window.currentRecognition.stop();

    }

    setListening(false);

  }}
  className="bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl mb-6 ml-3 shadow-lg shadow-red-500/30"
>
  Stop Recording
</button>
      <div className="bg-zinc-900 p-6 rounded-2xl mb-6">

        <h2 className="text-2xl mb-4">
          Transcript
        </h2>

        <p>
          {transcript || "Your answer will appear here..."}
        </p>

      </div>
<button
  onClick={() => {

    const randomQuestion =
      questions[
        Math.floor(
          Math.random() * questions.length
        )
      ];

    setQuestion(randomQuestion);

    setTranscript("");
    setAnalysis(null);
    setFeedback("");

  }}
  className="bg-purple-500 hover:bg-purple-600 hover:scale-105 transition-all duration-300 px-6 py-3 rounded-xl mb-6 ml-3 shadow-lg shadow-purple-500/30"
>
  Next Question
</button>
      <button
  onClick={analyzeAnswer}
  disabled={loading}
     className={`
px-6 py-3 rounded-xl mb-6
shadow-lg

${loading
 ? "bg-zinc-600 cursor-not-allowed"
 : "bg-emerald-500 hover:bg-emerald-600 hover:scale-105 shadow-emerald-500/30"}
`} >
      {loading
  ? "⏳ Analyzing..."
  : "Analyze Confidence"}
      </button>

      
{analysis && (

<div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 p-8 rounded-2xl mb-6 text-center">

  <h2 className="text-xl text-zinc-300 mb-2">
    Your HireMeter
  </h2>

  <p className="text-7xl font-extrabold text-emerald-400">
    {analysis.hireProbability}%
  </p>

</div>

)}

{analysis && (



<div className="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 p-6 rounded-2xl mb-6">

  <h2 className="text-3xl font-bold">
    🎭 {analysis.persona}
  </h2>

</div>

)}

{analysis && (

<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

  <div className="bg-zinc-900 p-5 rounded-xl">

    <h3>Confidence</h3>

    <p className="text-4xl text-blue-400 font-bold">
      {analysis.confidence}
    </p>

    <p className="text-sm text-zinc-400 mt-2">
      {analysis.confidenceTip}
    </p>

  </div>

  <div className="bg-zinc-900 p-5 rounded-xl">

    <h3>Communication</h3>

    <p className="text-4xl text-green-400 font-bold">
      {analysis.communication}
    </p>

    <p className="text-sm text-zinc-400 mt-2">
      {analysis.communicationTip}
    </p>

  </div>

  <div className="bg-zinc-900 p-5 rounded-xl">

    <h3>Technical</h3>

    <p className="text-4xl text-yellow-400 font-bold">
      {analysis.technical}
    </p>

    <p className="text-sm text-zinc-400 mt-2">
      {analysis.technicalTip}
    </p>

  </div>

  <div className="bg-zinc-900 p-5 rounded-xl">

    <h3>Hire Probability</h3>

    <p className="text-4xl text-emerald-400 font-bold">
      {analysis.hireProbability}%
    </p>

  </div>

</div>

)}

{analysis && (

<>

<div className="bg-zinc-900 p-6 rounded-2xl mb-6">

  <h2 className="text-2xl font-bold mb-3">
    👩‍💼 HR Is Thinking
  </h2>

  <p>
    {analysis.hrThoughts}
  </p>

</div>

<div className="bg-zinc-900 p-6 rounded-2xl mb-6">

  <h2 className="text-2xl font-bold mb-3">
    🎯 Interview Verdict
  </h2>

  <p className="text-lg font-bold">

    {analysis.hireProbability >= 80
      ? "🟢 Strong Hire"
      : analysis.hireProbability >= 60
      ? "🟡 Maybe Hire"
      : "🔴 Needs Improvement"}

  </p>

</div>

</>

)}




      {feedback && (

        <div className="bg-zinc-900 p-6 rounded-2xl whitespace-pre-wrap">

          <h2 className="text-2xl mb-4">
            AI Feedback
          </h2>

          <p>
            {feedback}
          </p>

        </div>

      )}
            <p className="text-zinc-500 mt-10">
      AI-powered interview confidence analyzer
    </p>
    </div>

    
  );
}