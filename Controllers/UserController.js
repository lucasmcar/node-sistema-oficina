const express = require('express');
const crypt = require('bcryptjs');
const router = express.Router();
const fs = require('fs');
const moment = require('moment');
const User = require('../Models/User');

router.post('/login',  (req, res) => {
    let name = req.params.user_name;
    let pass = req.params.user_pass;

    if(name != undefined && pass != undefined){
        res.redirect('/admin');
        return true
    }else {
        res.redirect('/');
    }
});

router.get('/users/create', (req,res)=> {
    res.render('../Views/users/create');
});

//Cadastrar usuário
router.post('/user/create/new', (req,res)=> {
    let username = req.body.user;
    let pass = req.body.pass;
    let admin = req.body.admin;

    //Verificando se já há um usuário no banco
    User.findOne({
        where :{
            user: username
        }
    }).then(user => {
        if(user == undefined)
        {
            //Método para cadastro do usuário
            User.create({
                user: username,
                pass: hash,
                accesslevel: admin
            }).then(() => {
                //gerando logs para possíveis correções futuras
                fs.writeFile('./logs/successlogs/successLog.txt', 
                moment().format('DD/MM/YYYY HH:mm') + ' - Usuário cadastrado com sucesso\n', 
                { 
                    encoding: 'utf-8', flag: 'a'}, (error) => {
                    if(error) throw error;
                });
            res.redirect('/');
            }).catch(error => {
                fs.writeFile('./logs/errlogs/errorsLog.txt', 
                moment().format('DD/MM/YYYY HH:mm') + ' - Não foi possível cadastrar ' + error + '\n', 
                { encoding: 'utf-8', flag: 'a'}, (error) => {
                    if(error) throw error;
                });
            });
        } else {
            res.send('Usuário já cadastrado');
        }
    });

    //cria o salt para gerar a hash da senha
    let salt = crypt.genSaltSync(10);
    let hash = crypt.hashSync(pass, salt);

    
});

module.exports = router;