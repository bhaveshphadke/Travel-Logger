import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './css/postmodal.css'
import { PostImageFunction } from '../../redux/slices/ProfileSlices/PostImageSlice'
const PostModal = ({toggleModal}) => {
  const [data, setData] = useState({
    title: "",
    description: ""
  })
  const [image, setImage] = useState(null)
  const dispatch = useDispatch();
  const onChange = (e) => {
    if (e.target.name === 'image') {
      let reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
    else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(PostImageFunction({ ...data, image }));
  }
  return (
    <div className='post-modal'>
      <form onSubmit={onSubmit}>
        <div className="close" onClick={toggleModal}>
          <div></div>
          <div></div>
        </div>
        <div>
          {
            image &&
            <img src={image} alt="image" />

          }
          <input type="file" name="image" id="image" onChange={onChange} />
        </div>
        <div>
          <input type="text" name="title" id="title" value={data.title} placeholder='Title' onChange={onChange} />
        </div>
        <div>
          <input type="text" name="description" value={data.description} id="description" placeholder='Description' onChange={onChange} />
        </div>
        <div className="button">
          <button type='submit' className='btn'>Post</button>
        </div>
      </form>
    </div>
  )
}

export default PostModal