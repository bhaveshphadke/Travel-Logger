import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiFillSave } from 'react-icons/ai';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice';
import { ChangePassword } from '../../redux/slices/ProfileSlices/ChangePasswordSlice';
import { ChangeUsername } from '../../redux/slices/ProfileSlices/ChangeUsernameSlice';
import profile from '../../utils/profile.jpg'
import './css/profileupdate.css'
import ChangeBioComponent from './ChangeBioComponent';
import { ChangeProfilePicture } from '../../redux/slices/ProfileSlices/ChangeProfilePictureSlice';

const UpdateProfile = () => {
  const navigate = useNavigate()
  const { user } = useSelector(state => state.FetchUserReducer)
  const { success, message, loading } = useSelector(state => state.ChangeProfilePictureReducer)
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [previewImage, setPreviewImage] = useState(profile)
  const [showPass, setShowPass] = useState('textarea')
  useEffect(() => {
    if (!user) {
      navigate('/me')
    } else {
      setUsername(user.username)
      setPreviewImage(user.avatar[0].secure_url)
    }
  }, [])

  const onChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name === 'avatar') {
      let reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result)
      }

      reader.readAsDataURL(e.target.files[0])
    }
  }

  const ChangeProfilePic = () => {
    dispatch(ChangeProfilePicture(previewImage));
  }

  const ChangePass = async () => {
    const response = await dispatch(ChangePassword({ password }))
    dispatch(FetchUser())
    toast(response.payload.message)

  }

  const ChangeUser = async () => {
    console.log(1);
    const response = await dispatch(ChangeUsername({ username, oldUsername: user.username }))
    dispatch(FetchUser())
    toast(response.payload.message)

  }

  useEffect(() => {
    if (!loading) {
      toast(message)
    }
  }, [success, message])

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
              <div className='pick-profile update-profile-picture' style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div>
                  <img src={previewImage} alt="profile picture" />
                </div>
                <div className="update-username update-field">
                  <input type="file" name="avatar" id="avatar" className="avatar" onChange={onChange} required />

                  <div style={{
                    position:'relative',
                    left:'100px'
                  }}>
                    <AiFillSave
                      className='react-icons'
                      style={{
                        marginRight: '10px',
                        transform: 'translate3d(90px, -34px, 0)'

                      }}
                      onClick={ChangeProfilePic} />
                  </div>
                </div>
              </div>

              <div className="update-username update-field">
                <input type="text" name="username" id="username" value={username} onChange={onChange} autocomplete="off" />
                <AiFillSave
                  className='react-icons'
                  onClick={ChangeUser} />
              </div>
              <>
                <div className="update-password update-field">
                  <input type={showPass} name="password" id="password" value={password} onChange={onChange} autoComplete="cc-csc" placeholder='password' />

                  <AiFillSave
                    className='react-icons'
                    onClick={ChangePass}
                    disabled={password.length < 5}
                  />
                </div>
                {
                  showPass === "password" ?
                    <AiFillEyeInvisible
                      className='react-icons'
                      style={{
                        marginRight: '10px',
                        transform: 'translate3d(90px, -34px, 0)'

                      }}
                      onClick={() => [
                        setShowPass('textarea')
                      ]}
                    /> :
                    <AiFillEye
                      className='react-icons'
                      style={{
                        marginRight: '10px',
                        transform: 'translate3d(90px, -34px, 0)'
                      }}
                      onClick={() => [
                        setShowPass('password')
                      ]}
                    />
                }
              </>
              <ChangeBioComponent />
            </div>
          </div>
        </>
      }
    </>
  )
}

export default UpdateProfile