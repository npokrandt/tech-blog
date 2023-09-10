const sequelize = require('../config/connection')
const { User, Blogpost } = require('../models')

const userData = require('./userSeeds.json')
const blogpostData = require('./blogpostSeeds.json')

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

    process.exit(0)
}

seedDatabase()