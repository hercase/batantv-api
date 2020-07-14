const db = require("../models");
const Channel = db.channels;

// Create and Save a new Channel
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a channel
  const channel = new Channel({
    title: req.body.title,
    description: req.body.description,
  });

  // Save channel in the database
  channel
    .save(channel)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Channel."
      });
    });
};

// Retrieve all Channels from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Channel.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Channel with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Channel.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Channel with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Channel with id=" + id });
    });
};

// Update a Channel by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Channel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Channel with id=${id}. Maybe Channel was not found!`
        });
      } else res.send({ message: "Channel was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Channel with id=" + id
      });
    });
};

// Delete a Channel with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Channel.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Channel with id=${id}. Maybe Channel was not found!`
        });
      } else {
        res.send({
          message: "Channel was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Channel with id=" + id
      });
    });
};

// Delete all Channels from the database.
exports.deleteAll = (req, res) => {
  Channel.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Channels were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};