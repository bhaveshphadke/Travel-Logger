import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice'
import './css/follow.css'
import { Link } from 'react-router-dom'
const Followers = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.FetchUserReducer)
    useEffect(() => {
        dispatch(FetchUser())
    }, [])
    return (
        <div className='show-follow-container'>

            {
                user &&
                user.followers.user.map((item) => {
                    return (
                        <div><Link to={`/search/${item.userID.username}`}>{item.userID.username}</Link></div>
                    )
                })
            }
               {
                user && 
                user.followers.user.length===0 &&
                <div>0 Followers</div>
            }
        </div>
    )
}

export default Followers