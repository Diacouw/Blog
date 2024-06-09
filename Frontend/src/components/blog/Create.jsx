import React, { useState } from 'react'
import axios from 'axios'
import './Create.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'


const formSchema = Yup.object({
  title: Yup.string().required('وارد کردن عنوان الزامی است'),
  desc: Yup.string().required('وارد کردن متن الزامی است'),
})



export default function Create() {

  const [error, setError] = useState('');
  const [file, setFile] = useState([]);
  const [preview, setPreview] = useState('');


  const loadImage = e => {
    const image = e.target.files[0]
    setFile(image)
    setPreview(URL.createObjectURL(image))
  }


  const user_id = localStorage.getItem('user_id')
  const navigate = useNavigate()


  const handleSubmit = async (data) => {

    const formData = new FormData();
    formData.append('file', data.file)
    formData.append('title', data.title)
    formData.append('desc', data.desc)
    formData.append('userId', data.userId)

    try {

      const res = await axios.post('/posts', formData)
      if (res.data.error) {
        setError(res.data.error)
        console.log(res.data.error);
      }
      else {
        Swal.fire({
          icon: "success",
          title: "تبریک میگم!",
          text: res.data.message,
          showConfirmButton: true,
          confirmButtonText: "تایید!",
          timer: 5000,
        })
        navigate('/')
      }

    } catch (error) {
      console.log(error)
    }

  }



  const formik = useFormik({
    initialValues: {
      title: '',
      desc: '',
      file: '',
      userId: user_id
    },
    onSubmit: (values) => {
      const data = {
        title: values.title,
        desc: values.desc,
        file: file,
        userId: user_id
      }
      handleSubmit(data)
    },
    validationSchema: formSchema
  })

  return (
    <div className='blog-post'>
      <div className="container py-5 min-vh-100 d-flex flex-column justify-content-center">
        <div className="post-title text-center">
          <h2 className='mb-5 mt-5 fw-bold fs-1 text-white'>حرف دلتو بزن</h2>
        </div>
        <div className="row justify-content-center py-5">
          <div className="col-6 col-lg-4  bg-dark rounded py-3">
            {
              error && (
                <div className="text-center text-danger">
                  <h2 className="fw-bold mb-5 h6">
                    {error}
                  </h2>
                </div>
              )
            }
            <div className="post-content">
              <form onSubmit={formik.handleSubmit} encType='multipart/form-data' >
                <div className="form-group mt-3">
                  <label className='mb-2 text-white'>انتخاب عکس</label>
                  <input type="file" className='form-control mb-1'
                    onChange={loadImage}
                    name='image'
                  />

                  {
                    preview ? (<figure className='image-preview mt-3'>
                      <img src={preview} width='250' alt="" />
                    </figure>) : ''
                  }

                </div>
                <div className="form-group mt-3">
                  <label className='mb-2 text-white'>عنوان</label>
                  <input type="text" className='form-control mb-1'
                    name='title'
                    value={formik.values.title}
                    onChange={formik.handleChange('title')}
                    onBlur={formik.handleBlur('title')}
                  />
                  <p className='help text-danger'>
                    {formik.touched.title && formik.errors.title}
                  </p>
                </div>
                <div className="form-group mt-3">
                  <label className='mb-2 text-white'>متن</label>
                  <textarea className='form-control mb-1'
                    name='desc'
                    value={formik.values.desc}
                    onChange={formik.handleChange('desc')}
                    onBlur={formik.handleBlur('desc')}
                  ></textarea>
                  <p className='help text-danger'>
                    {formik.touched.desc && formik.errors.desc}
                  </p>
                </div>
                <div className="form-group mt-3">
                  <button className='btn btn-success w-100 mt-4' type='submit'>ارسال</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

