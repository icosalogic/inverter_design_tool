/*
 * Attributes of FETs used in the inverter designer.
 */

// icosalogic = {};
// icosalogic.inv_design = {};
icosalogic.inv_design.fet_table = [

{
  mfg:       'Cree / Wolfspeed',
  pn:        'CAS300M17BM2',
  tech:      'SiC',
  footprint: 'Module_61x106mm',
  n_hb:      1,
  v_max:     1700.0,
  i_max:     325.0,
  i_max_hot: 225.0,
  r_ds_on:   0.0162,
  qg:        1076,
  t_d_on:    105,
  t_rise:    72,
  t_d_off:   211,
  t_fall:    56,
  r_th_jc:   0.071,                     // *C / W
  r_g_ext:   2.5,
  r_g_int:   3.7,
  v_g_on:    20.0,
  v_g_off:   -5.0,
  c_iss:     20000.0,                   // pF
  c_oss:     2500.0,
  c_rss:     80.0,
  e_on:      13000.0,                   // uJ
  e_off:     10000.0,
  v_swe:     900,                       // e_on/off voltage
},

{
  mfg:       'Cree / Wolfspeed',
  pn:        'CAS300M12BM2',
  tech:      'SiC',
  footprint: 'Module_61x106mm',
  n_hb:      1,
  v_max:     1200.0,
  i_max:     498.0,
  i_max_hot: 345.0,
  r_ds_on:   0.0072,
  qg:        1025,
  t_d_on:    75,
  t_rise:    25,
  t_d_off:   197,
  t_fall:    60,
  r_th_jc:   0.075,                     // *C / W
  r_g_ext:   2.0,
  r_g_int:   3.0,
  v_g_on:    20.0,
  v_g_off:   -5.0,
  c_iss:     19500.0,                   // pF
  c_oss:     2540.0,
  c_rss:     113.0,
  e_on:      3400.0,                   // uJ
  e_off:     3500.0,
  v_swe:     600,                       // e_on/off voltage
},

{
  mfg:       'Cree / Wolfspeed',
  pn:        'CAS120M12BM2',
  tech:      'SiC',
  footprint: 'Module_61x106mm',
  n_hb:      1,
  v_max:     1200.0,
  i_max:     200.0,
  i_max_hot: 144.0,
  r_ds_on:   0.023,
  qg:        378,
  t_d_on:    40,
  t_rise:    10,
  t_d_off:   80,
  t_fall:    45,
  r_th_jc:   0.135,                     // *C / W
  r_g_ext:   2.5,
  r_g_int:   1.8,
  v_g_on:    20.0,
  v_g_off:   -5.0,
  c_iss:     6470.0,                    // pF
  c_oss:     980.0,
  c_rss:     43.8,
  e_on:      3000.0,                    // uJ
  e_off:     3400.0,
  v_swe:     600,                       // e_on/off voltage
},

{
  mfg:       'Microchip',
  pn:        'MSC017SMA120B',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     113.0,
  i_max_hot: 80.0,
  r_ds_on:   0.022,
  qg:        249,
  t_d_on:    52,
  t_rise:    16,
  t_d_off:   49,
  t_fall:    21,
  r_th_jc:   0.33,
  r_g_ext:   4.0,
  r_g_int:   0.71,
  v_g_on:    20.0,
  v_g_off:   -5.0,
  c_iss:     5280.0,                       // pF
  c_oss:     265.0,
  c_rss:     12.0,
  e_on:      1677.0,                       // uJ
  e_off:     395.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Microchip',
  pn:        'MSC025SMA120B',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     103.0,
  i_max_hot: 73.0,
  r_ds_on:   0.031,
  qg:        232,
  t_d_on:    21,
  t_rise:    14,
  t_d_off:   45,
  t_fall:    18,
  r_th_jc:   0.30,
  r_g_ext:   2.5,
  r_g_int:   0.88,
  v_g_on:    20.0,
  v_g_off:   -5.0,
  c_iss:     3020.0,                       // pF
  c_oss:     270.0,
  c_rss:     25.0,
  e_on:      850.0,                        // uJ
  e_off:     100.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Microchip',
  pn:        'MSC040SMA120B',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     66.0,
  i_max_hot: 46.0,
  r_ds_on:   0.050,
  qg:        137,
  t_d_on:    24,
  t_rise:    13,
  t_d_off:   46,
  t_fall:    13,
  r_th_jc:   0.47,
  r_g_ext:   4.0,
  r_g_int:   1.2,
  v_g_on:    20.0,
  v_g_off:   -5.0,
  c_iss:     1990.0,                       // pF
  c_oss:     156.0,
  c_rss:     17.0,
  e_on:      560.0,                        // uJ
  e_off:     82.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Microchip',
  pn:        'MSC080SMA120B',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     37.0,
  i_max_hot: 26.0,
  r_ds_on:   0.100,
  qg:        64,
  t_d_on:    5,
  t_rise:    4,
  t_d_off:   21,
  t_fall:    15,
  r_th_jc:   0.75,
  r_g_ext:   4.0,
  r_g_int:   1.9,
  v_g_on:    20.0,
  v_g_off:   -5.0,
  c_iss:     838.0,                        // pF
  c_oss:     84.0,
  c_rss:     9.0,
  e_on:      319.0,                        // uJ
  e_off:     52.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Microchip',
  pn:        'MSC025SMA120J',
  tech:      'SiC',
  footprint: 'SOT-227',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     103.0,
  i_max_hot: 73.0,
  r_ds_on:   0.031,
  qg:        232,
  t_d_on:    21,
  t_rise:    14,
  t_d_off:   45,
  t_fall:    18,
  r_th_jc:   0.30,
  r_g_ext:   2.5,
  r_g_int:   0.88,
  v_g_on:    20.0,
  v_g_off:   -5.0,
  c_iss:     3020.0,                       // pF
  c_oss:     270.0,
  c_rss:     25.0,
  e_on:      1040.0,                       // uJ
  e_off:     670.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Microchip',
  pn:        'MSC130SM120JCU3',
  tech:      'SiC',
  footprint: 'SOT-227',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     173.0,
  i_max_hot: 138.0,
  r_ds_on:   0.016,
  qg:        464,
  t_d_on:    30,
  t_rise:    30,
  t_d_off:   50,
  t_fall:    25,
  r_th_jc:   0.20,
  r_g_ext:   4.0,
  r_g_int:   2.94,
  v_g_on:    20.0,
  v_g_off:   -5.0,
  c_iss:     6040.0,                       // pF
  c_oss:     540.0,
  c_rss:     50.0,
  e_on:      1980.0,                       // uJ
  e_off:     1300.0,
  v_swe:     600,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'AIMZH120R010M1T',
  tech:      'SiC',
  footprint: 'TO-247-4',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     202.0,
  i_max_hot: 146.0,
  r_ds_on:   0.0173,
  qg:        178,
  t_d_on:    21,
  t_rise:    29,
  t_d_off:   64,
  t_fall:    16,
  r_th_jc:   0.19,
  r_g_ext:   2.0,
  r_g_int:   2.4,
  v_g_on:    20.0,
  v_g_off:   0.0,
  c_iss:     5703.0,                       // pF
  c_oss:     268.0,
  c_rss:     16.0,
  e_on:      1327.0,                       // uJ
  e_off:     1091.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'AIMZH120R020M1T',
  tech:      'SiC',
  footprint: 'TO-247-4',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     100.0,
  i_max_hot: 71.0,
  r_ds_on:   0.038,
  qg:        82,
  t_d_on:    13.0,
  t_rise:    16.0,
  t_d_off:   31.0,
  t_fall:    9.0,
  r_th_jc:   0.35,
  r_g_ext:   2.0,
  r_g_int:   2.2,
  v_g_on:    20.0,
  v_g_off:   0.0,
  c_iss:     2667.0,                       // pF
  c_oss:     126.0,
  c_rss:     7.0,
  e_on:      468.0,                        // uJ
  e_off:     164.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'AIMZH120R030M1T',
  tech:      'SiC',
  footprint: 'TO-247-4',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     69.0,
  i_max_hot: 49.0,
  r_ds_on:   0.060,
  qg:        57,
  t_d_on:    11.0,
  t_rise:    13.0,
  t_d_off:   24.0,
  t_fall:    10.0,
  r_th_jc:   0.46,
  r_g_ext:   2.0,
  r_g_int:   2.6,
  v_g_on:    20.0,
  v_g_off:   0.0,
  c_iss:     1738.0,                       // pF
  c_oss:     82.0,
  c_rss:     4.4,
  e_on:      282.0,                        // uJ
  e_off:     103.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'AIMZH120R040M1T',
  tech:      'SiC',
  footprint: 'TO-247-4',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     55.0,
  i_max_hot: 39.0,
  r_ds_on:   0.080,
  qg:        43,
  t_d_on:    10.0,
  t_rise:    10.0,
  t_d_off:   22.0,
  t_fall:    8.0,
  r_th_jc:   0.56,
  r_g_ext:   2.0,
  r_g_int:   3.7,
  v_g_on:    20.0,
  v_g_off:   0.0,
  c_iss:     1264.0,                       // pF
  c_oss:     63.0,
  c_rss:     3.6,
  e_on:      181.0,                        // uJ
  e_off:     64.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'AIMZH120R060M1T',
  tech:      'SiC',
  footprint: 'TO-247-4',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     38.0,
  i_max_hot: 27.0,
  r_ds_on:   0.120,
  qg:        32,
  t_d_on:    9.0,
  t_rise:    8.0,
  t_d_off:   18.0,
  t_fall:    10.0,
  r_th_jc:   0.76,
  r_g_ext:   2.0,
  r_g_int:   3.7,
  v_g_on:    20.0,
  v_g_off:   0.0,
  c_iss:     880.0,                        // pF
  c_oss:     43.0,
  c_rss:     2.0,
  e_on:      128.0,                        // uJ
  e_off:     51.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMW120R007M1H',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     225.0,
  i_max_hot: 168.0,
  r_ds_on:   0.0099,
  qg:        289,
  t_d_on:    55,
  t_rise:    75,
  t_d_off:   85,
  t_fall:    44,
  r_th_jc:   0.20,
  r_g_ext:   1.0,
  r_g_int:   1.8,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     9170.0,                       // pF
  c_oss:     420.0,
  c_rss:     61.0,
  e_on:      3470.0,                       // uJ
  e_off:     1320.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMW120R014M1H',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     127.0,
  i_max_hot: 89.3,
  r_ds_on:   0.027,
  qg:        145,
  t_d_on:    31,
  t_rise:    37,
  t_d_off:   42,
  t_fall:    22,
  r_th_jc:   0.33,
  r_g_ext:   1.0,
  r_g_int:   3.7,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     4580.0,                       // pF
  c_oss:     211.0,
  c_rss:     30.0,
  e_on:      1640.0,                       // uJ
  e_off:     510.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMW120R020M1H',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     98.0,
  i_max_hot: 71.0,
  r_ds_on:   0.036,
  qg:        109,
  t_d_on:    23.0,
  t_rise:    28.2,
  t_d_off:   32.0,
  t_fall:    16.5,
  r_th_jc:   0.40,
  r_g_ext:   2.0,
  r_g_int:   1.8,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     3460.0,                       // pF
  c_oss:     159.0,
  c_rss:     23.0,
  e_on:      1273.0,                       // uJ
  e_off:     444.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMW120R030M1H',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     56.0,
  i_max_hot: 45.0,
  r_ds_on:   0.042,
  qg:        63,
  t_d_on:    7.0,
  t_rise:    19.2,
  t_d_off:   17.0,
  t_fall:    13.0,
  r_th_jc:   0.66,
  r_g_ext:   2.0,
  r_g_int:   3.0,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     2120.0,                       // pF
  c_oss:     116.0,
  c_rss:     13.0,
  e_on:      487.0,                        // uJ
  e_off:     95.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMW120R040M1H',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     55.0,
  i_max_hot: 39.0,
  r_ds_on:   0.0544,
  qg:        51,
  t_d_on:    17.0,
  t_rise:    6.4,
  t_d_off:   21.0,
  t_fall:    6.9,
  r_th_jc:   0.66,
  r_g_ext:   2.0,
  r_g_int:   2.5,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     1620.0,                       // pF
  c_oss:     75.0,
  c_rss:     11.0,
  e_on:      305.0,                        // uJ
  e_off:     53.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMW120R060M1H',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     36.0,
  i_max_hot: 26.0,
  r_ds_on:   0.083,
  qg:        31,
  t_d_on:    5.7,
  t_rise:    7.0,
  t_d_off:   13.0,
  t_fall:    12.0,
  r_th_jc:   1.0,
  r_g_ext:   2.0,
  r_g_int:   6.0,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     1060.0,                       // pF
  c_oss:     58.0,
  c_rss:     6.5,
  e_on:      241.0,                        // uJ
  e_off:     33.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMW120R090M1H',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     26.0,
  i_max_hot: 18.0,
  r_ds_on:   0.125,
  qg:        21,
  t_d_on:    5.2,
  t_rise:    4.0,
  t_d_off:   11.5,
  t_fall:    12.6,
  r_th_jc:   1.3,
  r_g_ext:   2.0,
  r_g_int:   9.0,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     707.0,                        // pF
  c_oss:     39.0,
  c_rss:     4.0,
  e_on:      161.0,                        // uJ
  e_off:     19.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMZA120R007M1H',
  tech:      'SiC',
  footprint: 'TO-247-4',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     225.0,
  i_max_hot: 168.0,
  r_ds_on:   0.010,
  qg:        289,
  t_d_on:    92,
  t_rise:    41,
  t_d_off:   131,
  t_fall:    39,
  r_th_jc:   0.20,
  r_g_ext:   1.0,
  r_g_int:   1.8,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     9170.0,                       // pF
  c_oss:     420.0,
  c_rss:     61.0,
  e_on:      2040.0,                       // uJ
  e_off:     440.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMZA120R014M1H',
  tech:      'SiC',
  footprint: 'TO-247-4',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     127.0,
  i_max_hot: 89.3,
  r_ds_on:   0.027,
  qg:        145,
  t_d_on:    48,
  t_rise:    21,
  t_d_off:   60,
  t_fall:    20,
  r_th_jc:   0.33,
  r_g_ext:   1.0,
  r_g_int:   3.7,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     4580.0,                       // pF
  c_oss:     211.0,
  c_rss:     30.0,
  e_on:      900.0,                        // uJ
  e_off:     170.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Infineon',
  pn:        'IMZA120R020M1H',
  tech:      'SiC',
  footprint: 'TO-247-4',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     98.0,
  i_max_hot: 71.0,
  r_ds_on:   0.036,
  qg:        109,
  t_d_on:    34.0,
  t_rise:    15.5,
  t_d_off:   46.0,
  t_fall:    14.8,
  r_th_jc:   0.40,
  r_g_ext:   1.0,
  r_g_int:   1.8,
  v_g_on:    18.0,
  v_g_off:   0.0,
  c_iss:     3460.0,                       // pF
  c_oss:     159.0,
  c_rss:     23.0,
  e_on:      722.0,                        // uJ
  e_off:     145.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'GeneSiC',
  pn:        'G3R40MT12D',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     63.0,
  i_max_hot: 44.0,
  r_ds_on:   0.040,
  qg:        88,
  t_d_on:    45,
  t_rise:    16,
  t_d_off:   19,
  t_fall:    11,
  r_th_jc:   0.50,
  r_g_ext:   4.0,
  r_g_int:   1.2,
  v_g_on:    15.0,
  v_g_off:   -5.0,
  c_iss:     2897.0,                       // pF
  c_oss:     88.0,
  c_rss:     7.1,
  e_on:      505.0,                        // uJ
  e_off:     97.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'GeneSiC',
  pn:        'G3R75MT12D',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     36.0,
  i_max_hot: 26.0,
  r_ds_on:   0.085,
  qg:        47,
  t_d_on:    39,
  t_rise:    15,
  t_d_off:   18,
  t_fall:    10,
  r_th_jc:   0.82,
  r_g_ext:   8.0,
  r_g_int:   1.3,
  v_g_on:    15.0,
  v_g_off:   -5.0,
  c_iss:     1545.0,                       // pF
  c_oss:     47.0,
  c_rss:     3.8,
  e_on:      217.0,                        // uJ
  e_off:     52.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'GeneSiC',
  pn:        'G3R160MT12D',
  tech:      'SiC',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     19.0,
  i_max_hot: 13.0,
  r_ds_on:   0.180,
  qg:        23,
  t_d_on:    23,
  t_rise:    12,
  t_d_off:   13,
  t_fall:    8,
  r_th_jc:   1.41,
  r_g_ext:   10.0,
  r_g_int:   1.8,
  v_g_on:    15.0,
  v_g_off:   -5.0,
  c_iss:     724.0,                        // pF
  c_oss:     22.0,
  c_rss:     1.8,
  e_on:      80.0,                         // uJ
  e_off:     17.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'GeneSiC',
  pn:        'G3R20MT12N',
  tech:      'SiC',
  footprint: 'SOT-227',
  n_hb:      2,
  v_max:     1200.0,
  i_max:     90.0,
  i_max_hot: 64.0,
  r_ds_on:   0.026,
  qg:        180,
  t_d_on:    45,
  t_rise:    18,
  t_d_off:   20,
  t_fall:    11,
  r_th_jc:   0.48,
  r_g_ext:   1.0,
  r_g_int:   1.3,
  v_g_on:    15.0,
  v_g_off:   -5.0,
  c_iss:     5814.0,                       // pF
  c_oss:     176.0,
  c_rss:     14.2,
  e_on:      492.0,                        // uJ
  e_off:     201.0,
  v_swe:     800,                          // e_on/off voltage
},

{
  mfg:       'Transphorm',
  pn:        'TP65H035G4WS',
  tech:      'GaN',
  footprint: 'TO-247-3',
  n_hb:      2,
  v_max:     650.0,
  i_max:     46.5,
  i_max_hot: 29.5,
  r_ds_on:   0.041,
  qg:        22,
  t_d_on:    50,
  t_rise:    10,
  t_d_off:   94,
  t_fall:    10,
  r_th_jc:   0.8,
  r_g_ext:   30.0,
  r_g_int:   1.0,
  v_g_on:    12.0,
  v_g_off:   0.0,
  c_iss:     1500.0,                       // pF
  c_oss:     147.0,
  c_rss:     5.0,
  e_on:      1.23,                         // not given
  e_off:     1.23,                         // not given
  v_swe:     610,                          // e_on/off voltage
},
];
