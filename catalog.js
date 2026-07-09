/* ============================================================
   AUTHORITATIVE PRICING (server-side only).

   The browser sends nothing but item ids + quantities. The server
   ALWAYS looks up the real price here, so a user can't tamper with
   prices in the page. Amounts are in CENTS.

   Keep in sync with the `products` array in shop.html (dollars there).
   ============================================================ */
module.exports = {
  "co2-eye":         { name: "CO₂ Eye Rejuvenation",        amount: 29900 },
  "lip-filler":      { name: "Lip Filler",                  amount: 39900 },
  "laser-hair-full": { name: "Full Body Laser Hair Removal", amount: 24900 },
  "prf-ezgel":       { name: "PRF EZ-Gel",                  amount: 54900 },
};
