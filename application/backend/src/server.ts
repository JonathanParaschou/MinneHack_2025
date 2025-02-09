import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { PromptDataHandler } from "./models/PromptDataHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const promptHandler = new PromptDataHandler();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import submissionRoutes from "./routes/submissionRoutes";
// import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import friendRoutes from "./routes/friendRoutes";
import promptRoutes from "./routes/promptRoutes";
import contestRoutes from "./routes/contestRoutes";
import { Prompt } from "interfaces/IPrompt";

app.use("/api/submissions", submissionRoutes);
// app.use("/api/authentication", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/prompt", promptRoutes);
app.use("/api/contests", contestRoutes);

// Function to select a random prompt from CSV
const getRandomPrompt = async () => {
  return new Promise((resolve, reject) => {
    const prompts: any[] = [];
    fs.createReadStream(path.join(__dirname, "short_drawing_prompts.csv"))
      .pipe(csvParser())
      .on("data", (row) => {
        if (row.Prompt) prompts.push(row.Prompt);
      })
      .on("end", () => {
        if (prompts.length === 0) {
          reject("No prompts found.");
        } else {
          const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
          resolve(randomPrompt);
        }
      })
      .on("error", (error) => reject(error));
  });
};

// Function to generate random hour and minute between 9 AM and 9 PM
const getRandomTime = () => {
  const randomHour = Math.floor(Math.random() * 12) + 9; // Between 9 and 9 PM
  const randomMinute = Math.floor(Math.random() * 60); // Between 0 and 59
  return { randomHour, randomMinute };
};

// Function to update the prompt and schedule the next random time
const scheduleRandomPromptUpdate = async () => {
  const { randomHour, randomMinute } = getRandomTime();
  const cronExpression = `${randomMinute} ${randomHour} * * *`;  // Scheduled to run at a random time

  cron.schedule(cronExpression, async () => {
    try {
      const newPrompt = await getRandomPrompt();
      const promptObject: Prompt = {
        prompt: newPrompt as string,
        uids: [],
        time: new Date(),
      };
      await promptHandler.replacePrompt(promptObject);
      console.log("Prompt updated successfully:", promptObject);

      // Reschedule the next update for the following day
      scheduleRandomPromptUpdate();
    } catch (error) {
      console.error("Error updating prompt:", error);
    }
  });
};

// Schedule the first random prompt update to occur at midnight
cron.schedule("0 0 * * *", () => {
  scheduleRandomPromptUpdate();  // This will schedule the next random update each day
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
