module.exports = function(app, BASE_PATH, issue_dioxid) {

    console.log("Registering issue_dioxid API (v2)....");

    var path = "";

    var datos = issue_dioxid;

    path = BASE_PATH + "issue_dioxid/loadInitialData";

    app.get(BASE_PATH + "/issue-dioxid/loadInitialData", (req, res) => {

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

    app.get(BASE_PATH + "/issue-dioxid/docs", (req, res) => {

        res.redirect("https://documenter.getpostman.com/view/6918673/S17xt6XH");

    });


    // GET a un conjunto

    app.get(BASE_PATH + "/issue-dioxid", (req, res) => {
        
        var limit = parseInt(req.query.limit);
        
        var offset = parseInt(req.query.offset);
        
        if (!limit && !offset) {
            limit = 0;
            offset = 0;

        }

        datos.find({}).skip(offset).limit(limit).toArray((err, datosArray) => {

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
    });

    // GET a un dato

    console.log("get a un dato");

    app.get(BASE_PATH + "/issue-dioxid/:nombre_del_pais/:anyo", (req, res) => {

        var name = req.params.nombre_del_pais;

        var anyo = req.params.anyo;


        datos.find({ "nombre_del_pais": name, "año": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato.map((dato) => {

                        delete dato._id;

                        return dato[0];
                    }));
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

        datos.find({ "nombre_del_pais": newData.nombre_del_pais, "año": newData.año }).toArray((err, datosArray) => {

            if (err) {

                res.sendStatus(409);
            }
            else {

                if (datosArray.length > 0) {

                    res.sendStatus(409);
                }
                else {

                    if (Object.keys(newData).length >= 3 && newData.nombre_del_pais && newData.año &&
                        newData.emisiones_de_co2) {

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

        datos.find({ "nombre_del_pais": name, "año": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(400);

            }
            else {

                if (Object.keys(newData).length >= 3 && newData.nombre_del_pais && newData.año &&
                    newData.emisiones_de_co2 && newData.nombre_del_pais == name && newData.año == anyo) {

                    datos.update({ "nombre_del_pais": name, "año": anyo }, { $set: newData });

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

        datos.find({ "nombre_del_pais": name, "año": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);

            }
            else {

                if (dato.length > 0) {

                    datos.remove({ "nombre_del_pais": name, "año": anyo });

                    res.sendStatus(200);
                }
                else {

                    res.sendStatus(404);
                }
            }
        });
    });

    //Búsqueda por país.

    app.get(BASE_PATH + "/issue-dioxid/nombre_del_pais=:name", (req, res) => {

        var name = req.params.name;


        datos.find({ "nombre_del_pais": name }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato.map((dato) => {

                        delete dato._id;

                        return dato[0];
                    }));
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por año.

    app.get(BASE_PATH + "/issue-dioxid/anyo=:anyo", (req, res) => {

        var anyo = req.params.anyo;


        datos.find({ "año": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato.map((dato) => {

                        delete dato._id;

                        return dato[0];
                    }));
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por emisiones.

    app.get(BASE_PATH + "/issue-dioxid/emisiones_de_co2=:emi", (req, res) => {

        var em = req.params.emi;


        datos.find({ "emisiones_de_co2": em }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato.map((dato) => {

                        delete dato._id;

                        return dato[0];
                    }));
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por país y año.

    app.get(BASE_PATH + "/issue-dioxid/nombre_del_pais=:name/anyo=:anyo", (req, res) => {

        var name = req.params.name;

        var anyo = req.params.anyo;


        datos.find({ "nombre_del_pais": name, "año": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato.map((dato) => {

                        delete dato._id;

                        return dato[0];
                    }));
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por año y emisiones.

    app.get(BASE_PATH + "/issue-dioxid/anyo=:anyo/emisiones_de_co2=:emi", (req, res) => {

        var anyo = req.params.anyo;

        var em = req.params.emi;


        datos.find({ "año": anyo, "emisiones_de_co2": em }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato.map((dato) => {

                        delete dato._id;

                        return dato[0];
                    }));
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por país y emisiones.

    app.get(BASE_PATH + "/issue-dioxid/nombre_del_pais=:name/emisiones_de_co2=:emi", (req, res) => {

        var name = req.params.name;

        var em = req.params.emi;


        datos.find({ "nombre_del_pais": name, "emisiones_de_co2": em }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato.map((dato) => {

                        delete dato._id;

                        return dato[0];
                    }));
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Paginación.

    app.get(BASE_PATH + "/issue-dioxid", (req, res) => {

        var limit = parseInt(req.query.limit);

        var offset = parseInt(req.query.offset);

        datos.find({}).skip(offset).limit(limit).toArray((err, datosArray) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                res.send(datosArray.map((dato) => {

                    delete dato._id;

                    return dato;
                }));

                res.sendStatus(200);

            }

        });
    });
}
