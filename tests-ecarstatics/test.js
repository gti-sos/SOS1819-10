exports.config = {
  
  seleniumAddress: "http://localhost:4444/wd/hub",
  chromeOnly: true,
  specs: ["e2e/TC01-loadDataecarstatics.js",
		      "e2e/TC02-createDataecarstatics.js",
		      "e2e/TC03-removeDataecarstatics.js"
  ]
};