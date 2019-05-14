describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get("http://localhost:8080/#!/ui/v1/e-car-statics");
		var ecarstatics= element.all(by.repeater("ecarstatic in ecarstatics"));
		expect(ecarstatics.count()).toBeGreaterThan(0);
	});
});