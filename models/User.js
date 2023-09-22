const { DataTypes, Model} = require('sequelize')
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection')
const saltRounds = 10

class User extends Model {
    checkPassword(loginPw) {
        //console.log(loginPw, this.password)
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        }
    },
    {
        hooks: {
            beforeCreate: async function(user){
                user.password = await bcrypt.hash(user.password, saltRounds)
            },
            beforeUpdate: async function(user){
                user.password = await bcrypt.hash(user.password, saltRounds)
            },

        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User