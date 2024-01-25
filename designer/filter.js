/*
 * An object containing valid filter component values for the input parameters specified in the
 * Config object.
 * 
 * These filters are created in the Derive object, by sweeping through a large range of possible
 * component values, and validating the resulting filter behavior against a set of criteria.
 * See Derive.derive() for more details.
 */

icosalogic.lcl.filters = [];
icosalogic.lcl.numFilters = 0;
icosalogic.lcl.zeroFilter = null;

icosalogic.lcl.compareFcn = icosalogic.lcl.compareDelta;

                                        // Return values for sort functions, so that they don't
                                        // have to know if sort order is ascending or descending
                                        // Ascending    Descending
icosalogic.lcl.sortLt = -1;             //    -1            1
icosalogic.lcl.sortGt = 1;              //     1           -1 

icosalogic.lcl.Filter = function() {
  // console.log('Filter(): enter');
  
};

/*
 * Clear the filter array.
 */
icosalogic.lcl.clearFilters = function() {
  console.log('clearFilters: enter');
    
  icosalogic.lcl.filters = [];
  icosalogic.lcl.numFilters = 0;
};


/*
 * Initialize the configuration.
 */
icosalogic.lcl.Filter.init = function() {
  console.log('Filter.init: enter ===============================================');

  var oa = icosalogic.lcl;

};



icosalogic.lcl.Filter.prototype = {
  l_i:            0.0,
  l_2:            0.0,
  c_f:            0.0,
  i_sat_hr:       0.0,
  delta:          0.0,
  f_res:          0.0,
  stable:         false,
  opt:            false,
  
  
  
  /*
   * Save this filter object in the array of filters.
   */
  save: function() {
	  console.log("Filter.save: enter " + this.cfg_name);
  
  },


  /*
   * Dump the current object.
   */
  dump: function() {
    console.log('Filter.dump: enter');
    
  },
  
};

/*
 * Compare function for sorting the filter array by the l_i column.
 */
icosalogic.lcl.compareLi = function(a, b) {
  // console.log('compareLi: enter');

  if (a.l_i < b.l_i) {
    return icosalogic.lcl.sortLt;
  } else if (a.l_i > b.l_i) {
    return icosalogic.lcl.sortGt;
  } else {
    return 0;
  }
};

/*
 * Compare function for sorting the filter array by the l_2 column.
 */
icosalogic.lcl.compareL2 = function(a, b) {
  // console.log('compareL2: enter');

  if (a.l_2 < b.l_2) {
    return icosalogic.lcl.sortLt;
  } else if (a.l_2 > b.l_2) {
    return icosalogic.lcl.sortGt;
  } else {
    return 0;
  }
};

/*
 * Compare function for sorting the filter array by the c_f column.
 */
icosalogic.lcl.compareCf = function(a, b) {
  // console.log('compareCf: enter');

  if (a.c_f < b.c_f) {
    return icosalogic.lcl.sortLt;
  } else if (a.c_f > b.c_f) {
    return icosalogic.lcl.sortGt;
  } else {
    return 0;
  }
};

/*
 * Compare function for sorting the filter array by the stable boolean (descending), then
 * the delta column (ascending).
 * 
 */
icosalogic.lcl.compareDelta = function(a, b) {
  // console.log('compareDelta: enter');

  if (a.stable && !b.stable) {
    return icosalogic.lcl.sortLt;
  } else if (!a.stable && b.stable) {
    return icosalogic.lcl.sortGt;
  } else if (a.delta < b.delta) {
    return icosalogic.lcl.sortLt;
  } else if (a.delta > b.delta) {
    return icosalogic.lcl.sortGt;
  } else {
    return 0;
  }
};

/*
 * Compare function for sorting the filter array by the f_res column.
 */
icosalogic.lcl.compareFres = function(a, b) {
  // console.log('compareFres: enter');

  if (a.f_res < b.f_res) {
    return icosalogic.lcl.sortLt;
  } else if (a.f_res > b.f_res) {
    return icosalogic.lcl.sortGt;
  } else {
    return 0;
  }
};

/*
 * Compare function for sorting the filter array by the i_sat_hr column.
 */
icosalogic.lcl.compareIsatHr = function(a, b) {
  // console.log('compareIsatHr: enter');

  if (a.i_sat_hr < b.i_sat_hr) {
    return icosalogic.lcl.sortLt;
  } else if (a.i_sat_hr > b.i_sat_hr) {
    return icosalogic.lcl.sortGt;
  } else {
    return 0;
  }
};
