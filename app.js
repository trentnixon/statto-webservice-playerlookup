const express = require("express");
const PlayerDetails = require("./FindPlayersToUpdate"); 
const app = express();

app.use(express.json());

app.get("/webhook", (req, res) => {
  console.log("Received a GET request");
 
  PlayerDetails.FindPlayers()
  
  res.send({ message: "Processing Player Details" });

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook service running on port ${port}`);
});


/* 
app.post("/webhook", (req, res) => {
  console.log("Received a request:", req.body);
  res.send({ message: "Hello from the webhook service!" });
}); */

/* const cron = require("node-cron"); */

//"*/10 * * * *"
/* cron.schedule("* * * * *", function() {
  console.log("Hello World");
  PlayerDetails.Run();
}); */
