module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define('role', {
        roleName: {
            type: Sequelize.STRING
        },
        roleDescription: {
            type: Sequelize.TEXT
        }
    }, {
        tableName: 'role'
    })
    return role;
}