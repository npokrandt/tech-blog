const User = require('./User')
const Blogpost = require('./Blogpost')
const Comment = require('./Comment')

//associations:
//one user has many blogposts; each blogpost belongs to one user
User.hasMany(Blogpost, {foreignKey: 'user_id'})

Blogpost.belongsTo(User, {foreignKey: 'user_id'})

//one user has many comments; each comment belongs to one user
User.hasMany(Comment, {foreignKey: 'user_id'})

Comment.belongsTo(User, {foreignKey: 'user_id'})

//one blogpost has many comments; each comment belongs to one blogpost
Blogpost.hasMany(Comment, {foreignKey: 'user_id'})

Comment.belongsTo(Blogpost, {foreignKey: 'user_id'})

module.exports = {User, Blogpost, Comment}