import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import cors from 'cors'; // ✅ Important
import UserRoutes from './routes/user.routes.js';
import AuthRoutes from './routes/auth.routes.js';
import SellerRoutes from './routes/seller.routes.js';
import BuyersRoutes from './routes/buyers.routs.js';
import ListingRoutes from './routes/listing.routes.js';



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

mongoose.connect(Connection).then(() => {
  console.log("✅ Database connected successfully");
}).catch((err) => {
  console.error("❌ Database connection failed:", err.message);
});


// ✅ Routes
app.use('/test', UserRoutes);
app.use('/auth', AuthRoutes);
app.use('/auth', SellerRoutes);
app.use('/auth', BuyersRoutes);
app.use('/api/listing', ListingRoutes);







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
