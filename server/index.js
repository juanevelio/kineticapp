const express = require("express")
const app = express()
const socketIO = require("socket.io")
const http = require("http")
const servidor = http.createServer(app)
const io = socketIO.listen(servidor)
const router = express.Router()
const path = require("path")
const Forecast = require("forecastio")



const clima = new Forecast('1ca20626a260b4a6d17559409c8d6c01')
const datos = clima.buildUrl(-25, -58)
io.emit("datos", datos)
servidor.listen( "https://kineticapp.herokuapp.com/", function () {
    console.log("servidor escuchando en puerto", "https://kineticapp.herokuapp.com/" , "\n", datos)

})

app.use(express.static(__dirname + "/public")) //aqui indicamos que public sera enviada a todos los clientes




/*
---- A PARTIR DE AQUI TENEMOS!!----
--- COMUNICACION SERIAL
--- TRAEMOS LA LECTURA SERIAL DE ARDUINO A NODE JS
---
*/
const serialport = require("serialport");
const parser = serialport.parsers.Readline// readline para tener cada lectura en una nueva linea 
const puerto = new serialport("COM3", {
    baudRate: 9600,
})//inicializamos desde donde estiramos la lectura

const lectura = puerto.pipe(new parser({ delimeter: "\r\n" })) //pipe: tubo en En
lectura.on("open", function () {
    console.log("conectado!")
})





//emite datos de lectura serial
lectura.on("data", function (data) {
    console.log(data);
    io.emit("lectura_serial", data)
    io.emit("clima", datos)
})


puerto.on("error", function (err) {
    console.log(err)
})



puerto.write("escribo", function (range) {
    range
})


// static files
app.use(express.static(path.join(__dirname, 'public')));


//mas de express

router.get('/latitude/:latitude/longitude/:longitude', (req, res, next) => {

    if (!req.params.latitude || !req.params.longitude) {
        res.status(404).render("404");
        return;
    }

    let latitude = parseInt(req.params.latitude, 10);
    let longitude = parseInt(req.params.longitude, 10);

    datos.forecast(latitude, longitude, (err, data) => {
        if (err) {
            next();
            return;
        }
        res.json({
            temperature: data.currently.temperature,
            timezone: data.timezone
        });
    });
});

module.exports = router;
