//Memamnggil data-data kongigurasi database
const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');

const conn = process.env.DATABASE_URL;

//Konifgurasi database
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorAliases: false,
//     timezone: dbConfig.timezone,
//     pool: {
//         max: dbConfig.pool.max,
//         min: dbConfig.pool.min,
//         acquire: dbConfig.pool.acquire,
//         idle: dbConfig.pool.idle,
//     },
//     // use_env_variable: dbConfig.use_env_variable
// })

const sequelize = new Sequelize(dbConfig.use_env_variable, {
    // host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorAliases: false,
    timezone: dbConfig.timezone,
    ssl: {
        require: true,
        rejectUnauthorized: false
    }

    // pool: {
    //     max: dbConfig.pool.max,
    //     min: dbConfig.pool.min,
    //     acquire: dbConfig.pool.acquire,
    //     idle: dbConfig.pool.idle,
    // },
    // use_env_variable: dbConfig.use_env_variable
})


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Memanggil model-model yang sudah dibuat
db.hero = require('./hero.model.js')(sequelize, Sequelize);
db.map = require('./map.model')(sequelize, Sequelize);
db.role = require('./role.model')(sequelize, Sequelize);
db.skill = require('./skill.model')(sequelize, Sequelize);
db.weapon = require('./weapon.model')(sequelize, Sequelize);

db.hero.hasMany(db.skill);
db.skill.belongsTo(db.hero);


module.exports = db;