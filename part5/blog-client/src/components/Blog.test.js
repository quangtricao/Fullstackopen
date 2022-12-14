import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('rendering content', () => {
  test('blog title and author', async () => {
    window.localStorage.setItem('loggedBlogappUser', '{"token":"token","username":"admin"}')

    const blog = {
      author: 'Tri Cao',
      id: '1',
      likes: 10,
      title: 'Blog',
      url: 'abc',
      user: {
        id: '1',
        username: 'Quang Tri Cao'
      }
    }

    const { container } = render(<Blog blog={blog}/>)

    const div = container.querySelector('.view')
    expect(div).toHaveStyle('display: block')
  })

  test('not url or number of likes by default', async () => {
    window.localStorage.setItem('loggedBlogappUser', '{"token":"token","username":"admin"}')

    const blog = {
      author: 'Tri Cao',
      id: '1',
      likes: 10,
      title: 'Blog',
      url: 'abc',
      user: {
        id: '1',
        username: 'Quang Tri Cao'
      }
    }

    const { container } = render(<Blog blog={blog}/>)

    const div = container.querySelector('.hide')
    expect(div).toHaveStyle('display: none')
  })
})

describe('clicking button', () => {
  test('call event handler once', async () => {
    window.localStorage.setItem('loggedBlogappUser', '{"token":"token","username":"admin"}')

    const blog = {
      author: 'Tri Cao',
      id: '1',
      likes: 10,
      title: 'Blog',
      url: 'abc',
      user: {
        id: '1',
        username: 'Quang Tri Cao'
      }
    }

    const { container } = render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.hide')
    expect(div).toHaveStyle('display: block')
  })
})

describe('clicking "like" button twice', () => {
  test('the event handler the component received as props is called twice', async () => {
    window.localStorage.setItem('loggedBlogappUser', '{"token":"token","username":"admin"}')

    const blog = {
      author: 'Tri Cao',
      id: '1',
      likes: 10,
      title: 'Blog',
      url: 'abc',
      user: {
        id: '1',
        username: 'Quang Tri Cao'
      }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} updateLike={mockHandler} />)

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})