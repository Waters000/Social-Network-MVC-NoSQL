const req = require('express/lib/request');
const res = require('express/lib/response');
const { Users, Thoughts } = require('../models');


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


      // addThought to user
      addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
          .then(({ _id }) => {
            return Users.findOneAndUpdate(
              { _id: params.usersId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },





      
// update Thought by id
updateThought({ params, body }, res) {
    console.log(body)
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

     // createReactions
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


           // addReaction to thought
           addReaction(req, res) {
        
                 Thoughts.findOneAndUpdate(
                  req.params.id,
                  { $push: { reactions: req.body } },
                  { new: true }
                )            
              .then(dbUserData => {
                if (!dbUserData) {
                  res.status(404).json({ message: 'No thought found with this id!' });
                  return;
                }
                res.json(dbUserData);
              })
              .catch(err => res.json(err));
          },
    


}


module.exports = thoughtsController;