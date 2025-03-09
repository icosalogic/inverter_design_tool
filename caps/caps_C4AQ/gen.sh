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
#     shape:    'cube',
#     dim_x:    57.5,
#     dim_y:    45.0,
#     dim_z:    40.0,
#   },
#
# Example input line:
#
#     1      2   3  4   5   6     7    8      9    10   11  12   13  14     15
#     uF    Vdc  Y  H   X   LX   LY  dV/dt Ipeak  ESL  ESR Irms Rth Pkg#    Part number 
#     45    900 35 50 57.5 52.5 20.3   15    675   15  3.9 25.4  10  23    C4AQOBW5450M3NJ
#

date_time=$(date '+%Y%m%d_%H%M%S' )

tmp_file=/tmp/C4AQ_${date_time}.awk
out_file=cap_table_${date_time}.js

cat > "${tmp_file}" <<'EOM'
/^mfg=/  { mfg = substr($0, 5); }

/C4AQ/  {
           esr = $11 / 1000.0;
           printf "{mfg: '%s', pn: '%s', tech: 'Film', c: %6.1f, v_dc: %6.1f, i_rms: %5.1f, esl: %.1f, esr: %.4f, th_cc: %.1f, th_ca: %.1f, shape: 'cube', dim_x: %.1f, dim_y: %.1f, dim_z: %.1f },\n",
                  mfg, $15, $1, $2, $12, $10, esr, 0, $13, $5, $3, $4;
         }
EOM

awk -f "${tmp_file}" C4AQ.txt > "${out_file}"

# echo "output file is ${out_file}"

rm -f cap_table.js
ln "${out_file}" cap_table.js
