var api1 = require("./v1");
var api2 = require("./v2");

module.exports = {

    register: register, // de esta manera queda más limpio porque se puede tener
    configure: function() {
        //...Un ejemplo de cara a futuras funciones
    }
}


function register(app, BASE_PATH, biofuels) {

    api1(app, BASE_PATH + "/v1", biofuels);
    api2(app, BASE_PATH + "/v2", biofuels);

}
