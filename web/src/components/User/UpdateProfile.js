import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiFillSave } from 'react-icons/ai';
import { ChangeUsername } from '../../redux/slices/UserSlices/ChangeUsernameSlice';
import { toast } from 'react-toastify';
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice';
import { ChangePassword } from '../../redux/slices/UserSlices/ChangePasswordSlice';
const UpdateProfile = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.FetchUserReducer)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  useEffect(() => {
    if (!user) {
      navigate('/me')
    } else {
      setUsername(user.username)
    }
  }, [])

  const onChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    }
    else if(e.target.name === 'password'){
      setPassword(e.target.value)
    }
  }
  return (
    <>
      {
        user
        &&
        <>
          <div className="updateprfile-container">
            <div className="heading">
              <h2>UPDATE PROFILE</h2>
            </div>
            <div className="details">
              <div className="update-username update-field">
                <input type="text" name="username" id="username" value={username} onChange={onChange} autocomplete="off" />
                <AiFillSave style={{
                  fontSize: '20px',
                  color: '#ff6e99'
                }} onClick={async () => {
                  const response = await dispatch(ChangeUsername({ username, oldUsername: user.username }))
                  dispatch(FetchUser())
                  toast(response.payload.message)

                }} />
              </div>
              <div className="update-username update-field">
                <input type="password" name="password" id="password" value={password} onChange={onChange} autocomplete="off" />
                <AiFillSave style={{
                  fontSize: '20px',
                  color: '#ff6e99'
                }} onClick={async () => {
                  const response = await dispatch(ChangePassword({ password}))
                  dispatch(FetchUser())
                  toast(response.payload.message)

                }} />
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default UpdateProfile