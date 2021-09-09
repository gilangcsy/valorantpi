const { skill } = require('../models');
const db = require('../models');

//Memanggil model Hero
const Hero = db.hero;

//Memanggil model Role
const Role = db.role;

const Op = db.Sequelize.Op;

//GET hero data dari dalam database
exports.showHeros = (req, res) => {
    //Membuat variabel heroName untuk menampung data dari query params
    const heroName = req.query.heroName;

    //Membuat variabel condition
    let condition = heroName ? { heroName: { [Op.like]: `%${heroName}%` } } : null;

    Hero.findAll({
        where: condition,
        include: {
            model: skill
        }
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}

//INSERT hero ke dalam database
exports.createHero = (req, res) => {
    heroName = req.body.heroName;
    heroDescription = req.body.heroDescription;
    roleID = req.body.roleID;
    heroReleased = req.body.heroReleased;

    if (!heroName || !heroDescription || !roleID || !heroReleased) {
        res.status(400).send({
            message: "Content cannot empty!"
        })
    } else {
        Role.findByPk(roleID)
            .then(result => {
                if (result) {
                    const hero = {
                        heroName: heroName,
                        heroDescription: heroDescription,
                        roleID: roleID,
                        heroReleased: heroReleased
                    }
                    Hero.create(hero)
                        .then(result => {
                            res.status(200).send(result);
                        }).catch(err => {
                            res.status(500).send({
                                message: err.message || "There is a problem in the server."
                            });
                        });
                } else {
                    res.status(400).send({
                        message: `Role ID ${roleID} not found.`
                    });
                }
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "There is a problem in the server."
                });
            })
    }
}

//UPDATE hero data ke dalam database
exports.updateHero = (req, res) => {
    roleID = req.body.roleID;
    const id = req.params.id;

    Hero.update(req.body, {
        where: {
            id: id
        }
    }).then(result => {
        if (result == 1) {
            res.status(200).send({
                messagge: "Hero updated successfully!"
            });
        } else {
            res.status(400).send({
                message: `Hero ID ${id} not found!`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}

//DELETE hero data dari dalam database
exports.deleteHero = (req, res) => {
    const id = req.params.id;
    Hero.destroy({
        where: {
            id: id
        }
    }).then(result => {
        if (result == 1) {
            res.status(200).send({
                messagge: "Hero deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Hero ID ${id} not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}