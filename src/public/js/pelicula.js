const Url = 'http://localhost:3000/films';
let films = [];

fetch(Url).then(data => { return data.json() }).then(res => {
    console.log(res)
    films = res;
    traePelicula(films);
});

traePelicula = (films) => {
    const peliculaSeleccionada = localStorage.getItem('pelicula');
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
                let actores = [];
                actores = res
                asignarReparto(actores);
            });

            const favorito = document.getElementById('favorito');
            favorito.addEventListener('click', function (evento) {
                evento.preventDefault();
                const userData = eventToUserData()
                const jsonuserData = JSON.stringify(userData)
                fetch("http://localhost:3000/films/favorito/" + film.id_film, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: jsonuserData
                });
                alert('Pelicula agregada a favoritos!');
            });
        }
    });
};

asignarReparto = actores => {
    actores.forEach(actor => {
        const reparto = document.getElementById('reparto');
        const nuevaPersona = document.createElement('p');
        nuevaPersona.classList.add('actores');
        reparto.appendChild(nuevaPersona);
        nuevaPersona.innerHTML = actor.nombre + ' ' + actor.apellido;
    })
}

function eventToUserData(evento) {
    return {
        id_user: JSON.parse(localStorage.getItem('cuenta')).id_usuario,
    };
};

// insert into lista_favoritos( id_usuario,id_film) value (1,1);
