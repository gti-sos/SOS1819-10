module.exports = function(app, datos) {

    // GET a un conjunto

    app.get("/api/v1/issue-dioxid", (req, res) => {

        datos.find({}).toArray((err, datosArray) => {

            if (err) {

                console.log("Error " + err);
            }
            else {

                res.send(datosArray);

            }

        });
    });

    // GET a un dato
    
    console.log("get a un dato");
    
    app.get("/api/v1/issue-dioxid/:nombre_del_pais/:anyo", (req, res) => {

        var name = req.params.nombre_del_pais;

        var anyo = req.params.anyo;


        datos.find({ "nombre_del_pais": name, "año": anyo }).toArray((err, dato) => {

            if (err) {

                res.sendStatus(404);
            }
            else {

                if (dato.length > 0) {

                    res.send(dato[0]);
                }
                else {

                    res.sendStatus(404);
                }

            }

        });
    });
    
    console.log("finish get");
}
