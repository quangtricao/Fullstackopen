import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('BlogForm', async () => {
  const addBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm addBlog={addBlog} />)

  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')

  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Blog 1')
  await user.type(authorInput, 'Quang Tri Cao')
  await user.type(urlInput, 'abc@gmail.com')
  await user.click(sendButton)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe('Blog 1')
  expect(addBlog.mock.calls[0][0].url).toBe('abc@gmail.com')
})
