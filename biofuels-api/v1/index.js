module.exports = function(app, BASE_PATH, biofuels) {

    console.log("Registering biofuels API (v1)....");

    var path = "";

    path = BASE_PATH + "biofuels-production/loadInitialData";

    /*
    console.log("Registering get" + path + "...");
    app.get(path, (req, res) => {
        res.send("My hello world from submodule");

    });

    console.log("get " + path + " registered.");

    path = BASE_PATH + "/bye";
    console.log("Registering get " + path + "...");
    app.get(path, (req, res) => {

        console.log("Registering get " + path + "...");
        res.send("Good bye from submodule");

    });
    console.log("get " + path + " registered.");
    console.log("Greetings api registered");
*/
    app.get(BASE_PATH + "/biofuels-production/loadInitialData", (req, res) => {
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


            } else {
                res.sendStatus(409);
            }
        });

    });

    // GET al conjunto de recursos         

    app.get(BASE_PATH + "/biofuels-production", (req, res) => {

        biofuels.find({}).toArray((err, biofuelsArray) => {

            if (err) {

                console.log("Error " + err);

            } else {

                res.send(biofuelsArray);
            }
        });
    });

    //POST al conjunto de recursos

    app.post(BASE_PATH + "/biofuels-production", (req, res) => {

        var reqBiofuels = req.body;


        if (Object.keys(reqBiofuels).length != 5 || !reqBiofuels.country || !reqBiofuels.year || !reqBiofuels.ethanolFuel || !reqBiofuels.dryNaturalGas || !reqBiofuels.biodiesel) {

            res.sendStatus(400);

        } else {

            biofuels.find({
                "country": reqBiofuels["country"],
                "year": reqBiofuels["year"]
            }).toArray((err, biofuelsArray) => {

                if (err) {
                    console.error("Error accesing DB in post to biofuels-production ");
                    res.sendStatus(500);
                }


                if (biofuelsArray.length > 0) {
                    console.log("Ya existe el recurso: " + biofuelsArray["country"] + " " + biofuelsArray["year"]);
                    res.sendStatus(409);


                } else {

                    biofuels.insert(reqBiofuels);
                    res.sendStatus(201);

                }

            });
        }
    });

    //DELETE al conjunto de recursos

    app.delete(BASE_PATH + "/biofuels-production", (req, res) => {
        biofuels.remove({});
        res.sendStatus(200);
    });


    //GET a un recurso concreto

    app.get(BASE_PATH + "/biofuels-production/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = req.params.year;

        biofuels.find({
            "country": country,
            "year": year
        }).toArray((err, biofuelsFilteredArray) => {

            if (err) {
                console.error("Error accesing DB get to biofuels-production/country/year ");
                res.sendStatus(500);
            }


            if (biofuelsFilteredArray.length > 0) {

                res.send(biofuelsFilteredArray[0]);

            } else {

                res.sendStatus(404);


            }


        });

    });


    //PUT a un recurso concreto

    app.put(BASE_PATH + "/biofuels-production/:country/:year", (req, res) => {

        var year = req.params.year;
        var country = req.params.country;
        var reqBiofuels = req.body;

        if (Object.keys(reqBiofuels).length != 5 || !reqBiofuels.country || !reqBiofuels.year || !reqBiofuels.ethanolFuel ||
            !reqBiofuels.dryNaturalGas || !reqBiofuels.biodiesel) {

            res.sendStatus(400);

        } else {

            biofuels.find({
                "country": country,
                "year": year
            }).toArray((err, biofuelsArray) => {

                if (err) {
                    console.error("Error accesing DB in put to biofuels-production/country/year ");
                    res.sendStatus(500);
                }

                if (biofuelsArray.length == 0) {

                    console.log("No existe el recurso del pais: " + country + " " + year);
                    res.sendStatus(404);

                } else {

                    biofuels.replaceOne({
                        "country": country,
                        "year": year
                    }, reqBiofuels);
                    res.sendStatus(200);


                }


            });
        }
    });


    // DELETE a un recurso concreto

    app.delete(BASE_PATH + "/biofuels-production/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = req.params.year;


        biofuels.find({
            "country": country,
            "year": year

        }).toArray((err, biofuelsArray) => {

            if (err) {
                console.error("Error accesing DB in delete to biofuels-production/country/year ");
                res.sendStatus(500);
            }

            if (biofuelsArray.length == 0) {

                console.log("No existe el recurso del pais: " + country + " " + year);
                res.sendStatus(404);

            } else {

                biofuels.remove({ "country": country, "year": year });
                res.sendStatus(200);


            }


        });


    });

    //POST a un recurso

    app.post(BASE_PATH + "/biofuels-production/:country/:year", (request, response) => {

        response.sendStatus(405);
    });

    // PUT al conjunto de recursos

    app.put(BASE_PATH + "/biofuels-production/", (req, res) => {

        res.sendStatus(405);
    });
}
