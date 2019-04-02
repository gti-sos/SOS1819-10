var api = require("./v1");

module.exports = {

    register: register, // de esta manera queda más limpio porque se puede tener
    configure: function() {
        //...Un ejemplo de cara a futuras funciones
    }
}


function register(app, BASE_PATH, biofuels) {

    api(app, BASE_PATH + "/v1", biofuels);

}
