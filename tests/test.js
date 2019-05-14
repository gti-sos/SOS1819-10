exports.config = {
  
  seleniumAddress: "http://localhost:4444/wd/hub",
  chromeOnly: true,
  specs: ["e2e/TC01-listEmpty.js",
          "e2e/TC02-loadList.js",
          "e2e/TC03-createIssue.js",
          "e2e/TC04-deleteIssue.js",
          "e2e/TC05-loadDataecarstatics.js",
          "e2e/TC06-createDataecarstatics.js",
          "e2e/TC07-removeDataecarstatics.js"
  ]
};