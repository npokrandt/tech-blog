const router = require('express').Router()
const { Comment, Blogpost, User } = require('../../models')

router.post('/add-comment', async (req, res) => {
    try {
        const {content, slug} = req.body
        const user_id = req.session.user_id

        //get the id of the blog's author
        const author_id = await User.findOne({
            where: {
                username: slug.slugPartTwo,
            },
            raw: true
        })

        const fullslug = slug.slugPartOne + '-' + author_id.id
        
        const thisBlog = await Blogpost.findOne({
            where: {
                slug: fullslug
            },
            raw: true
        })

        const blogpost_id = thisBlog.id

        const newComment = await Comment.create({
            content,
            blogpost_id,
            user_id
        })

        res.status(201).json(newComment)
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
})

module.exports = router