var _ = require('lodash');

const dummy = () => {
  return 1;
};

const totalLikes = (blogList) => {
  if (blogList.length === 0) {
    return 0;
  }
  if (blogList.length === 1) {
    return blogList[0].likes;
  }
  let totalLike = blogList
    .map((blog) => {
      return blog.likes;
    })
    .reduce((preVal, curVal) => {
      return preVal + curVal;
    }, 0);

  return totalLike;
};

const favoriteBlog = (blogList) => {
  let newObj = blogList.find(
    (blog) => blog.likes === Math.max(...blogList.map((blog) => blog.likes))
  );
  return {
    title: newObj.title,
    author: newObj.author,
    likes: newObj.likes,
  };
};

const mostBlogs = (blogList) => {
  let authorCount = _.countBy(blogList, 'author');

  let maxBlogs = Math.max(...Object.values(authorCount));

  let newArr = Object.entries(_.countBy(blogList, 'author'));

  let authorModifiedArr = newArr.map((eachArr) => {
    return {
      author: eachArr[0],
      blogs: eachArr[1],
    };
  });

  return authorModifiedArr.find((author) => author.blogs === maxBlogs);
};

const mostLikes =(blogList) => {
  let a = _.groupBy(blogList, 'author');

  let finalArr = Object.entries(a).map((_a) => {
    let obj = {
      author: _a[0],
      likes: _a[1]
        .map((eachA) => eachA.likes)
        .reduce((preVal, curVal) => preVal + curVal, 0),
    };
    return obj;
  });

  let maxLike = Math.max(...Object.values(finalArr.map((e) => e.likes)));

  return finalArr.find((e) => e.likes === maxLike);
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
