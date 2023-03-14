import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AiFillSave } from 'react-icons/ai';
import { ChangeBio } from '../../redux/slices/ProfileSlices/ChangeBio'
const ChangeBioComponent = () => {
    const [description, setDescription] = useState("")
    const [link, setLink] = useState("")
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.FetchUserReducer)
    const ChangeBioFunc = async (description, link) => {
        const response = await dispatch(ChangeBio({ description, link }))
        console.log(5);
        toast(response.payload.message)
    }
    const onChange = (e) => {
        if (e.target.name === 'description') {
            setDescription(e.target.value)
        }
        else if (e.target.name === 'link') {
            setLink(e.target.value)
        }

    }
    useEffect(() => {
        console.log(user);
        if (user.bio && user.bio.description) {
            setDescription(user.bio.description)
        }
        if (user.bio && user.bio.link) {
            setLink(user.bio.link)
        }

        if(!user.bio || !user.bio.link){
            setLink('https://')
        }
    }, [])
    return (
        <>
            <div className="update-description update-field" style={{
                marginTop: '-15px'

            }}>
                <input type="text" name="description" id="description" value={description} onChange={onChange} autoComplete="cc-csc" placeholder='description' />

                <AiFillSave className='react-icons'
                    onClick={() => {
                        ChangeBioFunc(description, undefined)
                    }} />
            </div>
            <div className="update-description update-field">
                <input type="text" name="link" id="link" value={link} onChange={onChange} autoComplete="cc-csc" placeholder='link' />

                <AiFillSave
                    className='react-icons'
                    onClick={() => {
                        ChangeBioFunc(undefined, link)
                    }} />
            </div>
        </>
    )
}

export default ChangeBioComponent