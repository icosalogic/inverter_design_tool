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
#     Part Number       Cc   Vr   D   H   s   Area   I ESR ESL Occ Oca Mass
#     Part Number       uF  Vdc  mm  mm  mm  mm**2   A  mO nH C/W C/w kg
#     947C341K801CTMS  340  800  90  85 45.0 36800  66 1.7 29 2.8 3.1 0.7
#

date_time=$(date '+%Y%m%d_%H%M%S' )

tmp_file=/tmp/947C_${date_time}.awk
out_file=cap_table_${date_time}.js

cat > "${tmp_file}" <<'EOM'
/^mfg=/  { mfg = substr($0, 5); }
/^Vdc=/  { Vdc = substr($0, 5); }

/^947C/  {
           esr = $9 / 1000.0;
           printf "{mfg: '%s', pn: '%s', tech: 'Film', c: %6.1f, v_dc: %6.1f, i_rms: %5.1f, esl: %.1f, esr: %.4f, th_cc: %.1f, th_ca: %.1f, shape: 'cylinder', dim_dia: %.1f, dim_z: %.1f },\n",
                  mfg, $1, $2, $3, $8, $10, esr, $11, $12, $4, $5;
         }
EOM

awk -f "${tmp_file}" 947C.txt > "${out_file}"

# echo "output file is ${out_file}"

rm -f cap_table.js
ln "${out_file}" cap_table.js
