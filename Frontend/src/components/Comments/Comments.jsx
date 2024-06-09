import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import './Comments.css'

export default function Comments() {

  const [description, setDescription] = useState('')
  const [comment, setComment] = useState('')

  const reset = () => {
    setDescription('')
  }

  let user_id = JSON.parse(localStorage.getItem('user_id'))
  const { id } = useParams()


  useEffect(() => {
   
    getComment()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      description,
      blog_id: id,
      user_id
    }
    await axios.post('/api/comment', data)
      .then(res => {
        if (res.data.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'تبریک میگم',
            text: res.data.message,
            showConfirmButton: true,
            confirmButtonText: 'تایید!'
          })
          reset()
        }
      })
  }

  const getComment = async () => {
    await axios.get('/api/comment-view/' + id)
      .then(res => {
        setComment(res.data)
      })
  }



  return (
    <div className='comment'>

      <form onSubmit={handleSubmit} >
        <textarea name="description" placeholder='نظر شما ...'
          onChange={e => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button type='submit' className='btn btn-sm btn-success'>ارسال نظر</button>
      </form>

      <div className="bg-white mt-5">
        {
          comment && comment.map((com) => {
            const { id, user, description } = com
            return (
              <div className="p-4 border shadow-sm mt-3" key={id}>
                <div className="author d-flex align-item-center">
                  <small className='text-muted fw-bold mt-2'>{user.name}</small>
                </div>
                <h6 className='fw-bold mt-4'>{description}</h6>
              </div>
            )
          })
        }
      </div>


    </div>
  )
}
