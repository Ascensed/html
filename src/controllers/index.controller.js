const { Pool } = require('pg'); 

const pool = new Pool({
    host: '157.245.180.1',
    user: 'alumno',
    password: 'alumno',
    database: 'netflics',
    port: 5432
});

// Trae todos los usuarios
const getUsuarios = async (req, res) => {
    const response = await pool.query('select * from usuario');
    res.status(200).json(response.rows);
};

// Trae todas las peliculas
const getFilms = async (req, res) => {
    const response = await pool.query('select * from film');
    res.status(200).json(response.rows);
};

// Crea un usuario
const putUsuario = async (req, res) => {
    console.log(req.body);
    const { nombre, apellido, edad, email, password, telefono } = req.body;
    const response = await pool.query('INSERT INTO usuario (nombre, apellido, edad, email, contraseña, telefono) VALUES ($1, $2, $3, $4, $5, $6)', [nombre, apellido, edad, email, password, telefono]);
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: { nombre, apellido }
        }
    });
};

// Trae un usuario por su id
const getUsuarioPorId = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * from usuario where id = $1', [id]);
    res.json(response.rows);
};

// Trae una film por su id
const getFilmPorId = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * from film where id_film = $1', [id]);
    res.json(response.rows);
};

// Borra un usuario
const deleteUsuario = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE FROM usuario where id = $1', [id]);
    console.log(response);
    res.json({
        message: 'Usuario Borrado',
    });
};

// Trae un director por id de pelicula
const getDirector = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT nombre, apellido from director where id_director = (SELECT id_director from film where id_film = $1)', [id]);
    res.json(response.rows);
};

// Trae un director por id de pelicula
const getReparto = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * from elenco e join actor a on e.id_actor = a.id_actor and id_film = $1', [id]);
    res.json(response.rows);
};

// Trae todas los generos
const getGeneros = async (req, res) => {
    const response = await pool.query('select * from genero');
    res.status(200).json(response.rows);
};

// Trae un director por id de pelicula
const getGenero = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT nombre from genero join film on genero.id_genero = film.id_genero where film.id_film = $1', [id]);
    res.json(response.rows);
};

// Da favorito a una pelicula
const putFavorito = async (req, res) => {
    const id = req.params.id;
    const { id_user } = req.body;
    const response = await pool.query('INSERT INTO lista_favoritos (id_usuario, id_film) VALUES ($1, $2)', [id_user, id]);
    console.log(response);
    res.json({
        message: 'Pelicula agregada a favoritos',
    });
};

// Trae los favoritos de el usuario
const getFavoritos = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT film.id_film, film.titulo, genero.nombre, film.imagen from film join lista_favoritos on film.id_film = lista_favoritos.id_film join genero on film.id_genero = genero.id_genero join usuario on lista_favoritos.id_usuario = usuario.id_usuario where usuario.id_usuario = $1', [id]);
    res.json(response.rows);
};

// Da valoracion a una pelicula
const putValoracion = async (req, res) => {
    const id = req.params.id;
    const { valoracion } = req.body;
    const response = await pool.query('UPDATE film SET valoracion = $1 WHERE film.id_film = $2', [valoracion, id]);
    console.log(response);
    res.json({
        message: 'Valoracion actualizada con exito',
    });
};

// Trae los favoritos de el usuario
const getPeliculasActor = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('select * FROM film join elenco on film.id_film = elenco.id_film join actor on elenco.id_actor = actor.id_actor WHERE actor.id_actor = $1', [id]);
    res.json(response.rows);
};

// Da valoracion a una pelicula
const putHistorial = async (req, res) => {
    const { id_usuario, id_pelicula } = req.body;
    const response = await pool.query('INSERT INTO historial (id_usuario, id_film) VALUES ($1, $2)', [id_usuario, id_pelicula]);
    console.log(response);
    res.json({
        message: 'Pelicula agregada al historial',
    });
};

// Trae historial de usuario
const getHistorial = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * from film join historial on film.id_film = historial.id_film join usuario on historial.id_usuario = usuario.id_usuario where usuario.id_usuario = $1', [id]);
    res.json(response.rows);
};

// const updateUsuario = async (req, res) => {
//     const id = req.params.id;
//     const { nombre, apellido, contrasena, edad } = req.body;
//     const response = await pool.query('UPDATE usuario SET nombre = $1, apellido = $2, contrasena = $3, edad = $4 WHERE id_usuario = $5', [nombre, apellido, contrasena, edad, id]);
//     console.log(response);
//     res.json('Usuario updated successfully');
// };

module.exports = {
    getFilms,
    getUsuarios,
    getFilmPorId,
    getUsuarioPorId,
    deleteUsuario,
    putUsuario,
    getDirector,
    getReparto,
    getGeneros,
    getGenero,
    putFavorito,
    getFavoritos,
    putValoracion,
    getPeliculasActor,
    putHistorial,
    getHistorial
}