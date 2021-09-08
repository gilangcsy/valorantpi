module.exports = app => {
    //Memanggil controller skill
    const controller = require('../controllers/skill.controller');

    let router = require('express').Router();

    router.get('/', controller.showSkills);
    router.post('/', controller.createSkill);
    router.put('/:id', controller.updateSkill);
    router.delete('/:id', controller.deleteSkill);

    app.use('/api/hero/skill', router);
}