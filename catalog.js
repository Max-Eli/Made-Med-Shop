/* ============================================================
   AUTHORITATIVE PRICING (server-side only).

   The browser sends nothing but item ids + quantities. The server
   ALWAYS looks up the real price here, so a user can't tamper with
   prices in the page. Amounts are in CENTS.

   minQty  — offers priced "per unit, 2 or more" (filler, facials).
             The server rejects a checkout below this quantity.
   image   — path under /public sent to Stripe Checkout (optional).

   Keep in sync with the `products` array in public/shop.html
   (dollars there).
   ============================================================ */
module.exports = {
  "laser-full-body":  { name: "Full Body Laser Hair Removal — 6 Sessions", amount: 139900, image: "images/laser-hair-full.png" },
  "laser-brazilian":  { name: "Brazilian Laser Hair Removal — 6 Sessions", amount:  39900 },
  "laser-underarm":   { name: "Underarm Laser Hair Removal — 6 Sessions",  amount:  29900 },
  "rf-microneedling": { name: "RF Microneedling — 3 Sessions",             amount:  99900 },
  "coolpeel":         { name: "Helix CO₂ CoolPeel Fusion — Full Face",     amount:  49900, image: "images/co2-eye.png" },
  "juvederm-ultra":   { name: "Juvéderm Ultra Filler (per syringe)",       amount:  35900, minQty: 2, image: "images/lip-filler.png" },
  "signature-facial": { name: "Signature Facial (per facial)",             amount:   9900, minQty: 2 },
  "custom-facial":    { name: "Custom Facial (per facial)",                amount:  14900, minQty: 2 },
};
