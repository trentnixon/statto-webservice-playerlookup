const express = require("express");
const PlayerDetails = require("./FindPlayersToUpdate");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.get("/webhook", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.APISECRET);
    console.log("Received a GET request from Strapi server");
    PlayerDetails.FindPlayers();
    res.send({ message: "Processing Player Details" });
  } catch (error) {
    return res.status(401).send({ message: "Invalid token" });
  }
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
