import { useState } from 'react'

const Blog = ({ blog, updateLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideAtStart = { display: visible ? 'none' : '' }
  const showWhenClick = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  console.log(blog)

  return (

    <>
      <div style={hideAtStart} className='view'>
        <div style={blogStyle}>
          {blog.title} {' '} {blog.author}
          <button id='view-button' onClick={toggleVisibility}>view</button>
        </div>
      </div>

      <div style={showWhenClick} className='hide'>
        <div style={blogStyle}>
					Title: {' '} {blog.title} {' '}
          <button id='hide-button' onClick={toggleVisibility}>hide</button>
          <div>URL: {' '}{blog.url}</div>
          <div>
						likes: {' '}
            {blog.likes} {' '}
            <button id='like-button' style={{ color: 'red' }} onClick={() => {updateLike(blog.id, { ...blog, user: blog.user.id, likes: blog.likes + 1 })}}>like</button>
          </div>
          <div>Author: {' '}{blog.author}</div>
          <br/>
          {blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username ? (
            <button id='remove-button' style={{ color: 'blue' }} onClick={() => {deleteBlog(blog.id)}}>remove</button>
          ) : <></> }
        </div>
      </div>
    </>
  )
}

export default Blog
