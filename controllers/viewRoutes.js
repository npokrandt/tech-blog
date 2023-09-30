const { Blogpost, User, Comment } = require('../models');
const dayjs = require('dayjs')

const router = require('express').Router()

//homepage
router.get('/', async (req, res) => {

    const blogpostData = await Blogpost.findAll({
        include: User,
    })

    
    const blogposts = blogpostData.map(blogpost => blogpost.get({ plain: true }))
    console.log(blogposts)

    for (blogpost in blogposts){
        const post = blogposts[blogpost]
        const newDate = new dayjs(post.updatedAt).format('MMMM DD, YYYY')
        post.formatted_date = newDate
    }

    console.log(blogposts)

    try { 
        res.render('homepage', {
            blogposts,
            logged_in: req.session.logged_in,
        }) 
    } catch (err) {
        res.status(500).json(err);
    }
})

//dashboard
router.get('/dashboard', async (req, res) => {

    const blogpostData = await Blogpost.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: User,
    })

    const blogposts = blogpostData.map(blogpost => blogpost.get({ plain: true }))
    //console.log(blogposts)

    for (blogpost in blogposts){
        const post = blogposts[blogpost]
        const newDate = new dayjs(post.updatedAt).format('MMMM DD, YYYY')
        post.formatted_date = newDate
    }

    try {
        res.render('dashboard', {
            blogposts,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/blogpost/:slug', async (req, res) => {
    try {
        const blogpostData = await Blogpost.findOne({
            where: {
                slug: req.params.slug
            },
            include: User       
        })

        const blogpost = blogpostData.get({plain: true})

        const commentData = await Comment.findAll({
            where: {
                blogpost_id: blogpost.id
            },
            include: User
        })

        
        const comments = commentData.map(comment => comment.get({ plain: true }))

        console.log(comments)

        const newDate = new dayjs(blogpost.updatedAt).format('MMMM DD, YYYY')
        blogpost.formatted_date = newDate

        res.render('blogpost', {
            blogpost,
            comments,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/write-blogpost', async (req, res) => {
    try {
        res.render('write-blogpost', {
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

//login
router.get('/login', async (req, res) => {

    //const blogposts = await Blogpost.findAll({raw: true})

    try {
 
        res.render('login')
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/create-account', async (req, res) => {

    //const blogposts = await Blogpost.findAll({raw: true})

    try {
 
        res.render('create-account')
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router