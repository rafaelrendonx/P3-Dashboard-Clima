let enviarCiudad = document.getElementById("enviarCiudad");
let imprimirCiudad = document.getElementById("imprimirCiudad");
let ciudad = document.getElementById("ciudad");
let temperatura = document.getElementById("temperatura");
let humedad = document.getElementById("humedad");
let viento = document.getElementById("viento");
let ciudades = [];

//Logica del formulario
enviarCiudad.addEventListener("submit", function (event) {
    event.preventDefault();
    guardarCiudad(recibirCiudad.value)
    console.log(ciudades)
    mostrarCiudad();
});

//Funcion para guardar varias ciudades
function guardarCiudad (ciudad) {
    ciudades.push({
        ciudad
    })
}

//Funcion para mostrar ciudad
function mostrarCiudad () {
    imprimirCiudad.innerHTML = ""
    ciudades.forEach(function () {
    imprimirCiudad.innerHTML += `
    <div>
        <h3>${recibirCiudad.value}</h3>
        <p id="temperatura">Temperatura</p>
        <p id="humedad">Humedad</p>
        <p id="viento">Viento</p>
    </div>
    `
    })
    
}


//Peticion para buscar coordenadas de ciudad
let URL = "https://api.openweathermap.org/geo/1.0/direct?q=Hermosillo&limit=5&appid=63a2a74129b1c74b998c9d25633632ad";

const peticion = async () => {
    const respuesta = await axios.get("https://api.openweathermap.org/geo/1.0/direct?q=Hermosillo&limit=5&appid=63a2a74129b1c74b998c9d25633632ad", {
    })
    console.log(respuesta.data[0].lat)
    console.log(respuesta.data[0].lon)
}

//peticion();

