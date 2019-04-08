var api = require("./v2");

module.exports = {

    register: register 
}


function register(app, BASE_PATH, issue_dioxid) {

    api(app, BASE_PATH + "/v1", issue_dioxid);

}