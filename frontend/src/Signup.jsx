import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignUpValidation'
import axios from 'axios'

function Signup() {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:''
    })

    const navigate = useNavigate();
    const [errors,setErrors] = useState({})

    const handleChange = (e)=>{
        setValues((prev)=>({...prev,[e.target.name] : e.target.value}))
        console.log(values);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setErrors(Validation(values))
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            console.log(values);
            axios.post('http://localhost:8081/signup',values)
            .then(res => {
                navigate('/')
            }).catch(err => console.log(err));
        }
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign Up</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name" >Name</label>
                    <input type="text" placeholder='Enter your Name' name='name' className='form-control rounded-0'  onChange={handleChange}/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Enter your mail' name='email' className='form-control rounded-0' onChange={handleChange} />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password">password</label>
                    <input type="password" placeholder='Enter your password' name='password' className='form-control rounded-0' onChange={handleChange}/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100'>Sign up</button>
                <p>You are agree to our terms and condition</p>
                <Link to="/" className='btn btn-default border w-100 bg-light text-decoration-none'>Log in</Link>
            </form>
        </div>
    </div>
  )
} 

export default Signup