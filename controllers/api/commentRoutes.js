const router = require('express').Router()
const { Comment } = require('../../models')

router.post('/add-comment', async (req, res) => {
    try {
        const {content} = req.body
        const user_id = req.session.user_id

        const newComment = await Comment.create({
            content,
            blogpost_id: 1,
            user_id
        })

        res.status(201).json(newComment)
    
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
})

module.exports = router