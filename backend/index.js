import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors'; // ✅ Important
import UserRoutes from './routes/user.routes.js';
import AuthRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//  CORS Middleware
app.use(cors({
  origin: 'http://localhost:5173', // For production: replace '*' with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// ✅ MongoDB connection
const Connection = process.env.CONNECTION_STRING;
mongoose.connect(Connection, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Database connected successfully");
}).catch((err) => {
  console.error("❌ Database connection failed:", err.message);
});

// ✅ Routes
app.use('/test', UserRoutes);
app.use('/auth', AuthRoutes);

// ✅ Home route
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// ✅ Error-handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
