import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllUsersAdmin } from '../../redux/slices/AdminSlices/FetchAllUsersAdminSlice'
import { AiFillEdit,AiFillDelete } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import './css/users.css'
import Loader from '../layout/Loader'
import EditModalAdmin from './EditModalAdmin';
import { DeleteUserAdmin } from '../../redux/slices/AdminSlices/DeleteUserAdminSlice';
import { toast } from 'react-toastify';
import PageNotFound from '../layout/PageNotFound';
import { FetchUser } from '../../redux/slices/UserSlices/FetchSlice';

const AllUsers = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.FetchUserReducer)


    useEffect(() => {
        dispatch(FetchAllUsersAdmin())
    }, [dispatch])

    const onDelete =async (id)=>{
        const response = await dispatch(DeleteUserAdmin(id))
        dispatch(FetchAllUsersAdmin())
        dispatch(FetchUser())
        toast(response.payload.message)
    }
    const { users, loading } = useSelector(state => state.FetchAllUserAdminReducer)
    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                        {
                            users ?

                                <>
                                   <div className="tableContainer">
                                    <div className="adminOptions">
                                        <h2>{user.username}</h2>
                                    </div>
                                     <table className='users-table'>
                                        <tr>
                                            <th className='table-head-username'>Name</th>
                                            <th className='table-head-email'>Email</th>
                                            <th className='table-head'>isAdmin</th>
                                            <th className='table-head'>Edit</th>
                                            <th className='table-head'>Delete</th>
                                        </tr>
                                        {
                                            users.map((item) => {
                                                return (
                                                    <tr>
                                                        <td>{item.username}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.isAdmin?<TiTick
                                                        style={{
                                                            color:'green',
                                                            fontSize:'20px'
                                                        }}
                                                        />:""}</td>
                                                        <td><EditModalAdmin user={item}/></td>
                                                        <td><AiFillDelete user={item}
                                                        onClick={()=>{
                                                            onDelete(item._id)
                                                        }}
                                                        /></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
                                   </div>
                                </> : <PageNotFound/>
                        }
                    </>
            }
        </>
    )
}

export default AllUsers