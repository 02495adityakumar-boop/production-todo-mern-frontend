import React from 'react'
import {Link} from 'react-router-dom'
import Hero from '../../asset/image/todo-1-1x.png'
import './Landing.css'

const Landing = () => {
  return (
    <div className="hero">
      <div className='intro-text'>
        <h1>
          <span className='tagline1'> Organize work and life </span>
          <span className='tagline2'> finally. </span>
        </h1>
        <p>
          Just enter your task in the task field and Todolist <br/>
          on-of-its-kind natural language recognition will instantly fill your to-do=list
        </p>
        <Link className='btn red' to='/register'>Register Now!</Link>
        <Link className='btn blue' to='/login'>Login</Link>
      </div>
        <div className=''>
          <img src={Hero} alt="heroimage" />
        </div>
    </div>
  )
}

export default Landing