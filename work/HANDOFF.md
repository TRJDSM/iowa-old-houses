# Old Iowa Houses Map: handoff for a new chat (Nov 16, 2026)

Paste or attach this file in a new chat so Claude can pick up the overlay work.

## 1. The project

- **Live map:** https://trjdsm.github.io/iowa-old-houses/
  - GitHub repo: **TRJDSM/iowa-old-houses** (GitHub Pages, public).
- **What it is:** pins for every pre-1900 building in Polk County, showing the year built. Data comes from The Better Assessor (Tyler's workbook, which stays unchanged as raw data).
- **Most important feature:** accurately lined-up **1901 Des Moines Sanborn** overlays. The 1884 Sanborn and other historic layers are also there.
- **Tyler's standing rules:**
  - Accuracy is paramount. Keep replies short.
  - Publish map changes without asking. Ask only if a change could lose data.
  - Send a phone push notification when his action or approval is needed.
  - The public copy never contains owner names (`c[10]=""`). Owner search uses salted hashes only.
  - Never bypass logins or CAPTCHAs. Never create accounts or repos.
  - Flag uncertain spots. Never say something was "checked" unless it truly was.
  - He tests on his iPhone (Google app browser). Check every UI change at phone width (390 px).

## 2. Repo files

| File | What it is |
|---|---|
| `index.html` | The live map. Contains HOUSES data (owners blank), `const SHEETS=` (1901), `const SHEETS84=` (1884), UI add-ons as `<script id="addonui">` and `<script id="addonsearch">`, and `window.OWNH` (owner-name hashes). |
| `sanborn1901_positions.json` | SHEETS2 (sheet corners), ROUGH (notes per sheet), HOLD, DIMS (image sizes), OLD_A (every earlier position, key `id+part@timestamp`), CP01 (control points), AUD01 (street-check audit per sheet). |
| `sanborn1884_positions.json` | SHEETS84, ROUGH84, PTS84, AUD84, CP84, OLD84. |
| `work/alignkit.js` | The alignment toolkit (the same code as localStorage ALK). |
| `work/sanbkit.js` | Older fitting/preview toolkit (SANBKIT). |
| `work/addon_ui.js`, `work/addon_search.js` | Add-on source. The latest version is always the copy inside index.html. |
| `work/WORKBENCH.md` | Notes on the sheet format, URLs, status and street renames. |
| `work/lotline_scan.json` | Lot-line scan results. |

## 3. How the work was done (browser workbench)

All work ran in Tyler's Chrome through the Claude in Chrome extension.

### Workbench tabs and storage

- **Tabs:** https://trjdsm.github.io/iowa-old-houses/work/blank.html?x and ?y (a blank page in the repo). Moved here Nov 16 because the old Netlify workbench (iowa-old-houses.netlify.app) became login-protected; all localStorage was copied over. Don't use GitHub's 404 pages as a workbench: their security policy blocks scripts and fetch. If a tab freezes, close it and open a new tab to the same URL.
- **localStorage keys on that origin:**
  - MASTER5: the full app HTML, with owner names.
  - SHEETS2, ROUGH, DIMS, OLD_A, CP01, CP01R, AUD01, OFF01, LOTAPPLIED, LOTPENDING, ORDER01.
  - SHEETS84, ROUGH84, PTS84, AUD84, CP84, OLD84.
  - ALK and SANBKIT (the toolkits).
  - ADDON_UI and ADDON_SEARCH.
- **Storage limit:** localStorage is near its quota. Don't store extra full copies of MASTER5.
- **If localStorage is ever lost:** rebuild from the repo.
  - MASTER5 = index.html with the owner column re-filled from The Better Assessor.
  - The position JSONs refill SHEETS2 etc.
  - work/alignkit.js refills ALK.

### Loading the app and tools

- **Load the app in a workbench tab:** navigate to work/blank.html?y first (a fresh page is needed or const redeclare errors happen). Then `document.open();document.write(localStorage.MASTER5);document.close()` and wait about 5 s.
- **Load the tools on a blank page:** `try{eval(localStorage.SANBKIT)}catch(e){};eval(localStorage.ALK)`.

### Publishing

1. `PREP(title)`. It rebuilds MASTER5's sheet list (SK.build), strips owners, adds OWNH hashes, syntax-checks every script and checks for owner-text leaks. It puts index.html and sanborn1901_positions.json in window.name.
   - For 1884 changes, run `BUILD84()` first. Then add `sanborn1884_positions.json` to the window.name file list.
2. Navigate to github.com/TRJDSM/iowa-old-houses/upload/main. **Wait about 4 s** (GitHub soft-redirects; JS run too early fails with "page navigated").
3. Run JS that puts the files into `input[type=file]` with a DataTransfer and dispatches `change`. **Wait about 10 s.**
4. Set `#commit-summary-input` and click "Commit changes". Check that the file names appear first. **Wait about 7 s.**
5. Navigate back to work/blank.html, clear window.name, and verify with `api.github.com/repos/TRJDSM/iowa-old-houses/commits?per_page=1&t=<now>`.

Never navigate inside the same JS call.

## 4. How the 1901 sheets are lined up

### Sheet format

`{id, part?, r:'full'|'pct:x,y,w,h', a:[[latTL,lngTL],[latTR,lngTR],[latBL,lngBL]], b, k?}`.

- `a` = map corners of the crop.
- `k` = clip polygon in crop fractions.
- The scale is about **0.163 ft per scan pixel** on every sheet. A fit at a different scale means something is wrong.

### Street-check method (main tool, accurate to about 2-5 ft)

1. `RUN(n, part, ZF, points)` shows the sheet and runs GO.
   - Or `NEXT(n,part)`: shows the sheet full-height (about 531x627 display px) and lists the modern street names nearby.
2. Take a zoom screenshot of region [0,0,displayW,627]. It comes back about 1008 px wide.
3. **Set `ZF = zoomWidth/displayWidth` after NEXT.**
   - NEXT resets ZF. Forgetting this on Nov 16 made fits about 8% off; they were caught and redone.
   - RUN and RUN84 set it for you.
4. Read street centerline crossings in zoom pixels: centre of the street = midpoint between the two block edges.
5. Call `GO([[x,y,'Modern St A','Modern St B'],...], false)`. It returns three things:
   - the distance in ft for each point (current fit),
   - `EVAL`: `cur` residuals, `aff` residuals of a best-fit affine, and `ratio` (scale change),
   - `VEC`: per-point shift vectors.
6. Drop outliers with `CP.splice(i,1)` and check again with `EVAL()`.
7. Apply:
   - `DONE(true,note)` = affine refit. It backs up the old corners to OLD_A and logs to AUD01 and CP01.
   - `SHIFT(note)` = translation only, for 1-4 collinear points.
   - `DONE(false,note)` = just log the check.
8. `CROSS(street,u,v)` lists the modern streets crossing a street, with their sheet u/v position. Use it to identify renamed streets.

### Accept rules

- Apply only when the affine residuals are small (about 5 ft or less) and **ratio is 0.97-1.03**.
- Ratio far from 1, or a few points pulling opposite ways, means a street is misidentified, or the modern street was rebuilt (MLK Pkwy, I-235, rail corridors). Don't apply in that case.
- Modern pavement centerlines sit about 3 ft (up to 7 ft) off the old right-of-way centre. A ROW-center correction (CP01R) was applied to 33 sheets.

### Lot-line scan (fine tuning, within about ±10 ft)

- `BLOCKOFF` runs normalized cross-correlation of sheet ink against Iowa_Parcels_2017 polygons. Use it only after streets are within about 10 ft.
- **Apply only if all of these hold:**
  - 4 or more tiles have c ≥ 0.1, z ≥ 2.6, and are not on the sheet edge
  - the tiles agree within 2.5 ft
  - the shift is at least 1.5 ft
- **The coarse ±88 ft scan is useless.** Repeating lot patterns alias it. Don't use it.

### Old street names (1901 → today)

| 1901 | Today |
|---|---|
| Bluff | 2nd Ave |
| Main | Maine St |
| Clarkson | Clark |
| May / S Washington | Mondamin |
| Cleveland | Polk |
| Garfield | Hubbell |
| S Garfield | SE 3rd |
| Jackson | SE 4th |
| S Madison | SW 1st |
| Monroe | S Union |
| S 5th | Jackson |
| S 6th | Granger |
| S 7th | Dunham |
| S 8th | Edison |
| E North | University |
| 21st (at Grand) | MLK Pkwy |
| 20th (Forest/University area) | MLK Pkwy (rebuilt, so unreliable) |
| Atkins | Drake Park Ave |
| E 4th (sheets 179-181) | rail corridor |

### Data sources

- **Street centerlines:** City of Des Moines Street_Centerlines_view FeatureServer.
- **Parcels:** Iowa_Parcels_2017.
- **Sanborn images:** LOC IIIF at tile.loc.gov/image-services/iiif/service:gmd:gmd415m:g4154m:g4154dm:{id}/{crop}/{w},/0/default.jpg
  - 1901 vol 1: `g02629190101:02629_01_1901-00NN`
  - 1901 vol 2: `g02629190102:02629_02_1901-0NNN`
  - 1884: `g026291884:02629_1884-NNNN`, 6450x7650 px, about 0.175 ft/px

## 5. The 1884 sheets

- **Tools:** `NEXT84('0002')`, `RUN84(id4,part,ZF,points)`, `DONE84`, `SHIFT84`, `BUILD84()`. They write SHEETS84, AUD84, CP84 and OLD84.
- **Corners:** the 1884 layer always uses the full image, so `a` = full-image corners. Pieces use `part` + clip `k`.
- **Orientation:** many 1884 sheets are drawn rotated (north to the left). Numbered streets run across the page.
- **1884 names:**
  - Sycamore = Grand
  - E Sycamore = E Grand
  - 5th St / 6th St (downtown) = 5th Ave / 6th Ave
  - Front (east) is probably E 1st. Sheet 0010's fit was poor, so this is unconfirmed.

## 6. Done so far

### 1901 street refits

- **Earlier:** 44 (redone Nov 16), 43, 202, 20, 159, 226, 81, 21, 201, 45, 66, 209, 214, 191, 160a, 203, 34, 178, 69, 200, 215, 46, 70a, 74, 76, 240, 77, 22, 63, 82, 187, 75, 210, 212, 153, 175, 65a, 207, 71a, 9, 64, 186, 204, 19, 54a/b, 182, 216, 67, 158, 59a, 239, 90, 211, 208a, 78, 84a, 80, 83, 72, 73, 68.
- **Nov 16:**
  - 171, 172, 169: were 70-130 ft off.
  - 152, 173, 174, 183, 184: were 7-32 ft off.
  - 162, 163: small corrections.

### 1901 lot-line shifts and checks

- **Lot-line shifts (17 kept):** 54a, 61b, 59c, 57c, 43, 58a, 58c, 192, 81, 74, 75, 193, 175, 213a, 186, 205, 221a. 207 was reverted, then hand-nudged.
- **Tyler confirmed these look right:** 74, 61, 75, 192, 54, 207, 211, 237a, 185, 194, 239, and 78 after its fix.

### 1884 refits (Nov 16)

- **Street refits:** 0002, 0003, 0004, 0005, 0007, 0013, 0015. They were 10-35 ft off and are now about 2-7 ft.
- **0016/0017:** shifted about 145 ft from one shared corner (SE 22nd & Maury). Low confidence.

## 7. Still to review

### 1901

- **63/64 (14th-15th St south of Forest):** Tyler sees houses cut off and 64 off in places. Waiting on his screenshot.
- **58b, 59b, 60e:** MLK Pkwy rebuilt old 20th St, so street checks are unreliable. Use lot lines or a visual check.
- **161:** inconsistent fit.
- **164:** one usable corner, about 47 ft off.
- **224:** 20-60 ft disagreement.
- **223/224 seam:** about 75 ft off (the river mouth moved).
- **219/220:** the two sheets disagree. Try the 1920 sheets.
- **225/228/230a:** South DM renames are irregular. 228's best guess is 22-112 ft off. Not applied.
- **Never street-checked, vol 1:** about 50 sheets, including 5-42, 49-53, 55, 56, 57a/b, 60w, 61a, 62n/o, 65b/c, 84b, 87-94.
- **Never street-checked, vol 2:** 154-157, 170b, 176, 177, 179-181, 190, 194, 205, 221b/c, 229 pieces.
- **Not placed:** 95, 96, 231-235 (outlying), 218 (fairgrounds, different scale), 222 (starch works), 230 (Sevastopol, Moriah Church).
- **Hidden insets:** 26, 84, 94, 189, 195, 198, 219.
- **Eyeball after the Nov 16 refits:** 169/171/172 around SE 5th & Elm, and the East Village.

### 1884

- **Not refit:** 0006, 0008a/b, 0009, 0010, 0011, 0012, 0014 (river and rail areas, or street identity unclear).
- **0016/0017:** need a second control point.
- **Not checked:** parts of 18, 19, 21, 23.
- **Not placed:** 18 D/E, 20, 22, and parts of 16, 19, 21, 23.

## 8. Map features built Nov 16

- **Overlay bar:** picking an overlay closes the menu. A bottom bar has the name, opacity slider and ×.
  - "+ Add another layer" stacks a 2nd layer (pane old2). Line drawings (railroads, GLO, roads, Sanborns, Andreas) are drawn on top.
  - The overlay menu says "Off" (not "Off (today only)").
- **Toolbox (right side):** background maps.
  - Summer photo is the **default** (Esri "clarity" imagery, sharpest, about 2017).
  - Other choices: leaf-off (Iowa State 2023-25), newest (Esri April 2026, blurrier and leaning), street, topo, none. The light gray option was removed. The choice is saved in localStorage OIH_base2.
- **Picture tool:** camera → small bottom bar (Select area / Whole screen / ×).
  - Drag a box, then a preview opens with a title, scale bar and north arrow.
  - Share, Save picture, Save PDF (letter) and Retake. On iPhone the save buttons open the share sheet, and Tyler confirmed they work.
  - Uses html2canvas 1.4.1 and jsPDF 2.5.1.
- **Search:**
  - Street or address searches keep all pins, highlight the matches in red and zoom to them.
  - Owner-name and year searches filter the pins. Owner search uses salted FNV hashes (`fh`, prefix 'oih1|'); no plain names are in the file.
  - Year ranges ("1880s", "before 1860", "1870-1890"), "-word" to exclude, and typo fixing.
  - Street suggestions, and "Places today" landmarks from the Esri World Geocoder (Polk extent).
- **Other UI:**
  - Credits collapse to a small © button. Tapping it opens the full credits and moves the Overlays button up.
  - Bigger pin tap areas. Clustering stops at zoom 17.
  - The ☰ menu: "Download data" (was "Download backup"). The layer and camera buttons hide while the menu is open.

## 9. Open items right now

- Done 1:45am: the double dropdown arrow was fixed (the extra ▾ close button is hidden; the Overlays button closes the menu), and a fresh backup was pushed to work/.
- **Possible future features Tyler mentioned:**
  - a 3rd stacked layer (line drawings only)
  - Street View link per house
  - 1920s Sanborn
  - Andreas 1875 atlas pins
- **Search ideas:** search by business/block names on the 1901 sheets (there is a machine-read 1901 text index, sanborn1901_text.json), and by old (1901) addresses.

## 10. Tool problem on Nov 16, about 1:35am

Claude's tool for running code in Chrome was intermittently blocked by Claude Code's automatic safety check. The check gave no verdict, which is not a judgment that anything was unsafe. Other browser actions still worked. Starting a new chat should clear it.

Everything was already published to GitHub except a separate copy of the last few add-on tweaks, and those tweaks are inside the live index.html.
