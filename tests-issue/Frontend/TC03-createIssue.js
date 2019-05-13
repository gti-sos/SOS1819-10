describe("Check if a new issue is created", function(){
        
        it("List should grow after the issue creation", function(){
            
            browser.get("https://sos1819-general-sos1819fpc.c9users.io/issue-dioxid/#!/");
            
            element.all(by.repeater("dato in datos")).then(function(initialIssues){
                
                element(by.model("newData.country")).sendKeys("Alemania");
                element(by.model("newData.year")).sendKeys("2010");
                element(by.model("newData.issue_metric_ton")).sendKeys("7,68");
                element(by.model("newData.issue_liquid_fuel")).sendKeys("1234,67");
                element(by.model("newData.issue_solid_fuel")).sendKeys("34,89");
                
                element(by.css('[value="add"]')).click();
                
                element.all(by.repeater("dato in datos")).then(function(finalIssues){
                    
                    expect(finalIssues.length).toBeGreaterThan(initialIssues.length);
                });
            });
        });
});