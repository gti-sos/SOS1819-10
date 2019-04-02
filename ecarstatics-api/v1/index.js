module.exports = function(app, BASE_PATH, ecarstatics) {

    console.log("Registering ecarstatics API (v1)....");

    var path = "";

    path = BASE_PATH;

    var ecarstatics;

    //Get /api/v1/e-car-statics/docs

    app.get(path + "/e-car-statics/docs", (req, res) => {
        res.redirect("https://documenter.getpostman.com/view/7062681/S17us6hd");
    });

    // GET /api/v1/e-car-statics/loadInitialData


    app.get(path + "/e-car-statics/loadInitialData", (req, res) => {

        var newecarstatics = [{
            country: "Norway",
            year: 2015,
            marketPart: 22.39,
            rankingPosition: 1,
            existsVehicles: 84401
        }, {
            country: "Norway",
            year: 2014,
            marketPart: 13.84,
            rankingPosition: 1,
            existsVehicles: 43432
        }, {
            country: "Norway",
            year: 2013,
            marketPart: 6.1,
            rankingPosition: 1,
            existsVehicles: 20486
        }, {
            country: "Holand",
            year: 2015,
            marketPart: 9.74,
            rankingPosition: 2,
            existsVehicles: 88991
        }, {
            country: "Holand",
            year: 2014,
            marketPart: 3.87,
            rankingPosition: 2,
            existsVehicles: 45020
        }];

        ecarstatics.find({}).toArray((err, eCarStaticsArray) => {

            if (eCarStaticsArray.length == 0) {
                console.log("Empty db");
                ecarstatics.insert(newecarstatics);
                res.sendStatus(200);
            } else {
                console.log("Err : " + err);
                res.sendStatus(409);
            }
        });
    });


    //  GET /api/v1/e-car-statics

    app.get(path + "/e-car-statics", (req, res) => {

        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        var fromYear = parseInt(req.query.from);
        var toYear = parseInt(req.query.to);
        var year = parseInt(req.query.year);

        var pos = parseInt(req.query.rankingPosition);

        var fromVehicles = parseInt(req.query.fromVehicles);
        var toVehicles = parseInt(req.query.toVehicles);

        if (fromYear && toYear) {
            ecarstatics.find({ year: { $gte: fromYear, $lte: toYear } }).skip(offset).limit(limit).toArray((err, ecarstaticsArray) => {
                if (err)
                    console.log("Error: " + err);
                if (ecarstaticsArray.length == 0) {
                    res.sendStatus(404);
                    return;
                } else {
                    res.send(ecarstaticsArray.map((o) => {
                        delete o._id;
                        return o;
                    }));
                }
            });
        } else if (Number.isInteger(year)) {
            ecarstatics.find({ year: year }).skip(offset).limit(limit).toArray((err, ecarstaticsArray) => {
                if (err)
                    console.log("Error: " + err);
                if (ecarstaticsArray.length == 0) {
                    res.sendStatus(404);
                    return;
                } else {
                    res.send(ecarstaticsArray.map((o) => {
                        delete o._id;
                        return o;
                    }));
                }
            });

        } else if (Number.isInteger(pos)) {
            ecarstatics.find({ rankingPosition: pos }).skip(offset).limit(limit).toArray((err, ecarstaticsArray) => {
                if (err)
                    console.log("Error: " + err);
                if (ecarstaticsArray.length == 0) {
                    res.sendStatus(404);
                    return;
                } else {
                    res.send(ecarstaticsArray.map((o) => {
                        delete o._id;
                        return o;
                    }));
                }
            });

        } else if (Number.isInteger(fromVehicles) && Number.isInteger(toVehicles)) {
            ecarstatics.find({ existsVehicles: { $gte: fromVehicles, $lte: toVehicles } }).skip(offset).limit(limit).toArray((err, ecarstaticsArray) => {
                if (err)
                    console.log("Error: " + err);
                if (ecarstaticsArray.length == 0) {
                    res.sendStatus(404);
                    return;
                } else {
                    res.send(ecarstaticsArray.map((o) => {
                        delete o._id;
                        return o;
                    }));
                }
            });

        } else {
            ecarstatics.find({}).skip(offset).limit(limit).toArray((err, ecarstaticsArray) => {
                if (err)
                    console.log("Error: " + err);
                if (ecarstaticsArray.length == 0) {
                    res.sendStatus(404);
                    return;
                } else {
                    res.send(ecarstaticsArray.map((o) => {
                        delete o._id;
                        return o;
                    }));
                }

            });
        }
    });


    //   POST /api/v1/e-car-statics

    app.post(path + "/e-car-statics", (req, res) => {

        var newCarStatics = req.body;

        if (Object.keys(newCarStatics).length > 5 || !newCarStatics.country || !newCarStatics.year || !newCarStatics.marketPart ||
            !newCarStatics.rankingPosition || !newCarStatics.existsVehicles) {

            res.sendStatus(400);
            return;
        }

        ecarstatics.find({ "country": newCarStatics["country"], "year": newCarStatics["year"] }).toArray((err, ecarstaticsArray) => {
            if (err) {
                console.error("Error accesing DB");
                res.sendStatus(500);
                return;
            }

            if (ecarstaticsArray.length > 0) {
                res.sendStatus(409);
                return;
            } else {
                ecarstatics.insert(newCarStatics);
                res.sendStatus(201);
            }

        });
    });

    // DELETE /api/v1/e-car-statics

    app.delete(path + "/e-car-statics", (req, res) => {

        ecarstatics.remove({});

        res.sendStatus(200);
    });

    // GET /api/v1/e-car-statics/Spain
    app.get(path + "/e-car-statics/:country", (req, res) => {

        var country = req.params.country;
        var fromYear = parseInt(req.query.from);
        var toYear = parseInt(req.query.to);
        var limit = parseInt(req.query.limit);
        var offset = parseInt(req.query.offset);

        if (Number.isInteger(fromYear) && Number.isInteger(toYear)) {
            ecarstatics.find({ "country": country, "year": { $gte: fromYear, $lte: toYear } }).skip(offset).limit(limit).toArray((err, ecarstaticsArray) => {
                if (err) {
                    console.log("Error: " + err);
                    res.sendStatus(500);
                    return;
                }
                if (ecarstaticsArray.length >= 1) {
                    res.send(ecarstaticsArray.map((i) => {
                        delete i._id;
                        return i;
                    }));
                } else {
                    res.sendStatus(404);
                }
            });
        } else {
            ecarstatics.find({ "country": country }).skip(offset).limit(limit).toArray((err, ecarstaticsArray) => {
                if (err) {
                    console.log("Error: " + err);
                    res.sendStatus(500);
                    return;
                }
                if (ecarstaticsArray.length >= 1) {
                    res.send(ecarstaticsArray.map((o) => {
                        delete o._id;
                        return o;
                    }));
                } else {
                    res.sendStatus(404);
                }
            });
        }
    });

    // GET /api/v1/e-car-statics/Holand/2015

    app.get(path + "/e-car-statics/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = parseInt(req.params.year);

        ecarstatics.find({ "country": country, "year": year }).toArray((err, ecarstaticsArray) => {
            if (err) {
                console.log("Error: " + err);
                res.sendStatus(500);
                return;
            }
            if (ecarstaticsArray.length >= 1) {
                res.send(ecarstaticsArray.map((o) => {
                    delete o._id;
                    return o;
                })[0]);
            } else {
                res.sendStatus(404);
            }

        });

    });

    // PUT /api/v1/e-car-statics/Holand/2015

    app.put(path + "/e-car-statics/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = parseInt(req.params.year);
        var updatedCarStatics = req.body;

        if (updatedCarStatics.country != country || updatedCarStatics.year != year || !updatedCarStatics.year || !updatedCarStatics.country ||
            !updatedCarStatics.marketPart || !updatedCarStatics.rankingPosition || !updatedCarStatics.existsVehicles ||
            updatedCarStatics["country"] == null || updatedCarStatics["year"] == null ||
            updatedCarStatics["marketPart"] == null || updatedCarStatics["rankingPosition"] == null ||
            updatedCarStatics["existsVehicles"] == null) {
            res.sendStatus(400);
            return;
        }

        ecarstatics.find({ "country": country, "year": year }).toArray((err, filteredCarStatics) => {
            if (err) {
                console.log("Error! :" + err);
                res.sendStatus(500);
                return;
            }

            if (filteredCarStatics.length == 0) {
                res.sendStatus(404);
            } else {
                ecarstatics.update({ "country": updatedCarStatics.country, "year": updatedCarStatics.year }, updatedCarStatics);
                res.sendStatus(200);
            }
        });

    });

    // DELETE /api/v1/e-car-statics/Holand/2013

    app.delete(path + "/e-car-statics/:country/:year", (req, res) => {

        var country = req.params.country;
        var year = parseInt(req.params.year);

        ecarstatics.remove({ "country": country, "year": year });

        res.sendStatus(200);

    });

    // POST /api/v1/e-car-statics/2015

    app.post(path + "/e-car-statics/:country/:year", (req, res) => {

        res.sendStatus(405);
    });

    // PUT /api/v1/e-car-statics

    app.put(path + "/e-car-statics", (req, res) => {

        res.sendStatus(405);
    });

};
