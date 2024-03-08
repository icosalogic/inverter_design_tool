/*
 * Code to compute values derived from a configuration (see config.js).
 * 
 * In the MVC UI app paradigm, this is part of the model.
 * There should be no UI code in this file.
 * 
 * To add a new value, update the following places:
 * 1. Define UI element. [index.html]  All UI elements for derived values should be read-only.
 * 2. The property definition in the prototype below (except for part attributes)
 * 3. In derive() compute the derived value
 * 4. In displayDerived() [designer.js]
 * 
 * After adding new values, you generally need to reset the app using the purge button in the UI.
 */

icosalogic.lcl.sqrt_2 = 1.41421356237;
icosalogic.lcl.sqrt_3 = 1.732050807569;
icosalogic.lcl.cu_rho = 1.678e-8;
icosalogic.lcl.cu_cur_density = 5.0;     // amps / mm**2

  
// derived values
icosalogic.lcl.Derived = function() {
  console.log('Derived(): enter');
  
};



/*
 * Do one-time initialization of this object.
 */
icosalogic.lcl.Derived.init = function() {
 console.log('Derived.init: enter');
    
  var oad = icosalogic.lcl.Derived;
};
  

icosalogic.lcl.Derived.prototype = {
  filter_type:            'LCL',
  omega_grid:               1.0,
  omega_switch:             1.0,
  out_voltage_ll:           0.0,
  out_voltage_peak:         0.0,
  out_voltage_pp:           0.0,
  out_watts:                0.0,
  f_res_min:              600.0,
  f_res_max:             5000.0,
  f_c_min:               2000.0,
  f_c_max:               5000.0,
  f_lc_min5:             1920.0,
  f_lc_max5:             6000.0,
  f_lc_min6:             3840.0,
  f_lc_max6:             5000.0,
  f_res:                    0.0,
  z_base:                   0.0,
  l_total_base:             0.0,
  l_total_max:              0.0,
  i_sat_hr:                 0.0,
  i_2_max:                  0.0,
  v_i_max:                  0.0,
  v_dc_min_est:             0.0,
  l_i_min:                  0.0,
  l_i_max:                  0.0,
  c_f:                      0.0,
  l_i:                      0.0,
  l_2:                      0.0,
  delta_min1:               0.0,
  delta_min2:               0.0,
  delta_min:                0.0,
  delta_max:                0.0,
  delta_opt:                9999.0,
  delta:                    0.0,
  a_max:                    0.0,
  a:                        0.0,
  a1:                       0.0,
  a2:                       0.0,
  a3:                       0.0,
  b2:                       0.0,
  b3:                       0.0,
  z_cf_g:                   0.0,
  z_cf_sw:                  0.0,
  z_l2_g:                   0.0,
  z_l2_sw:                  0.0,
  num_derivations:          0,
  num_valid_derivations:    0,
  num_stable_derivations:   0,
  
  /*
   * Calculate all variables derived from the config.
   */
  derive: function(cfg) {
	  console.log('Derived.derive: enter: cfg=' + cfg.cfg_name);
  
    var oa = icosalogic.lcl;
    oa.clearFilters();
    
    // cfg.dump();

    var sw_freq_eff             = cfg.sw_freq / 2;
    
    this.filter_type            = 'LCL';
    this.omega_grid             = 2 * Math.PI * cfg.out_freq;
    this.omega_switch           = 2 * Math.PI * sw_freq_eff;
    this.out_voltage_ll         = cfg.out_voltage * oa.sqrt_3;
    this.out_voltage_peak       = cfg.out_voltage * oa.sqrt_2;
    this.out_voltage_pp         = this.out_voltage_peak * 2;
    this.out_watts              = this.out_voltage_ll * cfg.out_amps;
    this.f_res_min              = cfg.out_freq * 10;               // LCL constraints
    this.f_res_max              = sw_freq_eff / 2;
    this.f_c_min                = sw_freq_eff / 6;
    this.f_c_max                = sw_freq_eff / 3;  // sw_freq_eff / 2;
    this.f_lc_min5              = cfg.out_freq * Math.pow(2,5),    // LC constraints
    this.f_lc_max5              = sw_freq_eff  * Math.pow(2,-5),
    this.f_lc_min6              = cfg.out_freq * Math.pow(2,6),
    this.f_lc_max6              = sw_freq_eff  * Math.pow(2,-6),

    this.z_base                 = this.out_voltage_ll / cfg.out_amps; // cfg.out_voltage / cfg.out_amps;
    this.l_total_base           = this.z_base / this.omega_grid;
    this.l_total_max            = this.l_total_base * 0.10;
    
    // I have no confidence in the following 3 values; at the least, it should also be a function of sw_freq.
    this.i_2_max                = this.out_watts / this.out_voltage_ll;  // cfg.out_amps * oa.sqrt_2;  // 
    
    var vDropInd1               = this.l_total_max * this.omega_grid * this.i_2_max;
    this.v_i_max                = Math.sqrt(this.out_voltage_peak * this.out_voltage_peak + vDropInd1 * vDropInd1);
    this.v_dc_min_est           = oa.sqrt_3 * this.v_i_max;  // 520.0;  // this.v_i_max * 2.0;   // 
    
    this.c_f_max                = 0.05 * this.out_watts / (this.omega_grid * this.out_voltage_ll * this.out_voltage_ll);
    this.c_f_min                = this.c_f_max / 2.0;
    
    this.num_derivations        = 0;
    this.num_valid_derivations  = 0;
    this.num_stable_derivations = 0;
    this.delta_opt              = 9999;
    
    this.sweep_i_sat(true);
    
    console.log(this.num_valid_derivations + ' valid of ' + this.num_derivations + ' derivations');
    
    if (this.num_valid_derivations == 0) {
      // run again, looking for LC solutions
      this.filter_type            = 'LC';
      this.num_derivations        = 0;
      this.sweep_i_sat(false);
    
      console.log(this.num_valid_derivations + ' valid of ' + this.num_derivations + ' derivations');
    }
  },
 
  /*
   * Sweep through the possible values of the saturation current headroom i_sat_hr, from 1% over
   * max output current to 25% over max output current.
   */
  sweep_i_sat: function(do_lcl) {
    console.log('Derived.sweep_i_sat: enter: ');
    
    var cfg  = icosalogic.inv_design.config;
    var drvd = icosalogic.inv_design.derived;
    var i_sat_incr = cfg.out_amps * icosalogic.lcl.sqrt_2 * 0.01;
    
    this.i_sat_hr = i_sat_incr * cfg.pct_sat_hr;
    this.l_i_min  = drvd.v_pack_max / (2 * this.omega_switch * this.i_sat_hr);   // Eq 17
    this.l_i_max  = this.l_total_max;
      
    // console.log('l_i_min=' + this.l_i_min + ' l_i_max=' + this.l_i_max);
      
    this.sweep_c_f(do_lcl);
  },

  /*
   * Sweep through the possible values of the filter capacitor c_f.
   */
  sweep_c_f: function(do_lcl) {
	  // console.log('Derived.sweep_c_f: enter: ');
    
    var numSteps = 10;
    var c_f_incr = (this.c_f_max - this.c_f_min) / numSteps;
    
    this.c_f = this.c_f_min;
    
    var c;
    for (c = 0; c <= numSteps; c++) {
      this.z_cf_g  = 1 / (this.omega_grid   * this.c_f);
      this.z_cf_sw = 1 / (this.omega_switch * this.c_f);
      this.sweep_l_i(do_lcl);
      this.c_f += c_f_incr;
    }
  },
    
  /*
   * Sweep through the possible values of the inverter side inductor.
   */
  sweep_l_i: function(do_lcl) {
	  // console.log('Derived.sweep_l_i: enter: ');
    
    /*
    var numSteps = 20;
    var l_incr = (this.l_i_max - this.l_i_min) / numSteps;
    console.log('sweep_l_i: min=' + Number(this.l_i_min * 1e6).toFixed(3) +
                ' max=' + Number(this.l_i_max * 1e6).toFixed(3) + 
                ' incr=' + Number(l_incr * 1e6).toFixed(3));
    
    var n;
    */
    
    var multiplier = 1.5;
    for (this.l_i = this.l_i_min; this.l_i < this.l_i_max; this.l_i *= multiplier) {
      if (do_lcl) {
        this.sweep_delta();
      } else {
        this.validate_lc();
      }
    }
  },
  
  /*
   * Sweep through the possible values of the delta variable, which is used to derive the
   * value of the grid side inductor from the value of the inverter side inductor.
   */
  sweep_delta: function() {
	  // console.log('Derived.sweep_delta: enter: ');
    
    var cfg = icosalogic.inv_design.config;
    var l_g_min = 0.000001;   // 1 uH
    
    this.a_max = this.l_total_max / this.l_i - 1;
    this.a1 = this.l_i * this.c_f * this.omega_switch * this.omega_switch - 1;
    this.a2 = this.l_i * (1 + this.a1) + this.a1 * cfg.l_grid_max;
    this.a3 = (this.l_i + this.a1 * cfg.l_grid_max) * this.l_i * this.c_f_max;
    this.b2 = this.l_i * (1 + this.a1) + this.a1 * l_g_min;
    this.b3 = (this.l_i + this.a1 * l_g_min) * this.l_i * this.c_f_min;
    
    var o2 = this.omega_switch * this.omega_switch;
    var lo2 = this.l_i * this.l_i * o2;
    
    // console.log('a1=' + this.a1 + ' a2=' + this.a2 + ' a3=' + this.a3 + ' c_f_max=' + this.c_f_max);

    this.delta_min1 = 1 / (1 + this.a_max * this.a1);
    this.delta_min2 = Math.abs(36 * this.l_i - lo2 * this.c_f_max) / (this.a3 * o2 - 36 * this.a2);
    this.delta_max = ( 4 * this.l_i - lo2 * this.c_f_min) / (this.b3 * o2 -  4 * this.b2);
    this.delta_min = Math.max(this.delta_min1, this.delta_min2);
    
    // console.log('delta_min=' + this.delta_min + ' delta_max=' + this.delta_max);
    
    var numSteps = 50;
    var delta_incr = (this.delta_max - this.delta_min) / numSteps;
    this.delta = this.delta_min;
    
    var n;
    for (n = 0; n < numSteps; n++) {
      this.a = (1 + this.delta) / (this.delta * this.a1);
      this.l_2 = this.l_i * this.a;
      this.z_l2_g  = this.l_2 * this.omega_grid;
      this.z_l2_sw = this.l_2 * this.omega_switch;
      this.f_res  = Math.sqrt((this.l_i + this.l_2) / (this.l_i * this.l_2 * this.c_f)) / (2 * Math.PI);
      this.validate();
      
      this.delta += delta_incr;
    }
  },
  
  /*
   * Validate the derived values against the criteria for LCL filters.
   * 
   * There are two ranges of resonant criteria:
   * 1. A broad range for validity
   * 2. A narrow range for stability with no damping.
   */
  validate: function() {
	  // console.log('Derived.validate: enter: ');
    
    this.num_derivations += 1;
    
    var passed = true;
    var stable = true;
    
    // Criterion #1: f_res < f_res_max
    if (this.f_res >= this.f_res_max) {
      passed = false;
    }
    
    // Criterion #2: f_res > f_res_min
    if (this.f_res <= this.f_res_min) {
      passed = false;
    }
    
    // Criterion #3: f_res < f_c_max
    if (this.f_res >= this.f_c_max) {
      stable = false;
    }
    
    // Criterion #4: f_res > f_c_min
    if (this.f_res <= this.f_c_min) {
      stable = false;
    }
    
    // Criterion #5: delta < delta_max
    if (this.delta >= this.delta_max) {
      passed = false;
    }
    
    // Criterion #6: delta > delta_min
    if (this.delta <= this.delta_min) {
      passed = false;
    }
    
    // >> (much greater than) or << (much less than) are interpreted as 4 octaves, i.e., 16x)
    var much_factor = 16;
    
    // Criterion #7: z_cf_g >> z_l2_g
    if (this.z_cf_g <= this.z_l2_g * much_factor) {
      passed = false;
    }
    
    // Criterion #8: z_cf_sw << z_l2_sw
    if (this.z_cf_sw >= this.z_l2_sw / much_factor) {
      passed = false;
    }
    
    // Criterion #9: l_i + l_2 < l_total_max
    if (this.l_i + this.l_2 >= this.l_total_max) {
      passed = false;
    }

    if (passed) {
      this.num_valid_derivations += 1;
      
      if (stable) {
        this.num_stable_derivations += 1;
      }
      
      var opt = false;
      
      if (this.delta < this.delta_opt) {
        // we have found a new optimum.  This designation is not really critical, but casual
        // observation has shown these entries to be "interesting".
        opt = true;
        this.delta_opt = this.delta;
      
        console.log('new optimum: l_i=' + Number(this.l_i * 1000).toFixed(3) +
                    'mH l_2=' + Number(this.l_2 * 1000).toFixed(3) + 
                    'mH c_f=' + Number(this.c_f * 1000000).toFixed(2) +
                    'uF f_res=' + Number(this.f_res / 1000).toFixed(3) +
                    'kHz i_sat=' + this.i_sat_hr.toFixed(3) +
                    'A delta=' + this.delta.toFixed(6));
      }
      
      this.save(stable, opt);
    }
  },
  
  /*
   * Validate the derived values against the criteria for LC filters.
   * 
   * There are two ranges of criteria:
   * 1. 5 octaves away from both f_out and f_sw (minimal acceptance).
   * 2. 6 octaves away from both f_out and f_sw (preferred).
   */
  validate_lc: function() {
	  // console.log('Derived.validate_lc: enter: ');
    
    this.num_derivations += 1;
    
    var passed = true;
    var stable = true;
    
    this.f_res = 1 / (2 * Math.PI * Math.sqrt(this.c_f * this.l_i));
    
    if (this.f_res < this.f_lc_min5 || this.f_res > this.f_lc_max5) {
      passed = false;
    }
    
    if (this.f_res < this.f_lc_min6 || this.f_res > this.f_lc_max6) {
      stable = false;
    }
    
    if (passed) {
      this.num_valid_derivations += 1;
      
      if (stable) {
        this.num_stable_derivations += 1;
      }
      
      this.save(stable, false);
    }
  },
  
  /*
   * Save the current derivation in the array of valid filters.
   */
  save: function(stable, opt) {
	  // console.log('Derived.save: enter: ');
    
    var oa = icosalogic.lcl;
    var flt = new oa.Filter();
    
    flt.l_i      = this.l_i;
    flt.l_2      = this.l_2;
    flt.c_f      = this.c_f;
    flt.i_sat_hr = this.i_sat_hr;
    flt.delta    = this.delta;
    flt.f_res    = this.f_res;
    flt.stable   = stable;
    flt.opt      = opt;
    
    oa.filters[oa.numFilters] = flt;
    oa.numFilters += 1;
  },
    
};

