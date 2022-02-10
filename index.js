const express = require('express');
const db = require('./config/connection');
const usersRoute = require('./routes/api/usersRoutes');
const thoughtsRoute = require('./routes/api/thoughtsRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/thoughts', thoughtsRoute);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});