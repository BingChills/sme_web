import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { setRoutes } from './routes/charactersRoutes';
import authRoutes from './routes/authRoutes';
import { connectDB } from './db';

const app = express();
const port = process.env.PORT || 5001;

app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from your frontend
app.use(bodyParser.json());

// Use the authentication routes
app.use(authRoutes);
// Use your other routes
app.use(setRoutes());

connectDB();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});