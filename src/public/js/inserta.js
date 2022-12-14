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

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const userData = eventToUserData()
    const jsonuserData = JSON.stringify(userData)
    fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonuserData
    });
    console.log('Query exitosa')
});

function eventToUserData(evento) {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    // console.log(nombre);
    // console.log(apellido);
    return {
        nombre: nombre,
        apellido: apellido
    };
}