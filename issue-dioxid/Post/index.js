module.exports = function(app, datos) {

    //Post de un recurso al conjunto.

    app.post("/api/v1/issue-dioxid", (req, res) => {

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

    app.post("/api/v1/issue-dioxid/:name/:anyo", (req, res) => {

        res.sendStatus(405);
    });

}
