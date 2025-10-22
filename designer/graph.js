/*
 * Visualization code for the IcosaLogic inverter design tool.
 * 
 * This file contains the individual graph methods, which are called from designer.js.
 */

icosalogic.inv_design.graph_max_amps = 0;
icosalogic.inv_design.graph_names = [];
icosalogic.inv_design.graph_values = [];
icosalogic.inv_design.histogram = [];


/*
 * Loads the Google graph packages, then invokes our local graph method.
 */
icosalogic.inv_design.loadAndGraph = function() {
  console.log('icosalogic.inv_design.loadAndGraph: enter');

  if (!icosalogic.inv_design.isLoaded) {
    icosalogic.inv_design.isLoaded = true;
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(icosalogic.inv_design.graph);
  } else {
    icosalogic.inv_design.graph();
  }
};

/*
 * Add a child element to the parent div.  The child will hold the graph.
 */
icosalogic.inv_design.graph = function() {
  console.log('icosalogic.inv_design.graph: tread not in no mans land');

  var el = document.getElementById('idt_graph');
  var gdiv = document.createElement('div');
  gdiv.id = 'idt_chart';
  el.appendChild(gdiv);

  icosalogic.inv_design.graphHandler();
};


/*
 * Generate a graph as configured by the graph options.
 */
icosalogic.inv_design.graphHandler = function(graph_event) {
  console.log("icosalogic.inv_design.graphHandler: enter:");

  var oa = icosalogic.inv_design;
  
  var el_gt   = document.getElementById('graph_type');
  var gt = el_gt.value;
  console.log('  graph_type=' + gt);
  
  oa.graph_max_amps = 0;

  if (gt == 'eff_fet') {
    oa.graphFetEff();
  } else if (gt == 'eff_cfg') {
    oa.graphConfigEff('e', 'Efficiency');
  } else if (gt == 'pl_cfg') {
    oa.graphConfigEff('p', 'Power Loss (W)');
  } else if (gt == 't_cfg') {
    oa.graphConfigEff('t', 'Temperature');
  } else if (gt == 'apl_cfg') {
    oa.graphConfigHistogram();
  } else if (gt == 'none') {
    // do nothing
  }
}

/*
 * Generate a FET efficiency graph as configured by the graph options.
 */
icosalogic.inv_design.graphFetEff = function() {
  console.log("icosalogic.inv_design.graphFetEff: enter:");

  var oa = icosalogic.inv_design;
  var cfg = oa.config;

  var el_gtbl = document.getElementById('graph_opts_table');
  var saved_fet = cfg.fet_pn;
  var saved_out_amps = cfg.out_amps;
  var amp_incr = 1;
  var numCols = 1;
  
  oa.graph_max_amps = cfg.out_amps;

  // Find the number of columns for the current config
  icosalogic.inv_design.fet_table.forEach(function(fet_entry) {
    var ckbx_id = 'gfopt_' + fet_entry.pn;
    var el_ckbx = document.getElementById(ckbx_id);
    
    if (el_ckbx.checked) {
      numCols += 1;
    }
  });
  console.log('    num_cols=' + numCols + ' graph_max_amps=' + oa.graph_max_amps);
  
  // Allocate the names and values arrays
  oa.graph_names = new Array(numCols);
  oa.graph_names[0] = 'Amps';
  oa.graph_values = new Array(Math.floor(oa.graph_max_amps / amp_incr));
  
  // Assign the amps column values
  var amps = amp_incr;
  for (let i = 0; amps <= oa.graph_max_amps; i++) {
    oa.graph_values[i] = new Array(numCols);
    oa.graph_values[i][0] = amps;
    amps += amp_incr;
  }
  
  // Assign the data column for each checked FET
  var colNum = 1;
  icosalogic.inv_design.fet_table.forEach(function(fet_entry) {
    var ckbx_id = 'gfopt_' + fet_entry.pn;
    var el_ckbx = document.getElementById(ckbx_id);
    
    if (el_ckbx.checked) {
      console.log('addFetGraphOpts: pn=' + fet_entry.pn);
      
      cfg.fet_pn = fet_entry.pn;
      oa.graph_names[colNum] = fet_entry.pn;
      
      var amps = amp_incr;
      for (let ndx = 0; amps <= saved_out_amps && amps <= fet_entry.i_max_hot; ndx += 1) {
        cfg.out_amps = amps;
        oa.derived.deriveFJT(cfg);
        oa.graph_values[ndx][colNum] = oa.derived.th_calc_eff;
        amps += amp_incr;
      }
      colNum += 1;
    }

  });

  cfg.out_amps = saved_out_amps;
  cfg.fet_pn = saved_fet;

  oa.graphGeneric('Efficiency');
}

/*
 * Generate a config efficiency graph as configured by the graph options.
 */
icosalogic.inv_design.graphConfigEff = function(gtype, gname) {
  console.log("graphConfigEff: enter: gtype=" + gtype);

  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  
  var el_gtbl = document.getElementById('graph_opts_table');
  var saved_cfg = cfg.cfg_name;
  var amp_incr = 1;
  var numIndCores = oa.derived.lcl.filter_type == 'LCL' ? 2 : 1
  var numCols = 1;
  var numColsIncr = gtype == 't' ? 2 + numIndCores : 1;

  // Find the max amps for the selected configs
  icosalogic.inv_design.configs.forEach(function(cfg_name) {
    var ckbx_id = 'gcopt_' + cfg_name;
    var el_ckbx = document.getElementById(ckbx_id);
    
    if (el_ckbx.checked) {
      numCols += numColsIncr;
      var cfgNew = oa.Config.find(cfg_name);
      oa.setConfigActive(cfgNew);
      if (oa.graph_max_amps < cfgNew.out_amps) {
        oa.graph_max_amps = cfgNew.out_amps;
      }
    }
  });
  console.log('    num_cols=' + numCols + ' graph_max_amps=' + oa.graph_max_amps);
  
  // Allocate the names and values arrays and assign the amps column values
  oa.graph_names = new Array(numCols);
  oa.graph_names[0] = 'Amps';
  oa.graph_values = new Array(Math.floor(oa.graph_max_amps / amp_incr));

  var amps = amp_incr;
  for (let i = 0; amps <= oa.graph_max_amps; i++) {
    oa.graph_values[i] = new Array(numCols);
    oa.graph_values[i][0] = amps;
    amps += amp_incr;
  }
  
  // Build the data array
  var first_series = true;
  var colNum = 1;
  icosalogic.inv_design.configs.forEach(function(cfg_name) {
    var ckbx_id = 'gcopt_' + cfg_name;
    var el_ckbx = document.getElementById(ckbx_id);
    
    if (el_ckbx.checked) {
      console.log('    cfg_name=' + cfg_name);
      
      var cfgNew = oa.Config.find(cfg_name);
      oa.setConfigActive(cfgNew);
      
      var saved_out_amps = cfgNew.out_amps;
      if (gtype != 't') {
        oa.graph_names[colNum] = cfg_name;
      } else {
        oa.graph_names[colNum    ] = cfg_name + '_fet12';
        oa.graph_names[colNum + 1] = cfg_name + '_fet34';
        oa.graph_names[colNum + 2] = cfg_name + '_ind1';
        if (numIndCores == 2) {
          oa.graph_names[colNum + 3] = cfg_name + '_ind2';
        }
      }
      
      amps = amp_incr;
      for (let ndx = 0; amps <= saved_out_amps; ndx += 1) {
        cfgNew.out_amps = amps;
        oa.derived.deriveFJT(cfgNew);
        if (gtype == 'e') {
          oa.graph_values[ndx][colNum] = oa.derived.th_calc_eff;
        } else if (gtype == 'p') {
          oa.graph_values[ndx][colNum] = oa.derived.th_total_loss;
        } else if (gtype == 't') {
          oa.graph_values[ndx][colNum    ] = oa.derived.th_t_fet_junction12;
          oa.graph_values[ndx][colNum + 1] = oa.derived.th_t_fet_junction34;
          oa.graph_values[ndx][colNum + 2] = oa.derived.ind1.t_core;
          if (numIndCores == 2) {
            oa.graph_values[ndx][colNum + 3] = oa.derived.ind2.t_core;
          }
        }
        amps += amp_incr;
      }
      cfgNew.out_amps = saved_out_amps;
      colNum += numColsIncr;
    }
  });

  // Restore the status quo
  var cfgOld = oa.Config.find(saved_cfg);
  oa.setConfigActive(cfgOld);
  oa.derived.deriveFJT(cfgOld);

  oa.graphGeneric(gname);
}

/*
 * Generate a config power loss histogram graph as configured by the graph options.
 */
icosalogic.inv_design.graphConfigHistogram = function() {
  console.log("graphConfigHistogram: enter:");

  var oa = icosalogic.inv_design;
  var cfg = oa.config;
  var hist = oa.histogram[0];
  
  console.log('histogram length=' + oa.histogram.length);
  
  var el_gtbl = document.getElementById('graph_opts_table');
  var saved_cfg = cfg.cfg_name;
  var amp_incr = hist.binSize * 1000 / cfg.out_voltage;      // convert from kW to amps
  var numCols = 2;

  // Find the number of columns to graph
  icosalogic.inv_design.configs.forEach(function(cfg_name) {
    var ckbx_id = 'gcopt_' + cfg_name;
    var el_ckbx = document.getElementById(ckbx_id);
    
    if (el_ckbx.checked) {
      numCols += 1;
      var cfgNew = oa.Config.find(cfg_name);
      oa.setConfigActive(cfgNew);
      if (oa.graph_max_amps < cfgNew.out_amps) {
        oa.graph_max_amps = cfgNew.out_amps;
      }
    }
  });
  let max_hist_amps = hist.bins.length * hist.binSize * 1000 / cfg.out_voltage;
  if (oa.graph_max_amps > max_hist_amps) {
    oa.graph_max_amps = max_hist_amps;
  }
  console.log('    num_cols=' + numCols + ' graph_max_amps=' + oa.graph_max_amps);
  
  // Allocate the names and values arrays and assign the amps column values
  oa.graph_names = new Array(numCols);
  oa.graph_names[0] = 'Amps';
  oa.graph_names[1] = 'Hybrid';
  oa.graph_values = new Array(Math.floor(oa.graph_max_amps / amp_incr));

  var amps = 0;
  for (let i = 0; amps <= oa.graph_max_amps; i++) {
    oa.graph_values[i] = new Array(numCols);
    oa.graph_values[i][0] = amps;
    oa.graph_values[i][1] = 0;
    amps += amp_incr;
  }
  
  // Build the data array
  var total_loss = 0;
  var first_series = true;
  var colNum = 2;
  icosalogic.inv_design.configs.forEach(function(cfg_name) {
    var ckbx_id = 'gcopt_' + cfg_name;
    var el_ckbx = document.getElementById(ckbx_id);
    
    if (el_ckbx.checked) {
      console.log('    cfg_name=' + cfg_name);
      
      let cfgNew = oa.Config.find(cfg_name);
      oa.setConfigActive(cfgNew);
      
      let saved_out_amps = cfgNew.out_amps;
      oa.graph_names[colNum] = cfg_name;
      
      let wm_kwhr = 60 * 1000;
      let loss = 0;
      total_loss = 0;
      amps = 0;
      for (let ndx = 0; amps <= saved_out_amps && amps <= oa.graph_max_amps; ndx += 1) {
        if (hist.bins[ndx] > 0) {
          cfgNew.out_amps = amps;
          oa.derived.deriveFJT(cfgNew);
          loss = oa.derived.th_total_loss * hist.bins[ndx] / wm_kwhr;
          total_loss += loss;
          if (loss > 0 && (oa.graph_values[ndx][1] == 0 || oa.graph_values[ndx][1] > loss)) {
            oa.graph_values[ndx][1] = loss;
          }
        }
        oa.graph_values[ndx][colNum] = total_loss;
        amps += amp_incr;
      }
      cfgNew.out_amps = saved_out_amps;
      colNum += 1;
    }
  });
  
  // Calculate the minimum loss for a hybrid configuration
  total_loss = 0;
  amps = 0;
  for (let ndx = 0; amps <= oa.graph_max_amps; ndx += 1) {
    total_loss += oa.graph_values[ndx][1];
    oa.graph_values[ndx][1] = total_loss;
    amps += amp_incr;
  }

  // Restore the status quo
  var cfgOld = oa.Config.find(saved_cfg);
  oa.setConfigActive(cfgOld);
  oa.derived.deriveFJT(cfgOld);

  oa.graphGeneric('Power Loss (kW)');
}

/*
 * Graph generic data saved in the graph_names and graph_values arrays.
 */
icosalogic.inv_design.graphGeneric = function(vTitle) {
  console.log('icosalogic.inv_design.graphGeneric: enter');
  
  var oa = icosalogic.inv_design;
  oa.chart = new google.visualization.LineChart(document.getElementById('idt_chart'));
  var chart = oa.chart;

  // icosalogic.inv_design.curGraphName = 'TempInt';
  oa.dataTable = new google.visualization.DataTable();
  var data = oa.dataTable;
  
  // Add the column names
  console.log('    numCols=' + oa.graph_names.length + ' numRows=' + oa.graph_values.length);
  oa.graph_names.forEach(function(gname) {
    // console.log('    adding column ' + gname);
    data.addColumn('number', gname);
  });
  
  var numColumns = oa.graph_names.length;
  var rowNum = 0;
  var chartDate = null;
  oa.graph_values.forEach(function(gvalues) {
    // console.log('    adding row=' + rowNum + ' num values=' + gvalues.length);
    data.addRows(1);
    
    for (let colNum = 0; colNum < gvalues.length; colNum += 1) {
      if (gvalues[colNum] != null) {
        data.setCell(rowNum, colNum, gvalues[colNum]);
      }
    }
    
    rowNum++;
  });
  
  // Basic chart settings
  var options = {
    hAxis: {
      title: 'Amps',
      format: '#',
    },
    vAxis: {
      title: vTitle,
      format: "#.#"
    },
    interpolateNulls: true,
    height: 700,
    width: 1300,
    chartArea: {
      top: 20
    }
  };
  
  // Classic Chart
  chart.draw(data, options);
};

