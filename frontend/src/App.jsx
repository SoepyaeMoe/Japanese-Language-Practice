import { Route, Routes } from "react-router"
import Home from "./pages/home/Home"
import Quiz from "./pages/quiz/Quiz"
import Random from "./pages/practice/Random"
import Study from "./pages/n5/kanji/Study"
import Practice from "./pages/n5/kanji/Practice"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/study/random" element={<Random />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/n5/kanji/study" element={<Study />} />
      <Route path="/n5/kanji/practice" element={<Practice />} />
    </Routes>
  )
}

export default App
