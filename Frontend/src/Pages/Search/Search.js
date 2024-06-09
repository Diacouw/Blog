import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Search.css'

export default function Search() {

    const [data, setData] = useState([])

    async function searchBlog(key) {
        await axios.get('/api/search/' + key)
            .then(res => {
                setData(res.data)
            })
    }

    return (
        <div className='container py-5'>
            <div className="row py-5 justify-content-center">
                <div className="col-lg-4">
                    <h4 className='text-center fw-bold border-bottom pb-3'>جستجو کنید</h4>
                    <input type="text" className='mt-3 form-control shadow' placeholder='دنبال چی هستی ؟'
                        onChange={e => { searchBlog(e.target.value) }}
                    />
                </div>

                <div className="col-lg-12 mt-5">
                    <div className="row">
                        {
                         data &&    data.map(item => (
                                <div className="col-lg-4 col-md-6" key={item.id}>
                                    <div className="blog-search shadow">
                                        <img src={`http://localhost:8000/upload/blog/${item.image}`} className='w-100 blog-img' />
                                        <div className="blog-item-text p-3">
                                            <div className="author border-bottom pb-2">
                                                <h6 className='fw-bold'>{item.title}</h6>
                                                <small className='fw-bold text-muted'>نویسنده :  {item.user.name}</small>
                                            </div>
                                            <Link to={`/blogdetails/${item.id}`} className='btn btn-dark text-whtie d-block w-100 mt-4 '>مشاهده</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}
