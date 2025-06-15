import { Link } from "react-router";

const Home = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Let's Study and Practice Japanese Alphabet</h1>
            <Link to="/study/random" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Start Practice
            </Link>
            <Link to="/quiz" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Start Quiz
            </Link>
        </div>
    );
}

export default Home;
