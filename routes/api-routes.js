const express = require("express");
const router = express.Router();
const db = require("../models");

// see all todos
router.get("/all", async (req, res) => {
  try {
    const todos = await db.Todo.findAll();
    res.send(todos);
  } catch (err) {
    // throw err;
    res.send({ msg: "nope" });
  }

  // db.Todo.findAll()
  //   .then((todos) => res.send(todos))
  //   .catch((err) => res.send(err));
});

// see a single todo
router.get("/find/:id", (req, res) => {
  db.Todo.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((todo) => res.send(todo))
    .catch((err) => res.send(err));
});

// create a new todo
router.post("/new", (req, res) => {
  db.Todo.create({
    text: req.body.text,
  })
    .then((todo) => res.send(todo))
    .catch((err) => res.send(err));
});

// update a todo
router.patch("/update", (req, res) => {
  db.Todo.update({ text: req.body.text }, { where: { id: req.body.id } })
    .then((updateResponse) => res.send(updateResponse))
    .catch((err) => res.send(err));
});

router.patch("/update", (req, res) => {
  db.Todo.update(
    {
      text: req.body.text,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  )
    .then(() => res.send({ msg: "success" }))
    .catch((err) => res.send(err));
});

// delete a todo
router.delete("/delete/:id", (req, res) => {
  db.Todo.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.send({ msg: "success" }))
    .catch((err) => res.send(err));
});

module.exports = router;
