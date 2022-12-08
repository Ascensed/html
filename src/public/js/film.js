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

fetch(Url).then(data => { return data.json() }).then(res => {
    console.log(res)
    films = res;
    // definirTitulo(films);
    definirGenero(films);
});

definirGenero = (film, e) => {
    film.forEach(film => {
        if (film.tipo == 'Pelicula') {
            peliculas.push(film);
        }
        else if (film.tipo == 'Serie') {
            series.push(film);
        }
        else {
            console.log('Sin tipo valido');
        }
    })
    muestraPeliculas(peliculas);
    muestraSeries(series);

};

let eliminarTexto;
let contenedorPelicula;
let linkPelicula;
let divPelicula;
let peliculaImagen;
let imagen;
let peliculaTitulo;
let titulo;
let imagenPelicula;
let tituloPelicula;
let contenedorSerie;

muestraPeliculas = (peliculas) => {
    eliminarTexto = document.getElementById('eliminarTexto');
    eliminarTexto.remove();

    peliculas.forEach(pelicula => {

        contenedorPelicula = document.getElementById('contenedor-pelicula');
        contenedorPelicula.classList.add('contenedor-pelicula');
        linkPelicula = document.createElement('a');
        linkPelicula.id = 'irPelicula' + i;
        linkPelicula.href = 'pelicula.html'
        divPelicula = document.createElement('div');
        divPelicula.classList.add('pelicula');
        peliculaImagen = document.createElement('div');
        peliculaImagen.classList.add('pelicula__imagen');
        imagen = document.createElement('img');
        peliculaTitulo = document.createElement('div');
        peliculaTitulo.classList.add('pelicula__titulo');
        titulo = document.createElement('h4');

        peliculaImagen.appendChild(imagen);
        peliculaTitulo.appendChild(titulo);

        divPelicula.appendChild(peliculaImagen);
        divPelicula.appendChild(peliculaTitulo);

        linkPelicula.appendChild(divPelicula);
        contenedorPelicula.appendChild(linkPelicula);

        imagen.id = 'img' + i;
        titulo.id = 'tit' + i;

        imagenPelicula = document.getElementById('img' + i);
        tituloPelicula = document.getElementById('tit' + i);
        imagenPelicula.src = pelicula.imagen;
        tituloPelicula.innerHTML = pelicula.titulo;
        i++;
    });

}

muestraSeries = (series) => {


    eliminarTexto = document.getElementById('eliminarTexto');
    eliminarTexto.remove();

    series.forEach(serie => {

        contenedorSerie = document.getElementById('contenedor-serie');
        contenedorSerie.classList.add('contenedor-serie');
        linkPelicula = document.createElement('a');
        linkPelicula.id = 'irPelicula' + i;
        linkPelicula.href = 'pelicula.html'
        divPelicula = document.createElement('div');
        divPelicula.classList.add('pelicula');
        peliculaImagen = document.createElement('div');
        peliculaImagen.classList.add('pelicula__imagen');
        imagen = document.createElement('img');
        peliculaTitulo = document.createElement('div');
        peliculaTitulo.classList.add('pelicula__titulo');
        titulo = document.createElement('h4');

        peliculaImagen.appendChild(imagen);
        peliculaTitulo.appendChild(titulo);

        divPelicula.appendChild(peliculaImagen);
        divPelicula.appendChild(peliculaTitulo);

        linkPelicula.appendChild(divPelicula);
        contenedorSerie.appendChild(linkPelicula);

        imagen.id = 'img' + i;
        titulo.id = 'tit' + i;

        imagenPelicula = document.getElementById('img' + i);
        tituloPelicula = document.getElementById('tit' + i);
        imagenPelicula.src = serie.imagen;
        tituloPelicula.innerHTML = serie.titulo;
        i++;
    });
}

setTimeout(() => {
    for(let i = 1; i <= films.length; i++){
        const linkIrPelicula = document.getElementById('irPelicula' + i);

        linkIrPelicula.addEventListener('click', (e) => {
            localStorage.removeItem('pelicula');
            const titulo = document.getElementById('tit' + i);
            localStorage.setItem('pelicula' ,titulo.innerHTML);
        });
    }
}, 1000)



