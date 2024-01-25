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
#     Part number       uF  Vdc dV/dt Ipeak  ESL ESR Irms Rth Dia   Ht    H1     kg
#     C44UHGT6650M81K  650  600     5  3540   45 1.2   59 7.1  85  99.5  101 5  4.4
#

date_time=$(date '+%Y%m%d_%H%M%S' )

tmp_file=/tmp/C44U_${date_time}.awk
out_file=cap_table_${date_time}.js

cat > "${tmp_file}" <<'EOM'
/^mfg=/  { mfg = substr($0, 5); }
/^Vdc=/  { Vdc = substr($0, 5); }

/^C44U/  {
           esr = $7 / 1000.0;
           printf "{mfg: '%s', pn: '%s', tech: 'Film', c: %6.1f, v_dc: %6.1f, i_rms: %5.1f, esl: %.1f, esr: %.4f, th_cc: %.1f, th_ca: %.1f, shape: 'cylinder', dim_dia: %.1f, dim_z: %.1f },\n",
                  mfg, $1, $2, $3, $8, $6, esr, 0, $9, $10, $11;
         }
EOM

awk -f "${tmp_file}" C44U.txt > "${out_file}"

# echo "output file is ${out_file}"

rm -f cap_table.js
ln "${out_file}" cap_table.js
