module.exports = function(app, datos) {

    //Búsqueda por país.

    app.get("/api/v1/issue-dioxid/nombre_del_pais=:name", (req, res) => {

        var name = req.params.name;


        datos.find({ "nombre_del_pais": name }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato);
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por año.

    app.get("/api/v1/issue-dioxid/anyo=:anyo", (req, res) => {

        var anyo = req.params.anyo;


        datos.find({ "año": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato);
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por emisiones.

    app.get("/api/v1/issue-dioxid/emisiones_de_co2=:emi", (req, res) => {

        var em = req.params.emi;


        datos.find({ "emisiones_de_co2": em }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato);
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por país y año.

    app.get("/api/v1/issue-dioxid/nombre_del_pais=:name/anyo=:anyo", (req, res) => {

        var name = req.params.name;

        var anyo = req.params.anyo;


        datos.find({ "nombre_del_pais": name, "año": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato);
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por año y emisiones.

    app.get("/api/v1/issue-dioxid/anyo=:anyo/emisiones_de_co2=:emi", (req, res) => {

        var anyo = req.params.anyo;

        var em = req.params.emi;


        datos.find({ "año": anyo, "emisiones_de_co2": em }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato);
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Búsqueda por país y emisiones.

    app.get("/api/v1/issue-dioxid/nombre_del_pais=:name/emisiones_de_co2=:emi", (req, res) => {

        var name = req.params.name;

        var em = req.params.emi;


        datos.find({ "nombre_del_pais": name, "emisiones_de_co2": em }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato);
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });

    //Paginación.

    app.get("/api/v1/issue-dioxid/limit=:limit/offset=:offset", (req, res) => {

        var limit = req.params.limit;

        var offset = req.params.offset;

        datos.find({}).toArray((err, datosArray) => {

            if (err) {

                console.log("Error " + err);
            }
            else {

                var sublista = datosArray.slice(offset, (datosArray.length));

                var subsub = sublista.slice(0, limit + 1);

                res.send(subsub);

            }

        });
    });

}
