describe("Check if a new electric car statics can be created", function() {
    it("List should grow after the electric car statics creation", function() {
        browser.get("http://localhost:8080/#!/ui/v1/e-car-statics");
        element
            .all(by.repeater("ecarstatic in ecarstatics"))
            .then(function(initialCountry) {

                element(by.model('newCarStatic.country')).sendKeys("Holand");
                element(by.model('newCarStatic.year')).sendKeys(2011);
                element(by.model('newCarStatic.marketPart')).sendKeys(12);
                element(by.model('newCarStatic.rankingPosition')).sendKeys(12);
                element(by.model('newCarStatic.existsVehicles')).sendKeys(986);

                element(by.css('[value="add"]')).click().then(function() {

                    element
                        .all(by.repeater("ecarstatic in ecarstatics"))
                        .then(function(finalCountry) {
                            expect(finalCountry.length).toEqual(initialCountry.length + 1);
                        })
                });
            });
    });
});
