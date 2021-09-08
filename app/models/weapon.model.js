module.exports = (sequelize, Sequelize) => {
    const weapon = sequelize.define('weapon', {
        weaponName: {
            type: Sequelize.STRING
        },
        weaponDescription: {
            type: Sequelize.TEXT
        },
        weaponType: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'weapon'
    })
    return weapon;
}