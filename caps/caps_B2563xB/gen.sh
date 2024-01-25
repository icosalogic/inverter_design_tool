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
#
# Example input line (old):
#      uF   A   kA   kA  mO  nH K/W Dia  Ht Ht1  kg   Part Number
#     360  70  6.6  2.2 1.6  40 5.5  75  95 101 0.5 1 B25690A0367K701
# Example input line (new):
#      V   uF  A  kA  kA  mO nH kHz K/W mm  mm   kg  Part Number
#     600 200 55 2.9 8.7 0.9 30  65 6.8 50 74.5 0.40 B25631B0207K600
#

date_time=$(date '+%Y%m%d_%H%M%S' )

tmp_file=/tmp/B2563xB_${date_time}.awk
out_file=cap_table_${date_time}.js

cat > "${tmp_file}" <<'EOM'
/^mfg=/  { mfg = substr($0, 5); }

/B2563/  {
           Vdc = $1;
           esr = $6 / 1000.0;
           dia = 84.5;
           pn = $13;
           pn_subs = sub(/\*/, "", pn);
           printf "{mfg: '%s', pn: '%s', tech: 'Film', c: %6.1f, v_dc: %6.1f, i_rms: %5.1f, esl: %.1f, esr: %.4f, th_cc: %.1f, th_ca: %.1f, shape: 'cylinder', dim_dia: %.1f, dim_z: %.1f },\n",
                  mfg, pn, $2, Vdc, $3, $7, esr, 0, $9, dia, $10;
         }
EOM

awk -f "${tmp_file}" B2563xB_a.txt > "${out_file}"

# echo "output file is ${out_file}"

rm -f cap_table.js
ln "${out_file}" cap_table.js
