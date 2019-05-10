describe("Check if issue data is loaded", function(){
        
        it("List should show a bunch of issues", function(){
                
            browser.get("http://localhost:8080");
            
            var issues = element.all(by.repeater("dato in datos"));
            
            expect(issues.count()).toBeGreaterThan(0);
        });
});