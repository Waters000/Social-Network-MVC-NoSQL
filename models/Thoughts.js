const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");


/// reactionSchema first because Thought Schema calls it.
const ReactionSchema = new Schema(
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
       // get: createdAtVal => dateFormat(createdAtVal),
      },
    },
    {
      toJSON: {
        getters: true,
      },
    }
  );
  



const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Too few characters in Thought Text"],
      maxlength: [280, "Too many characters in Thought Text"],
    },

    createdAt: {
      type: String,
      default: Date.now,
     // get: createdAtVal => dateFormat(createdAtVal),
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
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

ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", ThoughtSchema);

module.exports = Thoughts;
