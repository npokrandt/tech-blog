const User = require('./User')
const Blogpost = require('./Blogpost')
const Comment = require('./Comment')

//associations:
//one user has many blogposts; each blogpost belongs to one user
//one user has many comments; each comment belongs to one user
//one blogpost has many comments; each comment belongs to one blogpost

module.exports = {User, Blogpost, Comment}