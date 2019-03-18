var express= require("express");
var bodyParser = require("body-parser");

var app= express();

app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use("/",
        express.static(__dirname+"/public"));

app.get("/time", (request, response) =>{
    response.send(new Date());
});


/*##########################
  API FRAN ALONSO
##########################*/

var contacts = []
app.get("/api/v1/biofuels-production", (request, response) =>{
 request.send(contacts);
});

app.get("/api/v1/biofuels-production/loadInitialData", (request,respond)=>{
    contacts = [{
                name: "peter",
                phone: "123456",
                email: "peter@peter.com"
            }, {
                name: "paul",
                phone: "3333",
                email: "paul@paul.com"
            }];
    request.send(contacts);
});


app.listen(port, () =>{
    console.log("magic is happening"+port);
});