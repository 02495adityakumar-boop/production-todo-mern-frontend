import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../../asset/image/todo-1-1x.png'
import './Landing.css'

const Landing = () => {
  return (
    <div className="hero-wrapper">
      <div className="hero">
        <div className="intro-text">
          <div className="badge">Smart Task Manager</div>
          <h1>
            <span className="tagline1">Organize work and life,</span>
            <span className="tagline2"> finally.</span>
          </h1>
          <p>
            Just type your tasks naturally. Todolist’s intelligent task recognition
            instantly structures and organizes your day with zero friction.
          </p>
          <div className="btn-group">
            <Link className="btn red" to="/register">
              Register Now
              <span className="arrow">→</span>
            </Link>
            <Link className="btn blue" to="/login">
              Login
            </Link>
          </div>
        </div>

        <div className="hero-image-container">
          <div className="image-glow"></div>
          <img src={Hero} alt="hero preview" className="hero-image" />
        </div>
      </div>
    </div>
  )
}

export default Landing