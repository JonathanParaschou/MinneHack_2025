import { messaging } from "./firebaseAdmin";

export async function sendNotification(): Promise<void> {
  const message = {
    notification: {
      title: "🚀 BeReal Time!",
      body: "Post your real-time photo now!",
    },
    topic: "bereal-users",
  };

  try {
    await messaging.send(message);
    console.log("📩 Notification sent!");
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
}
