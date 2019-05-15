exports.config = {

  seleniumAddress: "http://localhost:4444/wd/hub",
  chromeOnly: true,
  specs: ["TC01-createDataecarstatics.js",
            "TC02-loadDataecarstatics.js",
            "TC03-removeDataecarstatics.js"
  ]
};
