const connection = require('../config/connection');
const { User, Thought } = require('../models');

console.time('seeding');

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);
    console.table(reactions);
    console.timeEnd('seeding complete');
    process.exit(0);
});