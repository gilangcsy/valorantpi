module.exports = (sequelize, Sequelize) => {
    const hero = sequelize.define('hero', {
        heroName: {
            type: Sequelize.STRING
        },
        heroDescription: {
            type: Sequelize.TEXT
        },
        heroReleased: {
            type: Sequelize.DATE
        },
        roleID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'role',
                key: 'id'
            },
            onDelete: 'cascade'
        }
    }, {
        tableName: 'hero'
    })
    return hero;
}