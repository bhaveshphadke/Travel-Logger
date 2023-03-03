import React, { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { EditProfileAdmin } from '../../redux/slices/AdminSlices/EditProfileSlice';
import { FetchAllUsersAdmin } from '../../redux/slices/AdminSlices/FetchAllUsersAdminSlice';
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice';
import Loader from '../layout/Loader';
import './css/modal.css'

const EditModalAdmin = ({ user }) => {
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.EditProfileAdminReducer)
    const ref = useRef()
    const [pageLoaded, setpageLoaded] = useState(false)
    const [show, setShow] = useState('hide')
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        isAdmin: "",
        id: ""
    })
    const showModal = () => {
        setShow('show')
    }
    const closeModal = () => {
        setShow('hide')
    }

    const onChange = (e) => {
        if (e.target.name === 'isAdmin') {
            setCredentials({ ...credentials, isAdmin: e.target.checked })
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const response = await dispatch(EditProfileAdmin(credentials))
        dispatch(FetchAllUsersAdmin())
        dispatch(FetchUser())
        toast(response.payload.message)
        if (response.payload.success) {
            ref.current.click()
        }
    }

    useEffect(() => {
        setCredentials({
            ...credentials,
            id: user._id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        })
        setpageLoaded(true)
    }, [])
    return (
        <>
            <div className="modalButton">
                <AiFillEdit onClick={showModal} />
            </div>

            <div className={`editModal ${show}`}>
                <div className='modalContent'>
                    {
                        pageLoaded && user ?

                            <form onSubmit={onSubmit}>
                                <h2 style={{
                                    textAlign: 'center',
                                    marginBottom: '10px'
                                }}>Edit "{user.username}"</h2>
                                <div className="user-form-credentials">
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" id="username" className="username" placeholder='Enter Username' onChange={onChange} value={credentials.username} required />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name="email" id="email" className="email" placeholder='Enter Username' onChange={onChange} value={credentials.email} required />
                                    </div>
                                    <div className='user-checkbox'>
                                        <div>
                                            <label htmlFor="email">isAdmin</label>

                                        </div>
                                        <div>
                                            <input type="checkbox" name="isAdmin" id="checkbox" className="checkbox" onChange={onChange} checked={credentials.isAdmin} style={{
                                                outline: 'none',
                                                textAlign: 'left',
                                                marginLeft: '10px'
                                            }} />
                                        </div>
                                    </div>
                                    <div className="user-form-submit">
                                        <button type='submit'>Update User</button>
                                    </div>
                                </div>
                            </form>
                            :

                            <Loader />
                    }
                    <div className="modalCloseButton">
                        <AiFillCloseCircle onClick={closeModal} ref={ref} />
                    </div>
                </div>

                <div>
                    {credentials.username}
                    {credentials.email}
                    {credentials.isAdmin ? "true" : 'false'}
                </div>
            </div>
        </>
    )
}

export default EditModalAdmin