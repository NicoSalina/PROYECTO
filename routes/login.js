const express = require('express');
const router = express.Router();
const {auth} = require('./../models/usuarios')
const sha1 = require('sha1');
//const {validateLogin} = require('./../middlewares/usuarios');

const showLogin = (req, res) => res.render('login', {message: ''});

    const login = async (req, res) => {
        let {username, pass} = req.body;   // destructuring de los valores del login hbs
        pass = sha1(pass);
        const logged = await auth(username, pass);
        if (logged.length === 0) {
            res.render('login', {message: 'Usuario o pass incorrectos'});
        }
        else {
            const [{id, admin}] = logged;
            req.session.user = id;
            req.session.admin = admin;
            res.redirect('/usuarios');
    
        }
    }


router.get('/', showLogin);
router.post('/', login);
module.exports = router;

/*router.get('/', showLogin);
router.post('/', validateLogin, login);
module.exports = router;*/

//res.end();   // para que corte y no quede cargando
/* operadores ternarios 
logged.length === 0           // CONDICION       // hacemos un if para saber si la logitud es 1 estoy logeado si es 0 esta vacio
    ? res.render('login')    // SI SE CUMPLE LA CONDICION (IF)
    : null;                  // ELSE */                            
