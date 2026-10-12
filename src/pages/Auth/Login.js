import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import './AuthStyle.css'
import AuthServices from '../../services/Authservices';
import toast from 'react-hot-toast'
import { getErrorMEssage } from '../../utils/ErrorMessage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Login Function
  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password };
      const res = await AuthServices.loginuser(data);

      toast.success(res.data.message);
      localStorage.setItem("todoapp", JSON.stringify(res.data));
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
      navigate("/home");
    } catch (err) {
      toast.error(getErrorMEssage(err));
      console.log(err);
    }
  };

  return (
    <div className='form-container'>
      <form className="form" onSubmit={loginHandler}>
        <div className="avatar-wrapper">
          <i className='fa-solid fa-circle-user'></i>
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        
        <div className='mb-3'>
          <input 
            type="email" 
            className='form-control' 
            placeholder='Enter Email' 
            required
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        
        <div className='mb-3'>
          <input 
            type="password" 
            className='form-control' 
            placeholder='Enter Password' 
            required
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <div className="form-bottom">
          <p className='text-center'>
            Not a user? please
            <Link to="/register">Register</Link>
          </p>
          <button type='submit' className='login-btn'>LOGIN</button>
        </div>
      </form>
    </div>
  )
}

export default Login