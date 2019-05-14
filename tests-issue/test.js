exports.config = {
  
  seleniumAddress: "http://localhost:4444/wd/hub",
  chromeOnly: true,
  specs: ["Frontend/TC01-listEmpty.js",
          "Frontend/TC02-loadList.js",
          "Frontend/TC03-createIssue.js",
          "Frontend/TC04-deleteIssue.js",
          "TC05-loadDataecarstatics.js",
		      "TC06-createDataecarstatics.js",
		      "TC07-removeDataecarstatics.js"
  ]
};