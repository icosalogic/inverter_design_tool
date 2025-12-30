/*
 * Visualization code for the IcosaLogic inverter design tool.
 * 
 * This is the main javascript file, and serves as the controller for the app, in the MVC paradigm.
 * 
 * The model is comprised of the configuration (config.js) and the values derived from the
 * configuration (derived.js).  The configuration is the set of fields the user can edit, and
 * derived are the read-only fields that are calculated by the app using the values in the
 * configuration.  The dichotomy between config and derived should be strictly maintained to keep
 * any sanity in the code.
 *
 * The view is implemented in HTML (index.html).
 *
 * Please see leading comments in config.js and derived.js for instructions on how to add new
 * fields to this application.
 * 
 * TODO:
 *    1. Generate Spice file
 *    2. Auto select components (DCL, FET, OF)
 *    3. Separate tables for DC link caps and output filter caps
 *    4. Define gate driver IC table to set gate driver params.
 *    5. Fix nested show/hide issues, e.g. inductors
 *    6. Fix printDerived() RE inductors
 */

icosalogic = {};
icosalogic.inv_design = {};
icosalogic.inv_design.isLoaded = false;

icosalogic.inv_design.sqrt_2 = 1.41421356237;
icosalogic.inv_design.cu_rho = 1.75e-8;          // resistivity of ~99% CU

icosalogic.inv_design.config   = {};
icosalogic.inv_design.derived  = {};
icosalogic.inv_design.spice    = {};

icosalogic.lcl                 = {};
icosalogic.lcl.derived         = {};

icosalogic.inv_design.mu_keys = [14, 19, 26, 40, 60, 75, 90, 125, 147, 160];

icosalogic.inv_design.num_graph_opts = 0;


/*
 * Onload handler to initialize the software.
 */
icosalogic.inv_design.onLoadHandler = function() {
  console.log('icosalogic.inv_design.onLoadHandler: enter');

  var oa = icosalogic.inv_design;
  var lcl = icosalogic.lcl;
  
  oa.updateVersionInfo();
  
  oa.addWireOptions();
  oa.addDclCapOptions();
  oa.addFetOptions();
  oa.addOutCapOptions();
  oa.addIndOptions();

  // oa.dumpStorage();  // uncomment for debugging store/load of configs

  oa.Derived.init();
  oa.Config.init();
  
  oa.addConfigOptions();
  oa.addHandlers();
  
  if (oa.config == null) {
    console.log('oa.config is null!');
  } else {
    // oa.config.dump();
  }
  
  oa.derived = new oa.Derived();
  oa.derived.deriveFJT(oa.config);
  
  oa.setConfigActive(oa.config);

  oa.validateConfigs();
  
  oa.showHideBus();

  console.log("onLoadHandler: done");
};


/*
 * Update the displayed version information.
 */
icosalogic.inv_design.updateVersionInfo = function() {
  console.log('icosalogic.inv_design.updateVersionInfo: enter ===============================================');

  var oa = icosalogic.inv_design;
  
  var elVersion = document.getElementById('version_info');
  if (elVersion != null) {
    elVersion.innerText = 'version ' + oa.version.major + '.' + oa.version.minor + '.' + oa.version.build +
                          ' ' + oa.version.date + ' ' + oa.version.time;
  }
};


/*
 * Populate the option elements in the configs select element from
 * the data in local storage.
 */
icosalogic.inv_design.addConfigOptions = function() {
  console.log('icosalogic.inv_design.addConfigOptions: enter ===============================================');

  var el = document.getElementById('configs');
  console.log('addConfigOptions: before length=' + el.length);
  
  icosalogic.inv_design.configs.forEach(function(cfg_name) {
    console.log('addConfigOptions: cfg_name=' + cfg_name);
    
    var opt = document.createElement('option');
    opt.id = 'cfg_' + cfg_name;
    opt.name =  opt.id;
    opt.value = cfg_name;
    opt.text = cfg_name;
    el.appendChild(opt);
    // el.add(opt);
  });
  
  console.log('addConfigOptions: after length=' + el.length);
};

/*
 * Populate the option elements in the wire select element from
 * the data in the wire_table.
 */
icosalogic.inv_design.addWireOptions = function() {
  console.log('icosalogic.inv_design.addWireOptions: enter ===============================================');

  var el = document.getElementById('wire_pn');
  var i;
  icosalogic.inv_design.wire_table.forEach(function(wire_entry) {
    // console.log('addWireOptions: mfg=' + wire_entry.mfg + ' pn=' + wire_entry.pn);
    
    var op_el = document.createElement('option');
    op_el.id = 'wire_' + wire_entry.pn;
    op_el.value = wire_entry.pn;
    op_el.text  = wire_entry.pn + ' AWG ' + wire_entry.awg;
    if (el.length < 1) {
      op_el.selected = true;
    }
    el.appendChild(op_el);
  });
    
  console.log('addWireOptions: added ' + el.length + ' options');
};

/*
 * Populate the option elements in the FET select element from
 * the data in the fet_table.
 */
icosalogic.inv_design.addFetOptions = function() {
  console.log('icosalogic.inv_design.addFetOptions: enter ===============================================');

  var el = document.getElementById('fet_pn');
  var i;
  icosalogic.inv_design.fet_table.forEach(function(fet_entry) {
    // console.log('addFetOptions: mfg=' + fet_entry.mfg + ' pn=' + fet_entry.pn);
    
    var op_el = document.createElement('option');
    op_el.id = 'fet_' + fet_entry.pn;
    op_el.value = fet_entry.pn;
    op_el.text  = fet_entry.pn;
    if (el.length < 1) {
      op_el.selected = true;
    }
    el.appendChild(op_el);
  });
};

/*
 * Create an option element from the given capacitor entry and return it.
 * 
 */
icosalogic.inv_design.makeCapOption = function(ce, prefix, isSelected) {
  // console.log('icosalogic.inv_design.makeCapOption: enter');

  var text = ce.pn + ' ' + ce.c + 'uF ' + ce.i_rms + 'A ' + ce.v_dc + 'V ';
  if (ce.dim_dia != null && ce.dim_dia > 0) {
    text = text + ce.dim_dia + 'x' + ce.dim_z;
  }
  
  var op_el = document.createElement('option');
  op_el.id = prefix + ce.pn;
  op_el.value = ce.pn;
  op_el.text = text;
  if (isSelected) {
    op_el.selected = true;
  }
  return op_el;
};

/*
 * Populate the option elements in the DC-Link capacitor select element from
 * the data in the cap_table.
 * 
 * The cap table data is common between the DCL cap and output cap logic.
 */
icosalogic.inv_design.addDclCapOptions = function() {
  console.log('icosalogic.inv_design.addDclCapOptions: enter ===============================================');

  var oa = icosalogic.inv_design;
  var el = document.getElementById('dcl_cap_pn');
  
  // retain the currently selected entry in the filter list
  console.log('addDclCapOptions: current entry is ' + el.value);
  var prevEntry = el.value;
  // remove previous entries
  oa.removeAllChildren(el);
  
  var i;
  icosalogic.inv_design.cap_table.forEach(function(dcl_cap_entry) {
    el.appendChild(oa.makeCapOption(dcl_cap_entry, 'dcl_cap_',
                            (prevEntry == null && el.length < 1) || prevEntry == dcl_cap_entry.pn));
  });
};

/*
 * Populate the option elements in the DC-Link capacitor select element from
 * the data in the cap_table.  This method differs from addDclCapOptions above,
 * in that it adds only the options that meet the criteria: Capacitance, current, FoM.
 * Candidate entries will have capacitance and FoM values within the tolerance
 * range, e.g., +/- 20%.  The target current value is a minimum.
 * 
 * The cap table data is common between the DCL cap and output cap logic.
 */
icosalogic.inv_design.filterDclCapOptions = function() {
  console.log('icosalogic.inv_design.filterDclCapOptions: enter ===============================================');

  var oa = icosalogic.inv_design;
  var derived = oa.derived;
  var config = oa.config;
  
  var el = document.getElementById('dcl_cap_pn');
  
  // retain the currently selected entry in the filter list
  console.log('filterDclCapOptions: current entry is ' + el.value);
  var prevEntry = el.value;
  
  // remove previous entries
  oa.removeAllChildren(el);
  
  var tolerance = 0.2;
  var lowTolerance = 1.0 - tolerance;
  var highTolerance = 1.0 + tolerance;
  var iRmsMin = derived.dcl_i_rms_max / config.dcl_count;
  var cMin = derived.dcl_c_req * lowTolerance / config.dcl_count;
  var cMax = derived.dcl_c_req * highTolerance / config.dcl_count;
  var fomMin = derived.dcl_fom * lowTolerance;
  var fomMax = derived.dcl_fom * highTolerance;
  console.log('iRmsMin=' + iRmsMin + ' cMin=' + cMin + ' cMax=' + cMax + ' fomMin=' + fomMin + ' fomMax=' + fomMax);
  
  var totalCaps = 0;
  var i;
  oa.cap_table.forEach(function(dce) {
    // console.log('filterDclCapOptions: mfg=' + dce.mfg + ' pn=' + dce.pn);
    
    totalCaps += 1;
    var fom = dce.i_rms * 1000000 / dce.c;
    if (dce.pn == prevEntry || (dce.i_rms >= iRmsMin && dce.c >= cMin && dce.c <= cMax &&
        fom >= fomMin /* && fom <= fomMax */ )) {
      el.appendChild(oa.makeCapOption(dce, 'dcl_cap_',
                            (prevEntry == null && el.length < 1) || prevEntry == dce.pn));
    }
  });
  
  console.log('filterDclCapOptions: added ' + el.length + ' of ' + totalCaps + ' options');
};

/*
 * The DCL cap filter/all event handler.
 */
icosalogic.inv_design.dclFilterHandler = function(e) {
  console.log('icosalogic.inv_design.dclFilterHandler: enter ');
  
  var btn = e.target;

  var oa = icosalogic.inv_design;
  
  if (btn.value == 'f') {
    // filter the entries, set button to All
    btn.value = 'a';
    btn.innerText = "All";
    oa.filterDclCapOptions();
  } else {
    // show all the entries, set button to Filter
    btn.value = 'f';
    btn.innerText = "Filter";
    oa.addDclCapOptions();
  }
};

/*
 * Populate the option elements in the output capacitor select element from
 * the data in the cap_table.
 * 
 * Both DCL cap element and out cap element share the same base data table,
 * located in cap_table.js.
 */
icosalogic.inv_design.addOutCapOptions = function() {
  console.log('icosalogic.inv_design.addOutCapOptions: enter ===============================================');

  var oa = icosalogic.inv_design;
  var el = document.getElementById('oc_pn');
  
  // retain the currently selected entry in the filter list
  console.log('addOutCapOptions: current entry is ' + el.value);
  var prevEntry = el.value;
  
  // remove previous entries
  oa.removeAllChildren(el);
  
  var i;
  oa.cap_table.forEach(function(out_cap_entry) {
    el.appendChild(oa.makeCapOption(out_cap_entry, 'out_cap_',
                            (prevEntry == null && el.length < 1) || prevEntry == out_cap_entry.pn));
  });
    
  console.log('addOutCapOptions: added ' + el.length + ' options');
};

/*
 * Populate the option elements in the output filter capacitor select element from
 * the data in the cap_table.  This method differs from addOutCapOptions above,
 * in that it adds only the options that meet the criteria: Capacitance, current.
 * Candidate entries will have capacitance values within the tolerance
 * range, e.g., +/- 20%.  The target current value is a minimum.
 * 
 * The cap table data is common between the DCL cap and output cap logic.
 */
icosalogic.inv_design.filterOutCapOptions = function() {
  console.log('icosalogic.inv_design.filterOutCapOptions: enter ===============================================');

  var oa = icosalogic.inv_design;
  var derived = oa.derived;
  var config = oa.config;
  
  var el = document.getElementById('oc_pn');
  
  // retain the currently selected entry in the filter list
  console.log('filterOutCapOptions: current entry is ' + el.value);
  var prevEntry = el.value;
  
  // remove previous entries
  oa.removeAllChildren(el);
  
  var tolerance = 0.2;
  var lowTolerance = 1.0 - tolerance;
  var highTolerance = 1.0 + tolerance;
  
  var maxCurrentHandled = derived.dcl_i_rms_max * 0.25;  // 25% is generous; actual target is 5%
  var iRmsMin = maxCurrentHandled / config.dcl_count;
  var target_uH = config.oc_target * 1000000;
  var cMin = target_uH * lowTolerance / config.oc_count;
  var cMax = target_uH * highTolerance / config.oc_count;
  // console.log('iRmsMin=' + iRmsMin + ' cMin=' + cMin + ' cMax=' + cMax);
  
  var totalCaps = 0;
  var i;
  oa.cap_table.forEach(function(oce) {
    totalCaps += 1;

    if (oce.pn == prevEntry || (oce.i_rms >= iRmsMin && oce.c >= cMin && oce.c <= cMax)) {
      el.appendChild(oa.makeCapOption(oce, 'out_cap_',
                            (prevEntry == null && el.length < 1) || prevEntry == oce.pn));
    }
  });
  
  console.log('filterOutCapOptions: added ' + el.length + ' of ' + totalCaps + ' options');
};

/*
 * The output cap filter/all event handler.
 */
icosalogic.inv_design.ocFilterHandler = function(e) {
  console.log('icosalogic.inv_design.ocFilterHandler: enter ');
  
  var btn = e.target;

  var oa = icosalogic.inv_design;
  
  if (btn.value == 'f') {
    // filter the entries, set button to All
    btn.value = 'a';
    btn.innerText = "All";
    oa.filterOutCapOptions();
  } else {
    // show all the entries, set button to Filter
    btn.value = 'f';
    btn.innerText = "Filter";
    oa.addOutCapOptions();
  }
};

/*
 * Reset the cap filter options if necessary.
 */
icosalogic.inv_design.resetCapFilters = function(e) {
  console.log('icosalogic.inv_design.resetCapFilters: enter ');

  var oa = icosalogic.inv_design;
  
  var el = document.getElementById('dcl_filter');
  if (el.value != 'f') {
    el.value = 'f';
    el.innerText = "Filter";
    oa.addDclCapOptions();
  }
  
  el = document.getElementById('oc_filter');
  if (el.value != 'f') {
    el.value = 'f';
    el.innerText = "Filter";
    oa.addOutCapOptions();
  }
  
};

/*
 * The handler for scrolling through the output filter suggestions.
 */
icosalogic.inv_design.ofScroller = function(e) {
  console.log('icosalogic.inv_design.ofScroller: enter: cur=' + icosalogic.inv_design.derived.of_ndx_sugg);
  
  var btn = e.target;
  
  var oa = icosalogic.inv_design;
  var derived = oa.derived;
  
  // Update the current index, including wrap around.  The ndx ranges from 1..max (not 0..max-1).
  // The value 0 is reserved to indicate no valid filter.
  if (derived.lcl.num_valid_derivations <= 0) {
    derived.of_ndx_sugg = 0;
    
  } else if (btn.id == 'of_ndx_decr') {
    if (derived.of_ndx_sugg > 1) {
      derived.of_ndx_sugg -= 1;
    } else {
      derived.of_ndx_sugg = derived.lcl.num_valid_derivations;
    }
    
  } else if (btn.id == 'of_ndx_incr') {
    if (derived.of_ndx_sugg < derived.lcl.num_valid_derivations) {
      derived.of_ndx_sugg += 1;
    } else {
      derived.of_ndx_sugg = 1;
    }
  }
  
  oa.displaySuggestion();
  
};

/*
 * Populate the option elements in the inductor select element from
 * the data in the ind_table.
 */
icosalogic.inv_design.addIndOptions = function() {
  console.log('icosalogic.inv_design.addIndOptions: enter ===============================================');

  var oa = icosalogic.inv_design;

  oa.addIndOtsOptions(1);
  oa.addIndCorOptions(1);
  oa.addIndOtsOptions(2);
  oa.addIndCorOptions(2);
};

/*
 * Populate the option elements in the inductor select element from
 * the data in the ind_table.
 */
icosalogic.inv_design.addIndOtsOptions = function(inum) {
  console.log('icosalogic.inv_design.addIndOtsOptions: enter inum ' + inum + ' ===============================================');

  var prefix = 'ind' + inum + '_';
  var id_pn = prefix + 'pn';
  var el = document.getElementById(id_pn);
  var oldValue = el.value;

  icosalogic.inv_design.ind_table.forEach(function(ind_entry) {
    // console.log('addIndOtsOptions: mfg=' + ind_entry.mfg + ' pn=' + ind_entry.pn + 
    //             ' l_uh=' + ind_entry.l_uh + ' i_dt100=' + ind_entry.i_dt100);
                
    var op_el = document.createElement('option');
    op_el.id = prefix + ind_entry.pn;
    op_el.value = ind_entry.pn;
    op_el.text  = ind_entry.pn + ' ' + ind_entry.l_uh + 'uH ' + ind_entry.i_dt100 + 'A';
    if ((oldValue == null && el.length < 1) || oldValue == ind_entry.pn) {
      op_el.selected = true;
    }
    el.appendChild(op_el);
  });
    
  console.log('addIndOtsOptions: inum ' + inum + ' added ' + el.length + ' options');
};

/*
 * Populate the option elements in the inductor core select element from
 * the data in the ind_cor_table.
 * 
 * Both inductor 1 and 2 elements share the same base data table,
 * located in ind_cor_table.js.
 */
icosalogic.inv_design.addIndCorOptions = function(inum) {
  console.log('icosalogic.inv_design.addIndCorOptions: enter inum ' + inum + ' ==============================');

  var oa = icosalogic.inv_design;
  
  var prefix = 'ind' + inum + '_';
  var id_pn = prefix + 'core_pn';
  
  // retain the currently selected entry in the cfg
  var el = document.getElementById(id_pn);
  var oldValue = el.value;
  console.log('addIndCorOptions: inum ' + inum + ' current value is ' + el.value);
  
  // remove previous entries
  oa.removeAllChildren(el);
  
  var i;
  oa.ind_cor_pn_table.forEach(function(ice) {
    var sze = oa.ind_cor_size_table.find(entry => entry.size == ice.size)
    var opt_el = document.createElement('option');
    opt_el.id = prefix + ice.pn;
    opt_el.value = ice.pn;
    opt_el.text = ice.pn + ' ' + ice.mat + ' ' + ice.mu + 'μ  OD:' + sze.OD + ' Ap:' + sze.Ap / 2e4;
    if ((oldValue == null && el.length < 1) || oldValue == ice.pn) {
      opt_el.selected = true;
    }
    el.appendChild(opt_el);
  });
    
  console.log('addIndCorOptions: inum ' + inum + ' added ' + el.length + ' options');
};

/*
 * Add the event handlers to the appropriate elements.
 */
icosalogic.inv_design.addHandlers = function() {
  console.log('icosalogic.inv_design.addHandlers: enter ===============================================');
  
  // Add handlers on buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(function(button) {
    if (button.name == null) {
      console.log('addHandlers: button name is null');
    } else if (button.id == 'show_hide_all') {
      // console.log('adding showHideAll handler to ' + button.name);
      button.onclick = icosalogic.inv_design.showHideAll;
    } else if (button.name.startsWith('sh')) {
      // console.log('adding showhide handler to ' + button.name);
      button.onclick = icosalogic.inv_design.showhide;
    } else if (button.id == 'cfg_create') {
      console.log('adding onclick handler to ' + button.id);
      button.onclick = icosalogic.inv_design.createConfig;
    } else if (button.id == 'cfg_copy') {
      console.log('adding onclick handler to ' + button.id);
      button.onclick = icosalogic.inv_design.copyConfig;
    } else if (button.id == 'cfg_delete') {
      console.log('adding onclick handler to ' + button.id);
      button.onclick = icosalogic.inv_design.deleteConfig;
    } else if (button.id == 'cfg_print') {
      console.log('adding onclick handler to ' + button.id);
      button.onclick = icosalogic.inv_design.showPrintText;
    } else if (button.id == 'cfg_purge') {
      console.log('adding onclick handler to ' + button.id);
      button.onclick = icosalogic.inv_design.purgeConfigs;
    } else if (button.id == 'dcl_filter') {
      console.log('adding onclick handler to ' + button.id);
      button.onclick = icosalogic.inv_design.dclFilterHandler;
    } else if (button.id == 'oc_filter') {
      console.log('adding onclick handler to ' + button.id);
      button.onclick = icosalogic.inv_design.ocFilterHandler;
    } else if (button.id.startsWith('of_ndx_')) {
      console.log('adding onclick handler to ' + button.id);
      button.onclick = icosalogic.inv_design.ofScroller;
    } else if (button.id == 'gen_graph') {
      console.log('adding onclick handler to ' + button.id);
      button.onclick = icosalogic.inv_design.loadAndGraph;
    }
  });
  
  // Add new config, checkbox, and input update handlers
  const inputs = document.querySelectorAll('input');
  inputs.forEach(function(in_el) {
    if (in_el.readOnly || in_el.id.startsWith('new_cfg')) {
      // console.log('not adding update handler to ' + in_el.id);
    } else if (in_el.type == 'checkbox') {
      // console.log('adding update handler to ' + in_el.id);
      in_el.onchange = icosalogic.inv_design.updateHandler;
    } else {
      // console.log('adding update handler to ' + in_el.id);
      in_el.onblur = icosalogic.inv_design.updateHandler;
    }
  });
  
  // Add update handlers for select elements
  const selects = document.querySelectorAll('select');
  selects.forEach(function(in_el) {
    if (in_el.id == 'graph_type') {
      in_el.onchange = icosalogic.inv_design.graphTypeHandler;
    } else {
      // console.log('adding select update handler to ' + in_el.id);
      in_el.onchange = icosalogic.inv_design.updateHandler;
    }
  });

  // Add info popup handlers
  const tds = document.querySelectorAll('td');
  tds.forEach(function(in_el) {
    // console.log('adding mouseenter/leave handlers to ' + in_el.id);
    if (in_el.id != null && in_el.id.startsWith('info_')) {
      // console.log('adding mouseenter/leave handlers to ' + in_el.id);
      
      in_el.onclick = icosalogic.inv_design.showInfoText;
    }
  });

};


/*
 * The purge event handdler.
 * Deletes all the saved configs and reloads the app.
 */
icosalogic.inv_design.purgeConfigs = function(e) {
  console.log('icosalogic.inv_design.purgeConfigs: enter ===============================================');
  
  localStorage.clear();
  location.reload();
};

/*
 * This is the handler for the meta show/hide all button.
 * 
 * TODO: fix this for the part data show/hide.  It is broken for nested groups.
 */
icosalogic.inv_design.showHideAll = function(e) {
  console.log('icosalogic.inv_design.showHideAll: enter');
  
  var btn = e.target;
  console.log('name=' + btn.name + '  value=' + btn.value + '  innerText=' + btn.innerText);

  var myEvent = {};

  // invoke the onclick handler for every button whose name starts with 'sh'
  
//const buttons = document.querySelectorAll('button');
  const buttons = document.getElementsByTagName('button');
//buttons.forEach(function(button) {
  Array.prototype.forEach.call(buttons, function(bttn) {
    if (bttn.name == null) {
      console.log('showHideAll: button name is null');
    } else if (bttn.name.startsWith('sh') && bttn.value == btn.value) {
      myEvent.target = bttn;
      console.log('invoking showhide handler for button name=' + bttn.name + '  value=' + bttn.value + '  innerText=' + bttn.innerText);
      bttn.onclick(myEvent);
    }
  });

  // update the state of this button
  if (btn.value == 'h') {
    btn.value = 's';
    btn.innerText = "Show All";
  } else {
    btn.value = 'h';
    btn.innerText = "Hide All";
  }
};


/*
 * Set the display attribute of matchng tr (table row) elements.
 */
icosalogic.inv_design.setTableRowDisplay = function(name, dispValue) {
  console.log('icosalogic.inv_design.setTableRowDisplay: enter: name=' + name + ' dispValue=' + dispValue);
  
  const trows = document.getElementsByTagName('tr');

  for (var i = 0; i < trows.length; i++) {
    trow = trows[i];
    if (trow.classList.contains(name)) {
      trow.style.display = dispValue;
    }
  }
};


/*
 * The show/hide event handler.
 */
icosalogic.inv_design.showhide = function(e) {
  console.log('icosalogic.inv_design.showhide: enter ');
  
  var btn = e.target;
  // console.log('name=' + btn.name + '  value=' + btn.value + '  innerText=' + btn.innerText);

  var oa = icosalogic.inv_design;
  
  if (btn.value == 'h') {
    btn.value = 's';
    btn.innerText = "Show";
    oa.setTableRowDisplay(btn.name, 'none');
  } else {
    btn.value = 'h';
    btn.innerText = "Hide";
    oa.setTableRowDisplay(btn.name, 'table-row');
  
    if (btn.name.startsWith('sh_bus')) {
      oa.showHideBus();
    }
  }
};


/*
 * Show / hide some of the rows in the inductor section, based on the currently
 * selected value.
 */
icosalogic.inv_design.showHideInductor = function() {
  var oa = icosalogic.inv_design;
  
  console.log('icosalogic.inv_design.showHideInductor: enter' +
              ' ind1.ind_type=' + oa.config.ind1.ind_type +
              ' ind2.ind_type=' + oa.config.ind2.ind_type +
              ' filter_type=' + oa.derived.lcl.filter_type);
              
  // Always show ind1, and do 'none' entries first
  if (oa.config.ind1.ind_type == 'ots') {
    oa.setTableRowDisplay('sh_ind1_cust', 'none');
    oa.setTableRowDisplay('sh_ind1_air',  'none');
    oa.setTableRowDisplay('sh_ind1_ots',  'table-row');
  } else if (oa.config.ind1.ind_type == 'custom') {
    oa.setTableRowDisplay('sh_ind1_ots',  'none');
    oa.setTableRowDisplay('sh_ind1_air',  'none');
    oa.setTableRowDisplay('sh_ind1_cust', 'table-row');
  } else if (oa.config.ind1.ind_type == 'air') {
    oa.setTableRowDisplay('sh_ind1_ots',  'none');
    oa.setTableRowDisplay('sh_ind1_cust', 'none');
    oa.setTableRowDisplay('sh_ind1_air',  'table-row');
  }
  
  // Show ind2 only for LCL filters
  if (oa.derived.lcl.filter_type == 'LCL') {
    if (oa.config.ind2.ind_type == 'ots') {
      oa.setTableRowDisplay('sh_ind2_cust', 'none');
      oa.setTableRowDisplay('sh_ind2_air',  'none');
      oa.setTableRowDisplay('sh_ind2_ots',  'table-row');
    } else if (oa.config.ind2.ind_type == 'custom') {
      oa.setTableRowDisplay('sh_ind2_ots',  'none');
      oa.setTableRowDisplay('sh_ind2_air',  'none');
      oa.setTableRowDisplay('sh_ind2_cust', 'table-row');
    } else if (oa.config.ind2.ind_type == 'air') {
      oa.setTableRowDisplay('sh_ind2_ots',  'none');
      oa.setTableRowDisplay('sh_ind2_cust', 'none');
      oa.setTableRowDisplay('sh_ind2_air',  'table-row');
    }
    
    // show/hide the nav panel link for ind2
  }
};

/*
 * Show / hide some of the rows in the bus section, based on the currently
 * selected bus type.
 */
icosalogic.inv_design.showHideBus = function() {
  var oa = icosalogic.inv_design;
  
  console.log('icosalogic.inv_design.showHideBus: enter bus_type=' + oa.config.bus_type);
  
  if (oa.config.bus_type == 'p2p') {
    oa.setTableRowDisplay('sh_bus_p2p', 'table-row');
    oa.setTableRowDisplay('sh_bus_bar', 'none');
  } else {
    oa.setTableRowDisplay('sh_bus_p2p', 'none');
    oa.setTableRowDisplay('sh_bus_bar', 'table-row');
  }
};


/*
 * Show / hide some of the rows in the output filter section, based on the
 * current filter type.
 */
icosalogic.inv_design.showHideFilter = function() {
  var oa = icosalogic.inv_design;
  var derived = oa.derived;
  
  console.log('icosalogic.inv_design.showHideFilter: enter of_type=' + derived.lcl.filter_type);
  
  var el_nav = document.getElementById('xnav_ofl2');
  
  if (derived.lcl.filter_type == 'LCL') {
    oa.setTableRowDisplay('sh_of_lcl', 'table-row');
    oa.setTableRowDisplay('sh_of_lc',  'none');
    
    el_nav.style.display = 'block';
  } else {
    oa.setTableRowDisplay('sh_of_lcl', 'none');
    oa.setTableRowDisplay('sh_of_lc',  'table-row');
    
    el_nav.style.display = 'none';
  }
  
  oa.showHideInductor();
};


/*
 * The mouseenter handler to show info text for each data item.
 */
icosalogic.inv_design.showInfoText = function(e) {
  console.log('icosalogic.inv_design.showInfoText: enter ');
  
  var eltd = e.target;
  console.log('id=' + eltd.id);
  
  if (eltd.id == null || eltd.id.startsWith('info_dm_')) {
    return;
  }
  
  if (eltd.id.startsWith('gotit_')) {
    console.log('showInfoText: closing the dialog');
    eltd.ref_dialog.close();
  }
  
  if (eltd.id.startsWith('info_')) {
    var key = eltd.id.substring(5);
    var oa = icosalogic.inv_design;
    var eli = oa.info_text.find(element => element.key == key);
    
    /*
    var parent = eltd.parentElement;
    var p1 = parent.firstChild;
    var p2 = p1.nextSibling;
    var p3 = p2.nextSibling;
    var p4 = p3.nextSibling;
    console.log('p4: ' + p4.innerText);
    */

    // v3 style
    eldid = 'info_dm_' + key;
    var eld = document.getElementById(eldid);
    if (eld == null) {
      // add the dialog element if it doesn't exist
      eld = document.createElement('dialog');
      eld.id = eldid;
      var defaultMsg = 'The help text for this entry has not yet been defined.';
      eld.innerHTML = (eli != null ? eli.itxt : defaultMsg) + '<br><br>';
      
      var elb = document.createElement('button');
      elb.type = 'button';
      elb.innerHTML = 'Got it!';
      elb.id = 'gotit_' + key;
      elb.ref_dialog = eld;
      
      var elf = document.createElement('form');
      elf.method = 'dialog';
      elf.appendChild(elb);
      
      eld.appendChild(elf);
      
      eltd.appendChild(eld);
    }
    eld.showModal();
  }
};


/*
 * The mouseleave handler to hide info text for each data item.
 */
icosalogic.inv_design.hideInfoText = function(e) {
  console.log('icosalogic.inv_design.hideInfoText: enter ');
  
  var eltd = e.target;
  console.log('id=' + eltd.id);
  
  if (eltd.id != null && eltd.id.startsWith('info_')) {
    var key = eltd.id.substring(5);
    var div_id = 'info_text_' + key;
    var div_el = document.getElementById(div_id);
    if (div_el != null) {
      console.log('hiding id=' + div_id);
      div_el.style.display = 'none';
    }
  }
}

/*
 * The handler to show print text for the current config.
 */
icosalogic.inv_design.showPrintText = function(e) {
  console.log('icosalogic.inv_design.showPrintText: enter ');
  
  var eltd = e.target;
  console.log('id=' + eltd.id);
  
  if (eltd.id == null) {
    return;
  }
  
  if (eltd.id.startsWith('done_')) {
    console.log('showPrintText: closing the dialog');
    eltd.ref_dialog.close();
    return;
  }
  
  var oa = icosalogic.inv_design;
    
  // v3 style
  eldid = 'print_modal';
  var eld = document.getElementById(eldid);
  if (eld != null) {
    console.log('showPrintText: dialog exists');
  } else {
    console.log('showPrintText: building dialog');
    eld = document.createElement('dialog');
    eld.id = eldid;
      
    console.log('showPrintText: building button');
    var elb = document.createElement('button');
    elb.type = 'button';
    elb.innerText = 'Done';
    elb.id = 'done_print';
    elb.ref_dialog = eld;
      
    console.log('showPrintText: building form');
    var elf = document.createElement('form');
    elf.method = 'dialog';
    elf.appendChild(elb);
      
    eld.appendChild(elf);
     
    eltd.appendChild(eld);
  }

  eld.innerHTML = oa.print();
  
  console.log('showPrintText: showing dialog');
  eld.showModal();
};


/*
 * Remove all the children from the given DOM node.
 */
icosalogic.inv_design.removeAllChildren = function(nodeEl)
{
	console.log("icosalogic.inv_design.removeAllChildren: enter");
	var childEl = nodeEl.firstChild;
	while (null != childEl)
	{
		nodeEl.removeChild(childEl);
		childEl = nodeEl.firstChild;
	}
}

/*
 * Handle the click to create a new config.
 * 
 * Retrieve the name from the input element.
 * Attempt to create the config with that name.
 * If unsuccessful, return.
 * Otherwise, clear the name from the new config text box.
 * Refresh the UI from local storage to add the name to the config select element.
 * Set new config as currently selected config.
 */
icosalogic.inv_design.createConfig = function() {
	console.log("icosalogic.inv_design.createConfig: enter");

  var oa = icosalogic.inv_design;

  var el = document.getElementById('new_cfg_name');
  var newConfigName = el.value;
  
  var cfgNew = oa.Config.prototype.create(newConfigName);
  if (cfgNew == null) {
    window.alert('Error: error creating the config=' + newConfigName);
    return;
  }
  el.value = '';
  
  el = document.getElementById('configs');
  var opt = document.createElement('option');
  opt.id = 'cfg_' + newConfigName;
  opt.name = opt.id;
  opt.value = newConfigName;
  opt.text  = newConfigName;
  // el.appendChild(opt);
  el.add(opt);
  
  oa.setConfigActive(cfgNew);

  oa.showHideBus();
};


/*
 * Handle the click to create a new config by copying from an existing config.
 * 
 * Retrieve the name from the input element.
 * Attempt to create the config with that name.
 * If unsuccessful, return.
 * Otherwise, clear the name from the new config text box.
 * Copy the config values from the old config to the new config.
 * Refresh the UI from local storage to add the name to the config select element.
 * Set new config as currently selected config.
 */
icosalogic.inv_design.copyConfig = function() {
	console.log("icosalogic.inv_design.copyConfig: enter");

  var oa = icosalogic.inv_design;
  var cfgOld = oa.config;

  var el = document.getElementById('new_cfg_name');
  var newConfigName = el.value;
  
  var cfgNew = oa.Config.prototype.create(newConfigName);
  if (cfgNew == null) {
    window.alert('Error: error creating the config=' + newConfigName);
    return;
  }
  cfgNew.copy(cfgOld);
  cfgNew.save();
  
  el.value = '';
  
  el = document.getElementById('configs');
  var opt = document.createElement('option');
  opt.id = 'cfg_' + newConfigName;
  opt.name = opt.id;
  opt.value = newConfigName;
  opt.text  = newConfigName;
  // el.appendChild(opt);
  el.add(opt);
  
  oa.setConfigActive(cfgNew);

  oa.showHideBus();
};


/*
 * Handle the click to delete a config.
 * 
 * Delete the current config.
 * Remove the option from the configs select element.
 * Pick the first config in the list, and make it the new active config.
 * 
 * Do not allow the user to delete a config if there is only 1.
 * They have to first create a new config, then delete the old one.
 */
icosalogic.inv_design.deleteConfig = function() {
	console.log("icosalogic.inv_design.deleteConfig: enter");

  var oa = icosalogic.inv_design;

  if (oa.configs.length <= 1) {
    window.alert('Error: You cannot delete the last config.  ' +
                 'Create a new one first, then delete this one.');
    return;
  }
  
  oa.config.delete();
  
  var el = document.getElementById('configs');
  if (el.selectedIndex != -1) {
    el.remove(el.selectedIndex);
  }
  
  var nextCfgName = oa.configs[0];
  console.log('deleteConfig: next config is ' + nextCfgName);
  var cfg = oa.Config.find(nextCfgName);
  
  oa.setConfigActive(cfg);
};


/*
 * Make active the given config.
 */
icosalogic.inv_design.setConfigActive = function(cfg) {
	console.log("icosalogic.inv_design.setConfigActive: enter: cfg=" + cfg.cfg_name);

  // unselect the currently selected option, and set the new one
  var el = document.getElementById('configs');
  if (el.selectedIndex != -1) {
    el[el.selectedIndex].selected = false;
  }
  var cfgId = 'cfg_' + cfg.cfg_name;
  opt = el.namedItem(cfgId);
  if (opt == null) {
    console.log('error: 2 opt not found in select: ' + cfg.cfg_name + ' id=' + cfgId);
    oa.validateConfigs();
    return;
  }
  if (opt != null) {
    opt.selected = true;
  }
  
  var oa = icosalogic.inv_design;
  
  cfg.setActive();
  oa.config = cfg;
  oa.derived.deriveFJT(cfg);
  oa.resetCapFilters();
  oa.displayConfig();
  oa.displayDerived();

  oa.validateConfigs();

};

/*
 * Display all the derived values via the DOM.
 * Source of derived data is oa.derived.
 */
icosalogic.inv_design.displayDerived = function()
{
	console.log("icosalogic.inv_design.displayDerived: enter");
  
  icosalogic.inv_design.dumpValues();
  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  var derived = oa.derived;
  
  document.getElementById('out_freq_omega').value        = derived.out_freq_omega.toFixed(2);
  document.getElementById('skin_depth_out').value        = derived.skin_depth_out.toFixed(4);
  document.getElementById('skin_depth_out_in').value     = derived.skin_depth_out_in.toFixed(4);
  document.getElementById('sw_freq_eff').value           = Number(derived.sw_freq_eff).toFixed(0);
  document.getElementById('sw_omega').value              = derived.sw_freq_omega.toFixed(0);
  document.getElementById('sw_cycle_us').value           = Number(derived.sw_cycle_ns / 1000).toFixed(3);
  document.getElementById('out_voltage_pp').value        = derived.out_voltage_pp.toFixed(2);
  document.getElementById('out_watts').value             = derived.out_watts.toFixed(0) / 1000;
  document.getElementById('skin_depth_sw').value         = derived.skin_depth_sw.toFixed(4);
  document.getElementById('skin_depth_sw_in').value      = derived.skin_depth_sw_in.toFixed(4);
  document.getElementById('wire_awg').value              = derived.wire_entry.awg;
  document.getElementById('wire_strands').value          = derived.wire_entry.strands;
  document.getElementById('wire_strand_dia').value       = derived.wire_entry.strand_dia_mm.toFixed(5);
  document.getElementById('wire_strand_dia_in').value    = derived.wire_strand_dia_in.toFixed(6);
  document.getElementById('wire_dia').value              = derived.wire_entry.dia_mm.toFixed(5);
  document.getElementById('wire_dia_in').value           = derived.wire_dia_in.toFixed(6);
  document.getElementById('wire_i_sw').value             = derived.wire_i_sw.toFixed(2);
  document.getElementById('wire_i_out').value            = derived.wire_i_out.toFixed(2);
  document.getElementById('wire_r_sw').value             = Number(derived.wire_r_sw * 1e3).toFixed(5);
  document.getElementById('wire_r_out').value            = Number(derived.wire_r_out * 1e3).toFixed(5);
  document.getElementById('bb_cu_recommend').value       = derived.bb_cu_recommend.toFixed(4);
  document.getElementById('bb_cu_recommend_in').value    = derived.bb_cu_recommend_in.toFixed(4);
  document.getElementById('bb_cu_thickness_in').value    = derived.bb_cu_thickness_in.toFixed(4);
  document.getElementById('bb_min_width_in').value       = derived.bb_min_width_in.toFixed(4);
  document.getElementById('bb_num_layers').value         = derived.bb_num_layers;
  document.getElementById('bb_i').value                  = derived.bb_i.toFixed(3);
  document.getElementById('bb_i_out').value              = derived.bb_i_out.toFixed(3);
  document.getElementById('bb_sub_thickness_in').value   = derived.bb_sub_thickness_in.toFixed(4);
  document.getElementById('bb_ild_thickness_in').value   = derived.bb_ild_thickness_in.toFixed(4);
  document.getElementById('bb_total_thickness').value    = derived.bb_total_thickness.toFixed(4);
  document.getElementById('bb_total_thickness_in').value = derived.bb_total_thickness_in.toFixed(4);
  document.getElementById('dcl_i_rms_max').value         = derived.dcl_i_rms_max.toFixed(2);
  document.getElementById('dcl_z_ripple').value          = derived.dcl_z_ripple.toFixed(6);
  document.getElementById('dcl_c_req').value             = derived.dcl_c_req.toFixed(2);
  document.getElementById('dcl_fom').value               = Number(derived.dcl_fom / 1e6).toFixed(3);
  document.getElementById('dcl_fom_cap').value           = Number(derived.dcl_fom_cap / 1e6).toFixed(3);
  document.getElementById('dcl_fom_total').value         = Number(derived.dcl_fom_total / 1e6).toFixed(3);
  document.getElementById('dcl_i_total').value           = derived.dcl_i_total.toFixed(2);
  document.getElementById('dcl_c_total').value           = derived.dcl_c_total.toFixed(2);
  
  document.getElementById('i_in_line_min').value         = derived.i_in_line_min.toFixed(2);
  document.getElementById('i_in_line_nom').value         = derived.i_in_line_nom.toFixed(2);
  document.getElementById('i_in_line_max').value         = derived.i_in_line_max.toFixed(2);
  document.getElementById('i_in_min').value              = derived.i_in_min.toFixed(2);
  document.getElementById('i_in_nom').value              = derived.i_in_nom.toFixed(2);
  document.getElementById('i_in_max').value              = derived.i_in_max.toFixed(2);
  document.getElementById('v_pack_min').value            = derived.v_pack_min.toFixed(2);
  document.getElementById('v_pack_nom').value            = derived.v_pack_nom.toFixed(2);
  document.getElementById('v_pack_max').value            = derived.v_pack_max.toFixed(2);
  
  document.getElementById('gd_i_on').value               = derived.gd_i_on.toFixed(2);
  document.getElementById('gd_i_off').value              = derived.gd_i_off.toFixed(2);
  document.getElementById('gd_dc_on').value              = Number(derived.gd_dc_on * 100).toFixed(1);
  document.getElementById('gd_dc_off').value             = Number(derived.gd_dc_off * 100).toFixed(1);
  document.getElementById('gd_i_avg').value              = derived.gd_i_avg.toFixed(2);
  document.getElementById('gd_p_avg').value              = derived.gd_p_avg.toFixed(2);
  document.getElementById('gd_c_bs').value               = derived.gd_c_bs.toFixed(2);
  document.getElementById('gd_r_bs').value               = derived.gd_r_bs.toFixed(2);
  document.getElementById('gd_t_bs').value               = Number(derived.gd_t_bs * 1e6).toFixed(3);
  document.getElementById('gd_e_bs').value               = Number(derived.gd_e_bs * 1e6).toFixed(3);
  document.getElementById('gd_c_vdd').value              = Number(derived.gd_c_vdd / 1000).toFixed(3);
  document.getElementById('oc_c_total').value            = Number(derived.oc_c_total * 1e6).toFixed(3);
  
  document.getElementById('fet_mfg').value               = derived.fet_entry.mfg;
  document.getElementById('fet_tech').value              = derived.fet_entry.tech;
  document.getElementById('fet_pkg').value               = derived.fet_entry.footprint;
  document.getElementById('fet_nhb').value               = derived.fet_entry.n_hb;
  document.getElementById('fet_max_v').value             = derived.fet_entry.v_max;
  document.getElementById('fet_max_i').value             = derived.fet_entry.i_max;
  document.getElementById('fet_max_i_hot').value         = derived.fet_entry.i_max_hot;
  document.getElementById('fet_r_ds_on').value           = derived.fet_entry.r_ds_on;
  document.getElementById('fet_r_ds_on_eff').value       = Number(derived.fet_r_ds_on_eff).toFixed(4);
  document.getElementById('qg').value                    = derived.fet_entry.qg;
  document.getElementById('t_d_on').value                = derived.fet_entry.t_d_on;
  document.getElementById('t_rise').value                = derived.fet_entry.t_rise;
  document.getElementById('t_d_off').value               = derived.fet_entry.t_d_off;
  document.getElementById('t_fall').value                = derived.fet_entry.t_fall;
  document.getElementById('r_th_jc').value               = derived.fet_entry.r_th_jc;
  document.getElementById('r_g_ext').value               = derived.fet_entry.r_g_ext;
  document.getElementById('r_g_int').value               = derived.fet_entry.r_g_int;
  document.getElementById('v_g_on').value                = derived.fet_entry.v_g_on;
  document.getElementById('v_g_off').value               = derived.fet_entry.v_g_off;
  document.getElementById('c_iss').value                 = derived.fet_entry.c_iss;
  document.getElementById('c_oss').value                 = derived.fet_entry.c_oss;
  document.getElementById('c_rss').value                 = derived.fet_entry.c_rss;
  document.getElementById('e_on').value                  = derived.fet_entry.e_on;
  document.getElementById('e_off').value                 = derived.fet_entry.e_off;
  document.getElementById('v_swe').value                 = derived.fet_entry.v_swe;

  document.getElementById('dcl_mfg').value               = derived.dcl_cap_entry.mfg;
  document.getElementById('dcl_tech').value              = derived.dcl_cap_entry.tech;
  document.getElementById('dcl_c').value                 = derived.dcl_cap_entry.c;
  document.getElementById('dcl_v_dc_max').value          = derived.dcl_cap_entry.v_dc;
  document.getElementById('dcl_i_rms').value             = derived.dcl_cap_entry.i_rms;
  document.getElementById('dcl_esl').value               = derived.dcl_cap_entry.esl;
  document.getElementById('dcl_esr').value               = Number(derived.dcl_cap_entry.esr * 1000).toFixed(3);
  document.getElementById('dcl_th_cc').value             = derived.dcl_cap_entry.th_cc;
  document.getElementById('dcl_th_ca').value             = derived.dcl_cap_entry.th_ca;
  
  document.getElementById('t_dead').value                = Number(derived.t_dead).toFixed(3);
  document.getElementById('fet_max_i_actual').value      = Number(derived.fet_i_max_actual).toFixed(3);
  
  document.getElementById('i_sat_hr').value              = derived.lcl.i_sat_hr.toFixed(2);
  document.getElementById('of_type').value               = derived.lcl.filter_type;
  document.getElementById('of_f_res_actual').value       = Number(derived.of_f_res_actual / 1000).toFixed(3);
  document.getElementById('of_f_res_actualb').value      = Number(derived.of_f_res_actualb / 1000).toFixed(3);
  
  if (derived.lcl.filter_type == 'LC') {
    document.getElementById('of_f_min5').value             = Number(derived.lcl.f_lc_min5 / 1000).toFixed(3);
    document.getElementById('of_f_max5').value             = Number(derived.lcl.f_lc_max5 / 1000).toFixed(3);
    document.getElementById('of_f_min6').value             = Number(derived.lcl.f_lc_min6 / 1000).toFixed(3);
    document.getElementById('of_f_max6').value             = Number(derived.lcl.f_lc_max6 / 1000).toFixed(3);
  } else {
    document.getElementById('of_r_damping').value          = derived.of_r_damping.toFixed(3);
    document.getElementById('of_r_dampingb').value         = derived.of_r_dampingb.toFixed(3);
  }
  
  oa.displaySuggestion();
  
  if (derived.ind1.cor_pn_entry != null) {
    document.getElementById('ind1_lii').value              = Number(derived.ind1.lii * 1e3).toFixed(2);
    document.getElementById('ind1_target_ap').value        = Number(derived.ind1.target_ap / 1e3).toFixed(2);
    document.getElementById('ind1_core_mfg').value         = derived.ind1.cor_pn_entry.mfg;
    document.getElementById('ind1_mat').value              = derived.ind1.cor_pn_entry.mat;

    if (cfg.ind1.ind_type != 'air') {
      var el = document.getElementById('ind1_mu');
      el.value = derived.ind1.cor_pn_entry.mu;
      el.readOnly = true;
      el.onblur = null;

    }
    document.getElementById('ind1_ap').value               = Number(derived.ind1.cor_size_entry.Ap / 2e4).toFixed(2);
    document.getElementById('ind1_od').value               = Number(derived.ind1.cor_size_entry.OD).toFixed(2);
    document.getElementById('ind1_id').value               = Number(derived.ind1.cor_size_entry.ID).toFixed(2);
    document.getElementById('ind1_ht').value               = Number(derived.ind1.cor_size_entry.HT).toFixed(2);
    document.getElementById('ind1_turns_max').value        = derived.ind1.turns_max.toFixed(0);
    document.getElementById('ind1_turns_l1').value         = derived.ind1.turns_l1.toFixed(0);
    document.getElementById('ind1_winding_factor').value   = derived.ind1.winding_factor.toFixed(2);
    document.getElementById('ind1_al').value               = derived.ind1.cor_pn_entry.Al.toFixed(2);
    document.getElementById('ind1_alb').value              = derived.ind1.al_biased.toFixed(2);
  }
  
  if (derived.ind1.ind_entry != null) {
    document.getElementById('ind1_mfg').value              = derived.ind1.ind_entry.mfg;
    document.getElementById('ind1_h').value                = derived.ind1.ind_entry.l_uh;
    // document.getElementById('ind1_tf').value               = derived.ind1.ind_entry.l_uh * 1000;
    document.getElementById('ind1_r_dc_typ').value         = derived.ind1.ind_entry.r_dc_typ_mohm;
    document.getElementById('ind1_r_dc_max').value         = derived.ind1.ind_entry.r_dc_max_mohm;
    document.getElementById('ind1_i_dt40').value           = derived.ind1.ind_entry.i_dt40;
    document.getElementById('ind1_i_dt100').value          = derived.ind1.ind_entry.i_dt100;
    document.getElementById('ind1_i_sat20').value          = derived.ind1.ind_entry.i_sat20;
    document.getElementById('ind1_i_sat30').value          = derived.ind1.ind_entry.i_sat30;
  }
  if (cfg.ind1.ind_type == 'air' || cfg.ind1.ind_type == 'custom') {
    document.getElementById('ind1_winding_len').value      = Number(derived.ind1.winding_len).toFixed(2);
    document.getElementById('ind1_winding_len_in').value   = Number(derived.ind1.winding_len / 25.4).toFixed(3);
    document.getElementById('ind1_od_wound').value         = Number(derived.ind1.od_wound).toFixed(2);
    document.getElementById('ind1_id_wound').value         = Number(derived.ind1.id_wound).toFixed(2);
    document.getElementById('ind1_ht_wound').value         = Number(derived.ind1.ht_wound).toFixed(2);
  }
  if (cfg.ind1.ind_type == 'air') {
    document.getElementById('ind1_vol').value              = Number(derived.ind1.volume / 1000).toFixed(3);
    document.getElementById('ind1_vol_in').value           = Number(derived.ind1.volume / (25.4*25.4*25.4)).toFixed(3);
  }
  document.getElementById('ind1_turns').value            = derived.ind1.turns.toFixed(2);
  document.getElementById('ind1_len').value              = derived.ind1.len.toFixed(2);
  document.getElementById('ind1_len_in').value           = Number(derived.ind1.len / 25.4).toFixed(3);
  document.getElementById('ind1_h_total').value          = Number(derived.ind1.h_total * 1000000).toFixed(3);  // display uH
  document.getElementById('ind1_h_eff').value            = Number(derived.ind1.h_eff * 1000000).toFixed(3);    // display uH
  document.getElementById('ind1_h_effb').value           = Number(derived.ind1.h_biased * 1000000).toFixed(3); // display uH
  document.getElementById('ind1_wound_area').value       = derived.ind1.wound_area.toFixed(2);
  document.getElementById('ind1_wound_area_in').value    = Number(derived.ind1.wound_area / (2.54*2.54)).toFixed(3);
  document.getElementById('di_dt_min').value             = Number(derived.di_dt_min / 1000000).toFixed(2);     // V/us
  document.getElementById('di_dt_nom').value             = Number(derived.di_dt_nom / 1000000).toFixed(2);
  document.getElementById('di_dt_max').value             = Number(derived.di_dt_max / 1000000).toFixed(2);
  
  if (derived.ind2.cor_pn_entry != null) {
    document.getElementById('ind2_lii').value              = Number(derived.ind2.lii * 1e3).toFixed(2);
    document.getElementById('ind2_target_ap').value        = Number(derived.ind2.target_ap / 1e3).toFixed(2);
    document.getElementById('ind2_core_mfg').value         = derived.ind2.cor_pn_entry.mfg;
    document.getElementById('ind2_mat').value              = derived.ind2.cor_pn_entry.mat;

    if (cfg.ind2.ind_type != 'air') {
      var el = document.getElementById('ind2_mu');
      el.value = derived.ind2.cor_pn_entry.mu;
      el.readOnly = true;
      el.onblur = null;
    }
    document.getElementById('ind2_ap').value               = Number(derived.ind2.cor_size_entry.Ap / 2e4).toFixed(2);
    document.getElementById('ind2_od').value               = Number(derived.ind2.cor_size_entry.OD).toFixed(2);
    document.getElementById('ind2_id').value               = Number(derived.ind2.cor_size_entry.ID).toFixed(2);
    document.getElementById('ind2_ht').value               = Number(derived.ind2.cor_size_entry.HT).toFixed(2);
    document.getElementById('ind2_turns_max').value        = derived.ind2.turns_max.toFixed(0);
    document.getElementById('ind2_turns_l1').value         = derived.ind2.turns_l1.toFixed(0);
    document.getElementById('ind2_winding_factor').value   = derived.ind2.winding_factor.toFixed(2);
    document.getElementById('ind2_al').value               = derived.ind2.cor_pn_entry.Al.toFixed(2);
    document.getElementById('ind2_alb').value              = derived.ind2.al_biased.toFixed(2);
  }
  
  if (derived.ind2.ind_entry != null) {
    document.getElementById('ind2_mfg').value              = derived.ind2.ind_entry.mfg;
    document.getElementById('ind2_h').value                = derived.ind2.ind_entry.l_uh;
    // document.getElementById('ind2_tf').value               = derived.ind2.ind_entry.l_uh * 1000;      // an alias for custom inductors
    document.getElementById('ind2_r_dc_typ').value         = derived.ind2.ind_entry.r_dc_typ_mohm;
    document.getElementById('ind2_r_dc_max').value         = derived.ind2.ind_entry.r_dc_max_mohm;
    document.getElementById('ind2_i_dt40').value           = derived.ind2.ind_entry.i_dt40;
    document.getElementById('ind2_i_dt100').value          = derived.ind2.ind_entry.i_dt100;
    document.getElementById('ind2_i_sat20').value          = derived.ind2.ind_entry.i_sat20;
    document.getElementById('ind2_i_sat30').value          = derived.ind2.ind_entry.i_sat30;
  }
  if (cfg.ind2.ind_type == 'air' || cfg.ind2.ind_type == 'custom') {
    document.getElementById('ind2_winding_len').value      = Number(derived.ind2.winding_len).toFixed(2);
    document.getElementById('ind2_winding_len_in').value   = Number(derived.ind2.winding_len / 25.4).toFixed(3);
    document.getElementById('ind2_od_wound').value         = Number(derived.ind2.od_wound).toFixed(2);
    document.getElementById('ind2_id_wound').value         = Number(derived.ind2.id_wound).toFixed(2);
    document.getElementById('ind2_ht_wound').value         = Number(derived.ind2.ht_wound).toFixed(2);
  }
  if (cfg.ind2.ind_type == 'air') {
    document.getElementById('ind2_vol').value              = Number(derived.ind2.volume / 1000).toFixed(3);
    document.getElementById('ind2_vol_in').value           = Number(derived.ind2.volume / (25.4*25.4*25.4)).toFixed(3);
  }
  document.getElementById('ind2_turns').value            = derived.ind2.turns.toFixed(2);
  document.getElementById('ind2_len').value              = derived.ind2.len.toFixed(2);
  document.getElementById('ind2_len_in').value           = Number(derived.ind2.len / 25.4).toFixed(3);
  document.getElementById('ind2_h_total').value          = Number(derived.ind2.h_total * 1000000).toFixed(3);  // display uH
  document.getElementById('ind2_h_eff').value            = Number(derived.ind2.h_eff * 1000000).toFixed(3);    // display uH
  document.getElementById('ind2_h_effb').value           = Number(derived.ind2.h_biased * 1000000).toFixed(3); // display uH
  document.getElementById('ind2_wound_area').value       = derived.ind2.wound_area.toFixed(2);
  document.getElementById('ind2_wound_area_in').value    = Number(derived.ind2.wound_area / (2.54*2.54)).toFixed(3);
  
  document.getElementById('oc_mfg').value                = derived.out_cap_entry.mfg;
  document.getElementById('oc_tech').value               = derived.out_cap_entry.tech;
  document.getElementById('oc_c').value                  = derived.out_cap_entry.c;
  document.getElementById('oc_v_dc').value               = derived.out_cap_entry.v_dc;
  document.getElementById('oc_i_rms').value              = derived.out_cap_entry.i_rms;
  document.getElementById('oc_esl').value                = derived.out_cap_entry.esl;
  document.getElementById('oc_esr').value                = Number(derived.out_cap_entry.esr * 1000).toFixed(3);
  document.getElementById('oc_th_cc').value              = derived.out_cap_entry.th_cc;
  document.getElementById('oc_th_ca').value              = derived.out_cap_entry.th_ca;

  document.getElementById('th_p_dcl').value              = derived.th_p_dcl.toFixed(3);
  document.getElementById('th_t_dcl_core').value         = derived.th_t_dcl_core.toFixed(2);
  document.getElementById('th_pgsw').value               = derived.th_pgsw.toFixed(3);
  document.getElementById('th_prgext').value             = derived.th_prgext.toFixed(3);
  document.getElementById('th_prgint').value             = derived.th_prgint.toFixed(3);
  document.getElementById('th_pfi').value                = derived.th_pfi.toFixed(3);
  document.getElementById('th_pfsw').value               = derived.th_pfsw.toFixed(3);
  document.getElementById('th_t_fet_junction12').value   = derived.th_t_fet_junction12.toFixed(2);
  document.getElementById('th_t_fet_junction34').value   = derived.th_t_fet_junction34.toFixed(2);
  document.getElementById('th_p_ind1').value             = derived.ind1.power.toFixed(3);
  document.getElementById('th_t_ind1_core').value        = Number(derived.ind1.t_core).toFixed(3);
  document.getElementById('th_p_ind2').value             = derived.ind2.power.toFixed(3);
  document.getElementById('th_t_ind2_core').value        = Number(derived.ind2.t_core).toFixed(3);
  document.getElementById('th_p_oc').value               = derived.th_p_oc.toFixed(3);
  document.getElementById('th_t_oc_core').value          = derived.th_t_oc_core.toFixed(3);
  document.getElementById('th_total_loss').value         = derived.th_total_loss.toFixed(2);
  document.getElementById('th_calc_eff').value           = derived.th_calc_eff.toFixed(3);

  document.getElementById('bat_v_min_status'        ).setAttributeNS(null, 'fill', derived.bat_v_min_status);
  document.getElementById('bat_status'              ).setAttributeNS(null, 'fill', derived.bat_status);
  document.getElementById('wire_i_sw_status'        ).setAttributeNS(null, 'fill', derived.wire_i_sw_status);
  document.getElementById('wire_i_out_status'       ).setAttributeNS(null, 'fill', derived.wire_i_out_status);
  document.getElementById('bb_i_status'             ).setAttributeNS(null, 'fill', derived.bb_i_status);
  document.getElementById('bb_i_out_status'         ).setAttributeNS(null, 'fill', derived.bb_i_out_status);
  document.getElementById('bb_status'               ).setAttributeNS(null, 'fill', derived.bb_status);
  document.getElementById('dcl_fom_status'          ).setAttributeNS(null, 'fill', derived.dcl_fom_status);
  document.getElementById('dcl_i_status'            ).setAttributeNS(null, 'fill', derived.dcl_i_status);
  document.getElementById('dcl_c_status'            ).setAttributeNS(null, 'fill', derived.dcl_c_status);
  document.getElementById('dcl_status'              ).setAttributeNS(null, 'fill', derived.dcl_status);
  document.getElementById('fet_i_actual_status'     ).setAttributeNS(null, 'fill', derived.fet_i_actual_status);
  document.getElementById('fet_status'              ).setAttributeNS(null, 'fill', derived.fet_status);
  document.getElementById('of_status'               ).setAttributeNS(null, 'fill', derived.of_status);
  document.getElementById('of_actual_status'        ).setAttributeNS(null, 'fill', derived.of_actual_status);
  document.getElementById('ind1_turns_status'       ).setAttributeNS(null, 'fill', derived.ind1.turns_status);
  document.getElementById('ind2_turns_status'       ).setAttributeNS(null, 'fill', derived.ind2.turns_status);
  document.getElementById('th_t_dcl_status'         ).setAttributeNS(null, 'fill', derived.th_t_dcl_status);
  document.getElementById('th_t_fet_junction_status').setAttributeNS(null, 'fill', derived.th_t_fet_junction_status);
  document.getElementById('th_t_ind1_status'        ).setAttributeNS(null, 'fill', derived.ind1.t_status);
  document.getElementById('th_t_oc_status'          ).setAttributeNS(null, 'fill', derived.th_t_oc_status);
  document.getElementById('th_t_ind2_status'        ).setAttributeNS(null, 'fill', derived.ind2.t_status);
  document.getElementById('thermal_status'          ).setAttributeNS(null, 'fill', derived.thermal_status);
  document.getElementById('cfg_status'              ).setAttributeNS(null, 'fill', derived.cfg_status);

  oa.showHideFilter();
}

/*
 * Display the suggestion with the current index.
 */
icosalogic.inv_design.displaySuggestion = function()
{
	console.log("icosalogic.inv_design.displaySuggestion: enter");
  
  icosalogic.inv_design.dumpValues();
  var oa = icosalogic.inv_design;
  var derived = oa.derived;

  document.getElementById('of_ndx_sugg').value           = derived.of_ndx_sugg;
  document.getElementById('of_ndx_stable').value         = derived.lcl.num_stable_derivations;
  document.getElementById('of_ndx_max').value            = derived.lcl.num_valid_derivations;
  
  var flt = icosalogic.lcl.zeroFilter;
  if (derived.lcl.num_valid_derivations > 0) {
    flt = icosalogic.lcl.filters[derived.of_ndx_sugg - 1];
  }
  
  console.log('ndx=' + derived.of_ndx_sugg + ' L1=' + flt.l_i + ' L2=' + flt.l_2 + ' c=' + flt.c_f + ' delta=' + flt.delta);
  
  document.getElementById('of_h1_sugg').value            = Number(flt.l_i * 1000000).toFixed(3);  // display uH
  document.getElementById('of_c_sugg').value             = Number(flt.c_f * 1000000).toFixed(3);  // display uF
  document.getElementById('of_h2_sugg').value            = Number(flt.l_2 * 1000000).toFixed(3);  // display uH
  document.getElementById('of_delta_sugg').value         = Number(flt.delta * 100).toFixed(4);
  document.getElementById('of_f_res_sugg').value         = Number(flt.f_res / 1000).toFixed(3);   // display kHz

  derived.of_sugg_status = 'red';
  if (derived.lcl.num_valid_derivations > 0) {
    derived.of_sugg_status = flt.stable ? 'green' : 'yellow';
  }
  document.getElementById('of_sugg_status').setAttributeNS(null, 'fill', derived.of_sugg_status);
}


/*
 * Display all config values via the DOM.
 * This is backwards from the normal data flow, and happens when the user selects a
 * new or different configuration.
 * Source of config data is oa.config.
 * 
 * Was updateUserInputs.
 */
icosalogic.inv_design.displayConfig = function()
{
	console.log("icosalogic.inv_design.displayConfig: enter");
  
  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  
  document.getElementById('cur_cfg_name').innerText      = cfg.cfg_name;
  document.getElementById('ctrl_type').value             = cfg.ctrl_type;
  document.getElementById('out_freq').value              = cfg.out_freq;
  document.getElementById('sw_freq').value               = cfg.sw_freq;
  document.getElementById('out_amps').value              = cfg.out_amps;
  document.getElementById('out_voltage').value           = cfg.out_voltage;
  document.getElementById('bus_type').value              = cfg.bus_type;
  document.getElementById('j_cond').value                = cfg.j_cond;
  document.getElementById('wire_pn').value               = cfg.wire_pn;
  document.getElementById('out_lines').value             = cfg.out_lines;
  var ur_before = document.getElementById('bb_cu_use_recommend').checked;
  document.getElementById('bb_cu_use_recommend').checked = cfg.bb_cu_use_recommend;
  var ur_after = document.getElementById('bb_cu_use_recommend').checked;
  // console.log('displayConfig: before=' + ur_before + ' bb_cu_use_recommend=' + cfg.bb_cu_use_recommend + ' after=' + ur_after);
  document.getElementById('bb_cu_thickness').value       = cfg.bb_cu_thickness;
  document.getElementById('bb_min_width').value          = cfg.bb_min_width;
  document.getElementById('bb_sub_thickness').value      = cfg.bb_sub_thickness;
  document.getElementById('bb_ild_thickness').value      = cfg.bb_ild_thickness;
  document.getElementById('dcl_cap_pn').value            = cfg.dcl_cap_pn;
  document.getElementById('dcl_dc_rms_factor').value     = cfg.dcl_dc_rms_factor;
  document.getElementById('dcl_v_ripple').value          = cfg.dcl_v_ripple;
  document.getElementById('dcl_count').value             = cfg.dcl_count;
  document.getElementById('fet_count').value             = cfg.fet_count;
  document.getElementById('fet_pn').value                = cfg.fet_pn;
  document.getElementById('r_th_ca').value               = cfg.fet_r_th_ca;
  
  document.getElementById('pct_sat_hr').value            = cfg.pct_sat_hr;
  document.getElementById('l_grid_max').value            = Number(cfg.l_grid_max * 1000).toFixed(3);
  
  document.getElementById('ind1_type').value             = cfg.ind1.ind_type;
  document.getElementById('ind2_type').value             = cfg.ind2.ind_type;
  document.getElementById('ind1_target').value           = Number(cfg.ind1.target * 1000000).toFixed(3);
  document.getElementById('ind2_target').value           = Number(cfg.ind2.target * 1000000).toFixed(3);
  document.getElementById('ind1_pn').value               = cfg.ind1.pn;
  document.getElementById('ind2_pn').value               = cfg.ind2.pn;
  document.getElementById('ind1_core_pn').value          = cfg.ind1.core_pn;
  document.getElementById('ind2_core_pn').value          = cfg.ind2.core_pn;
  document.getElementById('ind1_r_core').value           = cfg.ind1.r;
  document.getElementById('ind2_r_core').value           = cfg.ind2.r;
  document.getElementById('ind1_r_core_in').value        = Number(cfg.ind1.r / 25.4).toFixed(3);
  document.getElementById('ind2_r_core_in').value        = Number(cfg.ind2.r / 25.4).toFixed(3);
  document.getElementById('ind1_count').value            = cfg.ind1.count;
  document.getElementById('ind2_count').value            = cfg.ind2.count;
  document.getElementById('ind1_radius_sel').value       = cfg.ind1.radius_sel;
  document.getElementById('ind2_radius_sel').value       = cfg.ind2.radius_sel;
  console.log('displayConfig: ind1_type=' + cfg.ind1.ind_type + ' ind2_type=' + cfg.ind2.ind_type);
  if (cfg.ind1.ind_type == 'air') {
    var el = document.getElementById('ind1_mu');
    el.value = cfg.ind1.mu;
    el.readOnly = false;
    el.onblur = icosalogic.inv_design.updateHandler;
  }
  if (cfg.ind2.ind_type == 'air') {
    var el = document.getElementById('ind2_mu');
    el.value = cfg.ind2.mu;
    el.readOnly = false;
    el.onblur = icosalogic.inv_design.updateHandler;
  }
    
  document.getElementById('oc_target').value             = Number(cfg.oc_target * 1000000).toFixed(3);
  document.getElementById('oc_pn').value                 = cfg.oc_pn;
  document.getElementById('oc_count').value              = cfg.oc_count;

  document.getElementById('est_eff').value               = cfg.est_eff;
  document.getElementById('v_cell_min').value            = cfg.v_cell_min;
  document.getElementById('v_cell_nom').value            = cfg.v_cell_nom;
  document.getElementById('v_cell_max').value            = cfg.v_cell_max;
  document.getElementById('bat_series').value            = cfg.bat_series;
  document.getElementById('r_g_ext_on').value            = cfg.r_g_ext_on;
  document.getElementById('r_g_ext_off').value           = cfg.r_g_ext_off;
  document.getElementById('gd_sw_hard').value            = cfg.gd_sw_hard;
  document.getElementById('gd_r_on').value               = cfg.gd_r_on;
  document.getElementById('gd_r_off').value              = cfg.gd_r_off;
  document.getElementById('gd_bs_vf').value              = cfg.gd_bs_vf;
  document.getElementById('gd_bs_cf').value              = cfg.gd_bs_cf;
  document.getElementById('t_ambient').value             = cfg.t_ambient;
  
}

/*
 * Read all the input values from the DOM into the current config.
 */
icosalogic.inv_design.readAllInputs = function()
{
	console.log("icosalogic.inv_design.readAllInputs: enter");
  
  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  
  cfg.ctrl_type           = document.getElementById('ctrl_type').value;
  cfg.out_freq            = document.getElementById('out_freq').value;
  cfg.sw_freq             = document.getElementById('sw_freq').value;
  cfg.out_amps            = parseFloat(document.getElementById('out_amps').value);
  cfg.out_voltage         = parseFloat(document.getElementById('out_voltage').value);
  cfg.out_lines           = parseFloat(document.getElementById('out_lines').value);
  cfg.bus_type            = document.getElementById('bus_type').value;
  cfg.j_cond              = document.getElementById('j_cond').value;
  cfg.wire_pn             = document.getElementById('wire_pn').value;
  cfg.bb_cu_use_recommend = document.getElementById('bb_cu_use_recommend').checked;
  cfg.bb_cu_thickness     = parseFloat(document.getElementById('bb_cu_thickness').value);
  cfg.bb_min_width        = parseFloat(document.getElementById('bb_min_width').value);
  cfg.bb_sub_thickness    = parseFloat(document.getElementById('bb_sub_thickness').value);
  cfg.bb_ild_thickness    = parseFloat(document.getElementById('bb_ild_thickness').value);
  cfg.dcl_cap_pn          = document.getElementById('dcl_cap_pn').value;
  cfg.dcl_dc_rms_factor   = parseFloat(document.getElementById('dcl_dc_rms_factor').value);
  cfg.dcl_v_ripple        = parseFloat(document.getElementById('dcl_v_ripple').value);
  cfg.dcl_count           = parseFloat(document.getElementById('dcl_count').value);
  
  cfg.fet_count           = parseFloat(document.getElementById('fet_count').value);
  cfg.fet_pn              = document.getElementById('fet_pn').value;
  cfg.fet_r_th_ca         = parseFloat(document.getElementById('r_th_ca').value);
  
  cfg.pct_sat_hr          = parseFloat(document.getElementById('pct_sat_hr').value);
  cfg.l_grid_max          = parseFloat(document.getElementById('l_grid_max').value) / 1000;
  
  cfg.ind1.ind_type       = document.getElementById('ind1_type').value;
  cfg.ind2.ind_type       = document.getElementById('ind2_type').value;
  cfg.ind1.target         = parseFloat(document.getElementById('ind1_target').value) / 1000000;
  cfg.ind2.target         = parseFloat(document.getElementById('ind2_target').value) / 1000000;
  cfg.ind1.pn             = document.getElementById('ind1_pn').value;
  cfg.ind2.pn             = document.getElementById('ind2_pn').value;
  cfg.ind1.core_pn        = document.getElementById('ind1_core_pn').value;
  cfg.ind2.core_pn        = document.getElementById('ind2_core_pn').value;
  cfg.ind1.r              = parseFloat(document.getElementById('ind1_r_core').value);
  cfg.ind2.r              = parseFloat(document.getElementById('ind2_r_core').value);
  cfg.ind1.count          = parseFloat(document.getElementById('ind1_count').value);
  cfg.ind2.count          = parseFloat(document.getElementById('ind2_count').value);
  cfg.ind1.radius_sel     = document.getElementById('ind1_radius_sel').value;
  cfg.ind2.radius_sel     = document.getElementById('ind2_radius_sel').value;
  if (cfg.ind1.ind_type == 'air') {
    cfg.ind1.mu           = parseFloat(document.getElementById('ind1_mu').value);
  }
  if (cfg.ind2.ind_type == 'air') {
    cfg.ind2.mu           = parseFloat(document.getElementById('ind2_mu').value);
  }

  cfg.oc_target           = parseFloat(document.getElementById('oc_target').value) / 1000000;
  cfg.oc_pn               = document.getElementById('oc_pn').value;
  cfg.oc_count            = parseFloat(document.getElementById('oc_count').value);

  cfg.est_eff             = parseFloat(document.getElementById('est_eff').value);
  cfg.v_cell_min          = parseFloat(document.getElementById('v_cell_min').value);
  cfg.v_cell_nom          = parseFloat(document.getElementById('v_cell_nom').value);
  cfg.v_cell_max          = parseFloat(document.getElementById('v_cell_max').value);
  cfg.bat_series          = parseFloat(document.getElementById('bat_series').value);
  cfg.r_g_ext_on          = parseFloat(document.getElementById('r_g_ext_on').value);
  cfg.r_g_ext_off         = parseFloat(document.getElementById('r_g_ext_off').value);
  cfg.gd_sw_hard          = parseFloat(document.getElementById('gd_sw_hard').value);
  cfg.gd_r_on             = parseFloat(document.getElementById('gd_r_on').value);
  cfg.gd_r_off            = parseFloat(document.getElementById('gd_r_off').value);
  cfg.gd_bs_vf            = parseFloat(document.getElementById('gd_bs_vf').value);
  cfg.gd_bs_cf            = parseFloat(document.getElementById('gd_bs_cf').value);
  cfg.t_ambient           = parseFloat(document.getElementById('t_ambient').value);
  
  cfg.dump();
}


/*
 * Update the page when an input changes.
 * Update the config with the changed value(s) and persist it.
 * Update the derived values.
 * Display the derived values.
 */
icosalogic.inv_design.updateHandler = function(e) {
  var tid = 'null';
  var tvalue = 0;
  if (e != null) {
    tid = e.target.id;
    tvalue = e.target.value;
  }
  
	console.log("icosalogic.inv_design.updateHandler: enter: updating id: " + tid + '=' + tvalue + '   * * * * * * * * * * * * * * * *');
  
  var oa = icosalogic.inv_design;
  if (tid == 'configs') {
    oa.changeConfig(tvalue);
    return;
  }
  
  var cfg = oa.config;
  
  oa.readAllInputs();
  oa.config.save();
  
  oa.derived.deriveFJT(oa.config);
  oa.displayConfig();
  oa.displayDerived();
  
  oa.validateConfigs();

  if (tid == 'bus_type') {  // move this to the bottom of displayDerived()?
    oa.showHideBus();
  }

  console.log("icosalogic.inv_design.updateHandler: done");
};


/*
 * Update the page when an input changes.
 * Update the config with the changed value(s) and persist it.
 * Update the derived values.
 * Display the derived values.
 */
icosalogic.inv_design.changeConfig = function(cfgName) {
	console.log("icosalogic.inv_design.changeConfig: enter: config=" + cfgName);

  var oa = icosalogic.inv_design;
  
  var cfg = oa.Config.find(cfgName);
  if (cfg == null) {
    console.log('changeConfig: could not find config with name=' + cfgName);
    return;
  }
  
  cfg.setActive();
  oa.config = cfg;
  oa.derived.deriveFJT(cfg);
  oa.displayConfig();
  oa.displayDerived();

  oa.validateConfigs();
  
  oa.showHideBus();                  // Move to bottom of displayConfig()??

  console.log('changeConfig: done');  
};


/*
 * Write all the values to the console log.
 */
icosalogic.inv_design.dumpValues = function(msg)
{
  return;
	console.log("icosalogic.inv_design.dumpValues: enter");
  
  var oa = icosalogic.inv_design;
  console.log('  Inputs:');

  console.log('  Outputs:');
}

/*
 * Dump all local storage.
 */
icosalogic.inv_design.dumpStorage = function() {
  console.log("icosalogic.inv_design.dumpStorage: enter");

  var n = localStorage.length;
  console.log('Dumping localStorage, length=' + n);
  var i;
  for (i = 0; i < n; i++) {
    var key = localStorage.key(i);
    if (key.startsWith('i20')) {
      var value = localStorage.getItem(key);
      console.log('  ' + key + '=' + value);
    }
  }
};

/*
 * Print all the config and derived values as name/value pairs with no formatting.
 */
icosalogic.inv_design.print = function() {
  console.log("icosalogic.inv_design.print: enter");

  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  
  var outStr = '<pre>\n';
  outStr += 'cfg_name=' + cfg.cfg_name + '\n';
  
  var curDate = new Date();
  outStr += 'datetime=' + curDate.toISOString() + '\n';
  outStr += '\n';
  outStr += oa.printConfig();
  // outStr += oa.printDerived();
  outStr += '</pre>\n';
  
  return outStr;
}

/*
 * Print the derived values as name/value pairs into the given string variable.
 */
icosalogic.inv_design.printDerived = function() {
  console.log("icosalogic.inv_design.printDerived: enter");

  icosalogic.inv_design.dumpValues();
  var oa = icosalogic.inv_design;
  var derived = oa.derived;
  
  var outStr = '\n';
  
  outStr += 'out_freq_omega'        + '=' + derived.out_freq_omega.toFixed(2) + '\n';
  outStr += 'sw_omega'              + '=' + derived.sw_freq_omega.toFixed(0) + '\n';
  outStr += 'out_voltage_pp'        + '=' + derived.out_voltage_pp.toFixed(2) + '\n';
  outStr += 'out_watts'             + '=' + derived.out_watts.toFixed(0) / 1000 + '\n';
  outStr += 'skin_depth_out'        + '=' + derived.skin_depth_out.toFixed(4) + '\n';
  outStr += 'skin_depth_out_in'     + '=' + derived.skin_depth_out_in.toFixed(4) + '\n';
  outStr += 'skin_depth_sw'         + '=' + derived.skin_depth_sw.toFixed(4) + '\n';
  outStr += 'skin_depth_sw_in'      + '=' + derived.skin_depth_sw_in.toFixed(4) + '\n';
  outStr += 'wire_awg'              + '=' + derived.wire_entry.awg + '\n';
  outStr += 'wire_strands'          + '=' + derived.wire_entry.strands + '\n';
  outStr += 'wire_strand_dia'       + '=' + derived.wire_entry.strand_dia_mm.toFixed(5) + '\n';
  outStr += 'wire_strand_dia_in'    + '=' + derived.wire_strand_dia_in.toFixed(6) + '\n';
  outStr += 'wire_dia'              + '=' + derived.wire_entry.dia_mm.toFixed(5) + '\n';
  outStr += 'wire_dia_in'           + '=' + derived.wire_dia_in.toFixed(6) + '\n';
  outStr += 'wire_i_sw'             + '=' + derived.wire_i_sw.toFixed(2) + '\n';
  outStr += 'wire_i_out'            + '=' + derived.wire_i_out.toFixed(2) + '\n';
  outStr += 'wire_r_sw'             + '=' + Number(derived.wire_r_sw * 1e3).toFixed(5) + '\n';
  outStr += 'wire_r_out'            + '=' + Number(derived.wire_r_out * 1e3).toFixed(5) + '\n';
  outStr += 'bb_cu_recommend'       + '=' + derived.bb_cu_recommend.toFixed(4) + '\n';
  outStr += 'bb_cu_recommend_in'    + '=' + derived.bb_cu_recommend_in.toFixed(4) + '\n';
  outStr += 'bb_cu_thickness_in'    + '=' + derived.bb_cu_thickness_in.toFixed(4) + '\n';
  outStr += 'bb_min_width_in'       + '=' + derived.bb_min_width_in.toFixed(4) + '\n';
  outStr += 'bb_num_layers'         + '=' + derived.bb_num_layers + '\n';
  outStr += 'bb_i'                  + '=' + derived.bb_i.toFixed(3) + '\n';
  outStr += 'bb_i_out'              + '=' + derived.bb_i_out.toFixed(3) + '\n';
  outStr += 'bb_sub_thickness_in'   + '=' + derived.bb_sub_thickness_in.toFixed(4) + '\n';
  outStr += 'bb_ild_thickness_in'   + '=' + derived.bb_ild_thickness_in.toFixed(4) + '\n';
  outStr += 'bb_total_thickness'    + '=' + derived.bb_total_thickness.toFixed(4) + '\n';
  outStr += 'bb_total_thickness_in' + '=' + derived.bb_total_thickness_in.toFixed(4) + '\n';
  outStr += 'dcl_i_rms_max'         + '=' + derived.dcl_i_rms_max.toFixed(2) + '\n';
  outStr += 'dcl_z_ripple'          + '=' + derived.dcl_z_ripple.toFixed(6) + '\n';
  outStr += 'dcl_c_req'             + '=' + derived.dcl_c_req.toFixed(2) + '\n';
  outStr += 'dcl_fom'               + '=' + derived.dcl_fom.toFixed(0) + '\n';
  outStr += 'dcl_fom_cap'           + '=' + derived.dcl_fom_cap.toFixed(0) + '\n';
  outStr += 'dcl_fom_total'         + '=' + derived.dcl_fom_total.toFixed(0) + '\n';
  outStr += 'dcl_i_total'           + '=' + derived.dcl_i_total.toFixed(2) + '\n';
  outStr += 'dcl_c_total'           + '=' + derived.dcl_c_total.toFixed(2) + '\n';
  
  outStr += 'i_in_line_min'         + '=' + derived.i_in_line_min.toFixed(2) + '\n';
  outStr += 'i_in_line_nom'         + '=' + derived.i_in_line_nom.toFixed(2) + '\n';
  outStr += 'i_in_line_max'         + '=' + derived.i_in_line_max.toFixed(2) + '\n';
  outStr += 'i_in_min'              + '=' + derived.i_in_min.toFixed(2) + '\n';
  outStr += 'i_in_nom'              + '=' + derived.i_in_nom.toFixed(2) + '\n';
  outStr += 'i_in_max'              + '=' + derived.i_in_max.toFixed(2) + '\n';
  outStr += 'v_pack_min'            + '=' + derived.v_pack_min.toFixed(2) + '\n';
  outStr += 'v_pack_nom'            + '=' + derived.v_pack_nom.toFixed(2) + '\n';
  outStr += 'v_pack_max'            + '=' + derived.v_pack_max.toFixed(2) + '\n';
  outStr += 'gd_i_on'               + '=' + derived.gd_i_on.toFixed(2) + '\n';
  outStr += 'gd_i_off'              + '=' + derived.gd_i_off.toFixed(2) + '\n';
  outStr += 'oc_c_total'            + '=' + Number(derived.oc_c_total * 1e6).toFixed(3) + '\n';
  
  outStr += 'fet_mfg'               + '=' + derived.fet_entry.mfg + '\n';
  outStr += 'fet_tech'              + '=' + derived.fet_entry.tech + '\n';
  outStr += 'fet_pkg'               + '=' + derived.fet_entry.footprint + '\n';
  outStr += 'fet_nhb'               + '=' + derived.fet_entry.n_hb + '\n';
  outStr += 'fet_max_v'             + '=' + derived.fet_entry.v_max + '\n';
  outStr += 'fet_max_i'             + '=' + derived.fet_entry.i_max + '\n';
  outStr += 'fet_max_i_hot'         + '=' + derived.fet_entry.i_max_hot + '\n';
  outStr += 'fet_r_ds_on'           + '=' + derived.fet_entry.r_ds_on + '\n';
  outStr += 'fet_r_ds_on_eff'       + '=' + derived.fet_r_ds_on_eff + '\n';
  outStr += 'qg'                    + '=' + derived.fet_entry.qg + '\n';
  outStr += 't_d_on'                + '=' + derived.fet_entry.t_d_on + '\n';
  outStr += 't_rise'                + '=' + derived.fet_entry.t_rise + '\n';
  outStr += 't_d_off'               + '=' + derived.fet_entry.t_d_off + '\n';
  outStr += 't_fall'                + '=' + derived.fet_entry.t_fall + '\n';
  outStr += 'r_th_jc'               + '=' + derived.fet_entry.r_th_jc + '\n';
  outStr += 'r_g_ext'               + '=' + derived.fet_entry.r_g_ext + '\n';
  outStr += 'r_g_int'               + '=' + derived.fet_entry.r_g_int + '\n';
  outStr += 'v_g_on'                + '=' + derived.fet_entry.v_g_on + '\n';
  outStr += 'v_g_off'               + '=' + derived.fet_entry.v_g_off + '\n';
  outStr += 'c_iss'                 + '=' + derived.fet_entry.c_iss + '\n';
  outStr += 'c_oss'                 + '=' + derived.fet_entry.c_oss + '\n';
  outStr += 'c_rss'                 + '=' + derived.fet_entry.c_rss + '\n';
  outStr += 'e_on'                  + '=' + derived.fet_entry.e_on + '\n';
  outStr += 'e_off'                 + '=' + derived.fet_entry.e_off + '\n';
  outStr += 'v_swe'                 + '=' + derived.fet_entry.v_swe + '\n';

  outStr += 'dcl_mfg'               + '=' + derived.dcl_cap_entry.mfg + '\n';
  outStr += 'dcl_tech'              + '=' + derived.dcl_cap_entry.tech + '\n';
  outStr += 'dcl_c'                 + '=' + derived.dcl_cap_entry.c + '\n';
  outStr += 'dcl_v_dc_max'          + '=' + derived.dcl_cap_entry.v_dc + '\n';
  outStr += 'dcl_i_rms'             + '=' + derived.dcl_cap_entry.i_rms + '\n';
  outStr += 'dcl_esl'               + '=' + derived.dcl_cap_entry.esl + '\n';
  outStr += 'dcl_esr'               + '=' + Number(derived.dcl_cap_entry.esr * 1000).toFixed(3) + '\n';
  outStr += 'dcl_th_cc'             + '=' + derived.dcl_cap_entry.th_cc + '\n';
  outStr += 'dcl_th_ca'             + '=' + derived.dcl_cap_entry.th_ca + '\n';
  
  outStr += 't_dead'                + '=' + derived.t_dead + '\n';
  outStr += 'i_sat_hr'              + '=' + derived.lcl.i_sat_hr.toFixed(2) + '\n';
  outStr += 'of_f_res_actual'       + '=' + Number(derived.of_f_res_actual  / 1000).toFixed(3) + '\n';
  outStr += 'of_f_res_actualb'      + '=' + Number(derived.of_f_res_actualb / 1000).toFixed(3) + '\n';
  outStr += 'of_r_damping'          + '=' + derived.of_r_damping.toFixed(3) + '\n';
  outStr += 'of_r_dampingb'         + '=' + derived.of_r_dampingb.toFixed(3) + '\n';
  
  // oa.displaySuggestion();
  
  if (derived.ind1.cor_pn_entry != null) {
    outStr += 'ind1_lii'              + '=' + Number(derived.ind1.lii).toFixed(3) + '\n';
    outStr += 'ind1_target_ap'        + '=' + Number(derived.ind1.target_ap).toFixed(5) + '\n';
    outStr += 'ind1_mfg'              + '=' + derived.ind1.cor_pn_entry.mfg + '\n';
    outStr += 'ind1_mat'              + '=' + derived.ind1.cor_pn_entry.mat + '\n';
    outStr += 'ind1_od'               + '=' + Number(derived.ind1.cor_size_entry.OD).toFixed(2) + '\n';
    outStr += 'ind1_id'               + '=' + Number(derived.ind1.cor_size_entry.ID).toFixed(2) + '\n';
    outStr += 'ind1_ht'               + '=' + Number(derived.ind1.cor_size_entry.HT).toFixed(2) + '\n';
    outStr += 'ind1_al'               + '=' + derived.ind1.cor_pn_etry.Al.toFixed(2) + '\n';
    outStr += 'ind1_turns_max'        + '=' + derived.ind1.turns_max.toFixed(0) + '\n';
    outStr += 'ind1_turns_l1'         + '=' + derived.ind1.turns_l1.toFixed(0) + '\n';
    outStr += 'ind1_turns'            + '=' + derived.ind1.turns.toFixed(0) + '\n';
    outStr += 'ind1_winding_factor'   + '=' + derived.ind1.winding_factor.toFixed(2) + '\n';
    outStr += 'ind1_od_wound'         + '=' + derived.ind1.od_wound.toFixed(2) + '\n';
    outStr += 'ind1_id_wound'         + '=' + derived.ind1.id_wound.toFixed(2) + '\n';
    outStr += 'ind1_ht_wound'         + '=' + derived.ind1.ht_wound.toFixed(2) + '\n';
    outStr += 'ind1_wound_area'       + '=' + derived.ind1.wound_area.toFixed(2) + '\n';
    outStr += 'ind1_len'              + '=' + derived.ind1.len.toFixed(2) + '\n';
    outStr += 'ind1_alb'              + '=' + derived.ind1.al_biased.toFixed(2) + '\n';
  }
  outStr += 'ind1_h_eff'            + '=' + Number(derived.ind1.h_eff * 1000000).toFixed(3) + '\n';    // display uH
  outStr += 'ind1_h_effb'           + '=' + Number(derived.ind1.h_biased * 1000000).toFixed(3) + '\n'; // display uH
  outStr += 'ind1_h_total'          + '=' + Number(derived.ind1.h_total * 1000000).toFixed(3) + '\n';  // display uH
  outStr += 'di_dt_min'             + '=' + Number(derived.di_dt_min / 1000000).toFixed(2) + '\n';
  outStr += 'di_dt_nom'             + '=' + Number(derived.di_dt_nom / 1000000).toFixed(2) + '\n';
  outStr += 'di_dt_max'             + '=' + Number(derived.di_dt_max / 1000000).toFixed(2) + '\n';
  
  if (derived.ind2.cor_pn_entry != null) {
    outStr += 'ind2_lii'              + '=' + Number(derived.ind2.lii).toFixed(3) + '\n';
    outStr += 'ind2_target_ap'        + '=' + Number(derived.ind2.target_ap).toFixed(5) + '\n';
    outStr += 'ind2_mfg'              + '=' + derived.ind2.cor_pn_entry.mfg + '\n';
    outStr += 'ind2_mat'              + '=' + derived.ind2.cor_pn_entry.mat + '\n';
    outStr += 'ind2_od'               + '=' + Number(derived.ind2.cor_size_entry.OD).toFixed(2) + '\n';
    outStr += 'ind2_id'               + '=' + Number(derived.ind2.cor_size_entry.ID).toFixed(2) + '\n';
    outStr += 'ind2_ht'               + '=' + Number(derived.ind2.cor_size_entry.HT).toFixed(2) + '\n';
    outStr += 'ind2_turns_max'        + '=' + derived.ind2.turns_max.toFixed(0) + '\n';
    outStr += 'ind2_turns_l1'         + '=' + derived.ind2.turns_l1.toFixed(0) + '\n';
    outStr += 'ind2_turns'            + '=' + derived.ind2.turns.toFixed(0) + '\n';
    outStr += 'ind2_winding_factor'   + '=' + derived.ind2.winding_factor.toFixed(2) + '\n';
    outStr += 'ind2_od_wound'         + '=' + derived.ind2.od_wound.toFixed(2) + '\n';
    outStr += 'ind2_id_wound'         + '=' + derived.ind2.id_wound.toFixed(2) + '\n';
    outStr += 'ind2_ht_wound'         + '=' + derived.ind2.ht_wound.toFixed(2) + '\n';
    outStr += 'ind2_wound_area'       + '=' + derived.ind2.wound_area.toFixed(2) + '\n';
    outStr += 'ind2_len'              + '=' + derived.ind2.len.toFixed(2) + '\n';
    outStr += 'ind2_al'               + '=' + derived.ind2.cor_pn_entry.Al.toFixed(2) + '\n';
    outStr += 'ind2_alb'              + '=' + derived.ind2.al_biased.toFixed(2) + '\n';
  }
  outStr += 'ind2_h_eff'            + '=' + Number(derived.ind2.h_eff * 1000000).toFixed(3) + '\n';    // display uH
  outStr += 'ind2_h_effb'           + '=' + Number(derived.ind2.h_biased * 1000000).toFixed(3) + '\n'; // display uH
  outStr += 'ind2_h_total'          + '=' + Number(derived.ind2.h_total * 1000000).toFixed(3) + '\n';  // display uH
   
  outStr += 'oc_mfg'                + '=' + derived.out_cap_entry.mfg + '\n';
  outStr += 'oc_tech'               + '=' + derived.out_cap_entry.tech + '\n';
  outStr += 'oc_c'                  + '=' + derived.out_cap_entry.c + '\n';
  outStr += 'oc_v_dc'               + '=' + derived.out_cap_entry.v_dc + '\n';
  outStr += 'oc_i_rms'              + '=' + derived.out_cap_entry.i_rms + '\n';
  outStr += 'oc_esl'                + '=' + derived.out_cap_entry.esl + '\n';
  outStr += 'oc_esr'                + '=' + Number(derived.out_cap_entry.esr * 1000).toFixed(3) + '\n';
  outStr += 'oc_th_cc'              + '=' + derived.out_cap_entry.th_cc + '\n';
  outStr += 'oc_th_ca'              + '=' + derived.out_cap_entry.th_ca + '\n';

  outStr += 'th_p_dcl'              + '=' + derived.th_p_dcl.toFixed(3) + '\n';
  outStr += 'th_t_dcl_core'         + '=' + derived.th_t_dcl_core.toFixed(2) + '\n';
  outStr += 'th_pgsw'               + '=' + derived.th_pgsw.toFixed(3) + '\n';
  outStr += 'th_prgext'             + '=' + derived.th_prgext.toFixed(3) + '\n';
  outStr += 'th_prgint'             + '=' + derived.th_prgint.toFixed(3) + '\n';
  outStr += 'th_pfi'                + '=' + derived.th_pfi.toFixed(3) + '\n';
  outStr += 'th_t_fet_junction12'   + '=' + derived.th_t_fet_junction12.toFixed(2) + '\n';
  outStr += 'th_t_fet_junction34'   + '=' + derived.th_t_fet_junction34.toFixed(2) + '\n';
  outStr += 'th_p_ind1'             + '=' + derived.ind1.power.toFixed(3) + '\n';
  outStr += 'th_t_ind1_core'        + '=' + Number(derived.ind1.t_core).toFixed(3) + '\n';
  outStr += 'th_p_ind2'             + '=' + derived.ind2.power.toFixed(3) + '\n';
  outStr += 'th_t_ind2_core'        + '=' + Number(derived.ind2.t_core).toFixed(3) + '\n';
  outStr += 'th_p_oc'               + '=' + derived.th_p_oc.toFixed(3) + '\n';
  outStr += 'th_t_oc_core'          + '=' + derived.th_t_oc_core.toFixed(3) + '\n';

  return outStr;
}

/*
 * Print the config as name/value pairs into the given string variable.
 */
icosalogic.inv_design.printConfig = function() {
  console.log("icosalogic.inv_design.printConfig: enter");

  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  
  var outStr = '';
  
  outStr += 'ctrl_type'           + '=' + cfg.ctrl_type + '\n';
  outStr += 'out_freq'            + '=' + cfg.out_freq + '\n';
  outStr += 'sw_freq'             + '=' + cfg.sw_freq + '\n';
  outStr += 'out_amps'            + '=' + cfg.out_amps + '\n';
  outStr += 'out_voltage'         + '=' + cfg.out_voltage + '\n';
  outStr += 'out_lines'           + '=' + cfg.out_lines + '\n';
  outStr += 'bus_type'            + '=' + cfg.bus_type + '\n';
  outStr += 'j_cond'              + '=' + cfg.j_cond + '\n';
  outStr += 'wire_pn'             + '=' + cfg.wire_pn + '\n';
  outStr += 'bb_cu_use_recommend' + '=' + cfg.bb_cu_use_recommend + '\n';
  outStr += 'bb_cu_thickness'     + '=' + cfg.bb_cu_thickness + '\n';
  outStr += 'bb_min_width'        + '=' + cfg.bb_min_width + '\n';
  outStr += 'bb_sub_thickness'    + '=' + cfg.bb_sub_thickness + '\n';
  outStr += 'bb_ild_thickness'    + '=' + cfg.bb_ild_thickness + '\n';
  outStr += 'dcl_cap_pn'          + '=' + cfg.dcl_cap_pn + '\n';
  outStr += 'dcl_dc_rms_factor'   + '=' + cfg.dcl_dc_rms_factor + '\n';
  outStr += 'dcl_v_ripple'        + '=' + cfg.dcl_v_ripple + '\n';
  outStr += 'dcl_count'           + '=' + cfg.dcl_count + '\n';
  outStr += 'fet_count'           + '=' + cfg.fet_count + '\n';
  outStr += 'fet_pn'              + '=' + cfg.fet_pn + '\n';
  outStr += 'fet_r_th_ca'         + '=' + cfg.fet_r_th_ca + '\n';
  
  outStr += 'pct_sat_hr'          + '=' + cfg.pct_sat_hr + '\n';
  outStr += 'l_grid_max'          + '=' + Number(cfg.l_grid_max * 1000).toFixed(3) + '\n';
  
  outStr += 'ind1_pn'             + '=' + cfg.ind1.pn + '\n';
  outStr += 'ind1_ind_type'       + '=' + cfg.ind1.ind_type + '\n';
  outStr += 'ind1_target'         + '=' + Number(cfg.ind1.target * 1000000).toFixed(3) + '\n';
  outStr += 'ind1_core_pn'        + '=' + cfg.ind1.core_pn + '\n';
  outStr += 'ind1_n'              + '=' + cfg.ind1.n + '\n';
  outStr += 'ind1_r'              + '=' + cfg.ind1.r + '\n';
  outStr += 'ind1_count'          + '=' + cfg.ind1.count + '\n';
  outStr += 'ind1_radius_sel'     + '=' + cfg.ind1.radius_sel + '\n';
  outStr += 'ind1_mu'             + '=' + cfg.ind1.mu + '\n';
  outStr += 'ind2_pn'             + '=' + cfg.ind2.pn + '\n';
  outStr += 'ind2_ind_type'       + '=' + cfg.ind2.ind_type + '\n';
  outStr += 'ind2_target'         + '=' + Number(cfg.ind2.target * 1000000).toFixed(3) + '\n';
  outStr += 'ind2_core_pn'        + '=' + cfg.ind2.core_pn + '\n';
  outStr += 'ind2_n'              + '=' + cfg.ind2.n + '\n';
  outStr += 'ind2_r'              + '=' + cfg.ind2.r + '\n';
  outStr += 'ind2_count'          + '=' + cfg.ind2.count + '\n';
  outStr += 'ind2_radius_sel'     + '=' + cfg.ind2.radius_sel + '\n';
  outStr += 'ind2_mu'             + '=' + cfg.ind2.mu + '\n';
  
  outStr += 'oc_target'           + '=' + Number(cfg.oc_target * 1000000).toFixed(3) + '\n';
  outStr += 'oc_pn'               + '=' + cfg.oc_pn + '\n';
  outStr += 'oc_count'            + '=' + cfg.oc_count + '\n';

  outStr += 'est_eff'             + '=' + cfg.est_eff + '\n';
  outStr += 'v_cell_min'          + '=' + cfg.v_cell_min + '\n';
  outStr += 'v_cell_nom'          + '=' + cfg.v_cell_nom + '\n';
  outStr += 'v_cell_max'          + '=' + cfg.v_cell_max + '\n';
  outStr += 'bat_series'          + '=' + cfg.bat_series + '\n';
  outStr += 'r_g_ext_on'          + '=' + cfg.r_g_ext_on + '\n';
  outStr += 'r_g_ext_off'         + '=' + cfg.r_g_ext_off + '\n';
  outStr += 'gd_sw_hard'          + '=' + cfg.gd_sw_hard + '\n';
  outStr += 'gd_r_on'             + '=' + cfg.gd_r_on + '\n';
  outStr += 'gd_r_off'            + '=' + cfg.gd_r_off + '\n';
  outStr += 'gd_bs_vf'            + '=' + cfg.gd_bs_vf + '\n';
  outStr += 'gd_bs_cf'            + '=' + cfg.gd_bs_cf + '\n';
  outStr += 't_ambient'           + '=' + cfg.t_ambient + '\n';
  
  return outStr;
}

/*
 * Update the graph options based on the selected graph type.
 */
icosalogic.inv_design.graphTypeHandler = function() {
  console.log("icosalogic.inv_design.graphTypeHandler: enter");

  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  
  var el_gt    = document.getElementById('graph_type');
  var el_gtbl  = document.getElementById('graph_opts_table');
  var el_gbtn  = document.getElementById('gen_graph');
  var el_graph = document.getElementById('idt_graph');

  oa.removeAllChildren(el_gtbl);
  oa.removeAllChildren(el_graph);
  oa.num_graph_opts = 0;
  el_gbtn.style.display = 'none';      // turn it on with 'inline-block'

  var gt = el_gt.value;
  console.log('  graph_type=' + gt);
  
  if (gt == 'eff_fet') {
    // compare FET efficiency
    oa.addFetGraphOpts(el_gtbl);
  } else if (gt == 'eff_cfg' || gt == 'pl_cfg' || gt == 'apl_cfg' || gt == 't_cfg') {
    // compare config efficiency
    oa.addConfigGraphOpts(el_gtbl);
  } else if (gt == 'none') {
    // do nothing
  }
}

/*
 * Add the FET efficiency graph options.
 */
icosalogic.inv_design.addFetGraphOpts = function(el_gtbl) {
  console.log("icosalogic.inv_design.addFetGraphOpts: enter");

  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  
  icosalogic.inv_design.fet_table.forEach(function(fet_entry) {
    console.log('addFetGraphOpts: pn=' + fet_entry.pn);
    
    var ckbx_id = 'gfopt_' + fet_entry.pn;
    
    var el_td_label = document.createElement('label');
    el_td_label.for = ckbx_id;
    el_td_label.appendChild(document.createTextNode(fet_entry.pn));
    
    var el_td_name = document.createElement('td');
    el_td_name.appendChild(el_td_label);

    var el_ckbx = document.createElement('input');
    el_ckbx.id = ckbx_id;
    el_ckbx.type = 'checkbox';
    el_ckbx.onchange = icosalogic.inv_design.graphOptHandler;

    var el_td_ckbx = document.createElement('td');
    el_td_ckbx.appendChild(el_ckbx);
    
    var el_tr = document.createElement('tr');
    el_tr.appendChild(el_td_label);
    el_tr.appendChild(el_td_ckbx);
    
    el_gtbl.appendChild(el_tr);
  });
  
  console.log('addFetGraphOpts: after length=' + el_gtbl.length);
}

/*
 * Add the config efficiency graph options.
 */
icosalogic.inv_design.addConfigGraphOpts = function(el_gtbl) {
  console.log("icosalogic.inv_design.addConfigGraphOpts: enter");

  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  
  icosalogic.inv_design.configs.forEach(function(cfg_name) {
    console.log('addConfigGraphOpts: cfg_name=' + cfg_name);
    
    var ckbx_id = 'gcopt_' + cfg_name;
    
    var el_td_label = document.createElement('label');
    el_td_label.for = ckbx_id;
    el_td_label.appendChild(document.createTextNode(cfg_name));
    
    var el_td_name = document.createElement('td');
    el_td_name.appendChild(el_td_label);

    var el_ckbx = document.createElement('input');
    el_ckbx.id = ckbx_id;
    el_ckbx.type = 'checkbox';
    el_ckbx.onchange = icosalogic.inv_design.graphOptHandler;

    var el_td_ckbx = document.createElement('td');
    el_td_ckbx.appendChild(el_ckbx);
    
    var el_tr = document.createElement('tr');
    el_tr.appendChild(el_td_label);
    el_tr.appendChild(el_td_ckbx);
    
    el_gtbl.appendChild(el_tr);
  });
  
  console.log('addConfigGraphOpts: after length=' + el_gtbl.length);
}

/*
 * Update the graph button display property based on if any options are checked.
 * We assume this handler is only called for input checkbox elements.
 */
icosalogic.inv_design.graphOptHandler = function(opt_event) {
  console.log("icosalogic.inv_design.graphOptHandler: enter: id=" + opt_event.target.id + ' checked=' + opt_event.target.checked);

  var oa = icosalogic.inv_design;
  
  if (opt_event.target.checked) {
    oa.num_graph_opts += 1;
  } else if (oa.num_graph_opts > 0) {
    oa.num_graph_opts -= 1;
  }
  console.log("  num_graph_opts=" + oa.num_graph_opts);

  
  var el_gbtn = document.getElementById('gen_graph');
  el_gbtn.style.display = oa.num_graph_opts > 0 ? 'inline-block' : 'none';
}
