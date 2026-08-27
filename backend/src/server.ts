import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health';
import authRouter from './routes/auth';
import servicesRouter from './routes/services';
import workersRouter from './routes/workers';
import bookingsRouter from './routes/bookings';
import reviewsRouter from './routes/reviews';
import { errorHandler } from './middleware/error';
import { notFoundHandler } from './middleware/notFound';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', healthRouter);
app.use('/api/auth', authRouter);
app.use('/api/services', servicesRouter);
app.use('/api/workers', workersRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/reviews', reviewsRouter);

// Fallbacks
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
