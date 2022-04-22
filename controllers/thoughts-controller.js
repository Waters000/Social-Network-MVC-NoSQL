const req = require('express/lib/request');
const { User, Thoughts } = require('../models');


const thoughtsController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .select('-__v')
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },


      // createThought
  createThought({ body }, res) {
    Thoughts.create(body)
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  },

// update Thought by id
updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No Thoughts found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

  // delete thought
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  },

  /// create a reaction to thought
  // path api/thoughts/:id/reactions

     // createThought
     createReactions({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            ({
                $push: {
                    reactions: req.body,
                },
          
            })
          .then(dbThoughtsData => res.json(dbThoughtsData))
          .catch(err => res.json(err));
      },
    


}


module.exports = thoughtsController;