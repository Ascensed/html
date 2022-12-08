const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const edad = document.getElementById('edad');
const email = document.getElementById('email');
const password = document.getElementById('password');
const telefono = document.getElementById('telefono');

const enviar = document.getElementById('registrarse');

enviar.addEventListener('submit', function(e) {
    e.preventDefault();

    if(email.value == '' || nombre.value == '' || apellido.value == '' || password.value == ''){
        alert('Faltan campos por completar')
        return;
    }
    const userData = eventToUserData()
    const jsonuserData = JSON.stringify(userData)
    fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: jsonuserData
    });
    alert('Query exitosa');
    setTimeout( function() { 
        window.location.href = "http://127.0.0.1:5500/src/public/cuenta.html"; 
    }, 2000 );
});

function eventToUserData(evento) {
    return {
        nombre: nombre.value,
        apellido: apellido.value,
        edad: edad.value,
        email: email.value,
        password: password.value,
        telefono: telefono.value
    };
};