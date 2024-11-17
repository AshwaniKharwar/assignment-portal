import express from 'express';
import cookieparser from "cookie-parser";
import {connectDB} from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js'
import userRoutes from './routes/user.routes.js';


import dotenv from "dotenv";
dotenv.config({ 
    path: './src/.env' 
})

const app = express();
app.use(express.json());
app.use(cookieparser());

connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/admin', adminRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
