// models??

/*
Blogpost
    title
    content
    comment_number
    user_id (connects to user)
Comment
    username
    content
    blogpost_id
    user_id
*/

const User = require('./User')
const Blogpost = require('./Blogpost')

module.exports = {User, Blogpost}