module.exports = function(app, BASE_PATH, issue_dioxid) {

    console.log("Registering issue_dioxid API (v2)....");

    var path = "";

    var datos = issue_dioxid;

    path = BASE_PATH + "issue_dioxid/loadInitialData";

    app.get(BASE_PATH + "/issue-dioxid/loadInitialData", (req, res) => {

        datos.find({}).toArray((err, datosArray) => {

            if (datosArray.length == 0) {

                datos.insert({
                    country: "España",
                    year: "2010",
                    issue_metric_ton: "5,861",
                    issue_liquid_fuel: "155.506,469",
                    issue_solid_fuel: "31.033,821"
                });

                datos.insert({
                    country: "España",
                    year: "2012",
                    issue_metric_ton: "5,661",
                    issue_liquid_fuel: "133.093,765",
                    issue_solid_fuel: "58.290,632"
                });

                datos.insert({
                    country: "España",
                    year: "2014",
                    issue_metric_ton: "5,03",
                    issue_liquid_fuel: "129.038,06",
                    issue_solid_fuel: "43.461,28"
                });

                datos.insert({
                    country: "Albania",
                    year: "2010",
                    issue_metric_ton: "1,579",
                    issue_liquid_fuel: "3.494,651",
                    issue_solid_fuel: "429,039"
                });

                datos.insert({
                    country: "Albania",
                    year: "2012",
                    issue_metric_ton: "1,693",
                    issue_liquid_fuel: "3.157,287",
                    issue_solid_fuel: "627,057"
                });

                datos.insert({
                    country: "Albania",
                    year: "2014",
                    issue_metric_ton: "1,979",
                    issue_liquid_fuel: "3.861,351",
                    issue_solid_fuel: "700,397"
                });
                
                datos.insert({
                    country: "Andorra",
                    year: "1990",
                    issue_metric_ton: "7,4767",
                    issue_liquid_fuel: "407,037",
                    issue_solid_fuel: "700,56"
                });
                
                datos.insert({
                    country: "Bahamas",
                    year: "2000",
                    issue_metric_ton: "5,601",
                    issue_liquid_fuel: "99,78",
                    issue_solid_fuel: "3,667"
                });
                
                datos.insert({
                    country: "Venezuela",
                    year: "2005",
                    issue_metric_ton: "6,164",
                    issue_liquid_fuel: "58,367",
                    issue_solid_fuel: "135,679"
                });
                
                datos.insert({
                    country: "Brasil",
                    year: "1970",
                    issue_metric_ton: "0,984",
                    issue_liquid_fuel: "83,527",
                    issue_solid_fuel: "8910,81"
                });


                res.sendStatus(201);

            }
            else {

                res.sendStatus(409);
            }
        });
    });

    //Portal de POSTMAN.

    app.get(BASE_PATH + "/issue-dioxid/docs", (req, res) => {

        res.redirect("https://documenter.getpostman.com/view/6918673/S1LyUnWv");

    });


    // GET a un conjunto

    app.get(BASE_PATH + "/issue-dioxid", (req, res) => {

        var limit = parseInt(req.query.limit);

        var offset = parseInt(req.query.offset);

        var country = req.query.country;

        var year = req.query.year;

        if (!limit && !offset) {

            limit = 0;
            offset = 0;
        }

        if (!country && !year) {

            datos.find({}).skip(offset).limit(limit).toArray((err, datosArray) => {

                if (err) {

                    console.log("Error " + err);
                }
                else {

                    if (datosArray.length > 0) {

                        res.send(datosArray.map((dato) => {

                            delete dato._id;

                            return dato;
                        }));
                    }
                    else {
                        
                        res.send(datosArray);
                    }
                }
            })
        }
        else {

            if (country && !year) {

                datos.find({ "country": country }).toArray((err, datosArray) => {

                    if (err) {

                        console.log("Error " + err);
                    }
                    else {

                        if (datosArray.length > 0) {

                            res.send(datosArray.map((dato) => {

                                delete dato._id;

                                return dato;
                            }));
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                })
            }
            else {

                datos.find({ "year": year }).toArray((err, datosArray) => {

                    if (err) {

                        console.log("Error " + err);
                    }
                    else {

                        if (datosArray.length > 0) {

                            res.send(datosArray.map((dato) => {

                                delete dato._id;

                                return dato;
                            }));
                        }
                        else {
                            res.sendStatus(404);
                        }
                    }
                })
            }
        }
    });

    // GET a un dato

    console.log("get a un dato");

    app.get(BASE_PATH + "/issue-dioxid/:nombre_del_pais/:anyo", (req, res) => {

        var name = req.params.nombre_del_pais;

        var anyo = req.params.anyo;


        datos.find({ "country": name, "year": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    var newDato = (dato.map((dato) => {

                        delete dato._id;

                        return dato;
                    }));

                    res.send(newDato[0]);
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Post de un recurso al conjunto.

    app.post(BASE_PATH + "/issue-dioxid", (req, res) => {

        var newData = req.body;

        datos.find({ "country": newData.country, "year": newData.year }).toArray((err, datosArray) => {

            if (err) {

                res.sendStatus(409);
            }
            else {

                if (datosArray.length > 0) {

                    res.sendStatus(409);
                }
                else {

                    if (Object.keys(newData).length >= 5 && newData.country && newData.year &&
                        newData.issue_metric_ton && newData.issue_liquid_fuel && newData.issue_solid_fuel) {

                        datos.insert(newData);

                        res.sendStatus(201);


                    }
                    else {

                        res.sendStatus(400);
                    }

                }

            }

        });
    });

    // POST a un recurso(error)

    app.post(BASE_PATH + "/issue-dioxid/:name/:anyo", (req, res) => {

        res.sendStatus(405);
    });

    // PUT a uno concreto

    app.put(BASE_PATH + "/issue-dioxid/:name/:anyo", (req, res) => {

        var name = req.params.name;

        var anyo = req.params.anyo;

        var newData = req.body;

        datos.find({ "country": name, "year": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(400);

            }
            else {

                if (Object.keys(newData).length >= 5 && newData.country && newData.year &&
                    newData.issue_metric_ton && newData.issue_liquid_fuel && newData.issue_solid_fuel
                    && newData.country == name && newData.year == anyo) {

                    datos.update({ "country": name, "year": anyo }, { $set: newData });

                    res.sendStatus(200);
                }
                else {

                    res.sendStatus(400);
                }
            }
        });
    });

    // PUT al conjunto(error)

    app.put(BASE_PATH + "/issue-dioxid", (req, res) => {

        res.sendStatus(405);
    });

    // DELETE a un conjunto

    app.delete(BASE_PATH + "/issue-dioxid", (req, res) => {

        datos.remove({});

        res.sendStatus(200);
    });

    //DELETE a un dato

    app.delete(BASE_PATH + "/issue-dioxid/:nombre_del_pais/:anyo", (req, res) => {

        var name = req.params.nombre_del_pais;

        var anyo = req.params.anyo;

        datos.find({ "country": name, "year": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);

            }
            else {

                if (dato.length > 0) {

                    datos.remove({ "country": name, "year": anyo });

                    res.sendStatus(200);
                }
                else {

                    res.sendStatus(404);
                }
            }
        });
    });
};
