describe("Check if loadInitialData work", function() {

    it("List should have six elements", function() {

        browser.get("https://sos1819-general-sos1819fpc.c9users.io/issue-dioxid/#!/");

        element.all(by.repeater("dato in datos")).then(function() {

            element(by.css('[value="load"]')).click();

            element.all(by.repeater("dato in datos")).then(function(finalIssues) {

                expect(finalIssues.length).toBeGreaterThan(0);
            });
        });
    });
});
