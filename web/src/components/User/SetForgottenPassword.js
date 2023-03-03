import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { SetForgottenPsswordFunc } from '../../redux/slices/UserSlices/ForgetPasswordSlice'
import { toast } from 'react-toastify'
import Loader from '../layout/Loader'

const SetForgottenPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()
  const [password, setPassword] = useState("")
  const { message, success, loading } = useSelector(state => state.ForgetPasswordReducer)
  const onChange = (e) => {
    setPassword(e.target.value)
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(SetForgottenPsswordFunc({ password, token }))
    toast(response.payload.message)
  }
  useEffect(() => {
    if (success) {
      navigate('/login')
    }
  }, [ loading, message])
  return (

    <>
      {loading ? <Loader /> :
        <>
          <div className="user-form-container" style={{
            marginTop: '100px'
          }}>
            <div className="user-form-title"><h2>Change Forget Password</h2></div>
            <form onSubmit={onSubmit}>
              <div className="user-form-credentials">
                <div>
                  <label htmlFor="username">Password</label>
                  <input type="password" name="password" id="password" className="password" placeholder='Set New Password' onChange={onChange} value={password} required />
                </div>
                <div className="user-form-submit">
                  <button type='submit'>Change Password</button>
                </div>
              </div>
            </form>
          </div>
        </>
      }
    </>
  )
}

export default SetForgottenPassword