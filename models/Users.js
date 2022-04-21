const { Schema, model } = require("mongoose");


const usersSchema = new Schema(
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
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts: [
      {
          type: Schema.Types.ObjectId,
          ref: "Thoughts"
      }
  ],
  
  friends: [
      {
          type: Schema.Types.ObjectId,
          ref: "Users"
      }
  ],
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
}
);

usersSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

const Users = model('Users', usersSchema)