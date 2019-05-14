describe("Check if issue data is erased", function() {

    it("List should is empty", function() {

        browser.get("http://localhost:8080/#!/ui/v1/issue-dioxid/0");

        var issues = element.all(by.repeater("dato in datos"));

        expect(issues.count()).toEqual(0);
    });
});
