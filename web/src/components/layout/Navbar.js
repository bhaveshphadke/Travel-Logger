import React, { useEffect, useState } from 'react'
import './css/Navbar.css'
import { RiLoginCircleLine } from 'react-icons/ri';
import { SiGnuprivacyguard } from 'react-icons/si';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LogoutUser } from '../../redux/slices/UserSlices/LogoutSlice';
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice';

const Navbar = () => {
    const dispatch = useDispatch()
    const [navContainerToggle, setNavContainerToggle] = useState('nav-container-hide')
    const { success, user } = useSelector((state) => state.FetchUserReducer)
    return (
        <>
            <div className={`nav-container ${navContainerToggle}`}>

                <div className="nav-head">
                    <h1>Navbar</h1>
                </div>
                <div className="nav-elements">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {
                            user &&

                            <>
                                <li>
                                    <Link to="me">My Profile</Link>
                                </li>
                                <li>
                                    <Link to="/requests">Requests</Link>
                                </li>
                                <li>
                                    <Link to="/notifications">Notifications</Link>
                                </li>
                            </>
                        }
                        {
                            user && user.isAdmin &&
                            <>
                                <li>
                                    <Link to="users">Users</Link>
                                </li>
                            </>
                        }
                    </ul>
                    <div className="auth-utils">
                        {
                            !success && <>
                                <div className="login"><Link to="login"><RiLoginCircleLine style={{
                                    fontSize: '25px',
                                    color: '#ff7b88'
                                }} /></Link></div>
                                <div className="signup"><Link to="signup"><SiGnuprivacyguard style={{
                                    fontSize: '25px',
                                    color: '#ff7b88'
                                }} /></Link></div>
                            </>
                        }
                        {
                            success &&
                            <div className="signout"><a href="/"><RiLogoutCircleRLine style={{
                                fontSize: '25px',
                                color: '#ff7b88'
                            }} onClick={async () => {
                                await dispatch(LogoutUser())
                                dispatch(FetchUser())
                            }} /></a></div>
                        }
                    </div>
                </div>
            </div>
            <div className="ham-menu" onClick={() => {
                if (navContainerToggle === 'nav-container-hide') {
                    setNavContainerToggle('nav-container-show')
                } else if (navContainerToggle === 'nav-container-show') {
                    setNavContainerToggle('nav-container-hide')
                }
            }}>
                <div className={`${navContainerToggle === 'nav-container-show' ? "ham-div1" : ""}`}></div>
                <div className={`${navContainerToggle === 'nav-container-show' ? "ham-div2" : ""}`}></div>
                <div className={`${navContainerToggle === 'nav-container-show' ? "ham-div3" : ""}`}></div>
            </div>
        </>
    )
}

export default Navbar