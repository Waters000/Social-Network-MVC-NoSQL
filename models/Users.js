const { Schema, model } = require("mongoose");


const UsersSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
      },
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Users',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
     
    },
    id: false,
  }
);

UsersSchema.virtual("friendCount").get(function () {
  return this.friends.length
});

const Users = model("Users", UsersSchema);

module.exports = Users;
