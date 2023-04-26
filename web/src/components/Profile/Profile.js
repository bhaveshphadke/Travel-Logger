import React, { useEffect, useRef, useState } from 'react'
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice'
import './css/profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillProfile } from 'react-icons/ai';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, redirect, useNavigate } from 'react-router-dom';
import PostModal from './PostModal'
const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.FetchUserReducer)
    const [modal, setModal] = useState(false)
    useEffect(() => {
        dispatch(FetchUser())
    }, [])

    const toggleModal = () => {
        setModal(!modal);
    }
    return (
        <>
            {
                user &&
                <>
                    {
                        modal &&
                        <PostModal toggleModal={toggleModal}/>
                    }
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
                                <div className="profile-follow" onClick={() => {
                                    navigate('/me/following')
                                }}>
                                    <h4>Following</h4>
                                    <p>{user.following.user.length}</p>
                                </div>
                                <div className="profile-follow"
                                    onClick={() => {
                                        navigate('/me/followers')
                                    }}>
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
                                    user
                                    &&
                                    <>
                                        <Link to='/updateprofile'><button>update profile</button></Link>
                                        <AiOutlinePlus style={{
                                            color: '#ff6e99',
                                            fontSize: "35px"
                                        }}
                                            onClick={toggleModal}
                                        />
                                    </>
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

                            {
                                user.posts.length > 0 &&

                                user.posts.map((post) => {
                                    return (
                                        <div className="post-image" key={post._id}>
                                            {
                                                post.image.map((image) => {
                                                    return (
                                                        <img src={image.secure_url} alt="" key={image._id} />
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })

                            }

                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Profile