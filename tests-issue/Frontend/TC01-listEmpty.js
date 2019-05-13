describe("Check if issue data is erased", function(){
        
        it("List should is empty", function(){
                
            browser.get("https://sos1819-general-sos1819fpc.c9users.io/issue-dioxid/#!/");
            
            var issues = element.all(by.repeater("dato in datos"));
            
            expect(issues.count()).toEqual(0);
        });
});