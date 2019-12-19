//por este lado tenemos el fronted o cliente

const socket = io()
socket.on("lectura_serial", function (data) {
    let serial = document.querySelector("#lectura")
    serial.innerHTML = data.toString()
    console.log(data)
})
const socket_2 = io()
socket.on("clima", function (datos) {
    let clima = document.querySelector("#clima")
    clima.innerHTML = datos.toString()
    console.log(clima)
})

/* Referencia de este codigo de api de geolocalizacion https://www.aprenderaprogramar.com*/


var boton = document.getElementById('obtener');
boton.addEventListener('click', obtener, false);


function obtener() { navigator.geolocation.getCurrentPosition(mostrar, gestionarErrores); }
function mostrar(posicion) {
    var ubicacion = document.getElementById('latitud');

    var datos = posicion.coords.latitude.toFixed(4)
    ubicacion.value = datos;



    var ubicacion_2 = document.getElementById('longitud');

    var datos_2 = posicion.coords.longitude.toFixed(4)
    ubicacion_2.value = datos_2;

}

function gestionarErrores(error) {

    alert('Error: ' + error.code + ' ' + error.message + '\n\nPor favor compruebe que está conectado ' +

        'a internet y habilite la opción permitir compartir ubicación física');
}
console.log(io.data)


//trabajamos con el slider

const rango = document.querySelector("#rango")
// rango.addEventListener("change", req =>{

//emision de angulo desde slider

const slider = rango.addEventListener("change", function (slider) {
    document.querySelector("#climacompleto").innerHTML = rango.value
}
)

