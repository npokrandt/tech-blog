const router = require('express').Router()
const userRoutes = require('./userRoutes')
const blogpostRoutes = require('./blogpostRoutes')

router.use('/userRoutes', userRoutes)
router.use('/blogpostRoutes', blogpostRoutes)

module.exports = router