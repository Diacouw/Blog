import React, { useEffect, useState } from 'react'
import blog from './../../assets/images/blog.jpg'
import { Link } from 'react-router-dom'
import SkletonPost from './../../components/skleton/SkletonPost'
import './Home.css'
import axios from 'axios'


export default function Home() {

  const [data, setData] = useState(null)
  const [visible , setVisible]=useState(3)


  const showMoreItems=()=>{
      setVisible((prevVal)=>prevVal+3)
  }

  console.log(data);

  useEffect(() => {
    const handlePosts = async () => {
      axios.get('/posts')
        .then(res => {
          setData(res.data)
        })
    }
    handlePosts()
  }, [])


  return (
    <div className='home'>
      <div className="home-img"></div>
      <div className="container py-5">
        <h1 className='fw-bold home-title'>
          از همه جا با ما باش
        </h1>
        <div className="row mt-5">
          { data &&
            data.slice(0,visible).map(post => {
              return (
                <div className="col-lg-4 col-md-6 mt-4" key={post.id}>
                  <div className="blog-item shadow">
                    <img src={post.url} className='w-100 blog-img' />
                    <div className="blog-item-text p-3">
                      <div className="author border-bottom pb-2">
                        <h6 className="fw-bold">{post.title}</h6>
                        <small className='fw-bold text-muted'>نویسنده : {post.user.name}</small>
                      </div>
                      <Link className='btn btn-dark text-white d-block w-100 mt-4' to={`/blogdetails/${post.id}`} state={post}>مشاهده</Link>
                    </div>
                  </div>
                </div>
              )
            })
          }
          {
            !data && [1,2,3].map(item=><SkletonPost key={item}/>)
          }

          <button
          onClick={showMoreItems}
          className='btn btn-dark text-white  form-group  p-2 mt-5 '> مشاهده بیشتر</button>

        </div>
      </div>
    </div>
  )
}
