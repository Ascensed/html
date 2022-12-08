const correo = document.getElementById('email');
const password = document.getElementById('password');

let usuarioCorreo;
let usuarioContrasenha;

const login = document.getElementById('login');
const Url = 'http://localhost:3000/usuarios';
let usuarios = [];
let logeado = false;

fetch(Url).then(data => { return data.json() }).then(res => {
    usuarios = res;
    console.log(res);
});

login.addEventListener('submit', function (evento) {
    evento.preventDefault();
    if (correo.value == '' || password.value == '') {
        alert('Faltan campos por llenar');
        return;
    }
    else {
        usuarios.forEach(usuario => {
            if (usuario.email == correo.value) {
                console.log('Coincide correo');
                usuarioCorreo = usuario.email;
            }
            else {
                console.log('Ningun correo encontrado')
                return;
            }

            if (usuario.contraseña == password.value) {
                console.log('Coincide contrasenha');
                usuarioContrasenha = usuario.contraseña;
            }
            else {
                console.log('Contrasenha incorrecta');
                return;
            }

            logeado = true;
            let credenciales = usuario;
            localStorage.setItem('cuenta', JSON.stringify(credenciales));

        });
    }

    setTimeout( function() { 
        window.location.href = "http://127.0.0.1:5500/src/public/cuenta.html"; 
    }, 2000 );

    // if(logeado){

    //     // Guarda las credenciales de la cueta;
    //     localStorage.setItem('cuenta', JSON.stringify(credenciales));
    // }
})