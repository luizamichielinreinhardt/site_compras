const { Sequelize } = require('sequelize')

const db = new Sequelize('a','root','root',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = db