import { Route, Routes } from "react-router"
import Home from "./pages/home/Home"
import Quiz from "./pages/quiz/quiz"
import Random from "./pages/practice/Random"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/study/random" element={<Random />}></Route>
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  )
}

export default App
