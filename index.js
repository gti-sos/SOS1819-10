var express = require("express");

var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/", express.static(__dirname + "/public"));

app.listen(port, () => {
    console.log("Magic is happening in port " + port);

});

const MongoClient = require("mongodb").MongoClient;

//*****************************
//--José Carlos García Pavón--
//*****************************


const urijcgp = "mongodb+srv://test:test@sos1819-xwvxt.mongodb.net/sos1819?retryWrites=true";
const clientjcgp = new MongoClient(urijcgp, { useNewUrlParser: true });

var ecarstatics;

clientjcgp.connect(err => {
    if (err) {
        console.error("Error accesing DB " + err);
        process.exit(1);
    }
    ecarstatics = clientjcgp.db("sos1819").collection("e-car-statics");
    console.log("Conected!");
});

//Get /api/v1/e-car-statics/docs

app.get("/api/v1/e-car-statics/docs", (req, res) => {
    res.redirect("/api/v1/e-car-statics/docs");
});

// GET /api/v1/e-car-statics/loadInitialData


app.get("/api/v1/e-car-statics/loadInitialData", (req, res) => {

    var newecarstatics = [{
        country: "Norway",
        year: "2015",
        marketPart: 22.39,
        rankingPosition: 1,
        existsVehicles: 84401
    }, {
        country: "Norway",
        year: "2014",
        marketPart: 13.84,
        rankingPosition: 1,
        existsVehicles: 43432
    }, {
        country: "Norway",
        year: "2013",
        marketPart: 6.1,
        rankingPosition: 1,
        existsVehicles: 20486
    }, {
        country: "Holand",
        year: "2015",
        marketPart: 9.74,
        rankingPosition: 2,
        existsVehicles: 88991
    }, {
        country: "Holand",
        year: "2014",
        marketPart: 3.87,
        rankingPosition: 2,
        existsVehicles: 45020
    }];

    ecarstatics.find({}).toArray((err, eCarStaticsArray) => {

        if (eCarStaticsArray.length == 0) {
            console.log("Empty db");
            ecarstatics.insert(newecarstatics);
            res.sendStatus(200);
        }
        else {
            console.log("Err : " + err);
            res.sendStatus(409);
        }
    });
});


//  GET /api/v1/e-car-statics

app.get("/api/v1/e-car-statics", (req, res) => {

    ecarstatics.find({}).toArray((err, ecarstaticsArray) => {
        if (err)
            console.log("Error: " + err);

        res.send(ecarstaticsArray);
    });

});


//   POST /api/v1/e-car-statics

app.post("/api/v1/e-car-statics", (req, res) => {

    var newCarStatics = req.body;

    if (newCarStatics.length > 5 || !newCarStatics.country || !newCarStatics.year || !newCarStatics.marketPart ||
        !newCarStatics.rankingPosition || !newCarStatics.existsVehicles) {

        res.sendStatus(400);
        return;
    }

    ecarstatics.find({ "country": newCarStatics["country"], "year": newCarStatics["year"] }).toArray((err, ecarstaticsArray) => {
        if (err) {
            console.error("Error accesing DB");
            res.sendStatus(500);
            return;
        }

        if (ecarstaticsArray.length > 0) {
            res.sendStatus(409);
            return;
        }
        else {
            ecarstatics.insert(newCarStatics);
            res.sendStatus(201);
        }

    });
});

// DELETE /api/v1/e-car-statics

app.delete("/api/v1/e-car-statics", (req, res) => {

    ecarstatics.remove({});

    res.sendStatus(200);
});

// GET /api/v1/e-car-statics/2015

app.get("/api/v1/e-car-statics/:year/:country", (req, res) => {

    var year = req.params.year;
    var country = req.params.country;
    
    ecarstatics.find({ "year": year },{"country": country}).toArray((err, filteredCarStatics) =>{
        if(err){
            console.log("Error: "+err);

    ecarstatics.find({ "year": year }).toArray((err, filteredCarStatics) => {
        if (err) {
            console.log("Error: " + err);
            res.sendStatus(500);
            return;
        }
        if (filteredCarStatics.length >= 1) {
            res.send(filteredCarStatics);
        }
        else {
            res.sendStatus(404);
        }

    });
        
});

// PUT /api/v1/e-car-statics/2015

app.put("/api/v1/e-car-statics/:year", (req, res) => {

    var year = req.params.year;
    var updatedCarStatics = req.body;

    if (updatedCarStatics.year != year) {
        res.sendStatus(400);
        return;
    }

    ecarstatics.find({ "year": year }).toArray((err, filteredCarStatics) => {
        if (err) {
            console.log("Error! :" + err);
        }

        if (filteredCarStatics.length == 0) {
            res.sendStatus(400);
        }
        else {
            ecarstatics.update({ "year": year }, { $set: updatedCarStatics });
            res.sendStatus(200);
        }
    });

});

// DELETE /api/v1/e-car-statics/2015

app.delete("/api/v1/e-car-statics/:year", (req, res) => {

    var year = req.params.year;

    ecarstatics.remove({ "year": year });

    res.sendStatus(200);

});

// POST /api/v1/e-car-statics/2015

app.post("/api/v1/e-car-statics/:year", (req, res) => {

    res.sendStatus(405);
});

// PUT /api/v1/e-car-statics

app.put("/api/v1/e-car-statics", (req, res) => {

    res.sendStatus(405);
});



/*##########################
  API FRAN ALONSO
##########################*/

const urifjap = "mongodb+srv://test:test@sos-iwqc4.mongodb.net/sos1819?retryWrites=true";
const clientfjap = new MongoClient(urifjap, { useNewUrlParser: true });


var biofuels;

clientfjap.connect(err => {
    if (err) {
        console.error("Error accesing DB " + err);
        process.exit(1);
    }
    biofuels = clientfjap.db("sos1819").collection("biofuels-production");
});



app.get("/api/v1/biofuels-production/loadInitialData", (req, res) => {
    var newBiofuels = [{
        country: "China",
        year: "2003",
        ethanolFuel: 14,
        dryNaturalGas: 1211,
        biodiesel: 0.1
    }, {
        country: "Brazil",
        year: "2004",
        ethanolFuel: 252,
        dryNaturalGas: 341,
        biodiesel: 0
    }, {
        country: "Canada",
        year: "2005",
        ethanolFuel: 4.4,
        dryNaturalGas: 6561,
        biodiesel: 0.2
    }, {
        country: "Brazil",
        year: "2006",
        ethanolFuel: 306,
        dryNaturalGas: 349,
        biodiesel: 0.2
    }, {
        country: "Bulgaria",
        year: "2006",
        ethanolFuel: 0,
        dryNaturalGas: 0,
        biodiesel: 0.1
    }];

    biofuels.find({}).toArray((err, biofuelsArray) => {

        if (biofuelsArray.length == 0) {
            console.log("Empty db");
            biofuels.insertMany(newBiofuels);
            res.sendStatus(200);
        }
        else {
            res.sendStatus(409);
        }
    });

});

// GET al conjunto de recursos            
app.get("/api/v1/biofuels-production", (request, response) => {

    response.send(biofuels);
});

//POST al conjunto de recursos

app.post("/api/v1/biofuels-production", (request, response) => {

    var newBiofuel = request.body;

    biofuels.push(newBiofuel);

    response.sendStatus(201);
});

//DELETE al conjunto de recursos

app.delete("/api/v1/biofuels-production", (req, res) => {
    biofuels.remove();
    res.sendStatus(200);
});

//GET a un recurso concreto

app.get("/api/v1/biofuels-production/:country", (request, response) => {

    var country = request.params.country;

    var filteredBiofuels = biofuels.filter((n) => {

        return n.country == country;
    });

    if (filteredBiofuels.length >= 1) {

        response.send(filteredBiofuels[0]);

    }
    else {

        response.sendStatus(404);

    }


    //response.sendStatus(200)
});

//PUT a un recurso concreto

app.put("/api/v1/biofuels-production/:country/:year", (req, res) => {

    var year = req.params.year;
    var country = req.params.country;
    var reqBiofuels = req.body;

    /*if (!reqBiofuels.id || !reqBiofuels.country || !reqBiofuels.year || !reqBiofuels.ethanolFuel || !reqBiofuels.dryNaturalGas || !reqBiofuels.biodiesel ) {

            res.sendStatus(400);
            
        }else{
      */

    biofuels.find({ "country": country, "year": year }).toArray((err, biofuelsArray) => {

        if (biofuelsArray.length == 0) {
            console.log("No existe el recurso del pais: " + country);

            res.sendStatus(404);
        }
        else {


            if (reqBiofuels.length == 0) {
                res.sendStatus(400);

            }
            else {
                biofuels.replaceOne({ "country": country, "year": year }, reqBiofuels);
                res.sendStatus(200);
            }


        }




    });
    //}

});

// DELETE a un recurso concreto

app.delete("/api/v1/biofuels-production/:country", (request, response) => {

    var country = request.params.country;
    var found = false;

    var updatedBiofuels = biofuels.filter((n) => {

        if (n.country == country)
            found = true;

        return n.country != country;
    });

    if (found == false) {
        response.sendStatus(404);
    }
    else {
        biofuels = updatedBiofuels;
        response.sendStatus(200);
    }

});

//POST a un recurso

app.post("/api/v1/biofuels-production/:country", (request, response) => {

    response.sendStatus(405);
});

// PUT al conjunto de recursos

app.put("/api/v1/biofuels-production/", (req, res) => {

    res.sendStatus(405);
});


//

/*##########################
-----Api Francisco Pardillo-
##########################*/
var datos;

const uri = "mongodb+srv://usuario1:1234@sos-fraparcas-g12k3.mongodb.net/sos-fraparcas?retryWrites=true";

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    datos = client.db("sos1819-10").collection("issues-dioxids");
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

    res.redirect("https://documenter.getpostman.com/view/6918673/S17tRoCL");

});

// GET a un conjunto

app.get("/api/v1/issue-dioxid", (req, res) => {

    datos.find({}).toArray((err, datosArray) => {

        if (err) {

            console.log("Error " + err);
        }
        else {

            res.send(datosArray);

        }

    });
});

// POST de un recurso

app.post("/api/v1/issue-dioxid", (req, res) => {

    var newData = req.body;

    datos.find({ "nombre_del_pais": newData.nombre_del_pais }).toArray((err, datosArray) => {

        if (err) {

            res.sendStatus(409);
        }
        else {

            if (datosArray.length > 0) {

                res.sendStatus(409);
            }
            else {

                datos.insert(newData);

                res.sendStatus(201);

            }

        }

    });
});

// DELETE a un conjunto

app.delete("/api/v1/issue-dioxid", (req, res) => {

    datos.remove({});

    res.sendStatus(200);
});

// GET a un dato

app.get("/api/v1/issue-dioxid/:nombre_del_pais", (req, res) => {

    var name = req.params.nombre_del_pais;

    datos.find({ "nombre_del_pais": name }).toArray((err, dato) => {

        if (err) {

            res.sendStatus(404);
        }
        else {

            if (dato.length > 0) {

                res.send(dato);
            }
            else {

                res.sendStatus(404);
            }

        }

    });
});

// PUT a uno concreto

app.put("/api/v1/issue-dioxid/:name", (req, res) => {

    var name = req.params.name;

    var act = req.body;
            
    if(act.nombre_del_pais != name){
                
        res.sendStatus(400);
    }
    else{

        datos.replaceOne({ "nombre_del_pais": name }, { act });

        res.sendStatus(200);
    }
});

//DELETE a un dato

app.delete("/api/v1/issue-dioxid/:nombre_del_pais", (req, res) => {

    var name = req.params.nombre_del_pais;

    datos.find({ "nombre_del_pais": name }).toArray((err, dato) => {

        if (err) {

            res.sendStatus(404);

        }
        else {

            if (dato.length > 0) {

                datos.remove({ "nombre_del_pais": name });

                res.sendStatus(200);
            }
            else {

                res.sendStatus(404);
            }
        }
    });
});

// POST a un recurso(error)

app.post("/api/v1/issue-dioxid/:name", (req, res) => {

    res.sendStatus(405);
});

// PUT al conjunto(error)

app.put("/api/v1/issue-dioxid", (req, res) => {

    res.sendStatus(405);
});
