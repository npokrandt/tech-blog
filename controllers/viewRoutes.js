const { Blogpost } = require('../models');

const router = require('express').Router()
// const {User} = require('../models')

//homepage
router.get('/', async (req, res) => {

    const blogposts = await Blogpost.findAll({raw: true})

    try {
 
        res.render('homepage', {
            blogposts
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