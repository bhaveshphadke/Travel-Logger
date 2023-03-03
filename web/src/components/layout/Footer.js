import React from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FetchAllUsersAdmin } from '../../redux/slices/AdminSlices/FetchAllUsersAdminSlice'
const Footer = () => {
    const dispatch = useDispatch()
    // const {message}
    return (
        <div>Footer

            <button onClick={async() => {
                const response = await dispatch(FetchAllUsersAdmin())
                toast(response.payload.message)

            }}>button</button>
        </div>
    )
}

export default Footer