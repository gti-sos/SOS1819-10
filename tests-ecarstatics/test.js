exports.config = {

  seleniumAddress: "http://localhost:4444/wd/hub",
  chromeOnly: true,
  specs: ["TC01-createDataecarstatics",
            "TC02-loadDataecarstatics",
            "TC03-removeDataecarstatics"
  ]
};
