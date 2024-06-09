import React, { useState } from 'react'
import './auth.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import { useFormik } from 'formik'
import * as Yup from 'yup'


const formSchema = Yup.object({

     email: Yup.string().email('لطفا ایمیل معتبر وارد کنید').required('وارد کردن ایمیل الزامی است'),
     password: Yup.string().required('وارد کردن رمز عبور الزامی است'),

})

const Login = () => {

     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [error, setError] = useState([]);
     const navigate = useNavigate();

     const handleSubmit = async (value) => {
          const data = {
               email: value.email,
               password: value.password,
          }

          try {

               const res = await axios.post('/login', data)
               if (res.data.error) {
                    setError(res.data.error)
               }
               else {
                    localStorage.setItem("user_name", res.data.name);
                    localStorage.setItem("user_id", res.data.userId);
                    Swal.fire({
                         icon: "success",
                         title: "تبریک میگم!",
                         text: res.data.message,
                         showConfirmButton: true,
                         confirmButtonText: "تایید!",
                         timer: 5000,
                    })
                    navigate("/")
               }
               console.log(res)

          } catch (error) {
               console.log(error)
          }



     }





     const formik = useFormik({
          initialValues: {
               email: '',
               password: '',
          },
          onSubmit: (values) => {
               handleSubmit(values)
          },
          validationSchema: formSchema
     })

     return (
          <div className="auth login">
               <div className="container">
                    <div className="row align-items-center min-vh-100 auth-res">
                         <div className="col-lg-4 col-md-6 bg-dark py-4 rounded">
                              <div className="text-center text-white">
                                   <h2 className="fw-bold mb-5 auth-title">
                                        ورود به حساب کاربری
                                   </h2>
                              </div>
                              <div className="text-center text-danger">
                                   <h2 className="fw-bold mb-5 h6">
                                        {error} 
                                   </h2>
                              </div>
                              <form onSubmit={formik.handleSubmit}>
                                   <div className="form-group mt-3">
                                        <label htmlFor="" className="text-white mb-2">ایمیل</label>
                                        <input
                                             type="text"
                                             className="form-control"
                                             name="email"
                                             value={formik.values.email}
                                             onChange={formik.handleChange('email')}
                                             onBlur={formik.handleBlur('email')}
                                        />
                                        <p className='help text-danger'>
                                             {formik.touched.email && formik.errors.email}
                                        </p>

                                   </div>

                                   <div className="form-group mt-3">
                                        <label htmlFor="" className="text-white mb-2">پسوورد</label>
                                        <input
                                             type="text"
                                             className="form-control"
                                             name="password"
                                             value={formik.values.password}
                                             onChange={formik.handleChange('password')}
                                             onBlur={formik.handleBlur('password')}
                                        />
                                        <p className='help text-danger'>
                                             {formik.touched.password && formik.errors.password}
                                        </p>

                                   </div>
                                   <div className="form-group mt-4">
                                        <button type='submit' className="btn btn-success w-100">ورود</button>
                                   </div>
                              </form>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default Login