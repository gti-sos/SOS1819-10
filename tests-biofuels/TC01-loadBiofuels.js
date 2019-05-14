describe("Data is loaded", function() {
    it("More of 0 items", function() {
        browser.get("http://localhost:8080/#!/ui/v1/biofuels-production");
        var ecarstatics = element.all(by.repeater("biofuel in biofuels"));
        expect(ecarstatics.count()).toBeGreaterThan(0);
    });
});


describe("Check if loadInitialData work", function() {

    it("List should have six elements", function() {

        browser.get("https://sos1819-general-sos1819fpc.c9users.io/#!/ui/v1/issue-dioxid/0");

        element.all(by.repeater("dato in datos")).then(function() {

            element(by.css('[value="load"]')).click();

            element.all(by.repeater("dato in datos")).then(function(finalIssues) {

                expect(finalIssues.length).toBeGreaterThan(0);
            });
        });
    });
});
