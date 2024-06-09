import React, { useState } from 'react'
import './auth.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from 'yup'


const formSchema = Yup.object({
     name: Yup.string().required('وارد کردن نام الزامی است'),
     email: Yup.string().email('لطفا ایمیل معتبر وارد کنید').required('وارد کردن ایمیل الزامی است'),
     password: Yup.string().required('وارد کردن رمز عبور الزامی است'),
     confPassword: Yup.string().required('تکرار کردن رمز عبور الزامی است'),
})

const Register = () => {

     const [error, setError] = useState([]);
     const navigate = useNavigate();



     const handleSubmit = async (value) => {
          const data = {
               name: value.name,
               email: value.email,
               password: value.password,
               confPassword: value.confPassword
          }
          try {
               const res = await axios.post('/register', data)
               if (res.data.error) {
                    setError(res.data.error)
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
                    navigate("/login");
               }
          } catch (error) {
               console.log(error)
          }

     }




     const formik = useFormik({
          initialValues: {
               name: '',
               email: '',
               password: '',
               confPassword: '',
          },
          onSubmit: (values) => {
               handleSubmit(values)
          },
          validationSchema: formSchema
     })


     return (
          <div className="auth register">
               <div className="container">
                    <div className="row align-items-center min-vh-100 auth-res">
                         <div className="col-lg-4 col-md-6 bg-dark py-4 rounded">
                              <div className="text-center text-white">
                                   <h2 className="fw-bold mb-5 auth-title">
                                        ثبت نام کنید
                                   </h2>
                              </div>
                              <div className="text-center text-danger">
                                   <h2 className="fw-bold mb-5 h6">
                                        {error} 
                                   </h2>
                              </div>
                              <form onSubmit={formik.handleSubmit}>
                                   <div className="form-group mt-3">
                                        <label htmlFor="" className="text-white mb-2">نام شما</label>
                                        <input
                                             type="text"
                                             className="form-control mb-1"
                                             name="name"
                                             value={formik.values.name}
                                             onChange={formik.handleChange('name')}
                                             onBlur={formik.handleBlur('name')}
                                             placeholder='علی دایی'
                                        />
                                        <p className='help text-danger'>
                                             {formik.touched.name && formik.errors.name}
                                        </p>

                                   </div>
                                   <div className="form-group mt-3">
                                        <label htmlFor="" className="text-white mb-2">ایمیل</label>
                                        <input
                                             type="text"
                                             className="form-control mb-1"
                                             name="email"
                                             value={formik.values.email}
                                             onChange={formik.handleChange('email')}
                                             onBlur={formik.handleBlur('email')}
                                             placeholder='diacouw@gmail.com'
                                        />
                                        <p className='help text-danger'>
                                             {formik.touched.email && formik.errors.email}
                                        </p>

                                   </div>
                                   <div className="form-group mt-3">
                                        <label htmlFor="" className="text-white mb-2">رمز عبور</label>
                                        <input
                                             type="text"
                                             className="form-control mb-1"
                                             name="password"
                                             value={formik.values.password}
                                             onChange={formik.handleChange('password')}
                                             onBlur={formik.handleBlur('password')}
                                             placeholder='123456'
                                        />
                                        <p className='help text-danger'>
                                             {formik.touched.password && formik.errors.password}
                                        </p>

                                   </div>
                                   <div className="form-group mt-3">
                                        <label htmlFor="" className="text-white mb-2">تایید رمز عبور</label>
                                        <input
                                             type="text"
                                             className="form-control mb-1"
                                             name="confPassword"
                                             value={formik.values.confPassword}
                                             onChange={formik.handleChange('confPassword')}
                                             onBlur={formik.handleBlur('confPassword')}
                                             placeholder='123456'
                                        />
                                        <p className='help text-danger'>
                                             {formik.touched.confPassword && formik.errors.confPassword}
                                        </p>

                                   </div>
                                   <div className="form-group mt-4">
                                        <button type='submit' className="btn btn-success w-100">ثبت نام</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Register