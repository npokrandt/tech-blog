const router = require('express').Router()
const { Blogpost } = require('../../models')

router.post('/add-blogpost', async (req, res) => {

    //console.log(req.body)
    try {
        //we have the title and content, now we just need the user id

        res.end()
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router