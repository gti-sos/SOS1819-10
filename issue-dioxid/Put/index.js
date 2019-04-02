module.exports = function(app, datos) {

    // PUT a uno concreto

    app.put("/api/v1/issue-dioxid/:name/:anyo", (req, res) => {

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

    app.put("/api/v1/issue-dioxid", (req, res) => {

        res.sendStatus(405);
    });
}
