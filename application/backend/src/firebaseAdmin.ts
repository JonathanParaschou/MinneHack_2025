import admin from "firebase-admin";
import * as dotenv from "dotenv";

dotenv.config();

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const messaging = admin.messaging();
export { messaging };
