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



module.exports = { dummy, totalLikes, favouriteBlog }