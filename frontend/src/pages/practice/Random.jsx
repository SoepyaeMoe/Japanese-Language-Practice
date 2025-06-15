import { useEffect, useState } from "react";
import japaneseAlphabet from "../../data/alphabet"
import { Link } from "react-router";

const Random = () => {
    const [limit, setLimit] = useState(46);
    const [hiragana, setHiragana] = useState(true);
    const [katakana, setKatakana] = useState(false);
    const [romaji, setRomaji] = useState(true);
    const [autoPlaySound, setAutoPlaySound] = useState(false);

    const random = () => japaneseAlphabet[Math.floor(Math.random() * limit)];

    const [randomAlphabet, setRandomAlphabet] = useState(random());

    const audio = new Audio(randomAlphabet.sound);
    const playSound = () => audio.play();

    const nextRandom = () => {
        if (limit > japaneseAlphabet.length) {
            setLimit(japaneseAlphabet.length);
        } else {
            setRandomAlphabet(random());
        }
    }

    useEffect(() => {
        if (autoPlaySound) playSound();
    }, [randomAlphabet]);

    return (
        <>
            <div className="flex justify-start mb-4">
                <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Back To Home</Link>
            </div>
            <div className="flex flex-col items-center">
                <div className="mb-4">
                    <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-1">Limit</label>
                    <input
                        type="number"
                        id="limit"
                        className="border p-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={limit}
                        max={japaneseAlphabet.length}
                        onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded mt-2"
                        onClick={() => setLimit(japaneseAlphabet.length)}
                    >
                        All
                    </button>
                </div>
                <div className="mb-8">
                    <button
                        onClick={() => setHiragana(!hiragana)}
                        className={`${hiragana ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600"} py-1 px-2 border hover:bg-blue-600 hover:text-white`}>Hiragana</button>
                    <button
                        onClick={() => setKatakana(!katakana)}
                        className={`${katakana ? "bg-blue-600 text-white" : "border-blue-600 text-blue-600"} py-1 px-2 border hover:bg-blue-600 hover:text-white`}>Katakana</button>
                </div>
                {limit > 0 && randomAlphabet &&
                    (<div className="flex flex-col items-center">
                        <div className="border border-gray-300 rounded p-4">
                            {hiragana && <h1 className="text-8xl">{randomAlphabet.hiragana}</h1>}
                            {katakana && <h1 className="text-8xl">{randomAlphabet.katakana}</h1>}
                            {romaji && <h1 className="text-2xl text-center">{randomAlphabet.romaji}</h1>}
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
                            onClick={() => nextRandom()}>Next</button>
                        <div className="flex flex-row gap-2 items-center">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={playSound}>Play Sound</button>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={() => setAutoPlaySound(!autoPlaySound)}>{`${autoPlaySound ? "Stop Auto Play Sound" : "Auto Play Sound"}`}</button>
                        </div>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={() => setRomaji(!romaji)}>{`${romaji ? "Hide Romaji" : "Show Romaji"}`}</button>
                    </div >)
                }
            </div>
        </>
    )
}

export default Random
