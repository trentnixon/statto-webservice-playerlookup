const cron = require("node-cron");

cron.schedule("* * * * *", function() {
  console.log("Hello World");
});