exports.config = {

  seleniumAddress: "http://localhost:4444/wd/hub",
  chromeOnly: true,
  specs: ["TC01-loadBiofuels.js",
    "TC02-createBiofuel.js",
    "TC03-deleteBiofuel.js"
  ]
};
