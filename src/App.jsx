import React from 'react'
import './App.css'
import Quiz from "./components/Quiz"
import Start from "./components/Start"
let clickable = false
function App() {
  const [Data, setData] = React.useState(null)
  const [start, setStart] = React.useState(false)
  async function fetchData(){
      await fetch("https://opentdb.com/api.php?amount=10&category=20&difficulty=medium&type=multiple")
        .then(res=>res.json())
        .then(data=>{
          console.log(data.results)
          setData(data.results)
          clickable = true
        })
        .catch((error) => {
          console.log(error)
        })
  }
  async function handleStart(){
    await fetchData()
    setStart(prev => !prev)
  }
  return (
  <>
    { !start && <Start startfunc={handleStart}/>}
    { start && <Quiz quizData = {Data}/>}
  </>
  )
}
export default App
