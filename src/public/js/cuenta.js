const name = document.getElementById('name');
const email = document.getElementById('email');

const usuario = JSON.parse(localStorage.getItem('cuenta'));

name.innerHTML = usuario.nombre + ' ' + usuario.apellido;
email.innerHTML = usuario.email;

const UrlFavorito = 'http://localhost:3000/films/favorito/' + usuario.id_usuario;
fetch(UrlFavorito).then(data => { return data.json() }).then(res => {
    console.log(res)
    defineFavoritos(res);
});

defineFavoritos = res => {

    // const UrlGenero = 'http://localhost:3000/generos';
    // fetch(UrlGenero).then(data => { return data.json() }).then(res => {
    //     console.log(res)
    // });

    res.forEach(fav => {
        const contenedorBoletos = document.getElementById('contenedor-boletos');
        const boletos = document.createElement('div');
        boletos.classList.add('boletos');
        const imagen = document.createElement('img');
        imagen.classList.add('cuenta-peli-img');
        const boletosDesc = document.createElement('div');
        boletosDesc.classList.add('boletos-desc');
        const boletoTitulo = document.createElement('h4');
        boletoTitulo.classList.add('boleto__titulo');
        const boletoGeneroTexto = document.createElement('p');
        boletoGeneroTexto.classList.add('boleto__text')
        const boletoGenero = document.createElement('p');
        boletoGenero.classList.add('boleto__text')

        contenedorBoletos.appendChild(boletos);
        boletos.appendChild(imagen);
        boletos.appendChild(boletosDesc);
        boletosDesc.appendChild(boletoTitulo);
        boletosDesc.appendChild(boletoGeneroTexto);
        boletosDesc.appendChild(boletoGenero);

        boletoTitulo.innerHTML = fav.titulo;
        boletoGeneroTexto.innerHTML = 'Genero: ';
        boletoGenero.innerHTML = fav.nombre;
        imagen.src = fav.imagen

    });
};