const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]

test('dummy returns one', () =>
{
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () =>
{

    test('list with one blog has total likes of that blog', () =>
    {
        const result = listHelper.totalLikes([blogs[0]])
        assert.strictEqual(result, 7)
    })

    test('list with multiple blogs has total likes of all blogs', () =>
    {
        const result = listHelper.totalLikes(blogs)
        assert.strictEqual(result, 36)
    })
})

describe('favourite blog', () => 
{
    test('favourite likes for one blog is the likes for that blog', () =>
    {
        const result = listHelper.favouriteBlog([blogs[0]])
        assert.deepStrictEqual(result, blogs[0])
    })

    test('favourite blog from multiple blogs is blog with highest likes', () =>
    {
        const result = listHelper.favouriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[2])
    })
})

describe('most blogs', () =>
{
    test('most blogs for one author is that author', ()=>
    {
        const mostBlog =
        {
            author: "Michael Chan",
            blogs: 1
        }
        const result = listHelper.mostBlogs([blogs[0]])
    })

    test('most blogs from multiple blog is author with most blogs', () =>
    {
        const mostBlog =
        {
            author: "Robert C. Martin",
            blogs: 3
        }
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, mostBlog)
    })
})

describe('most likes', () =>
{
    test('most likes for one author is that author', () =>
    
    {
        const mostLike =
        {
            author: "Michael Chan",
            likes: 7
        }

        const result = listHelper.mostLikes([blogs[0]])
        assert.deepStrictEqual(result, mostLike)
    })

    test('most likes from multiple blogs is author with most likes', () =>
    {
        const mostLike =
        {
            author: "Edsger W. Dijkstra",
            likes: 17
        }

        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, mostLike)

    })
})