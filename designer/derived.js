/*
 * Code to compute values derived from a configuration (see config.js).
 * 
 * In the MVC UI app paradigm, this is part of the model.
 * There should be no UI code in this file.
 * 
 * To add a new value, update the following places:
 * 1. Define UI element. [index.html]  All UI elements for derived values should be read-only.
 * 2. The property definition in the prototype below (except for part attributes from tables)
 * 3. In derive() compute the derived value
 * 4. In displayDerived() [designer.js]
 * 5. In printDerived()   [designer.js] (needs fixing)
 * 
 * After adding new values, you generally need to reset the app using the purge button in the UI.
 */

icosalogic.inv_design.sqrt_2 = Math.sqrt(2);
icosalogic.inv_design.cu_rho = 1.678e-8;

icosalogic.inv_design.wire_ampacity_table = [
//   size     Hi  Med  Low
    ['0000', 445, 378, 302],
    ['00',   330, 280, 190],
    ['0',    285, 245, 150],
    ['2',    210, 181, 119],
    ['4',    160, 135,  60],
    ['6',    120, 101,  37],
    ['8',     80,  73,  24],
    ['10',    60,  55,  13],
    ['12',    45,  41, 9.3]];
  
// derived values
icosalogic.inv_design.Derived = function() {
  console.log('Derived(): enter');
  
};

// derived values
icosalogic.inv_design.DerivedInd = function() {
  console.log('DerivedInd(): enter');
  
};


// from onlinemetals.com
// A list of the available thicknesses of copper foil and sheet, for constructing bus bars
// Treat these as static, not instance based
icosalogic.inv_design.Derived.cu_thickness_opt_in = [               // in inches, convert to mm at run time
  0.010, 0.0162, 0.020, 0.025, 0.027, 0.032, 0.040, 0.043, 0.050,
  0.062, 0.0625, 0.080, 0.093, 0.125, 0.156, 0.187, 0.250
];

icosalogic.inv_design.Derived.cu_thickness_opt_mm = [];             // computed in init() below


/*
 * Do one-time initialization of this object.
 */
icosalogic.inv_design.Derived.init = function() {
 console.log('Derived.init: enter');
    
  var oad = icosalogic.inv_design.Derived;
  oad.cu_thickness_opt_mm = oad.cu_thickness_opt_in.map(oad.prototype.in_to_mm);
  
  icosalogic.lcl.Derived.init();
};


icosalogic.inv_design.DerivedInd.prototype = {
  cor_size_entry:           null,
  cor_pn_entry:             null,
  cor_mat_entry:            null,
  cor_dc_mag_entry:         null,
  ind_entry:                null,
  lii:                      0,
  target_ap:                0,
  al_biased:                0,
  turns_max:                123,
  turns:                    123,
  turns_l1:                 123,
  turns_status:             'red',
  winding_factor:           1.0,
  wound_area:               1.0,
  len:                      3.0,
  h_eff:                    1.0,
  h_biased:                 1.0,
  h_total:                  1.0,
  h_totalb:                 1.0,
  r_eff:                    1.0,
  r_total:                  1.0,
  power:                    1.0,
  t_core:                   25.0,
  t_status:                 'red',

  /*
   * Calculate all variables derived from the config.
   * Note that we use the minimum value for Al from the nominal +/- 8% range.
   */
  derive: function(cfg, cfgInd, wire_dia) {
	  console.log('DerivedInd.derive: enter: ind' + cfgInd.inum + ' ind_type=' + cfgInd.ind_type + ' * * * * * * * * * * * * * *');
  
    var oa = icosalogic.inv_design;
    var amps_per_ind = cfg.out_amps / cfgInd.count;

    if (cfgInd.ind_type == 'ots') {
      this.ind_entry = oa.ind_table.find(entry => entry.pn == cfgInd.pn);
      this.cor_pn_entry     = null;
      this.cor_size_entry   = null;
      this.cor_mat_entry    = null;
      this.cor_dc_mag_entry = null;
      
      this.h_total               = this.ind_entry.l_uh * 1e-6 / cfgInd.count;
      this.h_totalb              = this.ind_entry.i_dt40 < this.ind_entry.i_sat20 ? this.h_total : this.h_total * 0.8;
      this.r_total               = this.ind_entry.r_dc_max_mohm / cfgInd.count;
      this.power                 = amps_per_ind * amps_per_ind * this.ind_entry.r_dc_max_mohm / 1000;
      this.t_core                = cfg.t_ambient;

      if (this.ind_entry.i_dt40 < this.ind_entry.i_dt100) {
        if (amps_per_ind > this.ind_entry.i_dt40) {
          // for I between i_dt40 and i_dt100, interpolate between 40 and 100*C rise
          this.t_core += 40.0 + (amps_per_ind - this.ind_entry.i_dt40) * 60 /
                                (this.ind_entry.i_dt100 - this.ind_entry.i_dt40);
        } else {
          // for I between 0 and i_dt40, interpolate between 0 and 40*C rise
          this.t_core += amps_per_ind * 40 / this.ind_entry.i_dt40;
        }
      }
      console.log('derive: amps=' + amps_per_ind + ' mohm=' + this.ind_entry.r_dc_max_mohm +
                  ' t_ambient=' + cfg.t_ambient + ' t_core=' + this.t_core);
      
      this.t_status              = this.t_core > 155.0 ? 'red' : 'green';

    } else if (cfgInd.ind_type == 'custom') {
      
      this.ind_entry        = null;
      this.cor_pn_entry     = oa.ind_cor_pn_table.find(entry => entry.pn == cfgInd.core_pn);
      this.cor_size_entry   = oa.ind_cor_size_table.find(entry => entry.size == this.cor_pn_entry.size);
      this.cor_mat_entry    = oa.ind_cor_mat_table.find(entry => entry.mat == this.cor_pn_entry.mat);
      this.cor_dc_mag_entry = oa.ind_dc_mag_table.find(entry => entry.mat == this.cor_pn_entry.mat && entry.mu == this.cor_pn_entry.mu);
      
      if (this.cor_pn_entry == null || this.cor_size_entry == null || this.cor_mat_entry == null) {
        console.log('ind.derive: ERROR: one or more of cor_pn_entry, cor_size_entry, cor_mat_entry is null');
      }
    
      // calculate a conservative limit on the max number of turns for this core
      var core_radius = this.cor_size_entry.ID / 2;
      var max_layers = Math.floor(core_radius / wire_dia);
      var max_turns = 0;
      var layer = 0;
      var layer_dia = this.cor_size_entry.ID;
      var turns_layer = [];
      for ( ; layer < max_layers; layer++) {
        var layer_dia = layer_dia - wire_dia;
        var layer_cir = layer_dia * Math.PI;
        turns_layer[layer] = Math.floor(layer_cir / wire_dia);
        
        if (layer == 0) {
          this.turns_l1 = turns_layer[layer];
        }
        max_turns += turns_layer[layer];
      }
      this.turns_max = max_turns;
    
      // console.log('cor_size_entry: shape=' + this.cor_size_entry.shape + ' mat=' + this.cor_pn_entry.mat);
    
      this.lii                   = cfgInd.target * amps_per_ind * amps_per_ind;
      var est_k                  = 0.7; // what is a good estimate? 0.5?
      this.target_ap             = this.lii * oa.sqrt_2  * 1e6 / (this.cor_mat_entry.B_max * this.cor_mat_entry.max_j * est_k);
    
      var Al_min = this.cor_pn_entry.Al * 0.92;                    // take min of nominal +/- 8% variance
      var n1 = Math.round(Math.sqrt(cfgInd.target * 1e9 / Al_min));
    
      // console.log('Al=' + this.cor_pn_entry.Al + ' Al_min=' + Al_min + ' n1=' + n1);
    
      var bias = n1 * amps_per_ind * 10 / this.cor_size_entry.Le;
      // console.log('n1=' + n1 + ' I=' + amps_per_ind + ' Le=' + this.cor_size_entry.Le + ' bias=' + bias);
    
      var ep = this.get_ep(this.cor_pn_entry.mu, bias);                         // ep = 1 / (a + b H**c)
      var n2 = Math.round(n1 * 100 / ep);
    
      // console.log('bias=' + bias + ' ep=' + ep + ' n2=' + n2);
    
      var wire_area = Math.PI * wire_dia * wire_dia / 4;
      this.winding_factor = wire_area * n2 * 100 / this.cor_size_entry.Aw;
    
      var bias2 = n2 * amps_per_ind * 10 / this.cor_size_entry.Le;
      var ep2 = this.get_ep(this.cor_pn_entry.mu, bias2);
      this.al_biased = Al_min * ep2 / 100;
      var L_unbiased = this.cor_pn_entry.Al * n2 * n2 * 1e-9;
      var L_biased = this.al_biased * n2 * n2 * 1e-9;
    
      // console.log('Unbiased: Al: ' + this.cor_pn_entry.Al + ' n=' + n2 + ' L=' + L_unbiased);
      // console.log('Biased:   Al: ' + this.al_biased + ' n=' + n2 + ' L=' + L_biased);    
      // console.log('config is ' + (L_biased >= cfgInd.target ? 'good' : 'bad'));
    
      this.turns                 = n2;
      this.turns_status          = this.turns <= this.turns_max ? 'green' : 'red';
      this.h_eff                 = L_unbiased;
      this.h_biased              = L_biased;
      this.h_total               = this.h_eff / cfgInd.count;
      this.h_totalb              = this.h_biased / cfgInd.count;
      this.r_eff                 = 123.0;
      this.r_total               = this.r_eff / cfgInd.count;
      
      // Calculate core loss: Method 1 from Magnetics Powder Core catalog (dated 2020) page 20
      var i_dc                   = 0;                          // amps_per_ind
      var i_ac_pk                = amps_per_ind * oa.sqrt_2;   // amps_per_ind * 0.41
      var h_ac_com               = 4 * Math.PI * (this.turns / this.cor_size_entry.Le);
      var h_ac_max               = h_ac_com * (i_dc + i_ac_pk / 2);
      var h_ac_min               = h_ac_com * (i_dc - i_ac_pk / 2);
      console.log('turns=' + this.turns + ' i_ac_pk=' + i_ac_pk + ' Le=' + this.cor_size_entry.Le);
      
      var b_ac_max               = this.get_b(h_ac_max);
      var b_ac_min               = 0 - b_ac_max;               // for 100% AC inputs to inductor, no DC bias
      var b_pk                   = (b_ac_max - b_ac_min) / 2;
      var f_kHz                  = cfg.pwm_freq / 1000;
      var cle                    = oa.ind_loss_table.find(entry => entry.mat == this.cor_pn_entry.mat && entry.mu == this.cor_pn_entry.mu);
      var pld                    = cle.a * Math.pow(b_pk, cle.b) * Math.pow(f_kHz,cle.c);
      this.power                 = pld * this.cor_size_entry.Le * this.cor_size_entry.Ae * 1e-6;
      
      console.log('h_ac_max=' + h_ac_max + ' h_ac_min=' + h_ac_min + ' b_ac_max=' + b_ac_max + ' b_ac_min=' + b_ac_min);
      console.log('f=' + f_kHz + ' b_pk=' + b_pk + ' pld=' + pld + ' power=' + this.power);
      
      // calculate the number of layers used in the windings
      var layers_used = 0;
      var turns_left = this.turns;
      for (layers_used = 0; turns_left > 0; layers_used++) {
        turns_left -= turns_layer[layers_used];
      }
      
      // area of a torus is 4 * pi**2 * r1 * r2
      var xd = (this.cor_size_entry.OD - this.cor_size_entry.ID) / 2;
      var r1 = (this.cor_size_entry.OD + this.cor_size_entry.ID) / 4;
      var r2 = Math.sqrt(xd * xd + this.cor_size_entry.HT * this.cor_size_entry.HT) / 2;
      this.wound_area = 4 * Math.PI * Math.PI * r1 * r2 / 100;
      console.log('r1=' + r1 + ' r2=' + r2 + ' area=' + this.wound_area);
      
      this.t_core                = cfg.t_ambient + Math.pow(this.power * 1000 / this.wound_area, 0.833);
      this.t_status              = this.t_core > 155.0 ? 'red' : 'green';
    
      console.log('power=' + this.power + ' wound_area=' + this.wound_area + ' t_core=' + this.t_core);
      
    } else if (cfgInd.ind_type == 'air') {  // custom wound air core inductor
      /*
       * References:
       *     https://www.circuits.dk/calculator_multi_layer_aircore.htm
       *     https://shadyelectronics.com/how-to-make-single-layer-air-core-inductor-coil/
       */
      console.log('ind [air]: r=' + cfgInd.r + ' target=' + Number(cfgInd.target * 1e6).toFixed(3) + ' uH');
      var core_len = 1;
      var last = 0.001;
      var L = 0.1;
      var n = 1;
      for ( ; n < 100; n++) {
        core_len = n * wire_dia;
        last = L;
        L = (n * n * cfgInd.r * cfgInd.r) / (9 * cfgInd.r + 10 * core_len);  // in uH
        L = L * 1e-6;                                                        // convert to H
        if (L >= cfgInd.target) {
          break;
        }
      }
      
      // pick closest solution between current and previous options
      if (cfgInd.target - last < L - cfgInd.target) {
        // previous solution was closer to target
        L = last;
        n = n - 1;
        core_len = (n + 0.5) * wire_dia;
      }
      
      this.turns        = n;
      this.turns_l1     = n
      this.turns_status = 'green';
      this.h_eff        = L;
      this.h_biased     = L;
      this.len          = core_len;
      this.h_total      = this.h_eff / cfgInd.count;
      this.h_totalb     = this.h_total;
      this.t_status     = 'green';
      
      console.log('ind [air]: n=' + n + ' len=' + core_len + ' L=' + Number(L * 1e6).toFixed(3) + ' uH');
    }
  },
  
  /*
   * Get the effective permeability factor, as a percentage from 0..100.
   * 
   * ep = 1 / (a + b H**c)
   */
  get_ep: function(mu, bias) {
	  console.log('DerivedInd.get_ep: enter: mu=' + mu + ' bias=' + bias);
    
    var oa = icosalogic.inv_design;
    
    var mat = this.cor_pn_entry.mat;
//  var shape = this.cor_size_entry.shape;

    var interpolate = false;
    var lastEntry = null;
    var nextEntry = null;
    var result = null;
    oa.ind_dc_bias_table.forEach(function(dbe) {
      if (dbe.mat == mat) {
        if (dbe.mu == mu) {
          result = dbe;
        }
        if (nextEntry == null && dbe.mu > mu) {
          result = lastEntry;
          nextEntry = dbe;
        }
        lastEntry = dbe;
      }
    });
    var ep;
    if (result != null) {
      // console.log('get_ep: mu=' + result.mu + ' a=' + result.a + ' b=' + result.b + ' c=' + result.c);
      ep = 1 / (result.a + result.b * Math.pow(bias, result.c));
    } else if (lastEntry != null && nextEntry != null) {
      // There is no entry for this mu, so do a linear interpolation between the results for
      // the surrounding entries.  This is probably not optimal for quadratics, but....
      var ep1 = 1 / (result.a + result.b * Math.pow(bias, result.c));
      var ep2 = 1 / (nextEntry.a + nextEntry.b * Math.pow(bias, nextEntry.c));
      ep = (ep2 - ep1) * (mu - result.mu) / (nextEntry.mu - result.m);
      // console.log('get_ep: interpolating: mu1=' + result.mu    + ' ep=' + ep1);
      // console.log('get_ep: interpolating: mu2=' + nextEntry.mu + ' ep=' + ep2);
    }
    // console.log('get_ep: result: mu=' + result.mu + ' ep=' + ep);
    return ep;
  },

  /*
   * Get the magnetic flux, where a, b, c, d, e, and x are from the dc_mag table
   * 
   * B = ((a + bH + cH**2) / (1 + dH + eH**2)) ** x
   */
  get_b: function(h) {
	  // console.log('DerivedInd.get_b: enter: h=' + h);
    
    var dcm = this.cor_dc_mag_entry;
    var b = Math.pow((dcm.a + dcm.b * h + dcm.c * h * h) / (1 + dcm.d * h + dcm.e * h *  h), dcm.x);
    // console.log('get_b: b=' + b);
    
    return b;
  },
    
};

icosalogic.inv_design.Derived.prototype = {
  wire_entry:               null,
  dcl_cap_entry:            null,
  fet_entry:                null,
  out_cap_entry:            null,
  cfg_status:               'red',
  out_freq_omega:           0.0,
  pwm_freq_omega:           0.0,
  pwm_cycle_ns:             0.0,
  out_voltage_pp:           0.0,
  out_watts:                0.0,
  skin_depth_out:           0.0,
  skin_depth_out_in:        0.0,
  skin_depth_pwm:           0.0,
  skin_depth_pwm_in:        0.0,
  wire_dia_in:              0.0,
  wire_strand_dia_in:       0.0,
  wire_i_sw:                0.0,
  wire_i_sw_status:         'red',
  wire_i_out:               0.0,
  wire_i_out_status:        'red',
  bb_cu_recommend:          0.0,
  bb_cu_recommend_in:       0.0,
  bb_cu_thickness_in:       0.0,
  bb_min_width_in:          0.0,
  bb_sub_thickness_in:      0.0,
  bb_ild_thickness_in:      0.0,
  bb_num_layers:            1,
  bb_i:                     10,
  bb_i_out:                 10,
  bb_total_thickness:       0.0,
  bb_total_thickness_in:    0.0,
  bb_i_status:              'red',
  bb_i_out_status:          'red',
  bb_status:                'red',
  fet_i_max_actual:         10,
  fet_i_actual_status:      'red',
  fet_status:               'red',
  dcl_i_rms_max:            1.0,
  dcl_z_ripple:             1.0,
  dcl_c_req:                1.0,
  dcl_fom:                  1.0,
  dcl_fom_cap:              1.0,
  dcl_fom_total:            1.0,
  dcl_i_total:              1.0,
  dcl_c_total:              1.0,
  dcl_fom_status:           'red',
  dcl_i_status:             'red',
  dcl_c_status:             'red',
  dcl_status:               'red',
  t_dead:                   50,
  of_ndx_sugg:              1,
  of_f_res_actual:          1.0,
  of_f_res_actualb:         1.0,
  of_r_damping:             1.0,
  of_r_dampingb:            1.0,
  of_status:                'red',
  of_sugg_status:           'red',
  of_actual_status:         'red',
  oc_c_total:               0.0001,
  i_in_line_min:            0.0,
  i_in_line_nom:            0.0,
  i_in_line_max:            0.0,
  i_in_min:                 0.0,
  i_in_nom:                 0.0,
  i_in_max:                 0.0,
  v_pack_min:               0.0,
  v_pack_nom:               0.0,
  v_pack_max:               0.0,
  bat_v_min_status:         'red',
  bat_status:               'red',
  gd_i_on:                  1.0,
  gd_i_off:                 1.0,
  gd_dc_on:                 0.1,
  gd_dc_off:                0.1,
  gd_i_avg:                 0.1,
  gd_p_avg:                 0.1,
  gd_c_bs:                  1.0,
  gd_r_bs:                  1.0,
  gd_c_vdd:                 1.0,
  th_pgsw:                  1.0,
  th_prgext:                1.0,
  th_prgint:                1.0,
  th_pfi:                   1.0,
  th_p_dcl:                 1.0,
  th_p_oc:                  1.0,
  th_t_dcl_core:            25.0,
  th_t_fet_junction:        25.0,
  th_t_oc_core:             25.0,
  th_total_loss:            1.0,
  th_calc_eff:              50.0,
  th_t_dcl_status:          'red',
  th_t_fet_junction_status: 'red',
  th_t_oc_status:           'red',
  thermal_status:           'red',
  lcl:                      null,
  ind1:                     null,
  ind2:                     null,
  
  /*
   * Calculate all variables derived from the config.
   */
  derive: function(cfg) {
	  console.log('Derived.derive: enter: cfg=' + cfg.cfg_name);
  
    var oa = icosalogic.inv_design;
    if (this.lcl == null) {
      this.lcl = new icosalogic.lcl.Derived();
      icosalogic.lcl.zeroFilter = new icosalogic.lcl.Filter();
    }
    
    // may need to move the derive() calls farther down into the code for prerequisites
    if (this.ind1 == null) {
      this.ind1 = new icosalogic.inv_design.DerivedInd();
    }
    if (this.ind2 == null) {
      this.ind2 = new icosalogic.inv_design.DerivedInd();
    }
    
    // cfg.dump();

    console.log('derive: dcl_cap_pn=' + cfg.dcl_cap_pn + ' fet_pn=' + cfg.fet_pn + ' oc_pn=' + cfg.oc_pn + ' wire_pn=' + cfg.wire_pn);

    this.wire_entry = oa.wire_table.find(entry => entry.pn == cfg.wire_pn);
    this.dcl_cap_entry = oa.cap_table.find(entry => entry.pn == cfg.dcl_cap_pn);
    if (this.dcl_cap_entry == null) {
      console.log('could not find dcl cap entry for ' + cfg.dcl_cap_pn);
    }
    this.fet_entry = oa.fet_table.find(entry => entry.pn == cfg.fet_pn);
    this.out_cap_entry = oa.cap_table.find(entry => entry.pn == cfg.oc_pn);
    if (this.out_cap_entry == null) {
      console.log('could not find out cap entry for ' + cfg.oc_pn);
    }
    
    this.ind1.derive(cfg, cfg.ind1, this.wire_entry.dia_mm);
    this.ind2.derive(cfg, cfg.ind2, this.wire_entry.dia_mm);
    
    this.v_pack_min = cfg.v_cell_min * cfg.bat_series;
    this.v_pack_nom = cfg.v_cell_nom * cfg.bat_series;
    this.v_pack_max = cfg.v_cell_max * cfg.bat_series;
    
    var inPower = cfg.out_amps * cfg.out_voltage * 100 / cfg.est_eff;
    this.i_in_line_min = inPower / this.v_pack_max;
    this.i_in_line_nom = inPower / this.v_pack_nom;
    this.i_in_line_max = inPower / this.v_pack_min;
    this.i_in_min = this.i_in_line_min * cfg.out_lines;
    this.i_in_nom = this.i_in_line_nom * cfg.out_lines;
    this.i_in_max = this.i_in_line_max * cfg.out_lines;
    
    this.t_dead = this.fet_entry.t_d_off + this.fet_entry.t_fall - this.fet_entry.t_d_on;
  
    this.out_freq_omega        = 2 * Math.PI * cfg.out_freq;
    this.pwm_freq_omega        = 2 * Math.PI * cfg.pwm_freq;
    this.pwm_cycle_ns          = 1e9 / cfg.pwm_freq;
    this.out_voltage_pp        = cfg.out_voltage * oa.sqrt_2 * 2;
    this.out_watts             = cfg.out_voltage * cfg.out_amps * cfg.out_lines;
    this.skin_depth_out        = 503000 * Math.sqrt(oa.cu_rho / cfg.out_freq);
    this.skin_depth_out_in     = this.mm_to_in(this.skin_depth_out);
    this.skin_depth_pwm        = 503000 * Math.sqrt(oa.cu_rho / cfg.pwm_freq);
    this.skin_depth_pwm_in     = this.mm_to_in(this.skin_depth_pwm);

    this.bat_v_min_status = this.v_pack_min < this.out_voltage_pp ? 'red' : 'green';
    this.bat_status = this.bat_v_min_status;

    // Calculate wire current capacity at f_pwm
    var wire_radius            = this.wire_entry.strand_dia_mm / 2;
    var strand_area            = Math.PI * wire_radius * wire_radius;
    if (wire_radius > this.skin_depth_pwm) {
      var unused_radius = wire_radius - this.skin_depth_pwm;
      strand_area -= Math.PI * unused_radius * unused_radius;
    }
    this.wire_dia_in           = this.mm_to_in(this.wire_entry.dia_mm);
    this.wire_strand_dia_in    = this.mm_to_in(this.wire_entry.strand_dia_mm);
    
    this.wire_i_sw             = strand_area * this.wire_entry.strands * cfg.j_cond;
    this.wire_i_sw_status      = this.wire_i_sw < this.i_in_max ? 'red' : 'green';
    
    strand_area                = Math.PI * wire_radius * wire_radius;
    if (wire_radius > this.skin_depth_out) {
      var unused_radius = wire_radius - this.skin_depth_out;
      strand_area -= Math.PI * unused_radius * unused_radius;
    }
    this.wire_i_out            = strand_area * this.wire_entry.strands * cfg.j_cond;
    this.wire_i_out_status     = this.wire_i_out < cfg.out_amps ? 'red' : 'green';
    
    this.bb_min_width_in       = this.mm_to_in(cfg.bb_min_width);
    
    // look for available thickness at least 90% of what's needed
    var minThickness = this.skin_depth_pwm * 2 * 0.90;
    this.bb_cu_recommend = oa.Derived.cu_thickness_opt_mm.find(val => val >= minThickness);
    
    // if bb_cu_use_recommend is checked, automatically update bb_cu_thickness to the recommended value
    if (cfg.bb_cu_use_recommend) {
      cfg.bb_cu_thickness = this.bb_cu_recommend;
    }
    // console.log('derived: bb_cu_recommend=' + this.bb_cu_recommend + ' bb_cu_use_recommend=' + cfg.bb_cu_use_recommend +
    //             ' bb_cu_thickness=' + cfg.bb_cu_thickness);
    this.bb_cu_recommend_in    = this.mm_to_in(this.bb_cu_recommend);
    this.bb_cu_thickness_in    = this.mm_to_in(cfg.bb_cu_thickness);
    this.bb_sub_thickness_in   = this.mm_to_in(cfg.bb_sub_thickness);
    this.bb_ild_thickness_in   = this.mm_to_in(cfg.bb_ild_thickness); 

    var max_thickness_pwm      = this.skin_depth_pwm * 2;
    var max_thickness_out      = this.skin_depth_out * 2;
    var usable_thickness_pwm   = max_thickness_pwm < cfg.bb_cu_thickness ? max_thickness_pwm : cfg.bb_cu_thickness;
    var usable_thickness_out   = max_thickness_out < cfg.bb_cu_thickness ? max_thickness_out : cfg.bb_cu_thickness;
    var bb_num_layers_pwm      = Math.floor(this.i_in_max / (cfg.j_cond * cfg.bb_min_width * usable_thickness_pwm) + 0.75);
    var bb_num_layers_out      = Math.floor(cfg.out_amps / (cfg.j_cond * cfg.bb_min_width * usable_thickness_out) + 0.75);
    this.bb_num_layers         = Math.max(bb_num_layers_pwm, bb_num_layers_out);
    console.log( 'pwm: max/usable/layers=' + max_thickness_pwm + '/' + usable_thickness_pwm + '/' + bb_num_layers_pwm +
                ' out: max/usable/layers=' + max_thickness_out + '/' + usable_thickness_out + '/' + bb_num_layers_out);
    
    var cur_th                 = this.bb_cu_recommend < cfg.bb_cu_thickness ? this.bb_cu_recommend : cfg.bb_cu_thickness;
    this.bb_i                  = usable_thickness_pwm * cfg.bb_min_width * this.bb_num_layers * cfg.j_cond;
    this.bb_i_out              = usable_thickness_out * cfg.bb_min_width * this.bb_num_layers * cfg.j_cond;
    this.bb_total_thickness    = cfg.bb_sub_thickness + 2 * this.bb_num_layers * cfg.bb_cu_thickness + 2 * (this.bb_num_layers - 1) * cfg.bb_ild_thickness;
    this.bb_total_thickness_in = this.mm_to_in(this.bb_total_thickness);
    this.bb_i_status           = this.bb_i < this.i_in_max ? 'red' : 'green';
    this.bb_i_out_status       = this.bb_i_out < cfg.out_amps ? 'red' : 'green';
    this.bb_status             = this.bb_i_status == 'green' && this.bb_i_out_status == 'green' ? 'green' : 'red';
    if (cfg.bus_type == 'p2p') {
      this.bb_status           = this.wire_i_sw_status == 'green' && this.wire_i_out_status == 'green' ? 'green' : 'red';
    }
    console.log('bb_status=' + this.bb_status + ' wire_i_sw_status=' + this.wire_i_sw_status +
                ' wire_i_out_status=' + this.wire_i_out_status);

    this.dcl_i_rms_max         = this.i_in_max * cfg.dcl_dc_rms_factor;
    this.dcl_z_ripple          = cfg.dcl_v_ripple / this.dcl_i_rms_max;
    this.dcl_c_req             = 1000000 / (this.pwm_freq_omega * this.dcl_z_ripple);
    this.dcl_fom               = cfg.dcl_v_ripple * this.pwm_freq_omega;
    this.dcl_fom_cap           = this.dcl_cap_entry.i_rms * 1000000 / this.dcl_cap_entry.c;
    this.dcl_fom_total         = cfg.dcl_count * this.dcl_fom_cap;
    this.dcl_i_total           = cfg.dcl_count * this.dcl_cap_entry.i_rms;
    this.dcl_c_total           = cfg.dcl_count * this.dcl_cap_entry.c;
    
    this.dcl_fom_status        = this.dcl_fom_total < this.dcl_fom ? 'yellow' : 'green';
    this.dcl_i_status          = this.dcl_i_total < this.dcl_i_rms_max ? 'red' : 'green';
    this.dcl_c_status          = this.dcl_c_total < this.dcl_c_req * 0.9 ? 'red' : 'green';
    
    if (this.dcl_i_status == 'red' || this.dcl_c_status == 'red') {
      this.dcl_status = 'red';
    } else {
      this.dcl_status = this.dcl_fom_status;
    }
    
    this.fet_i_max_actual      = cfg.out_amps * oa.sqrt_2 / cfg.fet_count;
    this.fet_i_actual_status   = this.fet_entry.i_max_hot < this.fet_i_max_actual ? 'red' : 'green';
    this.fet_status            = this.fet_i_actual_status;
    
    var v_gd_total             = this.fet_entry.v_g_on - this.fet_entry.v_g_off;
    var r_fet                  = this.fet_entry.r_g_ext + this.fet_entry.r_g_int;
    var c_gate                 = this.fet_entry.qg / (v_gd_total - cfg.gd_bs_vf);
    this.gd_c_bs               = c_gate * cfg.fet_count * cfg.gd_bs_cf;
    this.gd_r_bs               = 1e9 / (this.pwm_freq_omega * c_gate /*this.gd_c_bs */ );
    this.gd_c_vdd              = this.gd_c_bs * cfg.gd_bs_cf;
    this.gd_i_on               = v_gd_total / (r_fet / cfg.fet_count + cfg.gd_r_on );
    this.gd_i_off              = v_gd_total / (r_fet / cfg.fet_count + cfg.gd_r_off);
    
    
    this.lcl.derive(cfg);                              // Derive the LCL filter parameters.
    if (this.lcl.filter_type == 'LCL') {
      icosalogic.lcl.filters.sort(icosalogic.lcl.compareDelta);
    } else {
      icosalogic.lcl.filters.sort(icosalogic.lcl.compareLi);
    }
    
    this.of_ndx_sugg           = 1;
  
    this.oc_c_total            = this.out_cap_entry.c * cfg.oc_count / 1e6;  // convert from uF to F
    
    if (this.lcl.filter_type == 'LCL') {
      this.of_f_res_actual       = Math.sqrt((this.ind1.h_total + this.ind2.h_total) / 
                                   (this.ind1.h_total * this.ind2.h_total * this.oc_c_total)) / (2 * Math.PI);
      this.of_f_res_actualb      = Math.sqrt((this.ind1.h_totalb + this.ind2.h_totalb) / 
                                   (this.ind1.h_totalb * this.ind2.h_totalb * this.oc_c_total)) / (2 * Math.PI);
      this.of_r_damping          = 1 / (6 * Math.PI * this.of_f_res_actual  * this.oc_c_total);
      this.of_r_dampingb         = 1 / (6 * Math.PI * this.of_f_res_actualb * this.oc_c_total);
    } else {
      // for LC filters
      this.of_f_res_actual       = 1 / (2 * Math.PI * Math.sqrt(this.ind1.h_total  * this.oc_c_total));
      this.of_f_res_actualb      = 1 / (2 * Math.PI * Math.sqrt(this.ind1.h_totalb * this.oc_c_total));
    }
    
    var of_actual_status       = 'red';
    var of_actualb_status      = 'red';
    
    console.log('f_res_actual=' + this.of_f_res_actual + ' f_res_actualb=' + this.of_f_res_actualb);
    console.log('f_res_min=' + this.lcl.f_res_min + ' f_c_min=' + this.lcl.f_c_min + ' f_res_max=' + this.lcl.f_res_max);
    
    if (this.lcl.filter_type == 'LCL') {
      if (this.of_f_res_actual >=  this.lcl.f_res_min && this.of_f_res_actual <= this.lcl.f_res_max) {
        of_actual_status = this.of_f_res_actual >= this.lcl.f_c_min ? 'green' : 'yellow';
      }
      if (this.of_f_res_actualb >=  this.lcl.f_res_min && this.of_f_res_actualb <= this.lcl.f_res_max) {
        of_actualb_status = this.of_f_res_actualb >= this.lcl.f_c_min ? 'green' : 'yellow';
      }
    } else {
      console.log( 'f_lc_min5=' + this.lcl.f_lc_min5 + ' f_lc_max5=' + this.lcl.f_lc_max5 +
                  ' f_lc_min6=' + this.lcl.f_lc_min6 + ' f_lc_max6=' + this.lcl.f_lc_max6);
      if (this.of_f_res_actual >=  this.lcl.f_lc_min5 && this.of_f_res_actual <= this.lcl.f_lc_max5) {
        if (this.of_f_res_actual >=  this.lcl.f_lc_min6 && this.of_f_res_actual <= this.lcl.f_lc_max6) {
          of_actual_status = 'green';
        } else {
          of_actual_status = 'yellow';
        }
      }
      if (this.of_f_res_actualb >=  this.lcl.f_lc_min5 && this.of_f_res_actualb <= this.lcl.f_lc_max5) {
        if (this.of_f_res_actualb >=  this.lcl.f_lc_min6 && this.of_f_res_actualb <= this.lcl.f_lc_max6) {
          of_actualb_status = 'green';
        } else {
          of_actualb_status = 'yellow';
        }
      }
    }
    if (of_actual_status == 'red' || of_actualb_status == 'red') {
      this.of_actual_status = 'red';
    } else if (of_actual_status == 'yellow' || of_actualb_status == 'yellow') {
      this.of_actual_status = 'yellow';
    } else {
      this.of_actual_status = 'green';
    }
    console.log('actual=' + of_actual_status + ' actualb=' + of_actualb_status + ' status=' + this.of_actual_status);
    
    this.of_status             = this.of_actual_status;
    
    var fe = this.fet_entry;
    // resistor max duty cycle is alternating on/off every cycle, i.e., (on + off) / 2
    this.gd_dc_on               = (fe.t_d_on  + fe.t_rise) / this.pwm_cycle_ns;
    this.gd_dc_off              = (fe.t_d_off + fe.t_fall) / this.pwm_cycle_ns;
    this.gd_i_avg               = this.gd_i_on * this.gd_dc_on + this.gd_i_off * this.gd_dc_off;
    this.gd_p_avg               = this.gd_i_avg * v_gd_total;
    var fet_r_i                 = v_gd_total / r_fet;
    var on_factor               = fet_r_i * fet_r_i * this.gd_dc_on;
    var off_factor              = fet_r_i * fet_r_i * this.gd_dc_off;
    console.log( 'fet r i=' + fet_r_i + ' gd_i_on=' + this.gd_i_on + ' gd_i_off=' + this.gd_i_off);
    console.log( 'fet r duty cycle on=' + this.gd_dc_on + ' off=' + this.gd_dc_off + 
                ' fet r factor on=' + on_factor + ' off=' + off_factor);
    var eff_th_cc_dcl           = this.dcl_cap_entry.th_cc;
    var eff_th_cc_oc            = this.out_cap_entry.th_cc;
    if (cfg.pwm_freq > 10000) {
      eff_th_cc_dcl = eff_th_cc_dcl * (cfg.pwm_freq / 1000 - 10) / 100;
      eff_th_cc_oc  = eff_th_cc_oc  * (cfg.pwm_freq / 1000 - 10) / 100;
    }
    var i_rms_per_cap_dcl       = this.dcl_i_rms_max / cfg.dcl_count;
    var oc_cap_power_factor     = 0.1;                                  // 10% generous, 5% target
    var i_rms_per_cap_oc        = cfg.out_amps * oc_cap_power_factor / cfg.oc_count;
    
    
    this.th_pgsw                = v_gd_total * v_gd_total * fe.qg * cfg.pwm_freq / 2e9;  // worst case: 1 on/off cycle every 2 pwm cycles
    this.th_prgext              = fe.r_g_ext * (on_factor + off_factor) / 2;
    this.th_prgint              = fe.r_g_int * (on_factor + off_factor) / 2;
    this.th_pfi                 = this.fet_i_max_actual * this.fet_i_max_actual * fe.r_ds_on * 0.5;            // assume 50% duty cycle
    this.th_p_dcl               = i_rms_per_cap_dcl * i_rms_per_cap_dcl * this.dcl_cap_entry.esr;
    this.th_t_dcl_core          = cfg.t_ambient + this.th_p_dcl * (eff_th_cc_dcl + this.dcl_cap_entry.th_ca);
    var fet_power               = this.th_prgint + this.th_pfi;
    this.th_t_fet_junction      = cfg.t_ambient + fet_power * (fe.r_th_jc + cfg.fet_r_th_ca);
    this.th_p_oc                = i_rms_per_cap_oc * i_rms_per_cap_oc * this.out_cap_entry.esr;
    this.th_t_oc_core           = cfg.t_ambient + this.th_p_oc * (eff_th_cc_oc + this.out_cap_entry.th_ca);
    var ind2_power              = this.lcl.filter_type == 'LCL' ? this.ind2.power * cfg.ind2.count : 0.0;
    this.th_total_loss          = this.th_p_dcl * cfg.dcl_count + 
                                  (this.th_pgsw + 
                                  (this.th_prgint + this.th_prgext + this.th_pfi) * cfg.fet_count + 
                                  this.th_p_oc * cfg.oc_count +
                                  this.ind1.power * cfg.ind1.count + ind2_power) * cfg.out_lines;
    this.th_calc_eff            = 100.0 - this.th_total_loss * 100 / this.out_watts;
    
    this.th_t_dcl_status          = this.th_t_dcl_core >  70.0 ? 'red' : 'green';
    this.th_t_fet_junction_status = this.th_t_fet_junction > 175.0 ? 'red' : 'green';
    this.th_t_oc_status           = this.th_t_oc_core > 70.0 ? 'red' : 'green';
    this.thermal_status           = this.th_t_dcl_status == 'red' || this.th_t_fet_junction_status == 'red' ||
                                    this.ind1.t_status == 'red' || 
                                    (this.lcl.filter_type == 'LCL' && this.ind2.t_status == 'red') ||
                                    this.th_t_oc_status == 'red' ? 'red' : 'green';
    
    this.deriveCfgStatus();
  },
  
  /*
   * Synthesize the status of the configuration by examining all the other section status values.
   * Does not examine incremental status values within a section.
   */
  deriveCfgStatus: function() {
	  console.log('deriveCfgStatus: enter');
    
    this.cfg_status = 'green';
    this.updateCfgStatus(this.bat_status);
    this.updateCfgStatus(this.bb_status);
    this.updateCfgStatus(this.dcl_status);
    this.updateCfgStatus(this.fet_status);
    this.updateCfgStatus(this.of_status);
    this.updateCfgStatus(this.thermal_status);
    
    console.log('deriveCfgStatus: cfg_status=' + this.cfg_status);
  },
 
  /*
   * Update the config status with the string value entry.
   * Use by setting status to 'green', then invoke this method on all subsequent status values
   * to lower the cfg status to the appropriate value.
   */
  updateCfgStatus: function(newStatus) {
    if (newStatus == 'red') {
      this.cfg_status = 'red';
    } else if (newStatus == 'yellow' && this.cfg_status == 'green') {
      this.cfg_status = 'yellow';
    }
  },
  
  /*
   * Convert inches to mm.
   */
  in_to_mm: function(val) {
    return val * 25.4;
  },

  /*
   * Convert mm to inches.
   */
  mm_to_in: function(val) {
    return val / 25.4;
  },



};

