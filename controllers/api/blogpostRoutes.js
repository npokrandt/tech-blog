const router = require('express').Router()
const { User, Blogpost, Comment } = require('../../models')

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
    } catch (err) {
        res.status(400).json(err);
    }
})

//for editing posts
router.put('/edit-blogpost', async (req, res) => {
    const {oldTitle, title, content} = req.body
    const user_id = req.session.user_id
    let oldSlug = oldTitle.split(' ').join('-').toLowerCase()
    let slug = title.split(' ').join('-').toLowerCase()
    oldSlug = oldSlug + '-' + user_id
    slug = slug + '-' + user_id
    
    console.log(title, content, slug, oldSlug)
    
    try {
        const editedBlogpost = await Blogpost.update(
            {
                title,
                slug,
                content,
            },
            {
            where: {
                slug: oldSlug
            },
            raw: true
            }
        )
    
        res.status(200).json(editedBlogpost)

    } catch (err) {
        res.status(400).json(err);
    }
})

router.delete('/delete-blogpost', async (req, res) => {
    const slug = req.body

    try {
        const author_id = await User.findOne({
            where: {
                username: slug.slugPartTwo,
            },
            raw: true
        })

        const fullslug = slug.slugPartOne + '-' + author_id.id

        console.log(fullslug)

        //get blog_id to delete the comments too
        const post = await Blogpost.findOne({
            where: {
                slug: fullslug
            },
            raw: true
        })

        const blogpost_id = post.id

        const deleteComments = Comment.destroy({
            where: {
                blogpost_id
            }
        })

        const deletePost = await Blogpost.destroy({
            where: {
                id: blogpost_id
            }
        })

        res.status(200).json({deletePost, deleteComments})
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router