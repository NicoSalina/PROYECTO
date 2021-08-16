const mysql = require('mysql');
const util = require('util');

// consultas en crudo: SELECT*FROM usuairios
// query builder knexjs bd('usuario').select(*)   PROYECTOS GRANDES
// ORM Eloquent                                   PROYECTOS MUY GRANDES

let pool = mysql.createPool({  // pool es una cola de conexiones, permite hacer conexiones en simultaneo, es un una sola conexion .createConnection
    /*host : 'localhost',
    user : 'root',
    password : '',  
    port : '3306',      // lo saco de XAMPP
    database : 'pwi2021'  // nombre de nuestra base de dato
    */  // LO HAGO CON .ENV asi no se me ven los datos
    host : process.env.DB_HOST || 'localhost',
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASS || '',
    port : process.env.DB_PORT || 3306, 
    database : process.env.DB_DATABASE || 'pwifinal',
    //connectionLimit : 10,      //cola pedido de inf - consultas de pagina 
}); 

pool.query = util.promisify(pool.query);       //.query es la consulta  // util.promisify es una funcion de util que nos convierte lo que queramos en promesa  [LA CONSULTA LA CONVERTIMOS EN PROMESA]

module.exports = pool;