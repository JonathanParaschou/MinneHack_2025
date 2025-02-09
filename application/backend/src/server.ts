// import { auth } from './../../frontend/app/utils/firebase';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import itemRoutes from "./routes/itemRoutes";
import submissionRoutes from "./routes/submissionRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import friendRoutes from "./routes/friendRoutes";
import promptRoutes from "./routes/promptRoutes";
import contestRoutes from "./routes/contestRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/submissions", submissionRoutes);
app.use("/api/authentication", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/prompt", promptRoutes);
app.use("/api/contests", contestRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
