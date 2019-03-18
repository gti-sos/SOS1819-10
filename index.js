var express= require("express");

var app= express();

var port = process.env.PORT || 8080;

app.use("/",
        express.static(__dirname+"/public"));

app.get("/time", (request, response) =>{
    response.send(new Date());
});


//##########################
    API FRAN ALONSO
//##########################


app.get("/api/v1/biofuels-production", (request, response) =>{
 res.send(contacts);
});

app.get("/api/v1/biofuels-production/loadInitialData", (req,res)=>{
    var contacts = [{
                name: "peter",
                phone: "123456",
                email: "peter@peter.com"
            }, {
                name: "paul",
                phone: "3333",
                email: "paul@paul.com"
            }];
                
});


app.listen(port, () =>{
    console.log("magic is happening"+port);
});