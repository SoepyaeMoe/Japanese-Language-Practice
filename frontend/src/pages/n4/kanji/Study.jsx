import React, { useState, useMemo } from "react";
import n4kanji from "../../../data/n4/kanji";
import { Link } from "react-router";

const Study = () => {
    const [query, setQuery] = useState("");

    const filteredKanji = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return n4kanji;
        return n4kanji.filter((kanji) => {
            // safe access and lowercase comparisons
            if (kanji.kanji && kanji.kanji.toLowerCase().includes(q)) return true;
            if (kanji.meaning && kanji.meaning.toLowerCase().includes(q)) return true;
            if (Array.isArray(kanji.examples)) {
                return kanji.examples.some(
                    (ex) => ex.example && ex.example.toLowerCase().includes(q)
                );
            }
            return false;
        });
    }, [query]);

    return (
        <>
            <div className="flex justify-start mb-4">
                <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back To Home</Link>
            </div>
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center">
                        <h1 className="text-4xl font-bold mb-4">N4 Level Kanji Lists</h1>

                        <div className="w-full max-w-md mb-6">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search kanji...."
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
                            />
                        </div>

                        <div className="text-sm text-gray-600 mb-4">
                            Showing {filteredKanji.length} of {n4kanji.length}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                        {filteredKanji.map((kanji) => (
                            <div
                                key={kanji.id}
                                className="m-4 p-4 bg-white rounded-md shadow-md"
                            >
                                <div className="text-2xl font-bold">{kanji.kanji}</div>
                                <div className="text-xl">{kanji.meaning}</div>

                                {/* On / Kun readings */}
                                <div className="text-sm text-gray-700 mt-2">
                                    {kanji.on && (
                                        <div>
                                            <span className="font-semibold">On:</span>{" "}
                                            {Array.isArray(kanji.on) ? kanji.on.join(", ") : kanji.on}
                                        </div>
                                    )}
                                    {kanji.kun && (
                                        <div>
                                            <span className="font-semibold">Kun:</span>{" "}
                                            {Array.isArray(kanji.kun) ? kanji.kun.join(", ") : kanji.kun}
                                        </div>
                                    )}
                                </div>

                                {/* Examples / Sentences with reading and translation */}
                                {Array.isArray(kanji.examples) &&
                                    kanji.examples.map((example, idx) => (
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
                                    {kanji.sentence && (
                                        <div className="text-xs text-gray-600 italic mt-1">
                                            {kanji.sentence}
                                        </div>
                                    )}
                                    {kanji.reading && (
                                        <div className="text-xs text-gray-600 italic mt-1">
                                            {kanji.reading}
                                        </div>
                                    )}

                                    {kanji.translation && (
                                        <div className="text-xs text-gray-600 mt-1">
                                            {kanji.translation}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Study;
