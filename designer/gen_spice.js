/*
 * Code to generate a spice emulation file for the current configuration.
 * 
 * Output is intended for ngspice with no compatibility mode set.
 */

icosalogic.inv_design.spice.preamble = '';
icosalogic.inv_design.spice.gen_time = '';
icosalogic.inv_design.spice.cap = '';
icosalogic.inv_design.spice.dcl_cap = '';
icosalogic.inv_design.spice.of_cap = '';
icosalogic.inv_design.spice.fet = '';



/*
 * Generates the spice emulation file.
 */
icosalogic.inv_design.gen_spice = function() {
  console.log('gen_spice(): enter');
  
  var iid = icosalogic.inv_design;
  var is  = iid.spice;
  
  is.gen_time = new Date();
  
  iid.gs_preamble();
  iid.gs_cap();
  iid.gs_dcl_cap();
  iid.gs_of_cap();
//  iid.gs_fet();
  iid.gs_battery();
  iid.gs_refclk();
  iid.gs_line();
  iid.gs_lines();
  iid.gs_load();
};


/*
 * Generates the preamble.
 */
icosalogic.inv_design.gs_preamble = function() {
  console.log('gs_preamble(): enter');
  
  var iid = icosalogic.inv_design;
  var is  = iid.spice;
  var cfg = iid.config;
  
  var title = 'Inverter ' + cfg.cfg_name + ' ' + is.gen_time.toISOString() + '\n';
  var comment = ';\n' +
                '; Generated Spice input file, do not edit!\n' +
                '; Generated by beta.icosalogic.com/inv_design\n' +
                '; Config name ' + cfg.cfg_name + '\n' +
                '; Generated at ' is.gen_time.toLocaleString() + ' ISO ' + is.gen_time.toISOString() + '\n\n';
  is.gs_preamble = title + comment;
};


/*
 * Generates the generic cap definition.
 */
icosalogic.inv_design.gs_cap = function() {
  console.log('gs_cap: enter');
  
  var iid = icosalogic.inv_design;
  var is  = iid.spice;
  var cfg = iid.config;
  
  is.cap = '.subckt cap_es cp cn esr=0.6m esl=20n c=66u\n' +
           'Vces_m cp ces_a\n' +
           'Rces_esr ces_a ces_b {esr}\n' +
           'Lces_esl ces_b ces_c {esl}\n' +
           'Cces_cap ces_c cn {c} ic={batv}\n' +
           '.ends\n\n';

};


/*
 * Generates the DC link cap definition.
 */
icosalogic.inv_design.gs_dcl_cap = function() {
  console.log('gs_dcl_cap: enter');
  
  var iid = icosalogic.inv_design;
  var is  = iid.spice;
  var cfg = iid.config;
  
  var dcl_cap_entry = iid.cap_table.find(entry => entry.pn == cfg.dcl_cap_pn);
  if (dcl_cap_entry == null) {
    console.log('could not find dcl cap entry for ' + cfg.dcl_cap_pn);
  }
  
  var i = 0;
  for (i = 0; i < cfg.dcl_count; i++) {
    is.dcl_cap += 'Xdcl_' + iid.lpad(i, 3, '0') + ' pos neg cap_es ' +
                  'esl={' + dcl_cap_entry.esl + '}n ' +
                  'esr={' + dcl_cap_entry.esr + '} ' +
                  'c={'   + dcl_cap_entry.c + '}u\n\n';
  }
  is.dcl_cap += '\n';
  
};


/*
 * Generates the output filter cap definition.
 */
icosalogic.inv_design.gs_of_cap = function() {
  console.log('gs_of_cap: enter');
  
  var iid = icosalogic.inv_design;
  var is  = iid.spice;
  var cfg = iid.config;
  
  var of_cap_entry = iid.cap_table.find(entry => entry.pn == cfg.oc_pn);
  if (of_cap_entry == null) {
    console.log('could not find dcl cap entry for ' + cfg.oc_pn);
  }
  
  var i = 0;
  for (i = 0; i < cfg.oc_count; i++) {
    is.of_cap += 'Xoc_'   + iid.lpad(i, 3, '0') + ' pos neg cap_es ' +
                  'esl={' + of_cap_entry.esl + '}n ' +
                  'esr={' + of_cap_entry.esr + '} ' +
                  'c={'   + of_cap_entry.c + '}u\n\n';
  }
  is.of_cap += '\n';
  
};


/*
 * Generates the line subckt (sub circuit) definition.
 */
icosalogic.inv_design.gs_line = function() {
  console.log('gs_line(): enter');
  
  var iid = icosalogic.inv_design;
  iid.gs_line_fb();
  iid.gs_line_drive();
  iid.gs_line_fet();
  iid.gs_line_filter();  
};


/*
 * Generates the line feedback elements.
 */
icosalogic.inv_design.gs_line_fb = function() {
  console.log('gs_line_fb(): enter');
  
};


/*
 * Generates the line clocked gate drive elements.
 */
icosalogic.inv_design.gs_line_drive = function() {
  console.log('gs_line_drive(): enter');
  
};


/*
 * Generates the line FET elements.
 */
icosalogic.inv_design.gs_line_fet = function() {
  console.log('gs_line_fet(): enter');
  
};


/*
 * Generates the line filter elements.
 * This mainly consists of the LC filter.
 */
icosalogic.inv_design.gs_line_filter = function() {
  console.log('gs_line_filter(): enter');
  
};


/*
 * Generates the battery lines
 */
icosalogic.inv_design.gs_battery = function() {
  console.log('gs_battery(): enter');
  
};


/*
 * Generates the DC link capacitor lines.
 */
icosalogic.inv_design.gs_dclcap = function() {
  console.log('gs_dclcap(): enter');
  
};


/*
 * Generates the reference voltage and clock sources.
 */
icosalogic.inv_design.gs_refclk = function() {
  console.log('gs_refclk(): enter');
  
};


/*
 * Generates the load lines.
 */
icosalogic.inv_design.gs_load = function() {
  console.log('gs_load(): enter');
  
};


/*
 * Generates the line instances.
 */
icosalogic.inv_design.gs_lines = function() {
  console.log('gs_lines(): enter');
  
};


/*
 * Do a left pad on val (as a string) until it is length characters long.
 */
icosalogic.inv_design.lpad = function(val, length, padChar) {
	var strVal = val + "";
	while (strVal.length < length) {
		strVal = padChar + strVal;
	}
	return strVal;
};


