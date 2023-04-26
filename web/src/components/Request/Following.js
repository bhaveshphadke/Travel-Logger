import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice'
import './css/follow.css'
import { Link } from 'react-router-dom'
const Following = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.FetchUserReducer)
    useEffect(() => {
        dispatch(FetchUser())
    }, [])
    return (
        <div className='show-follow-container'>

            {
                user &&
                user.following.user.map((item) => {
                    return (
                        <div><Link to={`/search/${item.userID.username}`}>{item.userID.username}</Link></div>
                    )
                })
            }
            {
                user &&
                user.following.user.length === 0 &&
                <div>0 Following</div>
            }
        </div>
    )
}


export default Following