module.exports = (sequelize, Sequelize) => {
    const map = sequelize.define('map', {
        mapName: {
            type: Sequelize.STRING
        },
        mapDescription: {
            type: Sequelize.TEXT
        },
        mapReleased: {
            type: Sequelize.DATE
        }
    }, {
        tableName: 'map'
    })
    return map;
}