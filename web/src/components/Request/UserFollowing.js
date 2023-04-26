import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ShowSingleUserFunction } from '../../redux/slices/RequestSlices/ShowSingleUserSlice'
import './css/follow.css'
const UserFollowing = () => {
    const dispatch = useDispatch()
    const {username} = useParams()
    const { user } = useSelector(state => state.ShowSingleUserReducer)
    useEffect(() => {
        dispatch(ShowSingleUserFunction(username))
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
                user.following.user.length===0 &&
                <div>0 Following</div>
            }
        </div>
    )
}
export default UserFollowing