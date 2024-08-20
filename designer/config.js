/*
 * Config management for the IcosaLogic inverter design tool.
 * 
 * In the MVC UI app paradigm, the model is divided into 2 parts.
 * This part of the model (the config) represents the values the user can directly change.
 * The other part of the model (in derived.js) represents values derived from the config.
 * 
 * There should be no UI code in this file.
 * Configs are stored in the window.localStorage object.
 * 
 * To add a value to the config, update the following places:
 * 1. Define element in index.html
 * 2. The property definition in the prototype
 * 3. In setDefaultValues()
 * 4. In load()
 * 5. In save()
 * 6. In dump()
 * 7. In readAllInputs() [designer.js]
 * 8. In displayConfig() [designer.js]
 * 9. In printConfig()   [designer.js]
 * 
 * After adding new values, you generally need to reset the app using the purge button in the UI.
 */

// names of defined configurations, default is to start with one config named 'default'
icosalogic.inv_design.configs = [];
icosalogic.inv_design.configs_raw           = '';

icosalogic.inv_design.Config = function(cfg_name) {
  console.log('Config(): enter');
  
  this.cfg_name = cfg_name;
};

icosalogic.inv_design.ConfigInd = function(inum) {
  console.log('ConfigInd(): enter');
  
  this.inum = inum;
};

/*
 * Initialize the configuration.
 */
icosalogic.inv_design.Config.init = function() {
  console.log('Config.init: enter ===============================================');

  var oa = icosalogic.inv_design;

  var cfg_name = '';
  var rawConfigs = localStorage.getItem('i20_configs');
  if (rawConfigs == null) {
    // assume no config values are saved, do initial setup
    console.log('initializing configs from scratch');
    cfg_name = 'default';
    var cfg = oa.Config.prototype.create(cfg_name);
    if (cfg == null) {
      console.log('init: create returned null config');
    }
    cfg.setDefaultValues();
    
    localStorage.setItem('i20_configs', cfg_name);
    localStorage.setItem('i20_cur_config', cfg_name);
    oa.configs_raw = cfg_name;
    oa.configs = [ cfg_name ];
    oa.cur_config = cfg_name;
    oa.config = cfg;
    
  } else {
    // it is an error if anything is missing in this path
    console.log('loading existing configs: ' + rawConfigs);
  
    cfg_name = localStorage.getItem('i20_cur_config');
    if (cfg_name == null) {
      console.log('error: cur_config not set, using default');
      cfg_name = 'default';
      localStorage.setItem('i20_cur_config', cfg_name);
    } else {
      console.log('using previous config ' + cfg_name);
    }
    oa.configs_raw = rawConfigs;
    oa.configs = rawConfigs.split(':');
    oa.cur_config = cfg_name;
    var cfg = oa.Config.find(cfg_name);
    oa.config = cfg;
  }
};


/*
 * Find the configuration with the given name.
 * Returns the hydrated config if found.
 * Returns null if the config does not exist.
 */
icosalogic.inv_design.Config.find = function(cfgName) {
  console.log('Config.find: enter: ' + cfgName + ' ===============================================');
  
  var oa = icosalogic.inv_design;

  var cName = oa.configs.find(val => val == cfgName);
  if (cName == undefined) {
    console.log('find: config not found: ' + cfgName);
    return null;
  }
    
  var cfg = new oa.Config();
  cfg.cfg_name = cfgName;
  cfg.load();
  
  // cfg.dump();
  console.log('find: returning config ' + cfg.cfg_name);
    
  return cfg;
};
  

/*
 * Since we have 2 inductors, create an object for their config values, to avoid duplication.
 */
icosalogic.inv_design.ConfigInd.prototype = {
  inum:                1,
  ind_type:            'custom',
  target:              0.0001,
  pn:                  'IHXL1500VZEB3R3M51',
  core_pn:             '0077102A7',
  n:                   25,
  r:                   12.7,
  count:               1,
  
  setDefaultValues: function(inum) {
	  console.log("ConfigInd.setDefaultValues: enter");
    
    this.inum                = inum;
    this.ind_type            = 'custom';
    this.target              = 0.0001;
    this.pn                  = 'IHXL1500VZEB3R3M51';
    this.core_pn             = '0077102A7';
    this.n                   = 25;
    this.r                   = 12.7;
    this.count               = 1;
  },
  
  /*
   * Copy values from the given config into the current config.
   */
  copy: function(cfg) {
	  console.log("ConfigInd.copy: enter " + cfg.inum);
    
    this.inum                = cfg.inum;
    this.ind_type            = cfg.ind_type;
    this.target              = cfg.target;
    this.pn                  = cfg.ph;
    this.core_pn             = cfg.core_pn;
    this.n                   = cfg.n;
    this.r                   = cfg.r;
    this.count               = cfg.count;
  },
  
  load: function(parent, inum) {
  	console.log("ConfigInd.load: enter " + inum);
  
    this.inum = inum;
    this.loadItem(parent, 'inum'               , true);
    this.loadItem(parent, 'ind_type'           , false);
    this.loadItem(parent, 'target'             , true);
    this.loadItem(parent, 'pn'                 , false);
    this.loadItem(parent, 'core_pn'            , false);
    this.loadItem(parent, 'n'                  , true);
    this.loadItem(parent, 'r'                  , true);
    this.loadItem(parent, 'count'              , true);
  },
 
  /*
   * Loads a single item from localStorage.
   * If the item is not found in localStorage, leaves the current value unchanged.
   */
  loadItem: function(parent, itemName, isNumber) {
	  // console.log("Config.loadItem: enter " + itemName);
    
    var prefix = 'ind' + this.inum + '.';
    
    var before = this[itemName];
    var key = 'i20.' + parent.cfg_name + '.ind' + this.inum + '.' + itemName;
    var val = localStorage.getItem(key);
    if (val != null) {
      this[itemName] = isNumber ? Number(val) : val;
      // console.log('loadItem: loaded ' + key + '=' + val);
    } else {
      console.log('loadItem: not found, name=' + itemName);
    }
  },

  save: function(prefix) {
	  console.log("ConfigInd.save: enter " + this.inum);
  
    var prefix2 = prefix + 'ind' + this.inum + '.';
  
    localStorage.setItem(prefix2 + 'inum', this.inum);
    localStorage.setItem(prefix2 + 'ind_type', this.ind_type);
    localStorage.setItem(prefix2 + 'target', this.target);
    localStorage.setItem(prefix2 + 'pn', this.pn);
    localStorage.setItem(prefix2 + 'core_pn', this.core_pn);
    localStorage.setItem(prefix2 + 'n', this.n);
    localStorage.setItem(prefix2 + 'r', this.r);
    localStorage.setItem(prefix2 + 'count', this.count);
  },
  
  dump: function() {
    console.log('ConfigInd.dump: enter');
    
    console.log('  inum='          + this.inum);
    console.log('  ind_type='      + this.ind_type);
    console.log('  target='        + this.target);
    console.log('  pn='            + this.pn);
    console.log('  core_pn='       + this.core_pn);
    console.log('  n='             + this.n);
    console.log('  r='             + this.r);
    console.log('  count='         + this.count);
  },
  
};

icosalogic.inv_design.Config.prototype = {
  cfg_name:            '',
  out_freq:            60,
  sw_freq:             12000,
  out_amps:            10.0,
  out_voltage:         120,
  out_lines:           2,
  bus_type:            'p2p',
  wire_pn:             '4160900',
  j_cond:              5.0,
  bb_cu_use_recommend: true,
  bb_cu_thickness:     0.2,
  bb_min_width:        12.7,
  bb_sub_thickness:    1.6256,
  bb_ild_thickness:    0.1016,
  dcl_cap_pn:          'C4AQ0BW5250M3LJ',
  dcl_dc_rms_factor:   1.0,
  dcl_v_ripple:        1.0,
  dcl_count:           1,
  fet_count:           1,
  fet_pn:              'MSC025SMA120B',
  fet_r_th_ca:         5,
  ind1:                new icosalogic.inv_design.ConfigInd(),
  ind2:                new icosalogic.inv_design.ConfigInd(),
  oc_target:           0.00003,
  oc_pn:               'C4AQ0BW5250M3LJ',
  oc_count:            1,
  est_eff:             95,
  v_cell_min:          3.0,
  v_cell_nom:          3.3,
  v_cell_max:          3.6,
  bat_series:          144,
  gd_r_on:             0.71,
  gd_r_off:            0.13,
  gd_bs_vf:            1.5,
  gd_bs_cf:            10,
  t_ambient:           25.0,
  pct_sat_hr:          10,
  l_grid_max:          0.013,
  
  /*
   * Set default values for all the user settable variables.
   * This is protection from someone editing the values in the prototype.
   * Used when creating a new config.
   */
  setDefaultValues: function() {
	  console.log("Config.setDefaultValues: enter");
  
    this.out_freq            = 60;
    this.sw_freq             = 12000;
    this.out_amps            = 10;
    this.out_voltage         = 120;
    this.out_lines           = 2;
    this.bus_type            = 'p2p';
    this.wire_pn             = '4160900';
    this.j_cond              = 5.0;
    this.bb_cu_use_recommend = true;
    this.bb_cu_thickness     = 0.2;
    this.bb_min_width        = 12.7;
    this.bb_sub_thickness    = 1.6256;
    this.bb_ild_thickness    = 0.1016;
    this.dcl_cap_pn          = 'C4AQ0BW5250M3LJ';
    this.dcl_dc_rms_factor   = 1.0;
    this.dcl_v_ripple        = 1.0;
    this.dcl_count           = 1;
    this.fet_count           = 1;
    this.fet_pn              = 'MSC025SMA120B';
    this.fet_r_th_ca         = 5;
    this.oc_target           = 0.00003;
    this.oc_pn               = 'C4AQ0BW5250M3LJ';
    this.oc_count            = 1;
    this.est_eff             = 95;
    this.v_cell_min          = 3.0;
    this.v_cell_nom          = 3.3;
    this.v_cell_max          = 3.6;
    this.bat_series          = 144;
    this.gd_r_on             = 0.71;
    this.gd_r_off            = 0.13;
    this.gd_bs_vf            = 1.5;
    this.gd_bs_cf            = 10;
    this.t_ambient           = 25.0;
    this.pct_sat_hr          = 10;
    this.l_grid_max          = 0.013;
    
    this.ind1.setDefaultValues(1);
    this.ind2.setDefaultValues(2);
  },

  /*
   * Copy values from the given config into the current config.
   */
  copy: function(cfg) {
	  console.log("Config.copy: enter: from=" + cfg.cfg_name + ' to=' + this.cfg_name);
  
    this.out_freq            = cfg.out_freq;
    this.sw_freq             = cfg.sw_freq;
    this.out_amps            = cfg.out_amps;
    this.out_voltage         = cfg.out_voltage;
    this.out_lines           = cfg.out_lines;
    this.bus_type            = cfg.bus_type;
    this.wire_pn             = cfg.wire_pn;
    this.j_cond              = cfg.j_cond;
    this.bb_cu_use_recommend = cfg.bb_cu_use_recommend;
    this.bb_cu_thickness     = cfg.bb_cu_thickness;
    this.bb_min_width        = cfg.bb_min_width;
    this.bb_sub_thickness    = cfg.bb_sub_thickness;
    this.bb_ild_thickness    = cfg.bb_ild_thickness;
    this.dcl_cap_pn          = cfg.dcl_cap_pn;
    this.dcl_dc_rms_factor   = cfg.dcl_dc_rms_factor;
    this.dcl_v_ripple        = cfg.dcl_v_ripple;
    this.dcl_count           = cfg.dcl_count;
    this.fet_count           = cfg.fet_count;
    this.fet_pn              = cfg.fet_pn;
    this.fet_r_th_ca         = cfg.fet_r_th_ca;
    this.oc_target           = cfg.oc_target;
    this.oc_pn               = cfg.oc_pn;
    this.oc_count            = cfg.oc_count;
    this.est_eff             = cfg.est_eff;
    this.v_cell_min          = cfg.v_cell_min;
    this.v_cell_nom          = cfg.v_cell_nom;
    this.v_cell_max          = cfg.v_cell_max;
    this.bat_series          = cfg.bat_series;
    this.gd_r_on             = cfg.gd_r_on;
    this.gd_r_off            = cfg.gd_r_off;
    this.gd_bs_vf            = cfg.gd_bs_vf;
    this.gd_bs_cf            = cfg.gd_bs_cf;
    this.t_ambient           = cfg.t_ambient;
    this.pct_sat_hr          = cfg.pct_sat_hr;
    this.l_grid_max          = cfg.l_grid_max;
    
    this.ind1.copy(cfg.ind1);
    this.ind2.copy(cfg.ind2);
  },

  /*
   * Load the values for the current configuration.
   */
  load: function() {
  	console.log("Config.load: enter " + this.cfg_name);
  
    var prefix = 'i20.' + this.cfg_name + '.';
  
    this.loadItem('out_freq'           , true);
    this.loadItem('sw_freq'            , true);
    this.loadItem('out_amps'           , true);
    this.loadItem('out_voltage'        , true);
    this.loadItem('out_lines'          , true);
    this.loadItem('bus_type'           , false);
    this.loadItem('wire_pn'            , false);
    this.loadItem('j_cond'             , true);
    this.loadItem('bb_cu_use_recommend', false);
    this.loadItem('bb_cu_thickness'    , true);
    this.loadItem('bb_min_width'       , true);
    this.loadItem('bb_sub_thickness'   , true);
    this.loadItem('bb_ild_thickness'   , true);
    this.loadItem('dcl_cap_pn'         , false);
    this.loadItem('dcl_dc_rms_factor'  , true);
    this.loadItem('dcl_v_ripple'       , true);
    this.loadItem('dcl_count'          , true);
    this.loadItem('fet_count'          , true);
    this.loadItem('fet_pn'             , false);
    this.loadItem('fet_r_th_ca'        , true);
    this.loadItem('est_eff'            , true);
    this.loadItem('v_cell_min'         , true);
    this.loadItem('v_cell_nom'         , true);
    this.loadItem('v_cell_max'         , true);
    this.loadItem('bat_series'         , true);
    this.loadItem('oc_target'          , true);
    this.loadItem('oc_pn'              , false);
    this.loadItem('oc_count'           , true);
    this.loadItem('gd_r_on'            , true);
    this.loadItem('gd_r_off'           , true);
    this.loadItem('gd_bs_vf'           , true);
    this.loadItem('gd_bs_cf'           , true);
    this.loadItem('t_ambient'          , true);
    this.loadItem('pct_sat_hr'         , true);
    this.loadItem('l_grid_max'         , true);
    
    this.ind1.load(this, 1);
    this.ind2.load(this, 2);
    
    var ur_before = this.bb_cu_use_recommend;
    this.bb_cu_use_recommend = ur_before == 'false' ? false : true;
    // console.log('load: before=' + ur_before + ' bb_cu_use_recommed=' + this.bb_cu_use_recommend);
    
    console.log('load: ind1.target=' + this.ind1.target + ' ind2.target=' + this.ind2.target);
  },
  
  
  /*
   * Loads a single item from localStorage.
   * If the item is not found in localStorage, leaves the current value unchanged.
   */
  loadItem: function(itemName, isNumber) {
	  // console.log("Config.loadItem: enter " + itemName);
    
    var before = this[itemName];
    var val = localStorage.getItem('i20.' + this.cfg_name + '.' + itemName);
    if (val != null) {
      this[itemName] = isNumber ? Number(val) : val;
	    // console.log("loadItem: " + itemName + "=" + this[itemName]);
    } else {
      console.log('loadItem: not found, name=' + itemName);
    }
  },


  /*
   * Save the values for the current configuration.
   */
  save: function() {
	  console.log("Config.save: enter " + this.cfg_name);
  
    var prefix = 'i20.' + this.cfg_name + '.';
  
    localStorage.setItem(prefix + 'out_freq', this.out_freq);
    localStorage.setItem(prefix + 'sw_freq', this.sw_freq);
    localStorage.setItem(prefix + 'out_amps', this.out_amps);
    localStorage.setItem(prefix + 'out_voltage', this.out_voltage);
    localStorage.setItem(prefix + 'out_lines', this.out_lines);
    localStorage.setItem(prefix + 'bus_type', this.bus_type);
    localStorage.setItem(prefix + 'wire_pn', this.wire_pn);
    localStorage.setItem(prefix + 'j_cond', this.j_cond);
    localStorage.setItem(prefix + 'bb_cu_use_recommend', this.bb_cu_use_recommend);
    localStorage.setItem(prefix + 'bb_cu_thickness', this.bb_cu_thickness);
    localStorage.setItem(prefix + 'bb_min_width', this.bb_min_width);
    localStorage.setItem(prefix + 'bb_sub_thickness', this.bb_sub_thickness);
    localStorage.setItem(prefix + 'bb_ild_thickness', this.bb_ild_thickness);
    localStorage.setItem(prefix + 'dcl_cap_pn', this.dcl_cap_pn);
    localStorage.setItem(prefix + 'dcl_dc_rms_factor', this.dcl_dc_rms_factor);
    localStorage.setItem(prefix + 'dcl_v_ripple', this.dcl_v_ripple);
    localStorage.setItem(prefix + 'dcl_count', this.dcl_count);
    localStorage.setItem(prefix + 'fet_count', this.fet_count);
    localStorage.setItem(prefix + 'fet_pn', this.fet_pn);
    localStorage.setItem(prefix + 'fet_r_th_ca', this.fet_r_th_ca);
    localStorage.setItem(prefix + 'est_eff', this.est_eff);
    localStorage.setItem(prefix + 'v_cell_min', this.v_cell_min);
    localStorage.setItem(prefix + 'v_cell_nom', this.v_cell_nom);
    localStorage.setItem(prefix + 'v_cell_max', this.v_cell_max);
    localStorage.setItem(prefix + 'bat_series', this.bat_series);
    localStorage.setItem(prefix + 'oc_target', this.oc_target);
    localStorage.setItem(prefix + 'oc_pn', this.oc_pn);
    localStorage.setItem(prefix + 'oc_count', this.oc_count);
    localStorage.setItem(prefix + 'gd_r_on', this.gd_r_on);
    localStorage.setItem(prefix + 'gd_r_off', this.gd_r_off);
    localStorage.setItem(prefix + 'gd_bs_vf', this.gd_bs_vf);
    localStorage.setItem(prefix + 'gd_bs_cf', this.gd_bs_cf);
    localStorage.setItem(prefix + 't_ambient', this.t_ambient);
    localStorage.setItem(prefix + 'pct_sat_hr', this.pct_sat_hr);
    localStorage.setItem(prefix + 'l_grid_max', this.l_grid_max);
    
    this.ind1.save(prefix);
    this.ind2.save(prefix);
  },


  /*
   * The new config event handler.
   * Verify the new name is valid, then add it to the list of config names in local storage.
   * Clear the name from the new config text box.
   * Create a new set of default user input values for the new config.
   * Refresh the UI from local storage to add the name to the config select element.
   * Set new config as currently selected config.
   */
  create: function(cfgName) {
    console.log('Config.create: enter ' + cfgName + ' ===============================================');
  
    var oa = icosalogic.inv_design;
 
    // verify that name is valid
    var newConfigName = cfgName.trim();
    console.log('new_cfg_name=' + newConfigName);
    var validNameRegEx = /^[A-Za-z][A-Za-z0-9_]*$/;
    var vResult = newConfigName.match(validNameRegEx);
    if (vResult == null || vResult.length < 1) {
      // error
      console.log('invalid config name: ' + newConfigName);
      window.alert('Error: config names can only contain letters, numbers, and underscore _');
      return null;
    }
    
    if (oa.configs.includes(newConfigName)) {
      console.log('error: config already exists: ' + newConfigName);
      window.alert('Error: config already exists: ' + newConfigName);
      return null;
    }
    
    if (oa.configs_raw.length > 0) {
      oa.configs_raw += ':';
    }
    oa.configs_raw += newConfigName;
    oa.configs = oa.configs_raw.split(':');
    
    localStorage.setItem('i20_configs', oa.configs_raw);
  
    var cfgNew = new oa.Config(newConfigName);
    cfgNew.ind1 = new oa.ConfigInd(1);
    cfgNew.ind2 = new oa.ConfigInd(2);
    cfgNew.setDefaultValues();
    cfgNew.save();
  
    return cfgNew;
  },

  /*
   * Delete the current config.
   * 1. localStorage
   * 2. oa.configs[]
   * 3. oa.configsRaw
   * We assume the caller will set another config to be active
   */
  delete: function() {
    console.log('Config.delete: enter ' + this.cfg_name + ' ===============================================');
    
    // remove config values from localStorage
    var prefix = 'i20.' + this.cfg_name + '.';
    var n = localStorage.length;
    var i;
    for (i = 0; i < n; i++) {
      var key = localStorage.key(i);
      if (key != null && key.startsWith(prefix)) {
        var value = localStorage.getItem(key);
        localStorage.removeItem(key);
        console.log('Removed ' + key + '=' + value);
      }
    }

    // remove config name from configs array
    var oa = icosalogic.inv_design;

    console.log('delete: before configs=' + oa.configs);
    oa.configs = oa.configs.filter(cfg_name => cfg_name != this.cfg_name);
    console.log('delete: after configs=' + oa.configs);
    
    oa.configs_raw = oa.configs.join(':');
  },
  
  
  /*
   * Verify the given name is in the list of configurations.
   * Set the given config name as the active config.
   */
  setActive: function() {
    console.log('Config.setActive: enter ' + this.cfg_name + ' ===============================================');
  
    var oa = icosalogic.inv_design;
 
    localStorage.setItem('i20_cur_config', this.cfg_name);
    
    /*
    oa.loadConfig(configName);
    oa.updateUserInputs();
    oa.calculate();
    oa.updateAllOutputs();
    */
  },

  dump: function() {
    console.log('Config.dump: enter');
    
    console.log('  cfg_name='            + this.cfg_name);
    console.log('  out_freq='            + this.out_freq);
    console.log('  sw_freq='             + this.sw_freq);
    console.log('  out_amps='            + this.out_amps);
    console.log('  out_voltage='         + this.out_voltage);
    console.log('  out_lines='           + this.out_lines);
    console.log('  bus_type='            + this.bus_type);
    console.log('  wire_pn='             + this.wire_pn);
    console.log('  j_cond='              + this.j_cond);
    console.log('  bb_cu_use_recommend=' + this.bb_cu_use_recommend);
    console.log('  bb_cu_thickness='     + this.bb_cu_thickness);
    console.log('  bb_min_width='        + this.bb_min_width);
    console.log('  bb_sub_thickness='    + this.bb_sub_thickness);
    console.log('  bb_ild_thickness='    + this.bb_ild_thickness);
    console.log('  dcl_cap_pn='          + this.dcl_cap_pn);
    console.log('  dcl_dc_rms_factor='   + this.dcl_dc_rms_factor);
    console.log('  dcl_v_ripple='        + this.dcl_v_ripple);
    console.log('  dcl_count='           + this.dcl_count);
    console.log('  fet_count='           + this.fet_count);
    console.log('  fet_pn='              + this.fet_pn);
    console.log('  fet_r_th_ca='         + this.fet_r_th_ca);
    console.log('  oc_target='           + this.oc_target);
    console.log('  oc_pn='               + this.oc_pn);
    console.log('  oc_count='            + this.oc_count);
    console.log('  gd_r_on='             + this.gd_r_on);
    console.log('  gd_r_off='            + this.gd_r_off);
    console.log('  gd_bs_vf='            + this.gd_bs_vf);
    console.log('  gd_bs_cf='            + this.gd_bs_cf);
    console.log('  t_ambient='           + this.t_ambient);
    console.log('  pct_sat_hr='          + this.pct_sat_hr);
    console.log('  l_grid_max='          + this.l_grid_max);
    
    this.ind1.dump();
    this.ind2.dump();
  },
  
};

/*
 * Validate the data store for configs.
 * Somewhere, configs is overwritten.
 */
icosalogic.inv_design.validateConfigs = function() {
  console.log('validateConfigs: enter: ');
  
  var oa = icosalogic.inv_design;

  var cfgRaw = localStorage.getItem('i20_configs');
  
  var allConfigsFound = true;
  
  var cfgSyn = '';
  var n = localStorage.length;
  var i;
  for (i = 0; i < n; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    
    if (key.endsWith('.oc_count')) {
      var cfgName = key.substring(4, key.length - 9);
      // console.log('valdiateConfigs: found config ' + cfgName);
      if (cfgSyn.length > 0) {
        cfgSyn += ':';
      }
      cfgSyn += cfgName;
      
      if (!oa.configs.includes(cfgName)) {
        console.log('cfg ' + cfgName + ' not found in configs');
        allConfigsFound = false;
      }
    }
  }
  
  // console.log('validateConfigs: localStorage.i20_configs=' + cfgRaw);
  // console.log('validateConfigs:           oa.configs_raw=' + oa.configs_raw);
  // console.log('validateConfigs: synthesized      configs=' + cfgSyn);

  if (! allConfigsFound) {
    console.log('config mismatch, check console logs');
    // alert('config mismatch, check console logs');
  }
};

