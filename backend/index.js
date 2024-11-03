import express from "express";
import postRoutes from "./routes/newspost.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import jobspostRoutes from "./routes/jobspost.js";
import eventRoutes from "./routes/event.js";
import profileRoutes from "./routes/profile.js";
import cookieParser from "cookie-parser";
import homeRoutes from "./routes/home.js";
import cors from 'cors';

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true // This is important for cookies
}));

app.use(express.json());
app.use(cookieParser());

// Optional: Add default headers for all routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/api/newsposts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobsposts", jobspostRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/home", homeRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});