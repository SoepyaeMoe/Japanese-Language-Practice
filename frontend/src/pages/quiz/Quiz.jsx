import { useEffect, useState } from "react";
import japaneseAlphabet from "../../data/alphabet";
import { Link } from "react-router";

const Quiz = () => {
    const [limit, setLimit] = useState(46);
    const [ans, setAns] = useState("");
    const [isFalse, setIsFalse] = useState(false);

    const random = () => japaneseAlphabet[Math.floor(Math.random() * limit)];

    const [randomAlphabet, setRandomAlphabet] = useState(random());

    const checkAns = () => {
        if (ans.toLocaleLowerCase() === randomAlphabet.romaji) {
            setRandomAlphabet(random());
            setAns("");
            setIsFalse(false);
        } else {
            setIsFalse(true);
            setAns("");
        }
    }

    const onStart = () => {
        if (limit > japaneseAlphabet.length) {
            setLimit(japaneseAlphabet.length);
        } else {
            setRandomAlphabet(random());
        }
    }

    return (
        <>
            <div className="flex justify-start mb-4">
                <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back To Home</Link>
            </div>

            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">Quiz</h1>

                <div className="mb-4">
                    <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">Limit</label>
                    <input
                        type="number"
                        id="limit"
                        className="border p-1 me-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={limit}
                        max={japaneseAlphabet.length}
                        onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 me-1 text-white font-bold py-2 px-4 text-xs rounded mt-2"
                        onClick={() => setLimit(japaneseAlphabet.length)}
                    >
                        All
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded mt-2"
                        onClick={() => onStart()}
                    >
                        Start
                    </button>
                </div>

                {limit > 0 && <div className="border border-gray-300 p-4 mb-6">
                    <h1 className="text-9xl">{randomAlphabet.hiragana}</h1>
                </div>}
                <form className="w-full max-w-sm" onSubmit={(e) => { e.preventDefault(); checkAns(); }}>
                    <input
                        type="text"
                        max={japaneseAlphabet.length}
                        min={1}
                        className="border border-gray-300 p-2 w-full rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={ans}
                        onChange={(e) => setAns(e.target.value)}
                        placeholder="Enter romaji"
                    />
                    {isFalse && <p className="text-red-500 text-sm mb-4 font-semibold">False, try again.</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 mt-5 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default Quiz