import React, { useMemo, useState } from 'react'
import n5Kanjis from '../../../data/n5/kanji'
import { Link } from 'react-router';

function shuffle(arr) {
    const a = arr.slice()
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

function getMeaning(item) {
    if (!item) return ''
    return (
        item.meaning ||
        item.examples?.[0].example ||
        item.kun ||
        item.on ||
        ''
    )
}

function Quiz() {
    const totalQuestions = 10

    const questions = useMemo(() => {
        const all = Array.isArray(n5Kanjis) ? n5Kanjis.slice() : []
        if (all.length === 0) return []

        const pool = shuffle(all)
        const selected = pool.slice(0, Math.min(totalQuestions, pool.length))

        return selected.map((q) => {
            const correct = getMeaning(q)
            const others = all.filter((o) => getMeaning(o) && getMeaning(o) !== correct)
            const distractors = shuffle(others)
                .slice(0, 3)
                .map(getMeaning)
            const choices = shuffle([correct, ...distractors])
            return {
                kanji: q.kanji || q.symbol || '',
                answer: correct,
                choices,
            }
        })
    }, [])

    const [index, setIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedChoice, setSelectedChoice] = useState(null)
    const [finished, setFinished] = useState(false)

    if (!questions || questions.length === 0) {
        return <div className="p-4 text-red-600">No kanji data found. Check /data/n5/kanji export.</div>
    }

    const current = questions[index]

    function handleChoose(choice) {
        if (selectedChoice !== null || finished) return
        setSelectedChoice(choice)
        if (choice === current.answer) setScore((s) => s + 1)

        setTimeout(() => {
            const next = index + 1
            if (next >= questions.length) {
                setFinished(true)
            } else {
                setIndex(next)
                setSelectedChoice(null)
            }
        }, 700)
    }

    function restart() {
        setIndex(0)
        setScore(0)
        setSelectedChoice(null)
        setFinished(false)
        window.location.reload()
    }

    if (finished) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-semibold mb-3">Quiz finished</h2>
                <p className="mb-4">
                    Score: <span className="font-medium">{score}</span> / {questions.length}
                </p>
                <button
                    onClick={restart}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Restart
                </button>
            </div>
        )
    }

    return (
        <>
            <div className="flex justify-start mb-4">
                <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back To Home</Link>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-3 text-sm text-gray-600">
                    Question {index + 1} / {questions.length}
                </div>

                <div className="text-center my-3 min-h-[6rem]">
                    <div className="text-6xl leading-tight">{current.kanji}</div>
                </div>

                <div className="grid gap-2 grid-cols-2">
                    {current.choices.map((c) => {
                        const isSelected = selectedChoice === c
                        const correct = c === current.answer
                        let bgClass = 'bg-white'
                        if (selectedChoice) {
                            if (isSelected) {
                                bgClass = correct ? 'bg-green-100' : 'bg-red-100'
                            } else {
                                bgClass = correct ? 'bg-green-100' : 'bg-white'
                            }
                        }

                        return (
                            <button
                                key={c}
                                onClick={() => handleChoose(c)}
                                disabled={selectedChoice !== null}
                                className={`p-3 rounded-md border border-gray-300 text-center transition-colors focus:outline-none ${bgClass} ${selectedChoice ? 'cursor-default' : 'hover:bg-gray-100 cursor-pointer'}`}
                            >
                                {c}
                            </button>
                        )
                    })}
                </div>

                <div className="mt-4 text-sm text-gray-700">
                    Score: <span className="font-medium">{score}</span>
                </div>
            </div>
        </>
    )
}

export default Quiz
