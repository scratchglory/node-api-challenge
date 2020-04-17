const express = require("express");
const actionRouter = require("./data/helpers/actionRouter");
const projectRouter = require("./data/helpers/projectRouter");

// SERVERS
const server = express();
const port = 7272;
server.use(express.json());

// MIDDLEWARE

// HOME
server.get("/", (req, res) => {
  res.json({ message: "NODE API CHALLENGE" });
});

// ROUTERS
server.use("/actions", actionRouter);
server.use("/projects", projectRouter);

server.listen(port, () => {
  console.log(`== On Port ${port}`);
});
