module.exports = function(app, datos) {
    
    // DELETE a un conjunto

    console.log("Borrar la lista, iniciando");

    app.delete("/api/v1/issue-dioxid", (req, res) => {

        datos.remove({});

        res.sendStatus(200);
    });

    console.log("Borrar la lista, hecho");

    //DELETE a un dato

    console.log("Borrar un elemento, iniciando");

    app.delete("/api/v1/issue-dioxid/:nombre_del_pais/:anyo", (req, res) => {

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

    console.log("Borrar un elemento, hecho");
}
