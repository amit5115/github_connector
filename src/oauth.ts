import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();

const CLIENT_ID = process.env.CLIENT_ID!;
const CLIENT_SECRET = process.env.CLIENT_SECRET!;

// 🔥 token file
const TOKEN_FILE = "./token.json";

app.get("/login", (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`;
  res.redirect(url);
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    },
    {
      headers: { Accept: "application/json" },
    }
  );

  const token = response.data.access_token;

  // ✅ SAVE TOKEN LOCALLY
  fs.writeFileSync(TOKEN_FILE, JSON.stringify({ token }));

  res.send("✅ GitHub connected successfully 🚀 You can go back to Claude.");
});

app.listen(3000, () => {
  console.log("OAuth server running on http://localhost:3000");
});