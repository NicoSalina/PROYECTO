const pool = require('./../utils/bd');

const getAll = async() => {   //una ejecucion de una query tarde, es una promesa
    const query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, c.nombre AS nombreCategoria FROM ?? AS p JOIN ?? AS c ON p.id_categoria = c.id WHERE p.eliminado = 0";
    const params = [process.env.T_PRODUCTOS, process.env.T_CATEGORIAS];
    const rows = await pool.query(query, params);  //query es nuestra consulta y le paso los params (parametros) son los ?? de mi query
    return rows;
}
const getSingle = async(id) => { // el single al ser una sola fila que la identifico por mi id o lo que quiera, le tengo que agergar un WHERE
    const query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, p.id_categoria, c.nombre AS nombreCategoria FROM ?? AS p JOIN ?? AS c ON p.id_categoria = c.id WHERE p.id = ? AND p.eliminado = 0";
    const params = [process.env.T_PRODUCTOS, process.env.T_CATEGORIAS, id];
    const rows = await pool.query(query, params); //query es nuestra consulta y le paso los params (parametros) son los ?? de mi query
    return rows;
}
const create = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [process.env.T_PRODUCTOS, obj];
    return await pool.query(query, params);
}
const update = async(id, obj) => {
    const query = "UPDATE ?? SET ? WHERE id = ?";
    const params = [process.env.T_PRODUCTOS, obj, id];
    return await pool.query(query, params);
}
const del = async(id) => { // ELIMINADO LOGICO
    const query = "UPDATE ?? SET eliminado = 1 WHERE id = ?";
    const params = [process.env.T_PRODUCTOS, id];
    return await pool.query(query, params);
}
const getNombre = async(nombre) => {
    const query = "SELECT p.id, p.nombre, p.descripcion, p.precio, p.stock, p.id_categoria, c.nombre AS nombreCategoria FROM ?? AS p JOIN ?? AS c ON p.id_categoria = c.id WHERE p.nombre LIKE ? AND p.eliminado = 0";
    const params = [process.env.T_PRODUCTOS, process.env.T_CATEGORIAS, nombre];
    const rows = await pool.query(query, params);
    return rows;
}

module.exports = {getAll, getSingle, create, update, del, getNombre}
