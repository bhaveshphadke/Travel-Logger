import React, { useEffect, useState } from 'react'
import { ShowSingleUserFunction } from '../../redux/slices/RequestSlices/ShowSingleUserSlice'
import './css/profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillProfile } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FollowFucntion } from '../../redux/slices/RequestSlices/FollowSlice';
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice';

const UserProfile = () => {

    const dispatch = useDispatch()
    const { username } = useParams()
    const { user } = useSelector(state => state.ShowSingleUserReducer)
    const me = useSelector(state => state.FetchUserReducer)
    const [followText, setFollowText] = useState("")
    const SearchUserFollow = () => {

        let text = me.user.following.user.filter((item) => {
            return item.userID == user._id
        })
        if (text.length === 0) {
            setFollowText('Follow')
        }
        else {
            setFollowText('Unfollow')

        }
    }
    useEffect(() => {
        dispatch(ShowSingleUserFunction(username))
    }, [])
    useEffect(() => {
        if (me.user && user) {
            SearchUserFollow()
        }

    },[followText,SearchUserFollow,user,me])
    return (
        <>
            {
                user &&
                <>
                    <div className="profile-container">
                        <div className='profile-about-me'>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}>
                                <div className="profile-picture">
                                    <img src={user.avatar && user.avatar[0].secure_url} alt="" />
                                </div>
                                <div className="profile-username">
                                    {user.username || "username"}
                                </div>
                            </div>
                            <div className='profile-follow-div'>
                                <div className="profile-follow">
                                    <h4>Posts</h4>
                                    <p>{user.posts.length}</p>
                                </div>
                                <div className="profile-follow">
                                    <h4>Following</h4>
                                    <p>{user.following.user.length}</p>
                                </div>
                                <div className="profile-follow">
                                    <h4>Followers</h4>
                                    <p>{user.followers.user.length}</p>
                                </div>
                            </div>
                        </div>
                        {
                            user.bio &&
                            <div className="profile-bio">
                                <div className="bio">{user.bio.description && user.bio.description}</div>
                                <div className="link"><a href={user.bio.link} target="_blank">{user.bio.link && user.bio.link}</a></div>
                            </div>
                        }
                        <div className="profile-buttons">
                            <div className="profile-update">
                                {
                                    me && user && user.following && user.following.user
                                    &&

                                    <button onClick={async() => {
                                        await dispatch(FollowFucntion(user._id))
                                        await dispatch(ShowSingleUserFunction(username))
                                        dispatch(FetchUser())
                                    }}>
                                        {followText}
                                    </button>

                                }
                            </div>
                        </div>
                    </div>

                    <div className="profile-posts">
                        <div>
                            <AiFillProfile style={{
                                fontSize: '50px',
                                color: '#ff7b88',
                                borderBottom: '2px solid black',
                                marginBottom: '5px'
                            }} />
                        </div>
                        <div>

                            <div className="post-image">
                                <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" alt="" />
                            </div>

                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default UserProfile