const { Schema, model, Types } = require("mongoose");

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: "Thoughts",
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create virtual property 'friendCount' to get amount of friends per user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize user model
const User = model("user", userSchema);

module.exports = User;

//**User**:
// * `username`
// * String
// * Unique
// * Required
// * Trimmed

// * `email`
// * String
// * Required
// * Unique
// * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
// * Array of `_id` values referencing the `Thought` model

// * `friends`
// * Array of `_id` values referencing the `User` model (self-reference)

// Schema Settings:
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
