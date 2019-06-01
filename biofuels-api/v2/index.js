module.exports = function(app, BASE_PATH, biofuels) {

    console.log("Registering biofuels API (v2)....");


    //GET /api/v1/biofuels-production/docs

    app.get(BASE_PATH + "/biofuels-production/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/7128730/S1TR5zde");
    });

    //GET LOADINITIALDATA
    app.get(BASE_PATH + "/biofuels-production/loadInitialData", (req, res) => {
        var newBiofuels = [{
            country: "China",
            year: 2003,
            ethanolFuel: 14,
            dryNaturalGas: 1143,
            biodiesel: 0.1
        }, {
            country: "China",
            year: 2004,
            ethanolFuel: 17,
            dryNaturalGas: 1350,
            biodiesel: 0.1
        }, {
            country: "Brazil",
            year: 2007,
            ethanolFuel: 262,
            dryNaturalGas: 701,
            biodiesel: 6.4
        }, {
            country: "Canada",
            year: 2005,
            ethanolFuel: 5.8,
            dryNaturalGas: 3144,
            biodiesel: 0.2
        }, {
            country: "Brazil",
            year: 2008,
            ethanolFuel: 337,
            dryNaturalGas: 835,
            biodiesel: 19
        }, {
            country: "United States",
            year: 2007,
            ethanolFuel: 449,
            dryNaturalGas: 23104,
            biodiesel: 23
        }, {
            country: "United States",
            year: 2008,
            ethanolFuel: 630,
            dryNaturalGas: 23277,
            biodiesel: 21
        }, {
            country: "Australia",
            year: 2012,
            ethanolFuel: 5.10,
            dryNaturalGas: 1291,
            biodiesel: 1.1
        }, {
            country: "Australia",
            year: 2011,
            ethanolFuel: 6.2,
            dryNaturalGas: 1282,
            biodiesel: 1.8
        }];

        biofuels.find({}).toArray((err, biofuelsArray) => {
            if (err) {
                console.error("Error accesing DB in loadInitialData to biofuels-production ");
                res.sendStatus(500);
            }

            if (biofuelsArray.length == 0) {
                console.log("Empty db");
                biofuels.insertMany(newBiofuels);
                res.sendStatus(200);


            } else {
                res.sendStatus(409);
            }
        });

    });

    // PROXY A SUICIDE RATES
    var request = require("request");
    var moviesAPI = "http://sos1819-04.herokuapp.com";
    app.use("/proxySR", function(req, res) {
        var url = moviesAPI + req.url;
        req.pipe(request(url)).pipe(res);
    });
    // PROXY A POLLUTION STATS
    var pollutionsAPI = "http://sos1819-12.herokuapp.com";
    app.use("/proxyPS", function(req, res) {
        var url = pollutionsAPI + req.url;
        req.pipe(request(url)).pipe(res);
    });

    //POST al conjunto de recursos

    app.post(BASE_PATH + "/biofuels-production", (req, res) => {

        var reqBiofuels = req.body;
        var year = parseInt(reqBiofuels.year);
        var ethanolFuel = parseFloat(reqBiofuels.ethanolFuel);
        var dryNaturalGas = parseFloat(reqBiofuels.dryNaturalGas);
        var biodiesel = parseFloat(reqBiofuels.biodiesel);

        if (Object.keys(reqBiofuels).length != 5 || !reqBiofuels.country || !reqBiofuels.year || !reqBiofuels.ethanolFuel || !reqBiofuels.dryNaturalGas || !reqBiofuels.biodiesel) {

            res.sendStatus(400);

        } else {

            biofuels.find({
                "country": reqBiofuels["country"],
                "year": year
            }).toArray((err, biofuelsArray) => {

                if (err) {
                    console.error("Error accesing DB in post to biofuels-production ");
                    res.sendStatus(500);
                }


                if (biofuelsArray.length > 0) {
                    console.log("Ya existe el recurso: " + reqBiofuels["country"] + " " + reqBiofuels["year"]);
                    res.sendStatus(409);


                } else {

                    biofuels.insert({
                        "country": reqBiofuels["country"],
                        "year": year,
                        "ethanolFuel": ethanolFuel,
                        "dryNaturalGas": dryNaturalGas,
                        "biodiesel": biodiesel
                    });
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
        var year = parseInt(req.params.year);

        biofuels.find({
            "country": country,
            "year": year
        }).toArray((err, biofuelsFilteredArray) => {

            if (err) {
                console.error("Error accesing DB get to biofuels-production/country/year ");
                res.sendStatus(500);
            }


            if (biofuelsFilteredArray.length > 0) {

                res.send(biofuelsFilteredArray.map((c) => {

                    delete c._id;
                    return c;
                })[0]);

            } else {

                res.sendStatus(404);


            }


        });

    });

    //GET a un conjunto de recursos :country


    app.get(BASE_PATH + "/biofuels-production/:rec", (req, res) => {

        var rec = parseInt(req.params.rec);

        console.log(rec);
        if (!Number.isInteger(rec)) {
            rec = req.params.rec
            biofuels.find({
                "country": rec

            }).toArray((err, biofuelsFilteredArray) => {

                if (err) {
                    console.error("Error accesing DB get to biofuels-production/country ");
                    res.sendStatus(500);
                }


                if (biofuelsFilteredArray.length > 0) {

                    res.send(biofuelsFilteredArray.map((c) => {
                        delete c._id;
                        return c;
                    }));

                } else {
                    res.sendStatus(404);
                }

            });

        } else {
            biofuels.find({
                "year": rec

            }).toArray((err, biofuelsFilteredArray) => {

                if (err) {
                    console.error("Error accesing DB get to biofuels-production/year");
                    res.sendStatus(500);
                }


                if (biofuelsFilteredArray.length > 0) {

                    res.send(biofuelsFilteredArray.map((c) => {
                        delete c._id;
                        return c;
                    }));

                } else {
                    res.sendStatus(404);
                }

            });

        }



    });



    //PUT a un recurso concreto

    app.put(BASE_PATH + "/biofuels-production/:country/:year", (req, res) => {

        var year = parseInt(req.params.year);
        var country = req.params.country;

        //var reqBiofuels = req.body;

        var ethanolFuel = parseFloat(req.body.ethanolFuel);
        var dryNaturalGas = parseFloat(req.body.dryNaturalGas);
        var biodiesel = parseFloat(req.body.biodiesel);
        var yearBody = parseInt(req.body.year);
        var countryBody = req.body.country;

        var reqBiofuels = {
            "country": country,
            "year": year,
            "ethanolFuel": ethanolFuel,
            "dryNaturalGas": dryNaturalGas,
            "biodiesel": biodiesel
        };

        console.log(ethanolFuel);
        console.log(dryNaturalGas);
        console.log(biodiesel);
        if (Object.keys(req.body).length != 5 || !yearBody || !countryBody || !ethanolFuel || !dryNaturalGas || !biodiesel) {

            console.log(Object.keys(req.body).length);
            console.error("Faltan parametros ");
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

                } else if (year == yearBody && country == countryBody) {
                    biofuels.replaceOne({
                        "country": country,
                        "year": year
                    }, reqBiofuels);
                    res.sendStatus(200);

                } else {

                    res.sendStatus(400);


                }


            });
        }
    });


    // DELETE a un recurso concreto

    app.delete(BASE_PATH + "/biofuels-production/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = parseInt(req.params.year);


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

    //GET al conjunto de recursos

    app.get(BASE_PATH + "/biofuels-production", (req, res) => {


        console.log("New get request to /biofuels-production");

        //PRUEBA DE BUSQUEDA 
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        if (!limit && !offset) {
            limit = 0;
            offset = 0;

        }


        var country = req.query.country;

        var fromYear = parseInt(req.query.from);
        var toYear = parseInt(req.query.to);
        var year = parseInt(req.query.year);

        var fromEthanolFuel = parseFloat(req.query.fromEthanolFuel);
        var toEthanolFuel = parseFloat(req.query.toEthanolFuel);

        var fromDryNaturalGas = parseFloat(req.query.fromDryNaturalGas);
        var toDryNaturalGas = parseFloat(req.query.toDryNaturalGas);

        var fromBiodiesel = parseFloat(req.query.fromBiodiesel);
        var toBiodiesel = parseFloat(req.query.toBiodiesel);


        biofuels.find({}).skip(offset).limit(limit).toArray((err, biofuelsFilteredArray) => {
            if (err) {
                console.error('WARNING: Error getting data from DB');
                res.sendStatus(500); // internal server error
            }

            if (Number.isInteger(fromYear) && Number.isInteger(toYear)) {
                //console.log(fromYear + " " + toYear);

                biofuels.find({ year: { $gte: fromYear, $lte: toYear } }).skip(offset).limit(limit).toArray((err, biofuelsFilteredArraySearch) => {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    }

                    res.send(biofuelsFilteredArraySearch.map((c) => {
                        delete c._id;
                        return c;

                    }));


                });


            } else if (year) {

                biofuels.find({ year: year }).skip(offset).limit(limit).toArray((err, biofuelsFilteredArraySearch) => {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    }

                    res.send(biofuelsFilteredArraySearch.map((c) => {
                        delete c._id;
                        return c;

                    }));

                });

            } else if (country) {

                biofuels.find({ country: country }).skip(offset).limit(limit).toArray((err, biofuelsFilteredArraySearch) => {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    }

                    res.send(biofuelsFilteredArraySearch.map((c) => {
                        delete c._id;
                        return c;

                    }));

                });

            } else if (fromEthanolFuel && toEthanolFuel) {

                biofuels.find({ ethanolFuel: { $gte: fromEthanolFuel, $lte: toEthanolFuel } }).skip(offset).limit(limit).toArray((err, biofuelsFilteredArraySearch) => {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    }

                    res.send(biofuelsFilteredArraySearch.map((c) => {
                        delete c._id;
                        return c;

                    }));

                });

            } else if (fromDryNaturalGas && toDryNaturalGas) {

                biofuels.find({ dryNaturalGas: { $gte: fromDryNaturalGas, $lte: toDryNaturalGas } }).skip(offset).limit(limit).toArray((err, biofuelsFilteredArraySearch) => {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    }

                    res.send(biofuelsFilteredArraySearch.map((c) => {
                        delete c._id;
                        return c;

                    }));

                });

            } else if (fromBiodiesel && toBiodiesel) {

                biofuels.find({ biodiesel: { $gte: fromBiodiesel, $lte: toBiodiesel } }).skip(offset).limit(limit).toArray((err, biofuelsFilteredArraySearch) => {
                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); // internal server error
                    }
                    console.log(fromBiodiesel + " " + toBiodiesel);
                    res.send(biofuelsFilteredArraySearch.map((c) => {
                        delete c._id;
                        return c;

                    }));

                });

            } else {

                res.send(biofuelsFilteredArray.map((c) => {
                    delete c._id;
                    return c;

                }));
            }


        });


    });
}
