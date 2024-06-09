import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className='container py-5'>
            <div className="row min-vh-100 justify-content-center align-content-center">
                <div className="col-lg-4 text-center">
                    <h1 className='text-center fw-bold'>صفحه مورد نظر یافت نشد</h1>
                    <Link to={'/'} className='mt-5 btn btn-dark text-white'> بازگشت به صفحه اصلی</Link>
                </div>
            </div>
        </div>
    )
}
