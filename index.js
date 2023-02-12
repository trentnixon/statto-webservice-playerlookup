const cron = require("node-cron");

cron.schedule("*/10 * * * *", function() {
  console.log("Hello World");
});
