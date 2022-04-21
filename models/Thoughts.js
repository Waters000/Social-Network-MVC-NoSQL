const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");


/// reactionSchema first because Thought Schema calls it.
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        max: [280, "Too many characters in Reaction Body Text"],
      },
      userName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal),
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  



const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, "Too few characters in Thought Text"],
      max: [280, "Too many characters in Thought Text"],
    },

    createdAt: {
      type: String,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions;
});

const Thoughts = model("Thoughts", thoughtSchema);

module.exports = Thoughts;
