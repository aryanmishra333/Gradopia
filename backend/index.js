import express from "express";
import postRoutes from "./routes/newspost.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import jobspostRoutes from "./routes/jobspost.js";
import eventRoutes from "./routes/event.js"; // Import the new event routes
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/newsposts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobsposts", jobspostRoutes);
app.use("/api/events", eventRoutes); // Add event routes

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
