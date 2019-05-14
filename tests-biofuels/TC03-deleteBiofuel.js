describe("Check if a biofuel can be deleted", function() {
    it("List decrease after the biofuel deletion", function() {
        browser.get("http://localhost:8080/#!/ui/v1/biofuels-production");
        element(by.css('[value="page"]')).click();

        element.all(by.repeater("biofuel in biofuels"))
            .then(function(initialCountry) {

                element.all(by.css('[value="delete"]')).last().click().then(function() {

                    element.all(by.repeater("biofuel in biofuels"))
                        .then(function(finalCountry) {
                            expect(finalCountry.length).toEqual(initialCountry.length - 1);
                        });
                })
            });
    });
});
