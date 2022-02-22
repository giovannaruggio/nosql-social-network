const { Schema, model } = require("mongoose");

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
    },
    thoughts: [ {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    } ],
    friends: [ {
      type: Schema.Types.ObjectId,
      ref: "User",
    } ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// Create virtual property 'friendCount' to get amount of friends per user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Initialize user model
const User = model("User", userSchema);

module.exports = User;
