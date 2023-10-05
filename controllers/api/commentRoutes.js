const router = require('express').Router()
const { Comment } = require('../../models')

router.post('/add-comment', async (req, res) => {

    console.log(req.body)

    res.end()
})

module.exports = router