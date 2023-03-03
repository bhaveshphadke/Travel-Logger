import React, { useEffect, useState } from 'react'
import './css/LoginSignup.css'
import Login from './Login'
import Signup from './Signup'
import { redirect, useNavigate } from 'react-router-dom'
const LoginSignup = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState("login")
    useEffect(()=>{
        if(window.location.pathname==='/login'){
            setPage('login')
        }
        if(window.location.pathname==='/signup'){
            setPage('signup')
        }

    },[])
    return (
        <>
            <div className="login-signup-container">
                <div className="login-signup-components-tab">
                    <div className={`signup-tab ${page==='signup'?"active":""}`}  onClick={() => {
                        setPage('signup')
                        navigate('/signup')
                    }}>Signup</div>
                    <div className={`login-tab ${page==='login'?"active":""}`} onClick={() => {
                        setPage('login')
                        navigate('/login')
                    }}>Login</div>
                </div>
                {
                    page === 'login' && <div className="login-component"><Login /></div>
                }
                {page === 'signup' && <div className="signup-component"><Signup /></div>}
            </div>
        </>
    )
}

export default LoginSignup