const Url = 'http://localhost:3000/usuarios';

fetch(Url).then(data => {return data.json()}).then(res => {console.log(res)});