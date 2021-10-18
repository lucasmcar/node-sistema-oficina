const app = require('./config/server');
const connection = require('./database/database');
const fs = require('fs');
const moment = require('moment');
const session = require('express-session');

const userController = require("./Controllers/UserController");
const User = require('./Models/User');

//Conectando ao banco e gerando logs
connection
    .authenticate()
    .then(() => {
        fs.writeFile('./logs/successlogs/successLog.txt', 
        moment().format('DD/MM/YYYY hh:mm') + ' - Conectado com sucesso\n', 
        { 
            encoding: 'utf-8', flag: 'a'}, (error) => {
            if(error) throw error;
        });
    }).catch(error => {
        fs.writeFile('./logs/errlogs/errorsLog.txt', 
        moment().format('DD/MM/YYYY hh:mm') + ' - Houve algum erro ' + error + '\n', 
        { encoding: 'utf-8', flag: 'a'}, (error) => {
            if(error) throw error;
        });
    });

    app.use('/', userController);



app.use(session({
    secret: 'Qualquer coisa',
    cookie: {
         maxAge: 30000
    }
}));

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000);