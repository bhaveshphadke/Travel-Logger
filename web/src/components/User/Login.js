import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice'
import { LoginUser } from '../../redux/slices/UserSlices/LoginSlice'
import Loader from '../layout/Loader'
import './css/userauth.css'
import ForgetPassword from './ForgetPassword'
const Login = () => {
  const navigate = useNavigate()
  const { loading, success,message } = useSelector(state => state.LoginReducer)
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const onSubmit =async (e) => {
    e.preventDefault()
    console.log(19);
    const response = await dispatch(LoginUser(credentials))
    toast(response.payload.message)

  }
  useEffect(() => {
    if (success) {
      dispatch(FetchUser())
      navigate('/')
    }
  }, [success])
  return (
    <>
      {
        loading ? <Loader /> :
          <>
            <div className="user-form-container">

              <div className="user-form-title"><h2>Login</h2></div>
              <form onSubmit={onSubmit}>
                <div className="user-form-credentials">
                  <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" className="username" placeholder='Enter Username' onChange={onChange} value={credentials.username} required />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="password" placeholder='Enter Password' onChange={onChange} value={credentials.password} required />
                  </div>
                  <div className="user-form-submit">
                    <button type='submit'>Login</button>
                  </div>
                  <div>
                    <Link to='/forgetpassword' style={{
                      color:'blue'
                    }}>Forget Password</Link>

                  </div>
                </div>
              </form>
              {/* <ForgetPassword/> */}
            </div>
          </>
      }
    </>
  )
}

export default Login