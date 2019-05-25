var express = require("express");

var bodyParser = require("body-parser");

var path = require("path");

//AÑADIENDO APIS
var biofuelsAPI = require("./biofuels-api");
var eCarStaticsAPI = require("./ecarstatics-api");
var issueDioxidAPI = require("./issue-dioxid");

var app = express();

const BASE_PATH = "/api"

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/", express.static(path.join(__dirname, "public")));


//app.use("/ui/v1/biofuels-production", express.static(path.join(__dirname, "public/biofuels")));
//app.use("/ui/v1/e-car-statics", express.static(path.join(__dirname, "public/e-car-statics")));
//app.use("/ui/v1/issue-dioxid", express.static(path.join(__dirname, "public/public_issue")));

//**************************API FRANALONSO*********************
const MongoClient = require("mongodb").MongoClient;
const urifjap = "mongodb+srv://test:test@sos-iwqc4.mongodb.net/sos1819?retryWrites=true";
const clientfjap = new MongoClient(urifjap, { useNewUrlParser: true });

var biofuels;

clientfjap.connect(err => {

    if (err) {
        console.error("Error accesing DB franalonso" + err);
        process.exit(1);
    }


    biofuels = clientfjap.db("sos1819").collection("biofuels-production");
    console.log("Connected to mongodb-franalonso!!");
    biofuelsAPI.register(app, BASE_PATH, biofuels);


    //*********************API CARLOS******************************
    const urijcgp = "mongodb+srv://test:test@sos1819-xwvxt.mongodb.net/sos1819?retryWrites=true";
    const clientjcgp = new MongoClient(urijcgp, { useNewUrlParser: true });

    var ecarstatics;

    clientjcgp.connect(err => {
        if (err) {
            console.error("Error accesing DB carlos " + err);
            process.exit(1);
        }
        ecarstatics = clientjcgp.db("sos1819").collection("e-car-statics");
        console.log("Connected to mongodb-carlos!!");
        eCarStaticsAPI.register(app, BASE_PATH, ecarstatics);
    });

    //***************API FRANCISCO*************************
    const uri = "mongodb+srv://usuario1:1234@sos-fraparcas-g12k3.mongodb.net/sos-fraparcas?retryWrites=true";
    const client = new MongoClient(uri, { useNewUrlParser: true });

    var datos;

    client.connect(err => {
        if (err) {
            console.error("Error accesing DB francisco " + err);
            process.exit(1);
        }

        datos = client.db("sos1819-10").collection("issues-dioxids");
        console.log("Connected to mongodb-francisco-pardillo!!");
        issueDioxidAPI.register(app, BASE_PATH, datos);

        //Una vez hechas las tres conexiones abrimos la conexion con el servidor    
        app.listen(port, () => {
            console.log("Magic is happening in port " + port);
        });
    });
});
