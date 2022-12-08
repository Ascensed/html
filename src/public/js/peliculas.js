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

const Url = 'http://localhost:3000/films';
let films = [];
let peliculas = [];
let series = [];
let i = 1;

fetch(Url).then(data => {return data.json()}).then(res => {
    console.log(res)
    films = res;
    // definirTitulo(films);
    definirGenero(films);
});

// definirTitulo = (films, e) => {
//     console.log(films);
//     let i = 1;
//     films.forEach(film => {
//         const tituloPelicula = document.getElementById('tit' + i);
//         const imagenPelicula = document.getElementById('img' + i);
//         tituloPelicula.innerHTML = film.titulo;
//         imagenPelicula.src = film.imagen;
//         i++;
//     });
// }

definirGenero = (film, e) => {
    film.forEach(film => {
        if(film.tipo == 'Pelicula'){
            peliculas.push(film);
        }
        else if(film.tipo == 'Serie'){
            series.push(film);
        }
        else{
            console.log('Sin tipo valido');
        }
    })
    muestraPeliculas(peliculas);

};

muestraPeliculas = (peliculas) => {


    const eliminarTexto = document.getElementById('eliminarTexto');
    eliminarTexto.remove();

    peliculas.forEach(pelicula => {

        const contenedorPelicula = document.getElementById('contenedor-pelicula');
        contenedorPelicula.classList.add('contenedor-pelicula');
        const linkPelicula = document.createElement('a');
        linkPelicula.href = '#';
        const divPelicula = document.createElement('div');
        divPelicula.classList.add('pelicula');
        const peliculaImagen = document.createElement('div');
        peliculaImagen.classList.add('pelicula__imagen');
        const imagen = document.createElement('img');
        const peliculaTitulo = document.createElement('div');
        peliculaTitulo.classList.add('pelicula__titulo');
        const titulo = document.createElement('h4');

        peliculaImagen.appendChild(imagen);
        peliculaTitulo.appendChild(titulo);

        divPelicula.appendChild(peliculaImagen);
        divPelicula.appendChild(peliculaTitulo);

        linkPelicula.appendChild(divPelicula);
        contenedorPelicula.appendChild(linkPelicula);



        imagen.id = 'img' + i;
        titulo.id = 'tit' + i;

        const imagenPelicula = document.getElementById('img' + i);
        const tituloPelicula = document.getElementById('tit' + i);
        imagenPelicula.src = pelicula.imagen;
        tituloPelicula.innerHTML = pelicula.titulo;
        i++;

    });
}
