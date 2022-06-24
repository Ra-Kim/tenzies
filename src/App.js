import React,  {useState, useEffect} from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(allNewDice())
    const [count, setCount] = useState(0)
    const [interv, setInterv] = useState()
    const [status, setStaus] = useState(true)
    const [recordTime, setRecordTime] = useState({lowestMin: 0,lowestSecs:60})
    const [permit, setPermit] = useState(true)
    const [time, setTime] = useState({secs: 0 , min: 0, ms: 0})
    const [tenzies, setTenzies] = useState(false)
    const [currentTime, setCurrentTime] = useState()
    let lowestCount = localStorage.getItem("lowestCount")


    
     useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setCurrentTime(time)
            setTenzies(true)

            

            if(count <= lowestCount) {
                localStorage.setItem("lowestCount", count)
            }
        }
    }, [dice, count, time,  lowestCount])



    let updatedSecs = time.secs , updatedMin = time.min, updatedMs = time.ms

    const run = () => {
        if(updatedSecs === 60){
            updatedMin++
            updatedSecs = 0
        }
        if(updatedMs === 100){
            updatedSecs++
            updatedMs=0
        }
        updatedMs++
        return setTime({secs: updatedSecs , min: updatedMin, ms: updatedMs})
    }

    const resetScore =() => {
        localStorage.setItem("lowestCount", "")
        setCount(0)
        setRecordTime((prevRecord) => ({...prevRecord ,lowestSecs: 60}))
        clearState()
        setStaus(!status)
    }

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

       
    function rollDice() {
        if(!tenzies) {
            if(permit){
                setInterv(setInterval(run,10))
                setPermit(!permit)
            }
            setCount((count) => count = count + 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setRecordTime((prevRecord) => {
                return prevRecord.lowestSecs > currentTime.secs ?
                        {...prevRecord, lowestSecs: currentTime.secs} :
                        prevRecord
            })
            clearState()
            setCount(0)
        }
    }

    function clearState(){
        clearInterval(interv)
            if(status){
                localStorage.setItem("lowestCount", count)
                setStaus(!status)
            }
            setPermit(!permit)
            setTime({secs: 0 , min: 0, ms: 0})
            setTenzies(false)
            setDice(allNewDice())
    }

    
    function holdDice(id) {
        if(permit){
            setInterv(setInterval(run,10))
            setPermit(!permit)
        }
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="stats-div">
                <p>Number of rolls: <span>{count}</span></p>
                <p>Timer: {tenzies ? 
                    <span>
                        {currentTime.min >= 10 ?
                        currentTime.min : "0" + currentTime.min}: 
                        {currentTime.secs >= 10 ? currentTime.secs : "0" + currentTime.secs}
                    </span>
                    :
                    <span>
                        {time.min >= 10 ?
                        time.min : "0" + time.min}: 
                        {time.secs >= 10 ? time.secs : "0" + time.secs}
                    </span>
                }
                </p>
            </div>
            <div className="stats-div">
                <p>Lowest rolls recorded: <span>{lowestCount ? lowestCount : count}</span></p>
                <p>Lowest time recorded: <span>00:
                    {recordTime.lowestSecs === 0 || recordTime.lowestSecs !== 60 ? 
                    recordTime.lowestSecs >= 10 ? recordTime.lowestSecs : 
                    "0" + recordTime.lowestSecs :
                     "00"}
                </span></p>
            </div>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className="button-div">
                {tenzies && <button  className="reset-game" onClick={resetScore}>Clear High Score</button>}
                <button 
                    className="roll-dice" 
                    onClick={rollDice}
                >
                    {tenzies ? "New Game" : "Roll"}
                </button>
            </div> 
        </main>
    )
}
