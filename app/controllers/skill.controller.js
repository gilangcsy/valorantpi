const db = require('../models');

//Memanggil model Skill
const Skill = db.skill;

//Memanggil model Hero
const Hero = db.hero;

const Op = db.Sequelize.Op;

//GET skill data dari dalam database
exports.showSkills = (req, res) => {
    //Membuat variabel skillName untuk menampung data dari query params
    const skillName = req.query.skillName;

    //Membuat variabel condition
    let condition = skillName ? { skillName: { [Op.like]: `%${skillName}%` } } : null;

    Skill.findAll({
        where: condition
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}

exports.createSkill = (req, res) => {
    skillName = req.body.skillName;
    skillDescription = req.body.skillDescription;
    heroID = req.body.heroID;

    if (!skillName || !skillDescription || !heroID) {
        res.status(400).send({
            message: "Content cannot be empty!"
        })
    } else {
        const skill = {
            skillName: skillName,
            skillDescription: skillDescription,
            heroID: heroID
        }

        Skill.create(skill)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "There is a problem in the server."
                })
            });
    }
}

//UPDATE skill data ke dalam database
exports.updateSkill = (req, res) => {
    const id = req.params.id;

    Skill.update(req.body, {
        where: {
            id: id
        }
    }).then(result => {
        if (result == 1) {
            res.status(200).send({
                messagge: "Skill updated successfully!"
            });
        } else {
            res.status(400).send({
                message: `Skill ID ${id} not found!`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}
//DELETE skill data dari dalam database
exports.deleteSkill = (req, res) => {
    const id = req.params.id;
    Skill.destroy({
        where: {
            id: id
        }
    }).then(result => {
        if (result == 1) {
            res.status(200).send({
                messagge: "Skill deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Skill ID ${id} not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}