const router = require('express').Router()
const { Blogpost } = require('../../models')

router.post('/add-blogpost', async (req, res) => {

    const {title, content} = req.body
    const user_id = req.session.user_id
    let slug = title.split(' ').join('-').toLowerCase()
    slug = slug + '-' + user_id

    console.log(slug)
    try {
        const newBlogpost = await Blogpost.create({
            title,
            slug,
            content,
            user_id
        })

        res.status(201).json(newBlogpost)

        res.end()
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router