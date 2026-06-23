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

  const [timeLeft, setTimeLeft] =
  useState(90);

const questions = [

  // HR
  {
    question: "Tell me about yourself.",
    category: "HR",
    difficulty: "Easy",
  },
  {
    question: "Why should we hire you?",
    category: "HR",
    difficulty: "Easy",
  },
  {
    question: "What are your strengths?",
    category: "HR",
    difficulty: "Easy",
  },
  {
    question: "What is your biggest weakness?",
    category: "HR",
    difficulty: "Easy",
  },
  {
    question: "Where do you see yourself in 5 years?",
    category: "HR",
    difficulty: "Easy",
  },
  {
    question: "Describe a challenging situation and how you handled it.",
    category: "HR",
    difficulty: "Medium",
  },
  {
    question: "Tell me about a time you worked in a team.",
    category: "HR",
    difficulty: "Easy",
  },
  {
    question: "How do you handle deadlines and pressure?",
    category: "HR",
    difficulty: "Medium",
  },

  // OOP
  {
    question: "Explain the four pillars of Object-Oriented Programming.",
    category: "OOP",
    difficulty: "Medium",
  },
  {
    question: "What is polymorphism with an example?",
    category: "OOP",
    difficulty: "Medium",
  },
  {
    question: "Difference between abstraction and encapsulation?",
    category: "OOP",
    difficulty: "Medium",
  },
  {
    question: "Difference between method overloading and overriding?",
    category: "OOP",
    difficulty: "Medium",
  },
  {
    question: "Explain inheritance and its advantages.",
    category: "OOP",
    difficulty: "Medium",
  },

  // Java
  {
    question: "What is the difference between JDK, JRE, and JVM?",
    category: "Java",
    difficulty: "Medium",
  },
  {
    question: "Explain exception handling in Java.",
    category: "Java",
    difficulty: "Medium",
  },
  {
    question: "What are collections in Java?",
    category: "Java",
    difficulty: "Medium",
  },
  {
    question: "Difference between ArrayList and LinkedList?",
    category: "Java",
    difficulty: "Hard",
  },
  {
    question: "What is multithreading in Java?",
    category: "Java",
    difficulty: "Hard",
  },

  // DBMS
  {
    question: "What is DBMS?",
    category: "DBMS",
    difficulty: "Easy",
  },
  {
    question: "What is normalization?",
    category: "DBMS",
    difficulty: "Hard",
  },
  {
    question: "Difference between SQL and NoSQL databases?",
    category: "DBMS",
    difficulty: "Medium",
  },
  {
    question: "What are primary and foreign keys?",
    category: "DBMS",
    difficulty: "Easy",
  },
  {
    question: "What is indexing and why is it important?",
    category: "DBMS",
    difficulty: "Hard",
  },

  // SQL
  {
    question: "What is the difference between WHERE and HAVING?",
    category: "SQL",
    difficulty: "Medium",
  },
  {
    question: "Explain JOINs in SQL.",
    category: "SQL",
    difficulty: "Medium",
  },
  {
    question: "What is a subquery?",
    category: "SQL",
    difficulty: "Medium",
  },
  {
    question: "Write a query to find the second highest salary.",
    category: "SQL",
    difficulty: "Hard",
  },

  // DSA
  {
    question: "Difference between array and linked list?",
    category: "DSA",
    difficulty: "Easy",
  },
  {
    question: "Explain binary search and its complexity.",
    category: "DSA",
    difficulty: "Medium",
  },
  {
    question: "What is recursion?",
    category: "DSA",
    difficulty: "Easy",
  },
  {
    question: "What is a stack and where is it used?",
    category: "DSA",
    difficulty: "Easy",
  },
  {
    question: "What is a queue and where is it used?",
    category: "DSA",
    difficulty: "Easy",
  },
  {
    question: "Explain hashing.",
    category: "DSA",
    difficulty: "Medium",
  },
  {
    question: "Difference between BFS and DFS.",
    category: "DSA",
    difficulty: "Hard",
  },

  // Operating Systems
  {
    question: "What is a process and a thread?",
    category: "Operating Systems",
    difficulty: "Medium",
  },
  {
    question: "What is multithreading?",
    category: "Operating Systems",
    difficulty: "Medium",
  },
  {
    question: "What is a deadlock?",
    category: "Operating Systems",
    difficulty: "Hard",
  },
  {
    question: "Explain CPU scheduling.",
    category: "Operating Systems",
    difficulty: "Hard",
  },
  {
    question: "What is virtual memory?",
    category: "Operating Systems",
    difficulty: "Medium",
  },

  // Computer Networks
  {
    question: "What is the OSI model?",
    category: "Computer Networks",
    difficulty: "Medium",
  },
  {
    question: "Difference between TCP and UDP.",
    category: "Computer Networks",
    difficulty: "Medium",
  },
  {
    question: "What happens when you type a URL in a browser?",
    category: "Computer Networks",
    difficulty: "Hard",
  },
  {
    question: "What is DNS?",
    category: "Computer Networks",
    difficulty: "Easy",
  },

  // Web Development
  {
    question: "Difference between API and REST API?",
    category: "Web Development",
    difficulty: "Medium",
  },
  {
    question: "What is JWT authentication?",
    category: "Web Development",
    difficulty: "Hard",
  },
  {
    question: "Difference between authentication and authorization?",
    category: "Web Development",
    difficulty: "Medium",
  },
  {
    question: "What are HTTP methods?",
    category: "Web Development",
    difficulty: "Easy",
  },

  // Projects
  {
    question: "Describe your most challenging project.",
    category: "Projects",
    difficulty: "Medium",
  },
  {
    question: "What technologies did you use in your latest project?",
    category: "Projects",
    difficulty: "Easy",
  },
  {
    question: "What problem does your project solve?",
    category: "Projects",
    difficulty: "Medium",
  },
  {
    question: "What would you improve in your project if given more time?",
    category: "Projects",
    difficulty: "Medium",
  },
  {
    question: "What was your biggest technical challenge during development?",
    category: "Projects",
    difficulty: "Hard",
  },

];

const [question, setQuestion] =
  useState("");
const [difficulty, setDifficulty] =
  useState("");

const [category, setCategory] =
  useState("");
  
useEffect(() => {

  const randomQuestion =
    questions[
      Math.floor(
        Math.random() * questions.length
      )
    ];

setQuestion(
  randomQuestion.question
);

setDifficulty(
  randomQuestion.difficulty
);

setCategory(
  randomQuestion.category
);

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

  setTimeLeft(90);

  const timer = setInterval(() => {

    setTimeLeft(prev => {

      if (prev <= 1) {

        clearInterval(timer);

        return 0;

      }

      return prev - 1;

    });

  }, 1000);

  setTimeout(() => {

    recognition.stop();

    clearInterval(timer);

    setListening(false);

    setTimeLeft(0);

  }, 90000);

};

const analyzeAnswer = async () => {

  if (!transcript.trim()) {

    alert(
      "Please record an answer first."
    );

    return;

  }

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

    const data =
      await res.json();

    if (data.error) {

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

<div className="flex gap-3 mt-3">

  <span className="bg-blue-500/20 px-3 py-1 rounded-full text-sm">
    📚 {category}
  </span>

  <span className="bg-purple-500/20 px-3 py-1 rounded-full text-sm">
    🎯 {difficulty}
  </span>

</div>

      </div>
<div className="bg-zinc-900 p-4 rounded-xl mb-6 flex justify-between items-center">

  <span className="text-zinc-300">
    Interview Timer
  </span>

  <span className="text-2xl font-bold text-emerald-400">
    {timeLeft}s
  </span>

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

<div className="bg-zinc-900 p-6 rounded-2xl mb-6">

  <h2 className="text-2xl font-bold mb-3">
    💪 Key Strengths
  </h2>

  <ul className="list-disc pl-5">

    {analysis.strengths?.map(
      (item, index) => (
        <li key={index}>
          {item}
        </li>
      )
    )}

  </ul>

</div>

<div className="bg-zinc-900 p-6 rounded-2xl mb-6">

  <h2 className="text-2xl font-bold mb-3">
    📈 Areas for Improvement
  </h2>

  <ul className="list-disc pl-5">

    {analysis.improvements?.map(
      (item, index) => (
        <li key={index}>
          {item}
        </li>
      )
    )}

  </ul>

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