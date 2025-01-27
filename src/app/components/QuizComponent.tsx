"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

type Question = {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

type QuizComponentProps = {
  questions: Question[]
}

export function QuizComponent({ questions }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [showFeedback, setShowFeedback] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const router = useRouter()

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowFeedback(true)
  }

  const handleNext = () => {
    const newAnswers = [...userAnswers, selectedAnswer!]
    setUserAnswers(newAnswers)
    setShowFeedback(false)
    setSelectedAnswer(null)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz finished, calculate score
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0)
      }, 0)

      // Store score in localStorage
      localStorage.setItem("quizScore", score.toString())
      localStorage.setItem("quizTotal", questions.length.toString())

      // Redirect to results page
      router.push("/results")
    }
  }

  const question = questions[currentQuestion]

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-purple-300">Question {currentQuestion + 1} of 20</h2>
      <p className="mb-4 text-lg">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full text-left p-3 rounded transition duration-300 ease-in-out transform hover:scale-105 ${
              showFeedback
                ? index === question.correctAnswer
                  ? "bg-green-600"
                  : index === selectedAnswer
                    ? "bg-red-600"
                    : "bg-gray-700"
                : "bg-gray-700 hover:bg-purple-600"
            }`}
            disabled={showFeedback}
          >
            {option}
          </button>
        ))}
      </div>
      {showFeedback && (
        <div className="mt-4">
          <p
            className={`text-lg font-semibold ${selectedAnswer === question.correctAnswer ? "text-green-400" : "text-red-400"}`}
          >
            {selectedAnswer === question.correctAnswer
              ? "Correct!"
              : "Incorrect. The correct answer is highlighted in green."}
          </p>
          <button
            onClick={handleNext}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </div>
      )}
    </div>
  )
}

