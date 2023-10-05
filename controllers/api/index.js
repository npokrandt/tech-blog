const router = require('express').Router()

const userRoutes = require('./userRoutes')
const blogpostRoutes = require('./blogpostRoutes')
const commentRoutes = require('./commentRoutes')

router.use('/userRoutes', userRoutes)
router.use('/blogpostRoutes', blogpostRoutes)
router.use('/commentRoutes', commentRoutes)

module.exports = router