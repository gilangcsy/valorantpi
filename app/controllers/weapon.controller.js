const db = require('../models');

//Memanggil model weapon
const Weapon = db.weapon;

const Op = db.Sequelize.Op;

//GET data weapon ke dalam database
exports.showWeapons = (req, res) => {
    const weaponName = req.query.weaponName;
    let condition = weaponName ? { weaponName: { [Op.like]: `%${weaponName}%` } } : null;
    Weapon.findAll({
        where: condition
    })
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occured."
            });
        });
}

//INSERT data weapon ke dalam database
exports.createWeapon = (req, res) => {
    //Membuat variabel untuk menampung data-data yang dikirim dari Body
    weaponName = req.body.weaponName;
    weaponDescription = req.body.weaponDescription;
    weaponType = req.body.weaponType;

    if (!weaponName || !weaponDescription || !weaponType) {
        res.status(400).send({
            message: 'Content cannot empty!'
        })
    } else {
        const weapon = {
            weaponName: weaponName,
            weaponDescription: weaponDescription,
            weaponType: weaponType,
        }

        Weapon.create(weapon)
            .then(data => {
                res.status(200).send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "There is a problem in the server."
                });
            });

    }
}

//UPDATE data weapon ke dalam database
exports.updateWeapon = (req, res) => {
    //Membuat variabel id untuk menampung data id yang dikirim dari Params
    id = req.params.id;

    Weapon.update(req.body, {
        where: {
            id: id
        }
    }).then(data => {
        if (data == 1) {
            res.status(200).send({
                message: "Weapon updated successfully!"
            })
        } else {
            res.status(400).send({
                message: "Cannot update Weapon!"
            })
        }
    })
}

//DELETE data weapon dari database
exports.deleteWeapon = (req, res) => {
    //Membuat variabel id untuk menampung data id yang dikirim dari Params
    id = req.params.id;

    Weapon.destroy({
        where: {
            id: id
        }
    }).then(data => {
        if (data == 1) {
            res.status(200).send({
                message: "Weapon delete successfully"
            });
        } else {
            res.send({
                message: "Cannot delete weapon"
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured."
        });
    })
}