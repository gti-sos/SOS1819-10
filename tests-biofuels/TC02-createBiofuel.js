describe("Check if a new biofuyel can be created", function() {
    it("List should grow after the biofuel creation", function() {
        browser.get("http://localhost:8080/#!/ui/v1/biofuels-production");
        element
            .all(by.repeater("biofuel in biofuels"))
            .then(function(initialCountry) {

                element(by.model('newBiofuel.country')).sendKeys("Alemania");
                element(by.model('newBiofuel.year')).sendKeys(2011);
                element(by.model('newBiofuel.ethanolFuel')).sendKeys(20);
                element(by.model('newBiofuel.dryNaturalGas')).sendKeys(20);
                element(by.model('newBiofuel.biodiesel')).sendKeys(20);

                element(by.css('[value="add"]')).click().then(function() {

                    element
                        .all(by.repeater("biofuel in biofuels"))
                        .then(function(finalCountry) {
                            expect(finalCountry.length).toEqual(initialCountry.length + 1);
                        })
                });
            });
    });
});
