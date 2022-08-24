let enviarCiudad = document.getElementById("enviarCiudad");
let imprimirCiudad = document.getElementById("imprimirCiudad");
let ciudad = document.getElementById("ciudad");
let temperatura = document.getElementById("temperatura");
let humedad = document.getElementById("humedad");
let viento = document.getElementById("viento");
let arrayCiudades = [];
let arrayDatos = [];
let extraerDatos;
let labels;
let data1;
let data2;
let data3;
let contadorIteraciones = 0;
let contadorCharts = 0;



//Logica del formulario
enviarCiudad.addEventListener("submit", function (event) {
    event.preventDefault();
    guardarCiudad(recibirCiudad.value)
    mostrarCiudad();

    let promesa = Promise.resolve(peticion())
    promesa.then((value) => {

        extraerDatos = value.data.daily
        
        
        //Variables para la grafica
        //Sacar fechas (Eje X)
        let fecha0 = new Date(extraerDatos[0].dt*1000)
        let fecha1 = new Date(extraerDatos[1].dt*1000)
        let fecha2 = new Date(extraerDatos[2].dt*1000)
        let fecha3 = new Date(extraerDatos[3].dt*1000)
        let fecha4 = new Date(extraerDatos[4].dt*1000)
        let fecha5 = new Date(extraerDatos[5].dt*1000)
        let fecha6 = new Date(extraerDatos[6].dt*1000)
        let fecha7 = new Date(extraerDatos[7].dt*1000)
    
        //Usar fechas (Eje X)
        labels = [
            `${fecha0.toLocaleDateString()}`,
            `${fecha1.toLocaleDateString()}`,
            `${fecha2.toLocaleDateString()}`,
            `${fecha3.toLocaleDateString()}`,
            `${fecha4.toLocaleDateString()}`,
            `${fecha5.toLocaleDateString()}`,
            `${fecha6.toLocaleDateString()}`,
            `${fecha7.toLocaleDateString()}`,
        ];

        //Datos de temperatura
        data1 = {
            labels: labels,
            datasets: [{
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [
                    extraerDatos[0].temp.day-273.15, 
                    extraerDatos[1].temp.day-273.15, 
                    extraerDatos[2].temp.day-273.15, 
                    extraerDatos[3].temp.day-273.15, 
                    extraerDatos[4].temp.day-273.15, 
                    extraerDatos[5].temp.day-273.15, 
                    extraerDatos[6].temp.day-273.15, 
                    extraerDatos[7].temp.day-273.15,
                ]
            }],
        };

        //Datos de humedad
        data2 = {
            labels: labels,
            datasets: [{
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [
                    extraerDatos[0].humidity, 
                    extraerDatos[1].humidity, 
                    extraerDatos[2].humidity, 
                    extraerDatos[3].humidity, 
                    extraerDatos[4].humidity, 
                    extraerDatos[5].humidity, 
                    extraerDatos[6].humidity, 
                    extraerDatos[7].humidity,
                ]
            }],
        };

        //Datos de velocidad del viento
        data3 = {
            labels: labels,
            datasets: [{
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [
                    extraerDatos[0].wind_speed, 
                    extraerDatos[1].wind_speed, 
                    extraerDatos[2].wind_speed, 
                    extraerDatos[3].wind_speed, 
                    extraerDatos[4].wind_speed, 
                    extraerDatos[5].wind_speed, 
                    extraerDatos[6].wind_speed, 
                    extraerDatos[7].wind_speed,
                ]
            }]
        };

        guardarDatos(data1, data2, data3)
        mostrarGraficas()

    })
    
//Funcion para mostrar ciudad
function mostrarGraficas () {
    arrayDatos.forEach(function (valor) {

    //Render grafica 1
    const config1 = {
        type: 'line',
        data: valor.valor1,
        options: {
            plugins:{
                legend: {
                    display: false
                }
            }
        }
    };

    const myChart1 = new Chart(
        document.getElementById(`myChart${contadorCharts+1}`),
        config1
    );

    //Render grafica 2
    const config2 = {
        type: 'line',
        data: valor.valor2,
        options: {
            plugins:{
                legend: {
                    display: false
                }
            }
        }
    };

    const myChart2 = new Chart(
        document.getElementById(`myChart${contadorCharts+2}`),
        config2
    );

    //Render grafica 3
    const config3 = {
        type: 'line',
        data: valor.valor3,
        options: {
            plugins:{
                legend: {
                    display: false
                }
            }
        }
    };

    const myChart3 = new Chart(
        document.getElementById(`myChart${contadorCharts+3}`),
        config3
    );

    contadorCharts = contadorCharts + 3;
    console.log(contadorCharts)
    
    })
}
    
});

//Funciones para guardar arrays
function guardarCiudad (ciudad) {
    arrayCiudades.push({
        ciudad
    })
}

function guardarDatos (valor1, valor2, valor3) {
    arrayDatos.push({
        valor1, valor2, valor3
    })
}

//Funcion para mostrar ciudad
function mostrarCiudad () {
    imprimirCiudad.innerHTML = ""
    arrayCiudades.forEach(function (objeto) {
    imprimirCiudad.innerHTML += `
    <div>
        <h3>${objeto.ciudad}</h3>
        <p id="temperatura">Temperatura</p>
        <canvas id="myChart${contadorIteraciones+1}"></canvas>
        <p id="humedad">Humedad</p>
        <canvas id="myChart${contadorIteraciones+2}"></canvas>
        <p id="viento">Viento</p>
        <canvas id="myChart${contadorIteraciones+3}"></canvas>
    </div>
    <br>
    <br>
    <br>
    `
    contadorIteraciones = contadorIteraciones + 3;
    console.log(contadorIteraciones)
    })
}

//Peticion para buscar coordenadas de ciudad
const peticion = async () => {

    //Traer coordenadas de ciudad
    const coordenadas = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${recibirCiudad.value}&limit=5&appid=63a2a74129b1c74b998c9d25633632ad`, {
    })
    let latitud = coordenadas.data[0].lat
    let longitud = coordenadas.data[0].lon
    
    //Traer datos de clima usando las coordenadas
    const respuesta = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitud}&lon=${longitud}&exclude=current,minutely,hourly&appid=63a2a74129b1c74b998c9d25633632ad`, {
    })
   
    return respuesta
}