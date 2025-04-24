const express = require('express');
const connectDB = require('./server/config/database');
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});