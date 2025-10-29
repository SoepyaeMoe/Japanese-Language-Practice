import React, { useState, useEffect } from 'react'
import n5Kanjis from '../../../data/n5/kanji'
import { Link } from 'react-router'

const getRandomIndex = (len, exclude) => {
    if (len === 0) return null
    if (len === 1) return 0
    let i
    do {
        i = Math.floor(Math.random() * len)
    } while (i === exclude)
    return i
}

const Practice = () => {
    const [idx, setIdx] = useState(null)
    const [showDetails, setShowDetails] = useState(true)

    useEffect(() => {
        if (Array.isArray(n5Kanjis) && n5Kanjis.length) {
            setIdx(getRandomIndex(n5Kanjis.length, null))
        }
    }, [])

    if (!Array.isArray(n5Kanjis) || n5Kanjis.length === 0) {
        return <div>No kanji data available.</div>
    }

    if (idx === null) {
        return <div>Loading...</div>
    }

    const k = n5Kanjis[idx] || {}

    const handleNext = () => {
        const next = getRandomIndex(n5Kanjis.length, idx)
        setIdx(next)
    }

    return (
        <>
            <div className="flex justify-start mb-4">
                <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back To Home</Link>
            </div>
            <div className="max-w-[720px] mx-auto my-6 p-4 bg-gray-100 rounded-lg shadow-lg">
                <div className="flex flex-col items-center gap-4 p-5 border border-gray-300 rounded-lg bg-white">
                    <div className="text-[96px] leading-none text-blue-600">{k.kanji}</div>

                    {showDetails && (
                        <div className="w-full">
                            <div className="flex flex-col items-start w-full">
                                {/* <strong className="text-xl text-gray-800">Meaning:</strong> */}
                                <strong className="text-xl text-gray-800 text-center">{k.meaning}</strong>
                            </div>
                            <div className="mb-2">
                                <strong className="text-gray-800">On:</strong> <span className="ml-1 text-gray-600">{k.on}</span>
                            </div>
                            <div className="mb-2">
                                <strong className="text-gray-800">Kun:</strong> <span className="ml-1 text-gray-600">{k.kun}</span>
                            </div>

                            {Array.isArray(k.examples) &&
                                k.examples.map((example, idx) => (
                                    <div
                                        key={example.id ?? idx}
                                        className="mt-3 p-2 border rounded bg-gray-50"
                                    >
                                        <div className="text-sm text-gray-800">
                                            {example.sentence ?? example.example}
                                        </div>

                                    </div>
                                ))}

                            <div className="mt-3 p-2 border rounded bg-gray-50">
                                {k.sentence && (
                                    <div className="text-md text-gray-600 mt-1">
                                        {k.sentence}
                                    </div>
                                )}
                                {k.reading && (
                                    <div className="text-md text-gray-600 mt-1">
                                        {k.reading}
                                    </div>
                                )}

                                {k.translation && (
                                    <div className="text-md text-gray-600 mt-1 italic">
                                        {k.translation}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => setShowDetails(s => !s)}
                            className="bg-gray-300 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-400 focus:outline-none"
                        >
                            {showDetails ? 'Hide Details' : 'Show Details'}
                        </button>
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Practice