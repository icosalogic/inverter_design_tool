#!/bin/bash
#
# Convert the cleaned-up OCR text into the canonical cap entry format.
#
# Example output:
#
#   {
#     mfg:      'CDE',
#     pn:       '944U101K801AA',
#     tech:     'Film',
#     c:        100.0,
#     v_dc:     800.0,
#     i_rms:    74.0,
#     esl:      20.0,
#     esr:      0.0005,
#     th_cc:    2.8,
#     th_ca:    5.2,
#     shape:    'cylinder',
#     dim_dia:  84.5,
#     dim_z:    40.0,
#   },
#
# Example input line:
#
#     Part Number (uF) (Vdc) mm (mo) (nH) (A) Occ Oca
#     (°C/W) (°C/W)
#     944U101K801AA* 100  800 40 0.5 20 74 2.8 5.2
#

date_time=$(date '+%Y%m%d_%H%M%S' )

tmp_file=/tmp/944U_${date_time}.awk
out_file=cap_table_${date_time}.js

cat > "${tmp_file}" <<'EOM'
/^mfg=/  { mfg = substr($0, 5); }
/^Vdc=/  { Vdc = substr($0, 5); }
/^dia=/  { dia = substr($0, 5); }

/^944U/  {
           pn = $1;
           pn_subs = sub(/\*/, "", pn);
           esr = $5 / 1000.0;
           printf "{mfg: '%s', pn: '%s', tech: 'Film', c: %6.1f, v_dc: %6.1f, i_rms: %5.1f, esl: %.1f, esr: %.4f, th_cc: %.1f, th_ca: %.1f, shape: 'cylinder', dim_dia: %.1f, dim_z: %.1f },\n",
                  mfg, pn, $2, $3, $7, $6, esr, $8, $9, dia, $4;
         }
EOM

awk -f "${tmp_file}" 944U.txt > "${out_file}"

# echo "output file is ${out_file}"

rm -f cap_table.js
ln "${out_file}" cap_table.js
