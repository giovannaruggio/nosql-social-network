const { Schema, model }  = require('mongoose');
const thoughtSchema = require('./Thoughts');

const userShema = new Schema({
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
        // Add email validator
    },
    thoughts: [thoughtSchema],

})


const User = model('user', userSchema);

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

