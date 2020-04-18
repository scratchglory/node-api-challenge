// must export in order for it to work!
const express = require("express");
const actions = require("./actionModel");
const router = express.Router();

router.get("/:id", validateActionId(), (req, res) => {
  console.log("Action Router Get By ID", req.params.id);
  // using validateActionId to retrieve data
});

router.post("/", (req, res, next) => {
  console.log("Action Router Post", req.body);
  // project_id(number), description(string), notes(string)
  // project_id is associated to the id of the project
  actions
    .insert(req.body)
    .then((action) => {
      res.status(201).json(action);
    })
    .catch((error) => {
      console.log(error);
      //   res.status(500).json({ message: "ERROR adding action" });
      next(error);
    });
});

router.put("/:id", (req, res) => {
  console.log("Action Router Put", req.params.id, req.body);
  actions
    .update(req.params.id, req.body)
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "ERROR updating action" });
    });
});

router.delete("/:id", (req, res) => {
  console.log("Action Router Delete", req.params.id);
  actions
    .remove(req.params.id)
    .then((action) => {
      res.status(200).json({ message: "NUKED action" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "NUKE unavailable" });
    });
});

// VALIDATIONS
function validateActionId() {
  // if req.params.id is valid, store action obj as req.action
  return (req, res, next) => {
    actions;
    actions
      .get(req.params.id)
      .then((action) => {
        if (action) {
          res.status(200).json(action);
          next();
        } else {
          res.status(400).json({ message: "Action NOT found" });
        }
      })
      .catch((error) => {
        console.log("ActionRouter Get Error", error);
        res.status(500).json({ message: "ERROR getting action" });
        //  next(error);
      });
  };
}

// must export in order for it to work!
module.exports = router;
