const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Memanggil model
const db = require('./app/models');

//Deklarasi express.js
const app = express();

//Membuat daftar web yang dapat mengonsumsi ValorantPI
let whiteList = [
    'http://localhost:8081'
];

//Mendaftarkan web yang dapat mengonsumsi ValorantPI
// let corsOption = {
//     origin: function (origin, callback) {
//         if (whiteList.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not Allowed by CORS!'));
//         }
//     }
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Migrasi tabel yang ada dalam setiap model
// db.sequelize.sync({ force: false });

//Inisasi routing pada halaman awal
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to ValorantPI!"
    });
});


require('./app/routes/weapon.routes')(app);
require('./app/routes/role.routes')(app);
require('./app/routes/hero.routes')(app);

//Inisiasi port yang akan dipakai
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})