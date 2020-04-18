const express = require("express");
const actionsRouter = require("./data/helpers/actionRouter");
const projectsRouter = require("./data/helpers/projectRouter");

// Middleware install
const cors = require("cors");

// Add servers
const server = express();
const port = 7070;
server.use(express.json());

// adding middleware
server.use(cors());
server.use((error, req, res, next) => {
  res.status(500).json({ message: "ERROR MIDDLEWARE" });
});

// Home
server.get("/", (req, res) => {
  res.json({ message: "NODE API CHALLENGE" });
});

// ROUTERS
server.use("/actions", actionsRouter);
server.use("/projects", projectsRouter);

server.listen(port, () => {
  console.log(`== On Port ${port} ==`);
});
