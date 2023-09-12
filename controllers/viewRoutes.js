const { Blogpost } = require('../models');

const router = require('express').Router()
// const {User} = require('../models')

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

module.exports = router