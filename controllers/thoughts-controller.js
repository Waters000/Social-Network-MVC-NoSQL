const { Thoughts } = require('../models');


const thoughtsController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('__v')
        .sort({ _id: -1})
        .then(dbThoughtsData = res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

      // createThought
  createThought({ body }, res) {
    Thoughts.create(body)
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  },
}


module.exports = thoughtsController;