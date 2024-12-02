import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from "axios";
function Login() {
const [values,setValues] = useState({
    email:'',
    password :''
})

const [errors,setErrors] = useState({})
const navigate = useNavigate();

const handleSubmit = (e)=>{
    e.preventDefault();
    setErrors(Validation(values));  
    if(errors.email === "" && errors.password === ""){
        axios.post("http://localhost:8081/login",values).then(
            res =>{
                if(res.data === "Success"){
                    navigate("/home")
                }else{
                    alert("No record found!");
                }
            }
        )
    }
}

const handleChange = (e)=>{
    setValues(prev =>({...prev, [e.target.name]:[e.target.value]}))
}


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className="bg-white p-3 rounded w-25">
            <h2>Log In</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email"  placeholder='Enter your email' 
                     onChange={handleChange} className='form-control rounded-0' name='email'/>
                     {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password"  placeholder='Enter your password' 
                     onChange={handleChange}className='form-control rounded-0' name='password'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}

                </div>
                <button type='submit' className='btn btn-success w-100'>Log in</button>
                <p>You are agree to our terms and condition</p>
                <Link to="/signup" className='btn btn-default border w-100 bg-light text-decoration-none'>Creagte Account</Link>
            </form>
        </div>
    </div>
  )
}

export default Login