import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    addBlog(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={createNewBlog}>
        <div>
					title:
          <input id='title-input' value={title} onChange={((event) => {setTitle(event.target.value)})} placeholder='write title here'/>
        </div>
        <div>
					author:
          <input id='author-input' value={author} onChange={(event) => {setAuthor(event.target.value)}} placeholder='write author here'/>
        </div>
        <div>
					url:
          <input id='url-input' value={url} onChange={(event) => {setUrl(event.target.value)}} placeholder='write url here'/>
        </div>
        <button id='create-new-blog' type="summit">create</button>
      </form>
    </>
  )
}

export default BlogForm
