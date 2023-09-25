const { Blogpost, User } = require('../models');

const router = require('express').Router()

//homepage
router.get('/', async (req, res) => {

    const blogpostData = await Blogpost.findAll({
        include: User
    })

    const blogposts = blogpostData.map(blogpost => blogpost.get({ plain: true }))

    for (blogpost in blogposts){
        const post = blogposts[blogpost]
        console.log(post.updatedAt)
    }

    try { 
 
        res.render('homepage', {
            blogposts,
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