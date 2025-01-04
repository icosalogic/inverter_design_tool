#!/bin/bash
#
# First, update the capacitor table, if needed

if [[ caps/cap_table.js -nt designer/cap_table.js ]] ; then
  echo "updating cap_table..."
  cp caps/cap_table.js designer/cap_table.js
fi

# Update the build, date, and time fields in the version file

in_file=designer/version.js
tmp_file=/tmp/inv_design_version

new_build_number=$( awk '/build:/ {print $2 + 1}' "${in_file}" )
gen_date=$( date '+%Y/%m/%d %T %Y%m%d %H%M%S' )
new_date=$( echo "${gen_date}" | awk '{print $1}' )
new_time=$( echo "${gen_date}" | awk '{print $2}' )
file_date=$( echo "${gen_date}" | awk '{print $3}' )
file_time=$( echo "${gen_date}" | awk '{print $4}' )

sed -e /build:/d -e /date:/d -e /time:/d -e '/^\};/d' "${in_file}" > "${tmp_file}"

echo "  build: ${new_build_number}," >> "${tmp_file}"
echo "  date: '${new_date}'," >> "${tmp_file}"
echo "  time: '${new_time}'," >> "${tmp_file}"
echo "};" >> "${tmp_file}"

# cat "${tmp_file}"

mv "${in_file}" .old_version.js
cp "${tmp_file}" "${in_file}"
chmod 444 "${in_file}"

