const {DataTypes, Model} = require('sequelize')
const sequelize = require('../config/connection')

class Blogpost extends Model {}

Blogpost.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true           
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        comment_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        modelName: 'blogpost'
    }
)

module.exports = Blogpost
