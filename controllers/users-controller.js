const req = require("express/lib/request");
const res = require("express/lib/response");
const { Users, Thoughts } = require("../models");

const usersController = {
  // get all users path api/users
  getAllUsers(req, res) {
    Users.find({})
      .populate({ path: "thoughts" })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one User by id  path api/users/:id
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({ path: "thoughts" })
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  /// path api/users
  createUsers({ body }, res) {
    Users.create(body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.json(err));
  },



  // update User by id  path api/users/:id
  updateUser({ params, body }, res) {
    Users.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.json(err));
  },

  // delete User path api/users/:id
  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // update User by id
  updateUserAddFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },      
      {
        $push: {
          friends: params.friendId,
        },
      },
      { new: true }
    )
    .populate ({path: 'friends', select: ('-__v')})
    .select('-__v')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = usersController;
