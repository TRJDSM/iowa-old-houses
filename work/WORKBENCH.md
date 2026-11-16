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

## 1884 Sanborn (layer "1884")

- LOC item sanborn02629_001, IIIF id `g026291884:02629_1884-NNNN` (0002–0023; 0001 is the key). All scans 6450x7650, ~0.175 ft/px.
- Positions: `sanborn1884_positions.json` (SHEETS84, ROUGH84 notes, PTS84 control points). Pieces of one sheet use `part` + clip `k`.
- Placed: 0002–0017 whole sheets; 0018 A/B/C/F/BL; 0019 City Brewery + Grimmel; 0021 P1/P4/P7/P9/P10; 0023 Q3/Q6/Q7.
- Not placed: 0018 D (Hoxie stockyards) and E (river/Front St); 0016 Atlas Distilling + Fisher Rendering; 0019 Sevastopol brewery, Gilbert starch works, syrup refinery, Two Rivers coal; all of 0020 (Brown's Park fairgrounds, 39th–42nd/Grand area, no streets drawn; pipe & brick works); 0021 South DM, Deep Rock, Chesterfield cooper, Univ of DM, Irving School, Drake (north arrow conflicts with street labels); all of 0022 (coal mines); 0023 poor farm, Lockheart mill, Cottage Grove, Hawthorne School; 0012 Griffith Addn No.2.
- 1884 names: Sycamore = Grand (west), E Sycamore = E Grand, Front (east) = E 1st.

### Nov 16 overnight
- 1884 refit to street centerlines: 0002, 0003, 0004, 0005, 0007, 0013, 0015 (were 10-35 ft off, now ~2-7 ft). 0016/0017 shifted ~145 ft from one shared corner (22nd/Maury), low confidence. Not changed: 0006, 0008a, 0009, 0010, 0011, 0012, 0014 (river/rail areas, or street identity unclear). Audit in `AUD84` inside sanborn1884_positions.json.
- 1901: 44, 152, 162, 163, 169, 171, 172, 173, 174, 183, 184 refit. 58b, 59b, 60e (MLK Pkwy rebuilt 20th St), 161, 164, 228, 230a left as is.
- Tool gotcha: NEXT() resets the zoom factor ZF. Always set ZF after NEXT (RUN/RUN84 do this).
- UI add-ons live inside index.html as `<script id="addonui">` and `<script id="addonsearch">`. Owner search uses salted hashes (`window.OWNH`), never names.

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
