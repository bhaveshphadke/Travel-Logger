import React, { useEffect, useState } from 'react'
import './css/Navbar.css'
import { RiLoginCircleLine } from 'react-icons/ri';
import { SiGnuprivacyguard } from 'react-icons/si';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { AiFillHome } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { IoMdNotifications } from 'react-icons/io';
import { GiSelfLove } from 'react-icons/gi';
import { HiUsers } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { LogoutUser } from '../../redux/slices/UserSlices/LogoutSlice';
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice';
import logo  from '../../utils/logo.png'

const Navbar = () => {
    const dispatch = useDispatch()
    // const [navContainerToggle, setNavContainerToggle] = useState('nav-container-hide')
    const { success, user } = useSelector((state) => state.FetchUserReducer)
    return (
        <>
            <div className={`nav-container`}>

                <div className="nav-head">
                    <img src={logo} alt="logo" />
                </div>
                <div className="nav-elements">
                    <ul>
                        <li>
                            <Link to="/"><AiFillHome className='icons'/></Link>
                        </li>
                        {
                            user &&

                            <>
                                <li>
                                    <Link to="me"><CgProfile className='icons'/></Link>
                                </li>
                                <li>
                                    <Link to="/requests"><GiSelfLove className='icons'/></Link>
                                </li>
                                <li>
                                    <Link to="/notifications"><IoMdNotifications className='icons'/></Link>
                                </li>
                                <li>
                                    <Link to="/search"><AiOutlineSearch className='icons'/></Link>
                                </li>
                            </>
                        }
                        {
                            user && user.isAdmin &&
                            <>
                                <li>
                                    <Link to="users"><HiUsers className='icons'/></Link>
                                </li>
                            </>
                        }
                    </ul>
                    <div className="auth-utils">
                        {
                            !success && <>
                                <div className="login"><Link to="login"><RiLoginCircleLine className='icons'/></Link></div>
                                <div className="signup"><Link to="signup"><SiGnuprivacyguard className='icons'/></Link></div>
                            </>
                        }
                        {
                            success &&
                            <div className="signout"><a href="/"><RiLogoutCircleRLine className='icons' onClick={async () => {
                                await dispatch(LogoutUser())
                                dispatch(FetchUser())
                            }} /></a></div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar