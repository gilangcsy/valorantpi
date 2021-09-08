const db = require('../models');

//Memanggil model weapon
const Role = db.role;

const Op = db.Sequelize.Op;

//GET role data dari database
exports.showRoles = (req, res) => {
    const roleName = req.query.roleName;
    let condition = roleName ? { roleName: { [Op.like]: `%${roleName}%` } } : null;

    Role.findAll({
        where: condition
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        })
    })
}

//INSERT role data ke dalam database
exports.createRole = (req, res) => {
    roleName = req.body.roleName;
    roleDescription = req.body.roleDescription;

    if (!roleName || !roleDescription) {
        res.status(400).send({
            message: "Content cannot empty!"
        })
    } else {
        const role = {
            roleName: roleName,
            roleDescription: roleDescription
        }

        Role.create(role)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "There is a problem in the server."
                });
            });
    }
}

//UPDATE role data ke dalam databse
exports.updateRole = (req, res) => {
    const id = req.params.id;
    Role.update(req.body, {
        where: {
            id: id
        }
    }).then(result => {
        if (result == 1) {
            res.status(200).send({
                messagge: "Role updated successfully!"
            });
        } else {
            res.status(400).send({
                message: "Cannot update Role!"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}

//DELETE role data dari dalam database
exports.deleteRole = (req, res) => {
    const id = req.params.id;
    Role.destroy({
        where: {
            id: id
        }
    }).then(result => {
        if (result == 1) {
            res.status(200).send({
                messagge: "Role deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: "Cannot delete Role!"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}