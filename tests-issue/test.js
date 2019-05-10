exports.config = {
  
  seleniumAddress: "http://localhost:4444/wd/hub",
  chromeOnly: true,
  specs: ["Frontend/TC01-loadIssue.js",
          "Frontend/TC02-createIssue.js",
          "Frontend/TC03-deleteIssue.js"
  ]
};