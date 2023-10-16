const { Blogpost, User, Comment } = require('../models');
const dayjs = require('dayjs')

const getPageInfo = require('../utils/getPageInfo')

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

    let noPosts = false
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

    if (blogposts.length === 0){
        noPosts = true
    }

    try {
        res.render('dashboard', {
            blogposts,
            noPosts,
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
            include: User,
            order: [['updatedAt', 'DESC']]
        })

        
        const comments = commentData.map(comment => comment.get({ plain: true }))

        //console.log(comments)
        for (comment in comments){
            const commentActual = comments[comment]
            const newDate = new dayjs(commentActual.updatedAt).format('MM/DD/YYYY')
            commentActual.formatted_date = newDate
        }

        const newDate = new dayjs(blogpost.updatedAt).format('MMMM DD, YYYY')
        blogpost.formatted_date = newDate

        let is_author = false
        if (blogpost.user.id === req.session.user_id){
            is_author = true
        }

        res.render('blogpost', {
            blogpost,
            comments,
            is_author,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/write-blogpost', async (req, res) => {
    
    const editMode = false

    const contents = {}
    const text = getPageInfo(editMode, contents)
    try {
        res.render('write-blogpost', {
            logged_in: req.session.logged_in,
            text
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/edit-blogpost/:slug', async (req, res) => {

    const editMode = true

    const fullslug = req.params.slug + '-' + req.session.user_id
    console.log(fullslug)

    const blogToEdit = await Blogpost.findOne({
        where: {
            slug: fullslug
        },
    })

    const contents = {
        title: blogToEdit.title,
        content: blogToEdit.content
    }

    const text = getPageInfo(editMode, contents)
    try {
        res.render('write-blogpost', {
            logged_in: req.session.logged_in,
            text
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