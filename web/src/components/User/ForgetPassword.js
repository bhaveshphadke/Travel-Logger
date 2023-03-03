import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ForgetPasswordFunc } from '../../redux/slices/UserSlices/ForgetPasswordSlice'
import Loader from '../layout/Loader'
import './css/userauth.css'
import { toast } from 'react-toastify'
const ForgetPassword = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const { success, message, loading } = useSelector(state => state.ForgetPasswordReducer)
  const onChange = (e) => {
    setUsername(e.target.value)
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await dispatch(ForgetPasswordFunc(username))
    toast(response.payload.message)


  }
  useEffect(() => {
    if (!loading) {
      console.log(message);
      // toast(message)
    }
  }, [toast, loading, message])
  return (
    <>
      {loading ? <Loader /> :
        <>
          <div className="user-form-container" style={{
            marginTop: '100px'
          }}>
            <div className="user-form-title"><h2>Forget Password</h2></div>
            <form onSubmit={onSubmit}>
              <div className="user-form-credentials">
                <div>
                  <label htmlFor="username">Username</label>
                  <input type="username" name="username" id="username" className="username" placeholder='Enter Registered Username' onChange={onChange} value={username} required />
                </div>
                <div className="user-form-submit">
                  <button type='submit'>Send Request</button>
                </div>
              </div>
            </form>
          </div>
        </>
      }
    </>
  )
}

export default ForgetPassword