var express = require("express");

var body = require("body-parser");

var app = express();

app.use(body.json());

var port = process.env.PORT || 8080;

var datos;

var gets = require("./Get");
var posts = require("./Post");
var puts = require("./Put");
var deletes = require("./Delete");
var busqs = require("./Búsquedas");


const MongoClient = require("mongodb").MongoClient;

const uri = "mongodb+srv://usuario1:1234@sos-fraparcas-g12k3.mongodb.net/sos-fraparcas?retryWrites=true";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    datos = client.db("sos1819-10").collection("issues-dioxids");

    gets(app, datos);

    posts(app, datos);

    puts(app, datos);

    deletes(app, datos);

    busqs(app, datos);

    app.listen(port, () => {
        console.log("Super server ready on port " + port);
    });
});

//Carga de datos.

app.get("/api/v1/issue-dioxid/loadInitialData", (req, res) => {

    datos.find({}).toArray((err, datosArray) => {

        if (datosArray.length == 0) {

            datos.insert({
                nombre_del_pais: "Albania",
                año: "1960",
                emisiones_de_co2: "0,05"
            });

            datos.insert({
                nombre_del_pais: "Alemania",
                año: "1991",
                emisiones_de_co2: "11,62"
            });

            datos.insert({
                nombre_del_pais: "España",
                año: "1990",
                emisiones_de_co2: "5,624"
            });

            datos.insert({
                nombre_del_pais: "Angola",
                año: "1995",
                emisiones_de_co2: "0,769"
            });

            datos.insert({
                nombre_del_pais: "Bahamas",
                año: "1992",
                emisiones_de_co2: "6,738"
            });


            res.send(201);

        }
        else {

            res.send(409);
        }
    });
});

//Portal de POSTMAN.

app.get("/api/v1/issue-dioxid/docs", (req, res) => {

    res.redirect("https://documenter.getpostman.com/view/6918673/S17xt6XH");

});
