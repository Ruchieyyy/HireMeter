# HireMeter 🎯

HireMeter is an AI-powered mock interview platform that helps candidates evaluate their interview performance before facing real recruiters.

The application listens to interview answers using speech recognition, converts them into text, and uses Google Gemini AI to provide detailed feedback, confidence analysis, communication assessment, technical evaluation, and hiring probability predictions.

---

## 🚀 Live Demo

https://hire-meter.vercel.app/

---

## 📸 Features

### 🎤 Speech-to-Text Interview Simulation

* Real-time voice recording
* Automatic speech transcription
* Hands-free interview practice

### 🤖 AI-Powered Analysis

* Interview answer evaluation using Google Gemini AI
* Context-aware feedback generation
* Smart assessment of candidate responses

### 📊 Performance Metrics

* Confidence Score
* Communication Score
* Technical Knowledge Score
* Hire Probability Score

### 🎭 Candidate Persona Detection

The AI identifies interview personalities such as:

* Future Team Lead
* Walking Wikipedia
* Corporate Robot
* Nervous Fresher
* Jugaad Engineer

### 👩‍💼 HR Perspective

* Simulated recruiter thoughts
* Hiring likelihood prediction
* Interview verdict generation

### 🔄 Multiple Interview Questions

Practice different interview scenarios including:

* HR Questions
* Technical Questions
* Project-Based Questions
* Communication Questions

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### AI

* Google Gemini API

### Browser APIs

* Web Speech API
* Speech Recognition API

### Deployment

* Vercel

### Version Control

* Git & GitHub

---

## 🧠 How It Works

1. User starts an interview session.
2. Speech Recognition converts voice to text.
3. Transcript is sent to Gemini AI.
4. AI analyzes:
   * Confidence
   * Communication
   * Technical Knowledge
   * Hiring Potential
5. Results are displayed in an interactive dashboard.

---

## 📂 Project Structure

```bash
app/
│
├── api/
│   └── analyze/
│       └── route.js
│
├── layout.js
├── page.js
├── globals.css
│
public/
│
package.json
```

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Ruchieyyy/HireMeter.git
```

Move into the project folder:

```bash
cd HireMeter
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run the application:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🔐 Environment Variables

Create a file named:

```env
.env.local
```

Add:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

---

## 🎯 Future Enhancements

* Interview Categories (HR, Technical, Data Analyst)
* Resume-Based Question Generation
* AI Voice Interviewer
* Interview History Tracking
* User Authentication
* Performance Dashboard
* Progress Analytics
* MongoDB Integration

---

## 💡 Learning Outcomes

Through this project I learned:

* Full Stack Development with Next.js
* API Integration using Gemini AI
* Speech Recognition Implementation
* Prompt Engineering
* Error Handling & Rate Limit Management
* Environment Variable Security
* Git & GitHub Workflows
* Cloud Deployment using Vercel

---

## 👩‍💻 Author

Ruchi Shukla

GitHub:
https://github.com/Ruchieyyy

---

## ⭐ Support

If you found this project useful, consider starring the repository.

⭐ Star the project on GitHub.
