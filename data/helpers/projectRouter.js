// Must export in order to use!
const express = require("express");
const projects = require("./projectModel");
const router = express.Router();

router.get("/:id", validateProjectId(), (req, res) => {
  console.log("Project Router Get By Id", req.params.id);
  // validateProjectId()
});

router.get("/project-ids/:projectId", (req, res) => {
  console.log("Project Router Get projectID", req.params.projectId);
  projects
    .getProjectActions(req.params.projectId)
    .then((projects) => {
      console.log(projects);
      if (projects.length === 0) {
        res
          .status(400)
          .json({ message: `Project ID ${req.params.projectId} NOT found` });
      } else {
        res.status(200).json(projects);
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "ERROR finding project" });
    });
});

router.post("/", (req, res) => {
  console.log("Project Router Post", req.body);
  // name(string), description(string)
  projects
    .insert(req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "ERROR creating project" });
    });
});

router.put("/:id", (req, res) => {
  console.log("Project Router Put", req.params.id, req.body);
  projects
    .update(req.params.id, req.body)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      res.status(500).json({ message: "ERROR updating project" });
    });
});

router.delete("/:id", (req, res) => {
  console.log("Project Router Delete", req.params.id);
  projects
    .remove(req.params.id)
    .then((project) => {
      res.status(200).json({ message: `NUKED project ${req.params.id}` });
    })
    .catch((error) => {
      res.status(500).json({ message: "ERROR nuking project" });
    });
});

function validateProjectId() {
  return (req, res, next) => {
    projects
      .get(req.params.id)
      .then((project) => {
        if (project) {
          res.status(200).json(project);
        } else {
          res
            .status(400)
            .json({ message: `Project ${req.params.id} NOT found` });
        }
      })
      .catch((error) => {
        next(error);
      });
  };
}

module.exports = router;
