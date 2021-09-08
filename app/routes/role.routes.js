module.exports = app => {
    //Memanggil controller role
    const controller = require('../controllers/role.controller');

    let router = require('express').Router();

    router.get('/', controller.showRoles);
    router.post('/', controller.createRole);
    router.put('/:id', controller.updateRole);
    router.delete('/:id', controller.deleteRole);

    app.use('/api/role', router);
}