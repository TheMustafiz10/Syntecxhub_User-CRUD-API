

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';


dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);


app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});



// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});




// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}/api/users`);
});