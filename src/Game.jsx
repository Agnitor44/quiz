import React, {useEffect, useState} from 'react'
import './game.css'
import { useHistory } from "react-router-dom"

const apiData = 'https://opentdb.com/api.php?amount=10&type=multiple'

  const random = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

const Game= () => {
 

    const [api, setApi] = useState('')
    const [answ, setAnsw] = useState('')
    const [que, setQue] = useState('')
    const [number, setNumber] = useState(1)
    const [reload, setReload] = useState(true)
    const [rand, setRand] = useState('')
    const [didAnsw, setDidAnsw] = useState(true)
    const [points, setPoints] = useState(0)
    const [didWin, setDidWin] = useState('')
    const [end, setEnd] = useState(false)
    const history = useHistory()
  
        
        
    

      useEffect(() => {
        fetch(apiData).
        then(results =>  results.json()).
        then(data => setApi(data)) 
       
      } , []  
   )
         
const ready  = () =>
{
  if(api) {
  setAnsw([api.results[0].correct_answer, api.results[0].incorrect_answers])
  setQue([api.results[0].category, api.results[0].question])
  setRand(random(api.results[0].incorrect_answers.concat(api.results[0].correct_answer)))
  setReload(false)
  }
  
}
 
     const check = (e) => {
     
    if(didAnsw) {
       if(e.target.innerHTML === answ[0]) {
       setPoints(points + 1)
      
       setDidWin('Gratuluje! To jest dobra odpowiedź')
       }
else setDidWin('Niestety! To nie jest poprawna odpowiedź')
     }    
     setDidAnsw(false)
    }

    const nextQ = () => {
      setNumber(number + 1)
      if(number === 10) return setEnd(true)
      
      setQue([api.results[number].category, api.results[number].question])
      setAnsw([api.results[number].correct_answer, api.results[number].incorrect_answers])
     
      setRand(random(api.results[number].incorrect_answers.concat(api.results[number].correct_answer)))
      setDidAnsw(true)
      
  
      setReload(false)
      setDidWin('')

   
      
    }
    const reset = () => {
      
      history.push('/')

    }
    return (
      end ? <div>
      <h1>Zdobyłeś {points}</h1>
      <button onClick = {reset}>Spróbuj ponownie</button>
      </div> :
<div className = 'all'>
{reload ? <button className = 'gotowy' onClick = {ready}>Gotowy?</button> : null}
{!reload ? <h4 className = 'numerPytania'>{`pytanie numer ${number}`}</h4> :null}
<h1 className = 'pytanieKat'>{que[1]}</h1>
<h2 className = 'pytanie'>{que[0]}</h2>
{answ ?
<div className ='odpowiedzi'>
<button className = 'odp' onClick ={check}>{rand[0]}</button>
<button  className = 'odp' onClick ={check}>{rand[1]}</button>
<button className = 'odp' onClick ={check}>{rand[2]}</button>
<button className = 'odp' onClick ={check}>{rand[3]}</button>
</div> :
null
}
{didAnsw ? null : <> <button className='next' onClick = {nextQ}>Next</button> 
<h2>Poprawna odpowiedź to {answ[0]}</h2> </>}
   
  <span className = 'pkt'>{points}</span> 
  <h3 className = 'results'>{didWin}</h3>
</div> 


    )
}
export default Game