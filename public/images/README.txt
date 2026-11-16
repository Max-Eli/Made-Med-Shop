MADE MEDICAL — PRODUCT IMAGES
=============================

Photos currently in use (Black Friday offers):

  laser-hair-full.png  →  Full Body Laser Hair Removal (6 sessions)
  co2-eye.png          →  Helix CO₂ CoolPeel Fusion (full face)
  lip-filler.png       →  Juvéderm Ultra Filler

  prf-ezgel.png        →  not used right now (left over from the grand
                          opening shop; safe to keep for later)

These offers have NO photo yet and show the tinted placeholder tile:

  Brazilian Laser Hair Removal   (id: laser-brazilian)
  Underarm Laser Hair Removal    (id: laser-underarm)
  RF Microneedling               (id: rf-microneedling)
  Signature Facial               (id: signature-facial)
  Custom Facial                  (id: custom-facial)

Adding a photo
--------------
1. Save it into THIS folder, e.g.  rf-microneedling.png
   (roughly square, 1000x1000 or larger — cards crop to 1:1).
2. In public/shop.html, add  image:"images/rf-microneedling.png"
   to that product.
3. In catalog.js, add the same  image: "images/rf-microneedling.png"
   so the photo also shows on the Stripe checkout page.

If a file is missing or fails to load, the card falls back to the
placeholder tile — nothing breaks.
