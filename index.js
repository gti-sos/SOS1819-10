
var express= require("express");

var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/",express.static(__dirname+"/public"));

app.listen(port,()=>{
    console.log("Magic is happening in port "+port);
});

//*****************************
//-------- api j-carlos--------
//*****************************

var eCarStatics =[{
    country: "Norway",
    year: "2015",
    marketPart : 22.39,
    rankingPosition : 1,
    existsVehicles : 84401
},{
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

// GET /api/v1/e-car-statics/loadInitialData

app.get("/api/v1/e-car-statics/loadInitialData", (req,res)=>{
    
    res.send(eCarStatics);
    res.sendStatus(200);
});

// GET /api/v1/e-car-statics

app.get("/api/v1/e-car-statics", (req,res)=>{
    res.send(eCarStatics);
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
