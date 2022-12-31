import React from "react";
import { nanoid } from 'nanoid'

function getRandArray(){
    const array = []
    for(let i = 0; i<10; i++){
        array.push(Math.floor(Math.random()*4))
    }
    return array
}
const correctArray = getRandArray()
// console.log("correctArray = "+ correctArray)
// quiz function 
const selectedArray = [0,0,0,0,0,0,0,0,0,0]

export default function Quiz(props){
    const [Submitted,setSubmitted] = React.useState(false)
    const [clicked,setClicked] = React.useState(false)
    const [green , setGreen] = React.useState("g")
    const Data = props.quizData

    
    const questionElements = Data.map((currQuestion,index)=>{
        // console.log(index.toString())
        const options = []
        let wrongInd = 0
        for(let i = 0; i<4 ;i++){
            if(i==correctArray[index])
                options.push(currQuestion.correct_answer)
            else
                options.push(currQuestion.incorrect_answers[wrongInd++])
        }
        // console.log(options)
        const [optionElement,setOptionElement] = React.useState([])
        const [opt,setOpt] = React.useState(options)
        React.useEffect(()=>{
            setOptionElement(opt.map((currOption,optionIndex)=>{
                return(
                <label  key = {nanoid()}
                        className = {correctArray[index]===optionIndex? green:
                                        !Submitted?"":selectedArray[index]===optionIndex?"red":""}>
                    <input
                        type="radio"
                        name={index.toString()}
                        value={optionIndex}
                        className="radio-custom"
                        onClick={(e)=>{
                            const i = parseInt(e.target.name)
                            const val = parseInt(e.target.value)
                            selectedArray[i] = val
                        }}
                        required             
                    /><div className="option">{currOption}</div>
                </label>
                )
            }))
        },[green])
        
        // console.log(optionElement)
        return(
        <div key = {nanoid()}>
            <p className="question">{(currQuestion.question)}</p>
            <div className="optionDiv">
                {optionElement}
            </div>
        </div>)
    })
    // console.log(questionElements)
    
    const [submittedElement, setsubmittedElement] = React.useState(null)
    function handleSubmit(e){
        e.preventDefault()
        setGreen("green")
        console.log(e.target)
        console.log(e.target[0])
        console.log(e.target[0].parentElement)
        // e.target[0].parentElement.style.color = "red";
        console.log(correctArray)
        console.log(selectedArray)
        let score = 0
        for(let j = 0; j<10; j++){
            if(correctArray[j]===selectedArray[j])
                score++
        }
        setsubmittedElement(<div>
            <h2 className="marks">You have scored {score}/10 in your quiz</h2>
        </div>)
        setSubmitted(true)        
    }
    return (
    <div>
        <form className="quiz" onSubmit={handleSubmit}>
            <h2 className="quiz--heading">Quiz have {Submitted?"Ended":"Started"}</h2>
            
            {submittedElement}
            {questionElements}
            <h2>SELECT ALL ANSWERS PLEASE</h2>
            {submittedElement}
            {!Submitted && <button>Submit</button>}
        </form>
    </div>
    )
    
}