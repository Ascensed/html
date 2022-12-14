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
let actores = [];
const peliculaSeleccionada = localStorage.getItem('pelicula');
let idPelicula;

setTimeout(() => {
    films.forEach( film => {
        if(film.titulo == peliculaSeleccionada){
            idPelicula = film.id_film;
            const histoData = eventToHistorialData(idPelicula);
            const jsonHistoData = JSON.stringify(histoData);
            fetch("http://localhost:3000/films/historial", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: jsonHistoData
            });
        }
    })
}, 2000);

function eventToHistorialData(idPelicula) {
    return {
        id_usuario: JSON.parse(localStorage.getItem('cuenta')).id_usuario,
        id_pelicula: idPelicula
    };
};

fetch(Url).then(data => { return data.json() }).then(res => {
    console.log(res)
    films = res;
    traePelicula(films);
});

traePelicula = (films) => {
    films.forEach(film => {
        if (film.titulo == peliculaSeleccionada) {
            console.log('La pelicula seleccionada es: ' + film.titulo);
            const infoTitulo = document.getElementById('info__titulo');
            const infoImagen = document.getElementById('info__imagen');
            const infoDescripcion = document.getElementById('info__descripcion');
            const infoValoracion = document.getElementById('info__valoracion');
            const infoGenero = document.getElementById('info__genero');
            const infoDuracion = document.getElementById('info__duracion');

            infoTitulo.innerHTML = film.titulo;
            infoImagen.src = film.imagen;
            infoDescripcion.innerHTML = film.descripcion;
            infoValoracion.innerHTML = 'Valoracion: ' + film.valoracion + ' / 10';
            // infoGenero.innerHTML = 'Genero: ' + film.id_genero;
            infoDuracion.innerHTML = 'Duracion: ' + film.duracion;


            const director = document.getElementById('director');
            const nombreDirector = document.createElement('p');
            nombreDirector.classList.add('nombre__director')
            nombreDirector.href = '#';
            director.appendChild(nombreDirector);

            const UrlGenero = 'http://localhost:3000/films/genero/' + film.id_film;
            fetch(UrlGenero).then(data => { return data.json() }).then(res => {
                infoGenero.innerText = 'Genero: ' + res[0].nombre;
            });

            const UrlDirector = 'http://localhost:3000/films/director/' + film.id_film;
            fetch(UrlDirector).then(data => { return data.json() }).then(res => {
                nombreDirector.innerText = res[0].nombre + ' ' + res[0].apellido;
            });

            const UrlReparto = 'http://localhost:3000/films/actores/' + film.id_film;
            fetch(UrlReparto).then(data => { return data.json() }).then(res => {
                // nombreDirector.innerText = res[0].nombre + ' ' + res[0].apellido;
                actores = res
                asignarReparto(actores);
            });

            const favorito = document.getElementById('favorito');
            favorito.addEventListener('click', function (evento) {
                evento.preventDefault();
                const userData = eventToUserDataFavorito();
                const jsonuserData = JSON.stringify(userData);
                fetch("http://localhost:3000/films/favorito/" + film.id_film, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: jsonuserData
                });
                alert('Pelicula agregada a favoritos!');
            });

            const valorar = document.getElementById('valorar');
            valorar.addEventListener('click', function () {
                const valoracion = document.getElementById('valoracion');
                const valoracionOriginal = film.valoracion;
                const promedioValoracion = (parseInt(valoracion.value) + parseInt(valoracionOriginal)) / 2;

                const valoracionData = eventToUserDataValorar(promedioValoracion);
                const jsonValoracionData = JSON.stringify(valoracionData);

                fetch("http://localhost:3000/films/valoracion/" + film.id_film, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: jsonValoracionData
                });
                alert('Muchas gracias por valorar la pelicula');
            })

        }
    });
};

asignarReparto = actores => {
    let i = 0;
    actores.forEach(actor => {
        const reparto = document.getElementById('reparto');
        const nuevaPersona = document.createElement('a');
        nuevaPersona.href = 'actor.html'
        nuevaPersona.id = 'irActor' + i;
        nuevaPersona.classList.add('actores');
        reparto.appendChild(nuevaPersona);
        nuevaPersona.innerHTML = actor.nombre + ' ' + actor.apellido;
        i++;
    });
    irActorLink(i);
}

function eventToUserDataFavorito(evento) {
    return {
        id_user: JSON.parse(localStorage.getItem('cuenta')).id_usuario,
    };
};

function eventToUserDataValorar(valoracion) {
    return {
        valoracion: valoracion,
    };
};

function eventToUserDataNombreActor(nombre) {
    return {
        nombre: nombre,
    };
};

let arrayOtrosActores = [];

irActorLink = (cantidad) => {
    for (let i = 0; i < cantidad; i++) {
        const linkActorId = document.getElementById('irActor' + i);
        linkActorId.addEventListener('click', function (evento) {
            let nombreConApellido = linkActorId.innerHTML.split(' ');
            actores.forEach(actor => {
                if (nombreConApellido[0] == actor.nombre) {
                    // console.log(actor.id_actor);
                    localStorage.setItem('actor', JSON.stringify(actor));
                }
                else {
                    arrayOtrosActores.push(actor);
                    localStorage.setItem('otrosActores', JSON.stringify(arrayOtrosActores));
                }
            })


        });
    }
}

// insert into lista_favoritos( id_usuario,id_film) value (1,1);
