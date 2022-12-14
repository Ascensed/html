//Muestra el nuevo link si se esta logeado
if (localStorage.getItem('cuenta') !== undefined && localStorage.getItem('cuenta')) {

    const eliminar = document.getElementById('eliminar');
    eliminar.remove();

    const nuevoEnlace = document.createElement('A');

    nuevoEnlace.href = 'cuenta.html';

    nuevoEnlace.textContent = 'Mi cuenta';

    nuevoEnlace.classList.add('navegacion__enlace');

    const navegacion = document.querySelector('.navegacion');
    navegacion.appendChild(nuevoEnlace);
}

const actorPrincipal = JSON.parse(localStorage.getItem('actor'));

const Url = 'http://localhost:3000/films/actores/peliculas/' + actorPrincipal.id_actor;

const infoTitulo = document.getElementById('info__titulo');
const infoImagen = document.getElementById('info__imagen');

infoTitulo.innerHTML = actorPrincipal.nombre + ' ' + actorPrincipal.apellido
infoImagen.src = actorPrincipal.imagen;

const divSexo = document.getElementById('sexo');
const sexo = document.createElement('p');
divSexo.appendChild(sexo);
sexo.innerHTML = actorPrincipal.genero

const divEdad = document.getElementById('edad');
const edad = document.createElement('p');
divEdad.appendChild(edad);
edad.innerHTML = actorPrincipal.edad

const divPeliculas = document.getElementById('peliculas');

fetch(Url).then(data => {return data.json()}).then(res => {
    const peliculas = res;
    const divPeliculas = document.getElementById('peliculas');
    peliculas.forEach(pelicula => {
        const nuevaPelicula = document.createElement('a');
        const fechaNuevaPelicula = document.createElement('p');
        const duracionNuevaPelicula = document.createElement('p');
        divPeliculas.appendChild(nuevaPelicula);
        divPeliculas.appendChild(fechaNuevaPelicula);
        divPeliculas.appendChild(duracionNuevaPelicula);
        nuevaPelicula.innerHTML = pelicula.titulo
        nuevaPelicula.classList.add('nueva-pelicula');
        nuevaPelicula.href = 'pelicula.html';
        fechaNuevaPelicula.innerHTML = 'Fecha estreno: ' + pelicula.fecha_estreno;
        duracionNuevaPelicula.innerHTML = 'Duracion: ' + pelicula.duracion;

        nuevaPelicula.addEventListener('click', (e) => {
            localStorage.setItem('pelicula' ,pelicula.titulo);
        });
    })
});

const masActores = document.getElementById('masActores');
const otrosActores = JSON.parse(localStorage.getItem('otrosActores'));
otrosActores.forEach( actor => {
    const nuevoActor = document.createElement('p');
    nuevoActor.innerHTML = actor.nombre + ' ' + actor.apellido;
    masActores.appendChild(nuevoActor);
})