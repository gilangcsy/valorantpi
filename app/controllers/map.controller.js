const db = require('../models');

//Memanggil model map
const Map = db.map;

const Op = db.Sequelize.Op;

//GET map data dari database
exports.showMaps = (req, res) => {
    const mapName = req.query.mapName;
    let condition = mapName ? { mapName: { [Op.like]: `%${mapName}%` } } : null;

    Map.findAll({
        where: condition
    }).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        })
    })
}

//INSERT map data ke dalam database
exports.createMap = (req, res) => {
    mapName = req.body.mapName;
    mapDescription = req.body.mapDescription;
    mapReleased = req.body.mapReleased;

    if (!mapName || !mapDescription || !mapReleased) {
        res.status(400).send({
            message: "Content cannot empty!"
        })
    } else {
        const map = {
            mapName: mapName,
            mapDescription: mapDescription,
            mapReleased: mapReleased
        }

        Map.create(map)
            .then(result => {
                res.status(200).send(result);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "There is a problem in the server."
                });
            });
    }
}

//UPDATE map data ke dalam databse
exports.updateMap = (req, res) => {
    const id = req.params.id;
    Map.update(req.body, {
        where: {
            id: id
        }
    }).then(result => {
        if (result == 1) {
            res.status(200).send({
                messagge: "Map updated successfully!"
            });
        } else {
            res.status(400).send({
                message: `Map ID ${id} not found!`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}

//DELETE map data dari dalam database
exports.deleteMap = (req, res) => {
    const id = req.params.id;
    Map.destroy({
        where: {
            id: id
        }
    }).then(result => {
        if (result == 1) {
            res.status(200).send({
                messagge: "Map deleted successfully!"
            });
        } else {
            res.status(400).send({
                message: `Map ID ${id} not found!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "There is a problem in the server."
        });
    });
}