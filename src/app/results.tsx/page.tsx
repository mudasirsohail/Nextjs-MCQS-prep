"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function ResultsPage() {
  const [score, setScore] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)

  useEffect(() => {
    const storedScore = localStorage.getItem("quizScore")
    const storedTotal = localStorage.getItem("quizTotal")
    if (storedScore && storedTotal) {
      setScore(Number.parseInt(storedScore))
      setTotal(Number.parseInt(storedTotal))
    }
  }, [])

  if (score === null || total === null) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900">Loading...</div>
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center relative z-10 backdrop-filter backdrop-blur-sm bg-opacity-80">
        <h1 className="text-3xl font-bold mb-4 text-purple-300">Quiz Results</h1>
        <p className="text-2xl mb-6">
          You scored <span className="text-purple-400 font-bold">{score}</span> out of{" "}
          <span className="text-purple-400 font-bold">{total}</span>!
        </p>
        <Link
          href="/quiz"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Take Another Quiz
        </Link>
      </div>
    </div>
  )
}

