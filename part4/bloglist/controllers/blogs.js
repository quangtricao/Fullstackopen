const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end;
  }
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

  const user = request.user;
  const blog = await Blog.findById(request.params.id);

  if (user.blogs.includes(blog._id)) {
    user.blogs = user.blogs.filter((u) => u._id.toString() !== blog._id.toString());
    await user.save();

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).end();
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body;

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedNote);
});

module.exports = blogsRouter;
