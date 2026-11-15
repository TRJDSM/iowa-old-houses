# Sanborn workbench (working files)

These files are Claude's working data for lining up the Sanborn overlays. The public map is `index.html`.

## Files

| File | What it is |
|---|---|
| `index.html` | The live map. Sheet positions are inside it (`const SHEETS=`). Owner names are blank in this public copy. |
| `sanborn1901_positions.json` | Backup of all 1901 sheet positions: `SHEETS2` (corners), `ROUGH` (confidence notes per sheet), `HOLD`, and `DIMS` (image sizes). |
| `work/sanbkit.js` | The alignment toolkit: fitting, preview, save, and build. |
| `work/WORKBENCH.md` | This file. |

Owner names are not stored here. They live in The Better Assessor (Polk County initial data, with Beacon links).

## How a sheet entry works

The format is `{id, part?, r:'full'|'pct:x,y,w,h', a:[[latTL,lngTL],[latTR,lngTR],[latBL,lngBL]], b:bounds, k?:[[u,v],...]}`.

- `r` is the crop of the scan.
- `a` holds the map corners of that crop.
- `k` is an optional clip polygon in crop fractions. It hides blank "see sheet N" areas so they don't cover the neighboring sheets.

The scale is about 0.163 ft per pixel of the full scan, the same on every sheet. If a fitted sheet comes out at a different scale, something is wrong.

### Image URLs

All images come from the Library of Congress image server. The URL pattern is:

```
https://tile.loc.gov/image-services/iiif/service:gmd:gmd415m:g4154m:g4154dm:{id}/{crop}/{width},/0/default.jpg
```

| Map | `{id}` | Sheets |
|---|---|---|
| 1901 Vol 1 | `g02629190101:02629_01_1901-00NN` | 1–96 |
| 1901 Vol 2 | `g02629190102:02629_02_1901-0NNN` | 151–240 |
| 1920 Vol 1 | `g02629192001:02629_01_1920-NNNN` | — |

## Status (Nov 15, 2026)

176 of 186 sheets are placed.

### Not placed yet

| Sheets | What they are | What's needed |
|---|---|---|
| 95, 96, 231–235 | Outlying sites ("located N mi from P.O.") | Location research |
| 218 | Fairgrounds | Drawn at a different scale (120 ft/in) |
| 222 | Starch Works | — |
| 230 | Sevastopol | The Moriah Church location |

### Still to review

| Sheets | Problem |
|---|---|
| 219 / 220 | Don't agree with each other. Try the 1920 sheets. |
| 223 / 224 | The seam is about 75 ft off. The old Raccoon River mouth was moved in the early 1900s, so blocks in today's river are expected. |
| 26, 84, 94, 189, 195, 198, 219 | The small insets on these sheets are hidden (clipped) and still need placing. |
| Any sheet | Blank margins on one sheet can hide the sheet next to it. |

### 1901 street names that changed

| 1901 name | Today |
|---|---|
| S Madison | SW 1st |
| Monroe | S Union |
| S 5th | Jackson |
| S 6th | Granger |
| S 7th | Dunham |
| S 8th | Edison |
| E North | University |
| 21st St (at Grand) | MLK Pkwy |
| E 4th (sheets 179–181) | Now the rail corridor |
