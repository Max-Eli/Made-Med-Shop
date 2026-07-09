/* ============================================================
   POST /api/create-checkout-session
   Body: { items: [{ id, qty }, ...] }
   Returns: { url }  -> the Stripe-hosted Checkout page to redirect to.

   Runs as a Vercel serverless function in production, and is mounted
   by server.js for local development. The Stripe SECRET key is read
   from the STRIPE_SECRET_KEY environment variable (never the browser).
   ============================================================ */
const Stripe = require("stripe");
const CATALOG = require("../catalog");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.indexOf("sk_") !== 0 || key.includes("REPLACE")) {
    res.status(500).json({ error: "Server is missing STRIPE_SECRET_KEY. Add it to .env (or Vercel env vars)." });
    return;
  }

  try {
    const stripe = new Stripe(key);
    const items = (req.body && req.body.items) || [];
    if (!Array.isArray(items) || items.length === 0) {
      res.status(400).json({ error: "Your cart is empty." });
      return;
    }

    // Figure out where we're hosted so we can build return URLs + image links.
    const proto = req.headers["x-forwarded-proto"] || "http";
    const origin = req.headers.origin || `${proto}://${req.headers.host}`;
    const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(origin);

    // Build line items from the AUTHORITATIVE catalog (ignore any client price).
    const line_items = items.map(({ id, qty }) => {
      const product = CATALOG[id];
      if (!product) throw new Error("Unknown item: " + id);
      const quantity = Math.max(1, Math.min(20, parseInt(qty, 10) || 1));

      const product_data = { name: product.name };
      // Stripe can only fetch publicly reachable images (skip on localhost).
      if (!isLocal) product_data.images = [`${origin}/images/${id}.png`];

      return {
        quantity,
        price_data: { currency: "usd", unit_amount: product.amount, product_data },
      };
    });

    // Where Stripe sends the customer after paying / cancelling.
    // For the embedded live site, set CHECKOUT_RETURN_BASE to the Show It shop
    // page (e.g. https://made-med.com/shop) and we return there instead.
    const returnBase = process.env.CHECKOUT_RETURN_BASE;
    const success_url = returnBase
      ? `${returnBase}?paid=1`
      : `${origin}/shop.html#/success?sid={CHECKOUT_SESSION_ID}`;
    const cancel_url = returnBase
      ? `${returnBase}?canceled=1`
      : `${origin}/shop.html#/cart`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url,
      cancel_url,
      phone_number_collection: { enabled: true }, // so the clinic can call to book
      billing_address_collection: "auto",
      allow_promotion_codes: true,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: err.message || "Could not start checkout." });
  }
};
