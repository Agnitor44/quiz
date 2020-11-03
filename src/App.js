import React, {useState, createContext, useContext} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import Start from './Start'
import Game from './Game'
import End from './end'

function App() {
const [score, setScore] = useState(0)

  return (
   
    <Router>
      <Route exact path = '/'  component = {Start}/>
      <Route path = '/game' component = {Game}/>
      <Route path = '/end' component = {End}/>
    </Router>
  
  );
}

export default App;
