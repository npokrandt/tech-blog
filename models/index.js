// models??

/*
User (duh)
    username
    password (encrypted)
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

module.exports = {User}