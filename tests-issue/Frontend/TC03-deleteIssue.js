describe("Check if a issue is deleted", function(){
        
        it("List should decrease after the issue deletion", function(){
            
            browser.get("http://localhost:8080");
            
            element.all(by.repeater("dato in datos")).then(function(initialIssues){
                
                element(by.model("dato.country")).sendKeys("Albania");
                element(by.model("dato.year")).sendKeys("2012");
                
                element(by.css('["value=delete"]')).click();
                
                element.all(by.repeater("dato in datos")).then(function(finalIssues){
                    
                    expect(initialIssues.length).toBeGreaterThan(finalIssues.length);
                });
            });
        });
});