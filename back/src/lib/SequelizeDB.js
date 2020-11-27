// SequelizeDB
import Sequelize from 'sequelize'
import User from '../models/User'
import Student from '../models/Student'

// var TYPES = require('tedious').TYPES

var db = {}
let sequelize = null
const Op = Sequelize.Op;
const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    //   $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    //   $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    //   $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    //   $iRegexp: Op.iRegexp,
    //   $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    //   $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    //   $adjacent: Op.adjacent,
    //   $strictLeft: Op.strictLeft,
    //   $strictRight: Op.strictRight,
    //   $noExtendRight: Op.noExtendRight,
    //   $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    //   $or: Op.or,
    //   $any: Op.any,
    //   $all: Op.all,
    //   $values: Op.values,
    //   $col: Op.col
};


class SequelizeDB {
    constructor(host, tz) {
        this.url = host
        this.tz = tz
    }

    connect() {
        sequelize = new Sequelize(this.url, {
            dialectOptions: {
                useUTC: false,
                dateStrings: true,
                typeCast: true,
            },
            timezone: this.tz,
        });
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