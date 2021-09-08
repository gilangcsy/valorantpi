module.exports = (sequelize, Sequelize) => {
    const skill = sequelize.define('skill', {
        skillName: {
            type: Sequelize.STRING
        },
        skillDescription: {
            type: Sequelize.TEXT
        },
        heroID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'hero',
                key: 'id'
            },
        }
    }, {
        tableName: 'skill'
    })
    return skill;
}