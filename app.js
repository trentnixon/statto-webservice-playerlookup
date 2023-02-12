const express = require("express");
const app = express();

app.use(express.json());
/* 
app.post("/webhook", (req, res) => {
  console.log("Received a request:", req.body);
  res.send({ message: "Hello from the webhook service!" });
}); */
app.get("/webhook", (req, res) => {
  console.log("Received a GET request");
  res.send({ message: "Hello from the webhook service!" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook service running on port ${port}`);
});


/* const cron = require("node-cron");
const PlayerDetails = require("./Update_PlayerDetails"); */
//"*/10 * * * *"
/* cron.schedule("* * * * *", function() {
  console.log("Hello World");
  PlayerDetails.Run();
}); */
