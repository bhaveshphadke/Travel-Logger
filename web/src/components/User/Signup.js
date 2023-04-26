import React, { useEffect, useState } from 'react'
import './css/userauth.css'
import { useDispatch, useSelector } from "react-redux"
import { SignupUser } from '../../redux/slices/UserSlices/SignupSlice'
import Loader from '../layout/Loader'
import { useNavigate } from 'react-router-dom'
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice'
import { toast } from 'react-toastify'
import profile from '../../utils/profile.jpg'
const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, success, message } = useSelector(state => state.SignupReducer)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: ""
  })
  const [previewImage, setPreviewImage] = useState(profile)
  const [avatar, setAvatar] = useState(profile)


  const onChange = (e) => {
    if (e.target.name === 'avatar') {
      let reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreviewImage(reader.result)
          setAvatar(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0]);


    } else {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(SignupUser({ ...credentials, avatar }))
    if (response && response.payload) {
      toast(response.payload.message)
    }
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
              <div className="user-form-title"><h2>Signup</h2></div>
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
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="email" placeholder='Enter Email' onChange={onChange} value={credentials.email} required />
                  </div>
                  <div className='pick-profile' style={{
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center'
                  }}>
                    <div>
                      <img src={previewImage} alt="profile picture" />
                    </div>
                    <div>
                      <input type="file" name="avatar" id="avatar" className="avatar" onChange={onChange} required />
                    </div>
                  </div>
                  <div className="user-form-submit">
                    <button type='submit'>Signup</button>
                  </div>
                </div>
              </form>
            </div>
          </>
      }
    </>
  )
}

export default Signup