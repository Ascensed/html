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