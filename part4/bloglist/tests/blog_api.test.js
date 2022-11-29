const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].id).toBeDefined();
  expect(Object.keys(response.body[0])).toContain('id');
})

test('a valid note can be added', async () => {
  const newBlog =   {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const authors = response.body.map(res => res.author)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  expect(authors).toContain('Robert C. Martin');
})

describe('missing properties', () => {
  test('missing likes property will default to the value 0', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');

    expect(response.body[helper.initialBlogs.length].likes).toBe(0);
  });

  test('missing url properties, the backend responds with the status code 400', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  }, 2000);

  test('missing title properties, the backend responds with the status code 400', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'abc.com',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  }, 2000);
});

test('delete a note, succeeds with status code 204 if id is valid', async () => {
  const blogsBeforeDelete = await helper.blogsInDb();
  const blogToBeDeleted = blogsBeforeDelete[0];

  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204);

  const blogssAfterDelete = await helper.blogsInDb();

  expect(blogssAfterDelete).toHaveLength(helper.initialBlogs.length - 1);

  const titles = blogssAfterDelete.map((blog) => blog.title);

  expect(titles).not.toContain(blogToBeDeleted.title);
});

test('update the amount of likes for a blog post', async () => {
  const notesBeforeUpdate = await helper.blogsInDb();
  const blogToBeUpdate = notesBeforeUpdate[0];

  await api.put(`/api/blogs/${blogToBeUpdate.id}`).send({ likes: 15 }).expect(200);

  const blogsAfterUpdate = await helper.blogsInDb();

  expect(blogsAfterUpdate[0].likes).toBe(15);

})

describe('add user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('passwordSecret', 10);
    const user = new User({ username: 'admin123', passwordHash });

    await user.save();
  });

  test('creation succeeds', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'quangtricao',
      password: 'admin12345',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username length is < 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'a',
      password: 'password',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`a`) is shorter than the minimum allowed length (3).');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'admin123',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('username must be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
