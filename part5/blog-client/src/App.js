import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notify('wrong username or password', 'error')
    }
  }

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    const savedBlog = await blogService.create(blogObj)
    setBlogs(blogs.concat(savedBlog))
    notify(`a new blog ${savedBlog.title} by ${savedBlog.author} added`)
  }

  const logOut = () => {
    // window.localStorage.clear();
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const updateLike = async (id, newObj) => {
    const updateBlog = await blogService.update(id, newObj)
    setBlogs(
      blogs.map((blog) => {
        return blog.id === updateBlog.id ? updateBlog : blog
      })
    )
    console.log(updateBlog)
    notify(`Updated likes of ${updateBlog.author}`)
  }

  const deleteBlog = async (id) => {
    const blogDelete = blogs.find((p) => p.id === id)

    if (window.confirm(`Delete ${blogDelete.name}`)) {
      setBlogs(
        blogs.filter((blog) => {
          return blog.id !== id
        })
      )
      await blogService.remove(id)
      notify(`Deleted ${blogDelete.author}`)
    }
  }

  const sortBlog = blogs.sort((a, b) => {
    return a.likes - b.likes
  })

  const blogFormRef = useRef()

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <h1>blogs</h1>
          <p>
            {user.username} {'  '} logged-in
            <button id='log-out-button' onClick={logOut}>Log out</button>
          </p>

          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>

          {sortBlog.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLike={updateLike}
              deleteBlog={deleteBlog}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
