module.exports = app => {
    //Memanggil controller role
    const controller = require('../controllers/hero.controller');

    let router = require('express').Router();

    router.get('/', controller.showHeros);
    router.post('/', controller.createHero);
    router.put('/:id', controller.updateHero);
    router.delete('/:id', controller.deleteHero);

    app.use('/api/hero', router);
}