import { auth } from './../../frontend/app/utils/firebase';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import itemRoutes from "./routes/itemRoutes";
import submissionRoutes from "./routes/submissionRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/submissions", submissionRoutes);
app.use("/api/authentication", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
