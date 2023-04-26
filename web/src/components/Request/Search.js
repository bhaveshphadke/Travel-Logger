import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ShowListFucntion } from '../../redux/slices/RequestSlices/ShowList';
import './css/Search.css'
import { Link } from 'react-router-dom'
import Loader from '../layout/Loader';
const Search = () => {
    const dispatch = useDispatch();
    const { users, loading } = useSelector(state => state.ShowListReducer);
    const [query, setQuery] = useState("*")
    useEffect(() => {
        dispatch(ShowListFucntion('*'))
    }, [])

    const onChange = (e) => {
        dispatch(ShowListFucntion(e.target.value))
    }
    return (
        <>
            {
                loading ? <Loader />

                    :
                    <div>
                        <div className='search-user-div'>
                            <input type="text" placeholder='Search user or enter * to show all' name="query" onChange={onChange} />

                        </div>
                        <div className='pick-users-container'>

                            {
                                users && users.map((item) => {


                                    return (

                                        <div className='pick-user'><Link to={`${item.username}`}>{item.username}</Link></div>
                                    )
                                })
                            }
                            {users && users.length === 0 &&
                                <div>No users found</div>
                            }


                        </div>
                    </div>
            }
        </>
    )
}

export default Search