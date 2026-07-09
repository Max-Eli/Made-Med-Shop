/* ============================================================
   LOCAL DEV SERVER (not used in production).

   Serves the static widget AND the /api function from one origin,
   so the browser's fetch("/api/...") works exactly like it will on
   Vercel. Run with:  npm run dev
   ============================================================ */
require("dotenv").config();
const express = require("express");
const path = require("path");
const checkout = require("./api/create-checkout-session");

const app = express();
app.use(express.json());

// same route the frontend calls
app.post("/api/create-checkout-session", (req, res) => checkout(req, res));

// static files served from /public (same as Vercel): shop.html, images/, etc.
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "public", "shop.html")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const k = process.env.STRIPE_SECRET_KEY || "";
  const keyed = k.indexOf("sk_") === 0 && !k.includes("REPLACE");
  console.log(`\n  Made Medical shop → http://localhost:${PORT}/shop.html`);
  console.log(`  Stripe key loaded: ${keyed ? "yes" : "NO — add STRIPE_SECRET_KEY to .env"}\n`);
});
