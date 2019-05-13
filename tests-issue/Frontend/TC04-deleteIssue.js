describe("Check if a issue is deleted", function(){
        
        it("List should decrease after the issue deletion", function(){
            
            browser.get("https://sos1819-general-sos1819fpc.c9users.io/issue-dioxid/#!/");
            
            element.all(by.repeater("dato in datos")).then(function(initialIssues){
                
                element(by.model("newData.country")).sendKeys("Alemania");
                element(by.model("newData.year")).sendKeys("2010");
                
                element(by.css('[value="delete"]')).click();
                
                element.all(by.repeater("dato in datos")).then(function(finalIssues){
                    
                    expect(initialIssues.length).toBeGreaterThan(finalIssues.length);
                });
            });
        });
});