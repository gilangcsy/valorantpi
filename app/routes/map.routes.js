module.exports = app => {
    //Memanggil controller map
    const controller = require('../controllers/map.controller');

    let router = require('express').Router();

    router.get('/', controller.showMaps);
    router.post('/', controller.createMap);
    router.put('/:id', controller.updateMap);
    router.delete('/:id', controller.deleteMap);

    app.use('/api/map', router);
}