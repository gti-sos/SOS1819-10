var api = require("./v2");

module.exports = {

    register: register 
}


function register(app, BASE_PATH, issue_dioxid) {

    api(app, BASE_PATH + "/v2", issue_dioxid);

}