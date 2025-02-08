import cron from "node-cron";
import { sendNotification } from "./notificationService";

function getRandomTime(): Date {
  const start = new Date();
  start.setHours(8, 0, 0, 0); // 8 AM

  const end = new Date();
  end.setHours(20, 0, 0, 0); // 8 PM

  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let notificationTime = getRandomTime();
console.log(`⏳ First notification scheduled at: ${notificationTime}`);

cron.schedule("* * * * *", async () => {
  const now = new Date();

  if (now.getHours() === notificationTime.getHours() && now.getMinutes() === notificationTime.getMinutes()) {
    await sendNotification();
    notificationTime = getRandomTime(); // Generate new random time for tomorrow
    console.log(`Next notification scheduled at: ${notificationTime}`);
  }
});
