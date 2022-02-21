const express = require('express');
const db = require('./config/connection');
const userRoute = require('./routes/api/userRoutes');
const thoughtRoute = require('./routes/api/thoughtRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/thoughts', thoughtRoute);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});