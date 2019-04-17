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


                res.send(201);

            }
            else {

                res.send(409);
            }
        });
    });

    //Portal de POSTMAN.

    app.get(BASE_PATH + "/issue-dioxid/docs", (req, res) => {

        res.redirect("https://documenter.getpostman.com/view/6918673/S17xt6XH");

    });


    // GET a un conjunto

    app.get(BASE_PATH + "/issue-dioxid", (req, res) => {

        var limit = parseInt(req.query.limit);

        var offset = parseInt(req.query.offset);

        var country = (req.query.country);

        var year = req.query.year;

        var issue_metric_ton = req.query.issue_metric_ton;

        var issue_liquid_fuel = req.query.issue_liquid_fuel;

        var issue_solid_fuel = req.query.issue_solid_fuel;

        if (!limit && !offset) {

            limit = 0;
            offset = 0;
        }

        if (!country && !year && !issue_metric_ton && !issue_liquid_fuel && !issue_solid_fuel) {

            datos.find({}).skip(offset).limit(limit).toArray((err, datosArray) => {

                if (err) {

                    console.log("Error " + err);
                }
                else {

                    res.send(datosArray.map((dato) => {

                        delete dato._id;

                        return dato;
                    }));

                    res.sendStatus(200);
                }
            })
        };
    });

    //GET por una clave.

    app.get(BASE_PATH + "/issue-dioxid/:data", (req, res) => {

        var data = parseInt(req.params.data);

        var limit = parseInt(req.query.limit);

        var offset = parseInt(req.query.offset);

        if (!limit && !offset) {
            limit = 0;
            offset = 0;

        }

        if (!Number.isInteger(data)) {

            var name = req.params.data;


            datos.find({ "country": name }).skip(offset).limit(limit).toArray((err, datosArray) => {

                if (err) {

                    console.log("Error " + err);
                }
                else {

                    res.send(datosArray.map((dato) => {

                        delete dato._id;

                        return dato;
                    }));

                }

            });

            res.sendStatus(200);
        }
        else {

            datos.find({ "year": data }).skip(offset).limit(limit).toArray((err, datosArray) => {

                if (err) {

                    console.log("Error " + err);
                }
                else {

                    res.send(datosArray.map((dato) => {

                        delete dato._id;

                        return dato;
                    }));

                }

            });

            res.sendStatus(200);
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
                    newData.issue_metric_ton && newData.issue_liquid_fuel && newData.issue_solid_fuel) {

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
