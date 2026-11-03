import dns from "dns";
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://saidulhimu:saidul12345@cluster0.mongodb.net/booknook?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db(process.env.DB_NAME || "booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "booknook_better_auth_secret_key_32_chars_long_example",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== "placeholder_client_id"),
    },
  },
});

