import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Logout function
  const logoutHandler = () => {
    localStorage.removeItem('todoapp');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Safe username extraction
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('todoapp'));
      setUsername(userData?.user?.username || 'User');
    } catch (err) {
      setUsername('User');
    }
  }, []);

  return (
    <header className="custom-navbar-wrapper">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid px-3 px-md-4">
          
          {/* Brand & User Greeting */}
          <div className="navbar-brand-section">
            <Link to="/home" className="brand-logo-link">
              <div className="brand-logo-icon">
                <i className="fa-solid fa-check-double"></i>
              </div>
              <span className="brand-name">TodoApp</span>
            </Link>

            <div className="user-welcome-badge">
              <div className="user-avatar-circle">
                {username ? username.charAt(0).toUpperCase() : <i className="fa-solid fa-user"></i>}
              </div>
              <span className="welcome-text">
                Welcome, <b>{username}</b>
              </span>
            </div>
          </div>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* Collapsible Nav Links & Logout */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center nav-list-gap">
              
              <li className="nav-item">
                <NavLink
                  to="/home"
                  className={({ isActive }) => `nav-link custom-nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  <i className="fa-solid fa-house me-1"></i> Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/TodoList"
                  className={({ isActive }) => `nav-link custom-nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  <i className="fa-solid fa-list-check me-1"></i> My Todo List
                </NavLink>
              </li>

              <li className="nav-item ms-lg-2">
                <button
                  className="custom-logout-btn"
                  title="Logout"
                  onClick={logoutHandler}
                  type="button"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Logout</span>
                </button>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;