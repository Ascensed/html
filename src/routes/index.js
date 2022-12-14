const { Router } = require('express');
const router = Router();

const { getFilms, getUsuarios, getUsuarioPorId, deleteUsuario, putUsuario, getFilmPorId, getDirector, 
        getReparto, getGeneros, getGenero, putFavorito, getFavoritos, putValoracion, getPeliculasActor,
        putHistorial, getHistorial } = require('../controllers/index.controller');


// traer todos los usuarios
router.get('/usuarios', getUsuarios);

// traer un usuario
router.get('/usuarios/:id', getUsuarioPorId);

// traer todos los films
router.get('/films', getFilms);

// traer una film
router.get('/films/:id', getFilmPorId);


// crear usuario
router.post('/usuarios', putUsuario);

// borra un usuario
router.post('/usuarios/borrar/:id', deleteUsuario);

// editar un usuario
// router.put('/usuarios/:id', updateUsuario);

// traer director por id de pelicula
router.get('/films/director/:id', getDirector);

// traer actores por id de pelicula
router.get('/films/actores/:id', getReparto);

// traer todos los generos
router.get('/generos', getGeneros);

// traer genero por id de pelicula
router.get('/films/genero/:id', getGenero);

// dar favorito a film
router.post('/films/favorito/:id', putFavorito);

// trae favoritos de un usurios
router.get('/films/favorito/:id', getFavoritos);

// dar valoracion a film
router.post('/films/valoracion/:id', putValoracion);

// da peliculas de autor segun su id
router.get('/films/actores/peliculas/:id', getPeliculasActor);

// inserta pelicula en historial
router.post('/films/historial', putHistorial);

// trae historial de usuario
router.get('/films/historial/:id', getHistorial);

module.exports = router;