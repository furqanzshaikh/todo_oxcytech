import React from 'react'
import Navbar from './nav/Navbar'
import Hero from './hero/Hero'
import './nav/navbar.css';
import './hero/hero.css';
import './modal/modal.css';
import './App.css'
import { BrowserRouter as Router, Route,Routes  } from 'react-router-dom'
import CreateTodo from './createtodo/CreateTodo'
const App = () => {
  return (<>
  <Router>
  <Navbar/>
  <Routes>

    <Route path='/' element={<Hero/>}/>
    <Route path='/add' element={<CreateTodo/>}/>
  </Routes>
  
  </Router>

    </>
  )
}

export default App