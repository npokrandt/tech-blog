const sequelize = require('../config/connection')
const {DataTypes, Model} = require('sequelize')

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true           
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        blogpost_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Blogpost',
                key: 'id'
            }
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
        modelName: 'comment'
    }
)

module.exports = Comment