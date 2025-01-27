import { QuizComponent } from "../components/QuizComponent"
import mcqs from "../data/mcqs.json"

export default function QuizPage() {
  // Shuffle and select 20 questions
  const shuffled = mcqs.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 20)

  return (
    <div className="min-h-screen bg-gray-900 py-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg relative z-10 backdrop-filter backdrop-blur-sm bg-opacity-80">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-300">Next.js Quiz</h1>
        <QuizComponent questions={selected} />
      </div>
    </div>
  )
}

