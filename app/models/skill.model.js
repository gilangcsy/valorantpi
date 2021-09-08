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
            onDelete: 'cascade'
        }
    }, {
        tableName: 'skill'
    })
    return skill;
}