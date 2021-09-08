module.exports = app => {
    //Memanggil controller weapon
    const controller = require('../controllers/weapon.controller');

    let router = require('express').Router();

    router.get('/', controller.showWeapons);
    router.post('/', controller.createWeapon);
    router.put('/:id', controller.updateWeapon);
    router.delete('/:id', controller.deleteWeapon);

    app.use('/api/weapon', router);
}