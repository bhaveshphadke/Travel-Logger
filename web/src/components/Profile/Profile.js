import React, { useEffect } from 'react'
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice'
import './css/profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillProfile } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.FetchUserReducer)
    useEffect(() => {
        dispatch(FetchUser())
    }, [])
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
                                    <p>{user.following.count}</p>
                                </div>
                                <div className="profile-follow">
                                    <h4>Followers</h4>
                                    <p>{user.followers.count}</p>
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
                                    user
                                    &&
                                    <Link to='/updateprofile'><button>update profile</button></Link>
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

export default Profile