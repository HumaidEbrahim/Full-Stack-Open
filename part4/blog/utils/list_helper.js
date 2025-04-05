const _ = require('lodash')


const dummy = (blogs) =>
{
    return 1
}

const totalLikes = (blogs) =>
{
    const reducer = (sum , item) => 
    {
        return sum + item.likes 
    }
    return blogs.reduce( reducer , 0)
}


const favouriteBlog = (blogs) =>
{
    const reducer = (max, blog) =>
    {
        return blog.likes > max.likes
            ? blog
            : max
    }

    return blogs.reduce(reducer)
}

const mostBlogs = (blogs) =>
{
    const blogCount = _.countBy(blogs, 'author')
    const mostBlog = _.maxBy(Object.entries(blogCount))
    return{   
        author: mostBlog[0],
        blogs: mostBlog[1]
    }
}

const mostLikes = (blogs) => 
{
   const grouped = _.groupBy(blogs,'author')

   const authorLikes =  _.map(grouped, (blogs,author) => 
   {
      const likes= _.sumBy(blogs, 'likes')
      return {author, likes}
   })

   return _.maxBy(authorLikes, 'likes')
}


module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }