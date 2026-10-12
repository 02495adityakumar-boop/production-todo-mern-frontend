import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './AuthStyle.css'
import AuthServices from '../../services/Authservices';
import toast from 'react-hot-toast';
import { getErrorMEssage } from '../../utils/ErrorMessage';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setusername] = useState('');

  const navigate = useNavigate();

  // Register Function
  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password, username };
      const res = await AuthServices.registeruser(data);
      toast.success(res.data.message);
      navigate("/login");
      console.log(res.data);
    } catch (err) {
      toast.error(getErrorMEssage(err));
      console.log(err);
    }
  };

  return (
    <div className='form-container'>
      <form className="form" onSubmit={registerHandler}>
        <div className="avatar-wrapper">
          <i className='fa-solid fa-circle-user'></i>
        </div>
        <h2 className="auth-title">Create Account</h2>

        <div className='mb-3'>
          <input 
            type="text" 
            className='form-control' 
            placeholder='Enter Username' 
            required
            value={username} 
            onChange={(e) => setusername(e.target.value)} 
          />
        </div>
        
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
            Already a user? please
            <Link to="/login">LOGIN</Link>
          </p>
          <button type='submit' className='login-btn'>REGISTER</button>
        </div>
      </form>
    </div>
  )
}

export default Register