module.exports = {
    HOST: 'ec2-52-0-93-3.compute-1.amazonaws.com',
    USER: 'eflxyfewkrtccw',
    PASSWORD: 'c217efea8055156483290fa889798bab58a87d00f22c198a8e7dee83c25e2bc4',
    DB: 'd3tm3hbrpno707',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: "+07:00",
    use_env_variable: process.env.DATABASE_URL
}