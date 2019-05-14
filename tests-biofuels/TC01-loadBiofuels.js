describe("Data is loaded", function() {
    it("More of 0 items", function() {
        browser.get("http://localhost:8080/#!/ui/v1/biofuels-production");
        element(by.css('[value="load"]')).click();
        var ecarstatics = element.all(by.repeater("biofuel in biofuels"));
        expect(ecarstatics.count()).toBeGreaterThan(0);
    });
});
