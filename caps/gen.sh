#!/bin/bash
#
# Generate all the subordinate cap entry files, then merge them into a
# common file.
#

date_time=$(date '+%Y%m%d_%H%M%S' )

out_file=cap_table_${date_time}.js

# Generate the subordinate cap tables.

cap_dirs=$( ls -d -1 caps_* )
for dir in ${cap_dirs} ; do
  echo "generating ${dir}"
  ( cd $dir ; ./gen.sh )
done

# Emit the header to the output file

cat > "${out_file}" <<'EOM'
/*
 * Attributes of DC-Link capacitors used in the inverter designer.
 *
 * mfg      -- manufacturer
 * pn       -- part number
 * tech     -- film mostly, maybe some electrolytic
 * c        -- rated capacitance
 * v_dc     -- max DC voltage
 * i_rms    -- RMS current capacity
 * esl      -- equivalent series inductance
 * esr      -- equivalent series resistance
 * th_cc    -- theta (thermal resistance) core to case
 * th_ca    -- theta (thermal resistance) case to ambient
 * shape    -- cube or cylinder
 * dim_dia  -- diameter of cylindrical capacitor
 * dim_x    -- X dimension, e.g., width
 * dim_y    -- Y dimension, e.g., depth
 * dim_z    -- Z dimension, e.g., height of capacitor
 */

icosalogic.inv_design.cap_table = [
EOM

cat */cap_table.js >> "${out_file}"

echo "];" >> "${out_file}"

# echo "output file is ${out_file}"

rm -f cap_table.js
ln "${out_file}" cap_table.js
