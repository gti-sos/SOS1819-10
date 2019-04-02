module.exports = function(app, BASE_PATH, biofuels) {

    console.log("Registering biofuels API (v1)....");

    var path = "";

    path = BASE_PATH + "biofuels-production/loadInitialData";

    app.get(BASE_PATH + "/biofuels-production/loadInitialData", (req, res) => {
        var newBiofuels = [{
            country: "China",
            year: 2003,
            ethanolFuel: 14.0,
            dryNaturalGas: 1211.0,
            biodiesel: 0.1
        }, {
            country: "Brazil",
            year: 2004,
            ethanolFuel: 252.0,
            dryNaturalGas: 341.0,
            biodiesel: 0.0
        }, {
            country: "Canada",
            year: 2005,
            ethanolFuel: 4.4,
            dryNaturalGas: 6561.0,
            biodiesel: 0.2
        }, {
            country: "Brazil",
            year: 2006,
            ethanolFuel: 306.0,
            dryNaturalGas: 349.0,
            biodiesel: 0.2
        }, {
            country: "Bulgaria",
            year: 2006,
            ethanolFuel: 0.0,
            dryNaturalGas: 0.0,
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

    /*    // GET al conjunto de recursos         

        app.get(BASE_PATH + "/biofuels-production", (req, res) => {

            biofuels.find({}).toArray((err, biofuelsArray) => {

                if (err) {

                    console.log("Error " + err);

                } else {

                    res.send(biofuelsArray.map((c) => {
                        delete c._id;
                        return c;

                    }));
                }
            });
        });
    */
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
                    console.log("Ya existe el recurso: " + reqBiofuels["country"] + " " + reqBiofuels["year"]);
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


    //PUT a un recurso concreto

    app.put(BASE_PATH + "/biofuels-production/:country/:year", (req, res) => {

        var year = parseInt(req.params.year);
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

    /*
        //Método para buscar 
        var buscador = function(base, aux_set, param_country, param_year, param_ethanolFuel, param_dryNaturalGas, param_biodiesel) {

            /*
                    if (param_country != undefined || param_year != undefined || param_ethanolFuel != undefined || param_dryNaturalGas != undefined || param_biodiesel != undefined) {

                        for (var j = 0; j < base.length; j++) {

                            var year = base[j].year;
                            var country = base[j].country;
                            var ethanolFuel = base[j].ethanolFuel;
                            var dryNaturalGas = base[j].dryNaturalGas;
                            var biodiesel = base[j].biodiesel;

          // Country
                    if (param_country != undefined && param_year == undefined && param_ethanolFuel == undefined && param_dryNaturalGas == undefined && param_biodiesel == undefined) {

                        if (param_country == country) {
                            aux_set.push(base[j]);
                        }
                        biofuels.find({
                            $or: [
                                { Edad: { $gt: 20 } },
                                { Nombre: "Marisa" }
                            ]
                        })

                    }

                    //Year
                    if (param_country == undefined && param_year != undefined && param_ethanolFuel == undefined && param_dryNaturalGas == undefined && param_biodiesel == undefined) {

                        if (param_year == year) {
                            aux_set.push(base[j]);
                        }


                    }
                    
                                        // Rightfoot
                                        else if (param_city == undefined && param_year == undefined && param_team == undefined && param_rightfoot != undefined && param_head == undefined && param_penalty == undefined) {

                                            if (param_rightfoot == rightfoot) {
                                                aux_set.push(base[j]);
                                            }
                                        }
                                        // Head
                                        else if (param_city == undefined && param_year == undefined && param_team == undefined && param_rightfoot == undefined && param_head != undefined && param_penalty == undefined) {

                                            if (param_head == head) {
                                                aux_set.push(base[j]);
                                            }

                                            //Penalty
                                        } else if (param_city == undefined && param_year == undefined && param_team == undefined && param_rightfoot == undefined && param_head == undefined && param_penalty != undefined) {

                                            if (param_penalty == penalty) {
                                                aux_set.push(base[j]);
                                            }


                                        } //Year
                                        else if (param_city == undefined && param_year != undefined && param_team == undefined && param_rightfoot == undefined && param_head == undefined && param_penalty == undefined) {

                                            if (param_year == year) {
                                                aux_set.push(base[j]);
                                            }

                                            // Rightfoot, head, penalty
                                        } else if (param_city == undefined && param_year == undefined && param_team == undefined && param_rightfoot != undefined && param_head != undefined && param_penalty != undefined) {

                                            if (param_rightfoot == rightfoot && param_head == head && param_penalty == penalty) {
                                                aux_set.push(base[j]);
                                            }

                                        }
                                        
                }

        }


        return aux_set;


        }

        //Busqueda
        app.get(BASE_PATH + "/biofuels-production", (req, res) => {


            console.log("New get request to /biofuels-production");

            //PRUEBA DE BUSQUEDA 
            var limit = parseInt(req.query.limit);
            var offset = parseInt(req.query.offset);
            var country = req.query.country;
            var year = req.query.year;
            var ethanolFuel = req.query.ethanolFuel;
            var dryNaturalGas = req.query.dryNaturalGas;
            var biodiesel = req.query.biodiesel;

            var aux = [];
            var aux2 = [];
            var aux3 = [];


            if (limit >= 0 || offset >= 0) {
                biofuels.find({}).skip(offset).limit(limit).toArray((err, biofuelsFilteredArray) => {

                    if (err) {
                        console.error('WARNING: Error getting data from DB');
                        res.sendStatus(500); // internal server error
                        return;
                    } else {
                        if (biofuelsFilteredArray.length === 0) {
                            res.send(biofuelsFilteredArray);
                            //response.sendStatus(404); //No have content
                            //return;
                        }

                        console.log("INFO: Sending biofuels :: " + JSON.stringify(biofuelsFilteredArray, 2, null));

                        if (country || year || ethanolFuel || dryNaturalGas || biodiesel) {

                            aux = biofuels.find({

                                $and: [
                                    { country: { $eq: country } },
                                    { year: { $eq: year } }
                                ]
                            }).toArray();

                            //aux = buscador(biofuelsFilteredArray, aux, country, year, ethanolFuel, dryNaturalGas, biodiesel);

                            if (aux.length > 0) {
                                aux2 = aux.slice(offset, offset + limit);

                                res.send(aux2);
                            } else {

                                res.send(aux3); // No content 
                                return;
                            }
                        } else {
                            res.send(biofuelsFilteredArray.map((c) => {
                                delete c._id;
                                return c;
                            }));
                        }
                    }
                });

            } else {

                biofuels.find({}).toArray((err, biofuelsFilteredArray) => {
                    if (err) {
                        console.error('ERROR from database');
                        res.sendStatus(500); // internal server error
                    } else {
                        if (biofuelsFilteredArray.length === 0) {

                            res.send(biofuelsFilteredArray);
                            return;
                        }

                        if (country || year || ethanolFuel || dryNaturalGas || biodiesel) {

                            aux = biofuels.find({

                                $and: [
                                    { country: { $eq: country } } //,
                                    //{ year: { $eq: year } }
                                ]
                            }).toArray();

                            //aux = buscador(biofuelsFilteredArray, aux, country, year, ethanolFuel, dryNaturalGas, biodiesel);
                            if (aux.length > 0) {
                                console.log("enviando cosas");
                                res.send(aux);
                            } else {
                                res.sendStatus(404); //No content
                                return;
                            }
                        } else {
                            res.send(biofuelsFilteredArray.map((c) => {
                                delete c._id;
                                return c;
                            }));
                        }
                    }
                });
            }

        });

    */

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
