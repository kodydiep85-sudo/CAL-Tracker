# Calorie Tracker

A calorie and macro tracker that installs on your phone like an app.

- Live camera barcode scanning
- Products looked up automatically in Open Food Facts (free database, millions of products)
- 373 common foods built in
- Type grams and it calculates calories, protein, carbs and fat
- Daily goal, macro bars, 7-day chart
- Works offline; data saved on your phone (export a backup in Settings)

## Put it online (GitHub Pages)

1. Create a new **public** repo on GitHub, e.g. `calorie-tracker`.
2. Upload all files in this folder (`index.html`, `sw.js`, `manifest.webmanifest`, the 3 icons). Keep them at the top level.
3. Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save.
4. After a minute your app is at `https://YOUR-USERNAME.github.io/calorie-tracker/`

The camera only works over **https**, so GitHub Pages / Render / Netlify work, but opening the file directly does not.

## Install on your phone

- **iPhone:** open the link in **Safari** → Share → **Add to Home Screen**
- **Android:** open in **Chrome** → ⋮ menu → **Install app** / **Add to Home screen**

Allow camera access the first time you scan.

## Updating

Edit the files and push to GitHub. When you change things, bump `calories-v1` to `calories-v2` in `sw.js` so phones pick up the new version.

## Notes

- If a scanned product isn't in Open Food Facts, enter the numbers from its label once — it's saved, and that barcode fills in instantly after that.
- Data lives in the browser on that phone. Use **Settings → Export backup** occasionally. Deleting the home screen app or clearing Safari data erases it.
