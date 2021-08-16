const express = require('express');
const router = express.Router();
const {getAll, getSingle} = require('./../models/productos')

const get = async(req, res) =>{     // req -> LA VISTA LE MANDA INFO A LA RUTA res -> CUANDO LA RUTA LA MANDO INFO A LA VISTA como renderizar
    const productos = await getAll();
    res.render('productos', {productos});
}
const single = async(req, res) => {
    const {id} = req.params;
    const [producto] = await getSingle(id);    // SABIENDO QUE ES UN SOLO PRODUCTO LE APLICO DESCTRUCTURING DE ARRAY []
    res.render('producto', {producto});
}

router.get('/', get); 
router.get('/single/:id', single)    //:id hace que se pueda acceder desde req.params
module.exports = router; 