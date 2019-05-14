describe("Check if a country can be deleted", function() {
    it("List decrease after the country deletion", function() {
        browser.get("http://localhost:8080/#!/ui/v1/e-car-statics");
        var initialCountry = element.all(by.repeater("ecarstatic in ecarstatics"))
            .then(function(initialCountry) {
                element.all(by.css('[value="delete"]')).last().click().then(function(){

                element.all(by.repeater("ecarstatic in ecarstatics"))
                    .then(function(finalCountry) {
                        expect(finalCountry.length).toEqual(initialCountry.length - 1);
                    });
            })});
    });
});