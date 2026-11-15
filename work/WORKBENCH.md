# Sanborn workbench (working files)

These files are Claude's working data for lining up the Sanborn overlays. The public map is `index.html`.

## Files

| File | What it is |
|---|---|
| `index.html` | The live map. Sheet positions are inside it (`const SHEETS=`, `const SHEETS84=`). Owner names are blank in this public copy. |
| `sanborn1901_positions.json` | Backup of all 1901 sheet positions: `SHEETS2` (corners), `ROUGH` (confidence notes per sheet), `HOLD`, and `DIMS` (image sizes). |
| `sanborn1884_positions.json` | Backup of 1884 positions: `SHEETS84`, `ROUGH84`, `PTS84` (control points). |
| `work/sanbkit.js` | The alignment toolkit: fitting, preview, save, and build. |
| `work/WORKBENCH.md` | This file. |

Owner names are not stored here. They live in The Better Assessor (Polk County initial data, with Beacon links).

## How a sheet entry works

The format is `{id, part?, r:'full'|'pct:x,y,w,h', a:[[latTL,lngTL],[latTR,lngTR],[latBL,lngBL]], b:bounds, k?:[[u,v],...]}`.

- `r` is the crop of the scan.
- `a` holds the map corners of that crop.
- `k` is an optional clip polygon in crop fractions. It hides blank areas and separates inset pieces.

### Image URLs

```
https://tile.loc.gov/image-services/iiif/service:gmd:gmd415m:g4154m:g4154dm:{id}/{crop}/{width},/0/default.jpg
```

| Map | `{id}` | Sheets |
|---|---|---|
| 1884 | `g026291884:02629_1884-NNNN` | 0002–0023 |
| 1901 Vol 1 | `g02629190101:02629_01_1901-00NN` | 1–96 |
| 1901 Vol 2 | `g02629190102:02629_02_1901-0NNN` | 151–240 |
| 1920 Vol 1 | `g02629192001:02629_01_1920-NNNN` | — |

## 1901 not placed yet

218 (fairgrounds), 95, 96, 231 right panels, 232 other panels, 233–235, 219 elevator inset, 195 insets 2 and 3. Small remaining seam gaps at sheets 31, 151, 179.

## 1884 Sanborn (layer "1884")

- All scans 6450x7650, ~0.175 ft/px. Pieces of one sheet use `part` + clip `k`.
- Placed: 0002–0017 whole sheets; 0018 A/B/C/F/BL; 0019 City Brewery + Grimmel; 0021 P1/P4/P7/P9/P10; 0023 Q3/Q6/Q7.
- Not placed: 0018 D (Hoxie stockyards) and E (river/Front St); 0016 Atlas Distilling + Fisher Rendering; 0019 Sevastopol brewery, Gilbert starch works, syrup refinery, Two Rivers coal; all of 0020 (Brown's Park fairgrounds, 39th–42nd/Grand area, no streets drawn; pipe & brick works); 0021 South DM, Deep Rock, Chesterfield cooper, Univ of DM, Irving School, Drake (north arrow conflicts with street labels); all of 0022 (coal mines); 0023 poor farm, Lockheart mill, Cottage Grove, Hawthorne School; 0012 Griffith Addn No.2.
- 1884 names: Sycamore = Grand (west), E Sycamore = E Grand, Front (east) = E 1st.

## 1901 street names that changed

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
