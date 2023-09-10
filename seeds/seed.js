const sequelize = require('../config/connection')
const { User, Blogpost, Comment } = require('../models')

const userData = require('./userSeeds.json')
const blogpostData = require('./blogpostSeeds.json')
const commentData = require('./commentSeeds.json')

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    await Blogpost.bulkCreate(blogpostData, {
        individualHooks: true,
        returning: true
    })

    await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true
    })

    process.exit(0)
}

seedDatabase()