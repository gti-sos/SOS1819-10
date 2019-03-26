
var express= require("express");

var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/",express.static(__dirname+"/public"));

app.listen(port,()=>{
    console.log("Magic is happening in port "+port);
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
    console.log("Conected!")
});

//Get /api/v1/e-car-statics/docs

app.get("/api/v1/uefa-club-rankings/docs", (req,res) =>{
    res.redirect("/api/v1/e-car-statics/docs");
});

// GET /api/v1/e-car-statics/loadInitialData


app.get("/api/v1/e-car-statics/loadInitialData", (req,res)=>{
    
    var newecarstatics = [{
        country: "Norway",
        year: "2015",
        marketPart : 22.39,
        rankingPosition : 1,
        existsVehicles : 84401
    }, {
        country: "Holand",
        year: "2015",
        marketPart : 9.74,
        rankingPosition : 2,
        existsVehicles : 88991
    }, {
        country: "Norway",
        year: "2014",
        marketPart : 13.84,
        rankingPosition : 1,
        existsVehicles : 43432
    }];
    
    ecarstatics.find({}).toArray((err, eCarStaticsArray) => {
        
        if(eCarStaticsArray.length == 0){
            console.log("Empty db");
            ecarstatics.insert(newecarstatics);
            res.sendStatus(200);
        }
        else {
            console.log("Err : "+err);
            res.sendStatus(409);
        }
    });
});


//  GET /e-car-statics

app.get("/api/v1/e-car-statics", (req,res)=>{
    
    ecarstatics.find({}).toArray((err, ecarstaticsArray)=>{
        if(err)
            console.log("Error: " + err);
            
        res.send(ecarstaticsArray);  
    });
    
});


// POST /api/v1/e-car-statics

app.post("/api/v1/e-car-statics", (req,res)=>{
    
    var newECarStatics = req.body;
    
    eCarStatics.push(newECarStatics);
    
    res.sendStatus(201);
});

// DELETE /api/v1/e-car-statics

app.delete("/api/v1/e-car-statics", (req, res) => {

    eCarStatics = [];

    res.sendStatus(200);
});

// GET /api/v1/e-car-statics/2015

app.get("/api/v1/e-car-statics/:year", (req, res) => {

    var year = req.params.year;

    var filteredCarStatics = eCarStatics.filter((c) => {
        return c.year == year;
    });

    if (filteredCarStatics.length >= 1) {
        res.send(filteredCarStatics);
    }
    else {
        res.sendStatus(404);
    }

});


// PUT /api/v1/e-car-statics/2015

app.put("/api/v1/e-car-statics/:year", (req, res) => {

    var year = req.params.year;
    var updatedCarStatics = req.body;
    var updated = false;

    var updatedCarStatics2 = eCarStatics.map((c) => {

        if (c.year == year) {
            updated = true;
            return updatedCarStatics;
        }
        else {
            return c;
        }

    });

    if (updated == false) {
        res.sendStatus(404);
    }else{
        
        eCarStatics = updatedCarStatics2;
        res.sendStatus(200);
    }

});

// DELETE /api/v1/e-car-statics/2015

app.delete("/api/v1/e-car-statics/:year", (req, res) => {

    var year = req.params.year;
    var found = false;

    var updatedYear = eCarStatics.filter((c) => {

        if (c.year == year)
            found = true;

        return c.year != year;
    });

    if (found == false) {
        res.sendStatus(404);
    }
    else {
        eCarStatics = updatedYear;
        res.sendStatus(200);
    }

});

// POST /api/v1/e-car-statics/2015

app.post("/api/v1/e-car-statics/:year", (req, res) => {

    res.sendStatus(409);
});

// PUT /api/v1/e-car-statics

app.put("/api/v1/e-car-statics", (req, res) => {

    res.sendStatus(409);
});



/*##########################
  API FRAN ALONSO
##########################*/

var biofuels = []


app.get("/api/v1/biofuels-production/loadInitialData", (request,response)=>{
    biofuels =[{
    country: "China",
    year: "2003",
    ethanolFuel: 14,
    dryNaturalGas : 1211,
    biodiesel : 0.1
},{
    country: "Brazil",
    year: "2004",
    ethanolFuel: 252,
    dryNaturalGas : 341,
    biodiesel : 0
}, {
    country: "Canada",
    year: "2005",
    ethanolFuel: 4.4,
    dryNaturalGas : 6561,
    biodiesel : 0
}];
    
    
    response.send(biofuels);
});


// GET al conjunto de recursos            
app.get("/api/v1/biofuels-production", (request, response) =>{
    
 response.send(biofuels);
});

//POST al conjunto de recursos

app.post("/api/v1/biofuels-production", (request, response) =>{
    
    var newBiofuel = request.body;
    
    biofuels.push(newBiofuel);
    
    response.sendStatus(201);
});

//DELETE al conjunto de recursos

app.delete("/api/v1/biofuels-production", (request, response) =>{
    
    biofuels = []
    response.sendStatus(200);
});

//GET a un recurso concreto

app.get("/api/v1/biofuels-production/:country", (request, response) =>{

    var country = request.params.country;
    
    var filteredBiofuels = biofuels.filter((n) => {
        
        return n.country == country;
    });
    
    if (filteredBiofuels.length >= 1){
        
        response.send(filteredBiofuels[0]);
        
    }else{
        
        response.sendStatus(404);
        
    }
    

    //response.sendStatus(200)
});

//PUT a un recurso concreto

app.put("/api/v1/biofuels-production/:country", (request, response) =>{

    var country = request.params.country;
    var updatedBiofuel = request.body;
    var found = false;
    
    var updatedBiofuels = biofuels.map((n) => {
        
        if (n.country == country){
            
            found = true;
            return updatedBiofuel;
            
        }else{
            
            return n;
            
        }
    
    });
    
    
    if (found == false){
        
        response.sendStatus(404);      
    
        
    }else{
        
        biofuels = updatedBiofuels;
        response.sendStatus(200);
    }
    
    
});

// DELETE a un recurso concreto

app.delete("/api/v1/biofuels-production/:country", (request,response)=>{

    var country = request.params.country;
    var found = false;

    var updatedBiofuels = biofuels.filter((n) =>{
        
            if(n.country == country)  
                found = true;
        
            return n.country != country;
    });
    
    if (found == false){
        response.sendStatus(404);
    }else{
        biofuels = updatedBiofuels;
        response.sendStatus(200);
    }

});

//POST a un recurso

app.post("/api/v1/biofuels-production/:country", (request, response) =>{
    
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


var datos =[{}];

//Carga de datos.

app.get("/api/v1/issue-dioxid/loadInitialData", (req, res) => {

    datos = [{
        nombre_del_pais: "Albania",
        año: "1960",
        emisiones_de_co2: "0,05"
        },{
        nombre_del_pais: "Alemania",
        año: "1991",
        emisiones_de_co2: "11,62"
        },{
        nombre_del_pais: "España",
        año: "1990",
        emisiones_de_co2: "5,624"
        }]
        
    if (datos.length > 0){
        
        res.send(201);
    }
    
    else{
        
        res.send(400);
    }
});

// GET a un conjunto

app.get("/api/v1/issue-dioxid", (req, res) => {     
    res.send(datos);
});

// POST de un recurso

app.post("/api/v1/issue-dioxid", (req, res) => {
    
    var newData = req.body;
    
    datos.push(newData);
    
    res.sendStatus(201);
});

// DELETE a un conjunto

app.delete("/api/v1/issue-dioxid", (req, res) => {
    
    datos = [];
    
    res.sendStatus(200);
});

// GET a un dato

app.get("/api/v1/issue-dioxid/:nombre_del_pais", (req, res) => {
    
    var name = req.params.nombre_del_pais;
    
    var dato = datos.filter((c) => {
        return c.nombre_del_pais == name;
    })
    
    if (dato.length >= 1){
        
        res.send(dato[0]);
    }
    
    else{
        res.send(404);
    }
});

// PUT a uno concreto

app.put("/api/v1/issue-dioxid/:name", (req, res) => {
    
    var name = req.params.name;
    
    var act = req.body;
    
    var found = false;
    
    var lista = datos.map((c) => {
        
        if(c.nombre_del_pais == name){
            
            found = true;
            
            return act;
        }
        
        else{
            
            return c;
        }
    })
    
    
    if (found == false){
        
         res.send(404);
    }
    
    else{
        
        datos = lista;
        
        res.send(200);
    }
});

//DELETE a un dato

app.delete("/api/v1/issue-dioxid/:nombre_del_pais", (req, res) => {
    
    var name = req.params.nombre_del_pais;
    
    var found = false;
    
    var lista = datos.filter((c) => {
        
        if (c.nombre_del_pais == name){
            
            found = true;
        }
        return c.nombre_del_pais != name;
    })
    
    
    if (found == false){
        
         res.send(404);
    }
    
    else{
        
        datos = lista;
        
        res.send(200);
    }
});

// POST a un recurso(error)

app.post("/api/v1/issue-dioxid/:name", (req, res) => {
    
    res.sendStatus(405);
});

// PUT al conjunto(error)

app.put("/api/v1/issue-dioxid", (req, res) => {
    
    res.sendStatus(405);
});