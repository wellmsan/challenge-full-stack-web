// SequelizeDB
import Sequelize from 'sequelize'
import User from '../models/User'
import Student from '../models/Student'

// var TYPES = require('tedious').TYPES

var db = {}
let sequelize = null

class SequelizeDB {
    constructor(config, tz) {
        this.config = config
        this.tz = tz
    }

    connect() {
        sequelize = new Sequelize(this.config.database, this.config.username, this.config.password, this.config);
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        sequelize.sync({
            alter: process.env.NODE_ENV == 'development' ? true : false,
        }).then(() => {
            console.log('Nice! Database looks fine.')
        }).catch((err) => {
            console.error(err, 'Something went wrong with the Database Update!')
        })

        // Init Models
        const models = {
            User: User.init(sequelize, Sequelize),
            Student: Student.init(sequelize, Sequelize)

        }

        Object.values(models)
            .filter(model => typeof model.associate === "function")
            .forEach(model => model.associate(models));

        db = {
            ...models,
            sequelize
        };

        module.exports = db;
    }

    static close() {
        sequelize.close()
    }

}

export default SequelizeDB