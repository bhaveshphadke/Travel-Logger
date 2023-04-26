import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice'
import { ShowSingleUserFunction } from '../../redux/slices/RequestSlices/ShowSingleUserSlice'
import {Link, useParams} from 'react-router-dom'
import './css/follow.css'
const UserFollowers = () => {
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
                user.followers.user.map((item) => {
                    console.log(item);
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
export default UserFollowers