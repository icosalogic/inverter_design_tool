/*
 * Attributes of inductor cores used in the inverter designer.
 *
 * mfg      -- manufacturer
 * pn       -- part number
 * mat      -- material
 * shape    -- shape of core
 * size     -- size of core, mfg specific
 * Al_14    -- Al for 14u cores, nH / T**2
 * Al_19    -- Ditto for 19u cores
 * Al_26    -- Ditto for 26u cores
 * Al_40    -- Ditto for 40u cores
 * Al_60    -- Ditto for 60u cores
 * Al_75    -- Ditto for 75u cores
 * Al_90    -- Ditto for 90u cores
 * Al_125   -- Ditto for 125u cores
 * Al_147   -- Ditto for 147u cores
 * Al_160   -- Ditto for 160u cores
 * Le       -- Magnetic length of 1 winding, mm
 * Ae       -- Cross section area, mm**2
 * Ve       -- Magnetic volume, mm**3
 * Aw       -- Window area, mm**2
 * Ap       -- Area Product, mm**4
 */
 
// THIS TABLE IS DEPRECATED.

icosalogic.inv_design.ind_cor_table = [
{mfg: 'Magnetics', pn: '0058150A2', mat: 'HighFlux', shape: 'Toroid', size: '150', Al_14: 0, Al_19: 0, Al_26: 0, Al_40: 0, Al_60: 0, Al_75: 0, Al_90: 0, Al_125: 35, Al_147: 0, Al_160: 0, Le: 9.42, Ae: 2.11, Ve: 19.9, OD: 4.58, ID: 1.72, HT: 3.18, Aw: 2.324, Ap: 4.90 },
{mfg: 'Magnetics', pn: '0058180A2', mat: 'HighFlux', shape: 'Toroid', size: '180', Al_14: 0, Al_19: 0, Al_26: 0, Al_40: 0, Al_60: 20, Al_75: 0, Al_90: 0, Al_125: 42, Al_147: 0, Al_160: 0, Le: 10.62, Ae: 2.85, Ve: 30.3, OD: 5.29, ID: 1.85, HT: 3.18, Aw: 2.688, Ap: 7.66 },
{mfg: 'Magnetics', pn: '0058020A2', mat: 'HighFlux', shape: 'Toroid', size: '020', Al_14: 6, Al_19: 8, Al_26: 10, Al_40: 18, Al_60: 24, Al_75: 0, Al_90: 36, Al_125: 50, Al_147: 59, Al_160: 64, Le: 13.61, Ae: 4.82, Ve: 65.6, OD: 6.99, ID: 2.29, HT: 3.43, Aw: 4.119, Ap: 19.85 },
{mfg: 'Magnetics', pn: '0058240A2', mat: 'HighFlux', shape: 'Toroid', size: '240', Al_14: 6, Al_19: 8, Al_26: 11, Al_40: 17, Al_60: 26, Al_75: 0, Al_90: 39, Al_125: 54, Al_147: 64, Al_160: 69, Le: 13.63, Ae: 4.76, Ve: 64.9, OD: 7.24, ID: 2.15, HT: 3.18, Aw: 3.630, Ap: 17.28 },
{mfg: 'Magnetics', pn: '0058270A2', mat: 'HighFlux', shape: 'Toroid', size: '270', Al_14: 12, Al_19: 16, Al_26: 21, Al_40: 0, Al_60: 50, Al_75: 0, Al_90: 74, Al_125: 103, Al_147: 122, Al_160: 132, Le: 13.63, Ae: 9.12, Ve: 124.3, OD: 7.24, ID: 2.16, HT: 5.41, Aw: 3.664, Ap: 33.42 },
{mfg: 'Magnetics', pn: '0058410A2', mat: 'HighFlux', shape: 'Toroid', size: '410', Al_14: 8, Al_19: 11, Al_26: 14, Al_40: 22, Al_60: 33, Al_75: 0, Al_90: 50, Al_125: 70, Al_147: 81, Al_160: 89, Le: 16.50, Ae: 7.25, Ve: 119.6, OD: 7.49, ID: 3.45, HT: 5.72, Aw: 9.348, Ap: 67.77 },
{mfg: 'Magnetics', pn: '0058030A2', mat: 'HighFlux', shape: 'Toroid', size: '030', Al_14: 6, Al_19: 8, Al_26: 11, Al_40: 17, Al_60: 25, Al_75: 0, Al_90: 37, Al_125: 52, Al_147: 62, Al_160: 66, Le: 17.90, Ae: 6.02, Ve: 107.8, OD: 8.51, ID: 3.45, HT: 3.81, Aw: 9.348, Ap: 56.28 },
{mfg: 'Magnetics', pn: '0058280A2', mat: 'HighFlux', shape: 'Toroid', size: '280', Al_14: 6, Al_19: 8, Al_26: 11, Al_40: 17, Al_60: 25, Al_75: 0, Al_90: 38, Al_125: 53, Al_147: 63, Al_160: 68, Le: 21.80, Ae: 7.51, Ve: 163.7, OD: 10.29, ID: 4.27, HT: 3.81, Aw: 14.320, Ap: 107.54 },
{mfg: 'Magnetics', pn: '0058290A2', mat: 'HighFlux', shape: 'Toroid', size: '290', Al_14: 7, Al_19: 10, Al_26: 14, Al_40: 22, Al_60: 32, Al_75: 0, Al_90: 48, Al_125: 66, Al_147: 78, Al_160: 84, Le: 21.80, Ae: 9.45, Ve: 206.0, OD: 10.29, ID: 4.27, HT: 4.60, Aw: 14.320, Ap: 135.32 },
{mfg: 'Magnetics', pn: '0058040A2', mat: 'HighFlux', shape: 'Toroid', size: '040', Al_14: 7, Al_19: 10, Al_26: 14, Al_40: 21, Al_60: 32, Al_75: 0, Al_90: 48, Al_125: 66, Al_147: 78, Al_160: 84, Le: 23.00, Ae: 9.76, Ve: 225.0, OD: 10.80, ID: 4.57, HT: 4.60, Aw: 16.403, Ap: 160.09 },
{mfg: 'Magnetics', pn: '0058130A2', mat: 'HighFlux', shape: 'Toroid', size: '130', Al_14: 6, Al_19: 8, Al_26: 11, Al_40: 17, Al_60: 26, Al_75: 0, Al_90: 38, Al_125: 53, Al_147: 63, Al_160: 68, Le: 26.90, Ae: 9.27, Ve: 249.0, OD: 11.81, ID: 5.84, HT: 4.60, Aw: 26.786, Ap: 248.31 },
{mfg: 'Magnetics', pn: '0058050A2', mat: 'HighFlux', shape: 'Toroid', size: '050', Al_14: 64, Al_19: 9, Al_26: 12, Al_40: 18, Al_60: 27, Al_75: 0, Al_90: 40, Al_125: 56, Al_147: 67, Al_160: 72, Le: 31.20, Ae: 10.90, Ve: 340.0, OD: 13.46, ID: 6.99, HT: 5.51, Aw: 38.375, Ap: 418.28 },
{mfg: 'Magnetics', pn: '0058120A2', mat: 'HighFlux', shape: 'Toroid', size: '120', Al_14: 8, Al_19: 11, Al_26: 15, Al_40: 24, Al_60: 35, Al_75: 0, Al_90: 52, Al_125: 72, Al_147: 88, Al_160: 92, Le: 41.20, Ae: 19.56, Ve: 806.0, OD: 17.27, ID: 9.53, HT: 7.11, Aw: 71.331, Ap: 1395.22 },
{mfg: 'Magnetics', pn: '0058380A2', mat: 'HighFlux', shape: 'Toroid', size: '380', Al_14: 10, Al_19: 14, Al_26: 19, Al_40: 28, Al_60: 43, Al_75: 0, Al_90: 64, Al_125: 89, Al_147: 105, Al_160: 114, Le: 41.40, Ae: 23.20, Ve: 960.0, OD: 18.03, ID: 9.02, HT: 7.11, Aw: 63.900, Ap: 1482.49 },
{mfg: 'Magnetics', pn: '0058206A2', mat: 'HighFlux', shape: 'Toroid', size: '206', Al_14: 7, Al_19: 10, Al_26: 14, Al_40: 21, Al_60: 32, Al_75: 0, Al_90: 49, Al_125: 68, Al_147: 81, Al_160: 87, Le: 50.90, Ae: 22.10, Ve: 1120.0, OD: 21.08, ID: 12.07, HT: 7.11, Aw: 114.421, Ap: 2528.69 },
{mfg: 'Magnetics', pn: '0058310A2', mat: 'HighFlux', shape: 'Toroid', size: '310', Al_14: 9, Al_19: 14, Al_26: 19, Al_40: 29, Al_60: 43, Al_75: 0, Al_90: 65, Al_125: 90, Al_147: 106, Al_160: 115, Le: 56.70, Ae: 32.85, Ve: 1863.0, OD: 23.62, ID: 13.34, HT: 8.38, Aw: 139.766, Ap: 4591.31 },
{mfg: 'Magnetics', pn: '0058350A2', mat: 'HighFlux', shape: 'Toroid', size: '350', Al_14: 12, Al_19: 16, Al_26: 22, Al_40: 34, Al_60: 51, Al_75: 0, Al_90: 76, Al_125: 105, Al_147: 124, Al_160: 135, Le: 58.80, Ae: 38.80, Ve: 2281.0, OD: 24.33, ID: 13.77, HT: 9.65, Aw: 148.921, Ap: 5778.15 },
{mfg: 'Magnetics', pn: '0058930A2', mat: 'HighFlux', shape: 'Toroid', size: '930', Al_14: 18, Al_19: 23, Al_26: 32, Al_40: 50, Al_60: 75, Al_75: 0, Al_90: 113, Al_125: 157, Al_147: 185, Al_160: 201, Le: 65.40, Ae: 66.10, Ve: 4322.0, OD: 27.69, ID: 14.10, HT: 11.94, Aw: 156.145, Ap: 10321.18 },
{mfg: 'Magnetics', pn: '0058548A2', mat: 'HighFlux', shape: 'Toroid', size: '548', Al_14: 14, Al_19: 20, Al_26: 28, Al_40: 41, Al_60: 61, Al_75: 0, Al_90: 91, Al_125: 127, Al_147: 150, Al_160: 163, Le: 814.00, Ae: 67.70, Ve: 5509.0, OD: 33.66, ID: 19.46, HT: 11.43, Aw: 297.423, Ap: 20135.57 },
{mfg: 'Magnetics', pn: '0058585A2', mat: 'HighFlux', shape: 'Toroid', size: '585', Al_14: 9, Al_19: 12, Al_26: 16, Al_40: 25, Al_60: 38, Al_75: 0, Al_90: 57, Al_125: 79, Al_147: 93, Al_160: 101, Le: 89.50, Ae: 47.10, Ve: 4215.0, OD: 35.18, ID: 22.56, HT: 9.78, Aw: 399.731, Ap: 18827.32 },
{mfg: 'Magnetics', pn: '0058324A2', mat: 'HighFlux', shape: 'Toroid', size: '324', Al_14: 13, Al_19: 18, Al_26: 24, Al_40: 37, Al_60: 56, Al_75: 0, Al_90: 84, Al_125: 117, Al_147: 138, Al_160: 150, Le: 89.80, Ae: 68.30, Ve: 6136.0, OD: 36.70, ID: 21.54, HT: 11.35, Aw: 364.402, Ap: 24888.67 },
{mfg: 'Magnetics', pn: '0058254A2', mat: 'HighFlux', shape: 'Toroid', size: '254', Al_14: 19, Al_19: 26, Al_26: 35, Al_40: 54, Al_60: 81, Al_75: 0, Al_90: 121, Al_125: 168, Al_147: 198, Al_160: 0, Le: 98.40, Ae: 110.60, Ve: 10880.0, OD: 40.77, ID: 23.32, HT: 15.37, Aw: 427.117, Ap: 47239.11 },
{mfg: 'Magnetics', pn: '0058395A2', mat: 'HighFlux', shape: 'Toroid', size: '395', Al_14: 28, Al_19: 39, Al_26: 53, Al_40: 81, Al_60: 122, Al_75: 0, Al_90: 183, Al_125: 254, Al_147: 299, Al_160: 0, Le: 95.10, Ae: 153.70, Ve: 14617.0, OD: 40.94, ID: 21.27, HT: 17.89, Aw: 355.324, Ap: 54613.29 },
{mfg: 'Magnetics', pn: '0058454A2', mat: 'HighFlux', shape: 'Toroid', size: '454', Al_14: 25, Al_19: 34, Al_26: 47, Al_40: 72, Al_60: 108, Al_75: 0, Al_90: 161, Al_125: 224, Al_147: 264, Al_160: 0, Le: 102.00, Ae: 147.50, Ve: 15100.0, OD: 43.84, ID: 23.39, HT: 17.27, Aw: 429.685, Ap: 63378.50 },
{mfg: 'Magnetics', pn: '0058089A2', mat: 'HighFlux', shape: 'Toroid', size: '089', Al_14: 20, Al_19: 27, Al_26: 37, Al_40: 57, Al_60: 86, Al_75: 0, Al_90: 128, Al_125: 178, Al_147: 210, Al_160: 0, Le: 116.30, Ae: 133.30, Ve: 15502.0, OD: 47.63, ID: 27.89, HT: 16.13, Aw: 610.923, Ap: 81436.05 },
{mfg: 'Magnetics', pn: '0058438A2', mat: 'HighFlux', shape: 'Toroid', size: '438', Al_14: 32, Al_19: 43, Al_26: 59, Al_40: 90, Al_60: 135, Al_75: 0, Al_90: 202, Al_125: 281, Al_147: 330, Al_160: 0, Le: 107.40, Ae: 197.70, Ve: 21235.0, OD: 47.63, ID: 23.32, HT: 18.92, Aw: 427.117, Ap: 84440.98 },
{mfg: 'Magnetics', pn: '0058725A2', mat: 'HighFlux', shape: 'Toroid', size: '725', Al_14: 41, Al_19: 56, Al_26: 76, Al_40: 117, Al_60: 175, Al_75: 0, Al_90: 263, Al_125: 366, Al_147: 428, Al_160: 0, Le: 114.00, Ae: 262.00, Ve: 29700.0, OD: 51.51, ID: 24.00, HT: 21.59, Aw: 452.389, Ap: 118525.91 },
{mfg: 'Magnetics', pn: '0058715A2', mat: 'HighFlux', shape: 'Toroid', size: '715', Al_14: 17, Al_19: 23, Al_26: 32, Al_40: 49, Al_60: 73, Al_75: 0, Al_90: 109, Al_125: 152, Al_147: 179, Al_160: 0, Le: 127.30, Ae: 124.40, Ve: 15832.0, OD: 51.69, ID: 30.94, HT: 14.35, Aw: 751.848, Ap: 93529.91 },
{mfg: 'Magnetics', pn: '0058540A2', mat: 'HighFlux', shape: 'Toroid', size: '540', Al_14: 24, Al_19: 33, Al_26: 45, Al_40: 69, Al_60: 104, Al_75: 0, Al_90: 156, Al_125: 217, Al_147: 0, Al_160: 0, Le: 126.00, Ae: 174.00, Ve: 22000.0, OD: 54.90, ID: 28.10, HT: 15.30, Aw: 620.158, Ap: 107907.44 },
{mfg: 'Magnetics', pn: '0058109A2', mat: 'HighFlux', shape: 'Toroid', size: '109', Al_14: 18, Al_19: 24, Al_26: 33, Al_40: 50, Al_60: 75, Al_75: 0, Al_90: 112, Al_125: 156, Al_147: 0, Al_160: 0, Le: 143.00, Ae: 146.30, Ve: 20918.0, OD: 58.04, ID: 34.75, HT: 14.86, Aw: 948.417, Ap: 138753.34 },
{mfg: 'Magnetics', pn: '0058195A2', mat: 'HighFlux', shape: 'Toroid', size: '195', Al_14: 32, Al_19: 44, Al_26: 60, Al_40: 92, Al_60: 138, Al_75: 0, Al_90: 207, Al_125: 287, Al_147: 0, Al_160: 0, Le: 125.00, Ae: 229.00, Ve: 28625.0, OD: 58.04, ID: 25.58, HT: 16.13, Aw: 513.914, Ap: 117686.35 },
{mfg: 'Magnetics', pn: '0058596A2', mat: 'HighFlux', shape: 'Toroid', size: '596', Al_14: 29, Al_19: 39, Al_26: 54, Al_40: 83, Al_60: 125, Al_75: 0, Al_90: 187, Al_125: 259, Al_147: 0, Al_160: 0, Le: 143.00, Ae: 237.00, Ve: 33900.0, OD: 60.60, ID: 33.00, HT: 20.50, Aw: 855.298, Ap: 202705.60 },
{mfg: 'Magnetics', pn: '0058620A2', mat: 'HighFlux', shape: 'Toroid', size: '620', Al_14: 44, Al_19: 60, Al_26: 82, Al_40: 126, Al_60: 189, Al_75: 0, Al_90: 284, Al_125: 394, Al_147: 0, Al_160: 0, Le: 144.00, Ae: 360.00, Ve: 51800.0, OD: 63.09, ID: 31.70, HT: 25.91, Aw: 789.238, Ap: 284125.71 },
{mfg: 'Magnetics', pn: '0058070A2', mat: 'HighFlux', shape: 'Toroid', size: '070', Al_14: 35, Al_19: 48, Al_26: 65, Al_40: 100, Al_60: 143, Al_75: 0, Al_90: 225, Al_125: 312, Al_147: 0, Al_160: 0, Le: 158.00, Ae: 314.00, Ve: 49700.0, OD: 69.42, ID: 34.67, HT: 21.41, Aw: 944.055, Ap: 296433.20 },
{mfg: 'Magnetics', pn: '0058778A2', mat: 'HighFlux', shape: 'Toroid', size: '778', Al_14: 47, Al_19: 64, Al_26: 88, Al_40: 135, Al_60: 205, Al_75: 0, Al_90: 306, Al_125: 425, Al_147: 0, Al_160: 0, Le: 177.20, Ae: 492.00, Ve: 81500.0, OD: 78.94, ID: 38.33, HT: 26.85, Aw: 1153.897, Ap: 567717.47 },
{mfg: 'Magnetics', pn: '0058740A2', mat: 'HighFlux', shape: 'Toroid', size: '740', Al_14: 48, Al_19: 64, Al_26: 88, Al_40: 136, Al_60: 204, Al_75: 0, Al_90: 306, Al_125: 425, Al_147: 0, Al_160: 0, Le: 184.00, Ae: 497.00, Ve: 91400.0, OD: 75.21, ID: 44.40, HT: 35.92, Aw: 1548.301, Ap: 769505.70 },
{mfg: 'Magnetics', pn: '0058866A2', mat: 'HighFlux', shape: 'Toroid', size: '866', Al_14: 16, Al_19: 22, Al_26: 30, Al_40: 45, Al_60: 68, Al_75: 0, Al_90: 102, Al_125: 142, Al_147: 0, Al_160: 0, Le: 196.00, Ae: 176.00, Ve: 34500.0, OD: 78.94, ID: 48.21, HT: 13.84, Aw: 1825.424, Ap: 321274.64 },
{mfg: 'Magnetics', pn: '0058906A2', mat: 'HighFlux', shape: 'Toroid', size: '906', Al_14: 20, Al_19: 27, Al_26: 37, Al_40: 57, Al_60: 85, Al_75: 0, Al_90: 128, Al_125: 178, Al_147: 0, Al_160: 0, Le: 196.00, Ae: 221.00, Ve: 43400.0, OD: 78.94, ID: 48.21, HT: 17.02, Aw: 1825.424, Ap: 403418.72 },
{mfg: 'Magnetics', pn: '0058102A2', mat: 'HighFlux', shape: 'Toroid', size: '102', Al_14: 26, Al_19: 35, Al_26: 48, Al_40: 74, Al_60: 111, Al_75: 0, Al_90: 0, Al_125: 232, Al_147: 0, Al_160: 0, Le: 243.00, Ae: 358.00, Ve: 86900.0, OD: 103.00, ID: 55.75, HT: 17.91, Aw: 2441.065, Ap: 873901.10 },
{mfg: 'Magnetics', pn: '0058337A2', mat: 'HighFlux', shape: 'Toroid', size: '337', Al_14: 37, Al_19: 50, Al_26: 68, Al_40: 105, Al_60: 158, Al_75: 0, Al_90: 0, Al_125: 329, Al_147: 0, Al_160: 0, Le: 324.00, Ae: 678.00, Ve: 220000.0, OD: 133.96, ID: 77.19, HT: 26.80, Aw: 4679.631, Ap: 3172789.72 },
{mfg: 'Magnetics', pn: '0058165A2', mat: 'HighFlux', shape: 'Toroid', size: '165', Al_14: 42, Al_19: 57, Al_26: 78, Al_40: 120, Al_60: 180, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 412.00, Ae: 987.00, Ve: 407000.0, OD: 166.50, ID: 101.02, HT: 33.15, Aw: 8015.013, Ap: 7910818.05 },
{mfg: 'Magnetics', pn: '0058171A2', mat: 'HighFlux', shape: 'Toroid', size: '171', Al_14: 42, Al_19: 58, Al_26: 80, Al_40: 123, Al_60: 184, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 386.50, Ae: 948.00, Ve: 366700.0, OD: 167.21, ID: 86.89, HT: 27.31, Aw: 5929.651, Ap: 5621308.84 },
{mfg: 'Magnetics', pn: '0077140A7', mat: 'KoolMu', shape: 'Toroid', size: '140', Al_14: 0, Al_19: 0, Al_26: 0, Al_40: 0, Al_60: 13, Al_75: 16, Al_90: 19, Al_125: 26, Al_147: 0, Al_160: 0, Le: 8.06, Ae: 1.30, Ve: 10.5, OD: 4.19, ID: 1.27, HT: 2.16, Aw: 1.267, Ap: 1.65 },
{mfg: 'Magnetics', pn: '0077150A7', mat: 'KoolMu', shape: 'Toroid', size: '150', Al_14: 0, Al_19: 0, Al_26: 0, Al_40: 0, Al_60: 17, Al_75: 21, Al_90: 25, Al_125: 35, Al_147: 0, Al_160: 0, Le: 9.42, Ae: 2.11, Ve: 19.9, OD: 4.58, ID: 1.72, HT: 3.18, Aw: 2.324, Ap: 4.90 },
{mfg: 'Magnetics', pn: '0077180A7', mat: 'KoolMu', shape: 'Toroid', size: '180', Al_14: 0, Al_19: 0, Al_26: 0, Al_40: 0, Al_60: 20, Al_75: 25, Al_90: 30, Al_125: 42, Al_147: 0, Al_160: 0, Le: 10.60, Ae: 2.85, Ve: 30.3, OD: 5.29, ID: 1.85, HT: 3.18, Aw: 2.688, Ap: 7.66 },
{mfg: 'Magnetics', pn: '0077020A7', mat: 'KoolMu', shape: 'Toroid', size: '020', Al_14: 6, Al_19: 8, Al_26: 10, Al_40: 18, Al_60: 24, Al_75: 30, Al_90: 36, Al_125: 50, Al_147: 0, Al_160: 0, Le: 13.60, Ae: 4.70, Ve: 64.0, OD: 6.99, ID: 2.29, HT: 3.43, Aw: 4.119, Ap: 19.36 },
{mfg: 'Magnetics', pn: '0077240A7', mat: 'KoolMu', shape: 'Toroid', size: '240', Al_14: 6, Al_19: 8, Al_26: 11, Al_40: 17, Al_60: 26, Al_75: 32, Al_90: 39, Al_125: 54, Al_147: 0, Al_160: 0, Le: 13.60, Ae: 4.76, Ve: 64.9, OD: 7.24, ID: 2.15, HT: 3.18, Aw: 3.630, Ap: 17.28 },
{mfg: 'Magnetics', pn: '0077270A7', mat: 'KoolMu', shape: 'Toroid', size: '270', Al_14: 12, Al_19: 16, Al_26: 21, Al_40: 33, Al_60: 50, Al_75: 62, Al_90: 74, Al_125: 103, Al_147: 0, Al_160: 0, Le: 13.60, Ae: 9.20, Ve: 125.0, OD: 7.24, ID: 2.16, HT: 5.41, Aw: 3.664, Ap: 33.71 },
{mfg: 'Magnetics', pn: '0077410A7', mat: 'KoolMu', shape: 'Toroid', size: '410', Al_14: 8, Al_19: 11, Al_26: 14, Al_40: 22, Al_60: 33, Al_75: 41, Al_90: 50, Al_125: 70, Al_147: 0, Al_160: 0, Le: 16.50, Ae: 7.25, Ve: 120.0, OD: 7.49, ID: 3.45, HT: 5.72, Aw: 9.348, Ap: 67.77 },
{mfg: 'Magnetics', pn: '0077030A7', mat: 'KoolMu', shape: 'Toroid', size: '030', Al_14: 6, Al_19: 8, Al_26: 11, Al_40: 17, Al_60: 25, Al_75: 31, Al_90: 37, Al_125: 52, Al_147: 0, Al_160: 0, Le: 17.90, Ae: 5.99, Ve: 107.0, OD: 8.51, ID: 3.45, HT: 3.81, Aw: 9.348, Ap: 56.00 },
{mfg: 'Magnetics', pn: '0077280A7', mat: 'KoolMu', shape: 'Toroid', size: '280', Al_14: 6, Al_19: 8, Al_26: 11, Al_40: 17, Al_60: 25, Al_75: 32, Al_90: 38, Al_125: 53, Al_147: 0, Al_160: 0, Le: 21.80, Ae: 7.52, Ve: 164.0, OD: 10.29, ID: 4.27, HT: 3.81, Aw: 14.320, Ap: 107.69 },
{mfg: 'Magnetics', pn: '0077290A7', mat: 'KoolMu', shape: 'Toroid', size: '290', Al_14: 7, Al_19: 10, Al_26: 14, Al_40: 22, Al_60: 32, Al_75: 41, Al_90: 48, Al_125: 66, Al_147: 0, Al_160: 0, Le: 21.80, Ae: 9.45, Ve: 206.0, OD: 10.29, ID: 4.27, HT: 4.60, Aw: 14.320, Ap: 135.32 },
{mfg: 'Magnetics', pn: '0077040A7', mat: 'KoolMu', shape: 'Toroid', size: '040', Al_14: 7, Al_19: 10, Al_26: 14, Al_40: 21, Al_60: 32, Al_75: 40, Al_90: 48, Al_125: 66, Al_147: 0, Al_160: 0, Le: 23.00, Ae: 9.57, Ve: 220.0, OD: 10.80, ID: 4.57, HT: 4.60, Aw: 16.403, Ap: 156.98 },
{mfg: 'Magnetics', pn: '0077130A7', mat: 'KoolMu', shape: 'Toroid', size: '130', Al_14: 6, Al_19: 8, Al_26: 11, Al_40: 17, Al_60: 26, Al_75: 32, Al_90: 38, Al_125: 53, Al_147: 0, Al_160: 0, Le: 26.90, Ae: 9.06, Ve: 244.0, OD: 11.81, ID: 5.84, HT: 4.60, Aw: 26.786, Ap: 242.69 },
{mfg: 'Magnetics', pn: '0077050A7', mat: 'KoolMu', shape: 'Toroid', size: '050', Al_14: 6, Al_19: 9, Al_26: 12, Al_40: 18, Al_60: 27, Al_75: 34, Al_90: 40, Al_125: 56, Al_147: 0, Al_160: 0, Le: 31.20, Ae: 10.90, Ve: 340.0, OD: 13.46, ID: 6.99, HT: 5.51, Aw: 38.375, Ap: 418.28 },
{mfg: 'Magnetics', pn: '0077120A7', mat: 'KoolMu', shape: 'Toroid', size: '120', Al_14: 8, Al_19: 11, Al_26: 15, Al_40: 24, Al_60: 35, Al_75: 43, Al_90: 52, Al_125: 72, Al_147: 0, Al_160: 0, Le: 41.20, Ae: 19.20, Ve: 791.0, OD: 17.27, ID: 9.53, HT: 7.11, Aw: 71.331, Ap: 1369.55 },
{mfg: 'Magnetics', pn: '0077380A7', mat: 'KoolMu', shape: 'Toroid', size: '380', Al_14: 10, Al_19: 14, Al_26: 19, Al_40: 28, Al_60: 43, Al_75: 53, Al_90: 64, Al_125: 89, Al_147: 0, Al_160: 0, Le: 41.40, Ae: 23.20, Ve: 960.0, OD: 18.03, ID: 9.02, HT: 7.11, Aw: 63.900, Ap: 1482.49 },
{mfg: 'Magnetics', pn: '0077206A7', mat: 'KoolMu', shape: 'Toroid', size: '206', Al_14: 7, Al_19: 10, Al_26: 14, Al_40: 21, Al_60: 32, Al_75: 41, Al_90: 49, Al_125: 68, Al_147: 0, Al_160: 0, Le: 50.90, Ae: 22.10, Ve: 1120.0, OD: 21.08, ID: 12.07, HT: 7.11, Aw: 114.421, Ap: 2528.69 },
{mfg: 'Magnetics', pn: '0077310A7', mat: 'KoolMu', shape: 'Toroid', size: '310', Al_14: 9, Al_19: 14, Al_26: 19, Al_40: 29, Al_60: 43, Al_75: 54, Al_90: 65, Al_125: 90, Al_147: 0, Al_160: 0, Le: 56.70, Ae: 31.70, Ve: 1800.0, OD: 23.62, ID: 13.34, HT: 8.38, Aw: 139.766, Ap: 4430.58 },
{mfg: 'Magnetics', pn: '0077350A7', mat: 'KoolMu', shape: 'Toroid', size: '350', Al_14: 12, Al_19: 16, Al_26: 22, Al_40: 34, Al_60: 51, Al_75: 62, Al_90: 76, Al_125: 105, Al_147: 0, Al_160: 0, Le: 58.80, Ae: 38.80, Ve: 2280.0, OD: 24.33, ID: 13.77, HT: 9.65, Aw: 148.921, Ap: 5778.15 },
{mfg: 'Magnetics', pn: '0077930A7', mat: 'KoolMu', shape: 'Toroid', size: '930', Al_14: 18, Al_19: 23, Al_26: 32, Al_40: 50, Al_60: 75, Al_75: 94, Al_90: 113, Al_125: 157, Al_147: 0, Al_160: 0, Le: 63.50, Ae: 65.40, Ve: 4150.0, OD: 27.69, ID: 14.10, HT: 11.94, Aw: 156.145, Ap: 10211.87 },
{mfg: 'Magnetics', pn: '0077548A7', mat: 'KoolMu', shape: 'Toroid', size: '548', Al_14: 14, Al_19: 20, Al_26: 28, Al_40: 41, Al_60: 61, Al_75: 76, Al_90: 91, Al_125: 127, Al_147: 0, Al_160: 0, Le: 81.40, Ae: 65.60, Ve: 5340.0, OD: 33.66, ID: 19.46, HT: 11.43, Aw: 297.423, Ap: 19510.98 },
{mfg: 'Magnetics', pn: '0077585A7', mat: 'KoolMu', shape: 'Toroid', size: '585', Al_14: 9, Al_19: 12, Al_26: 16, Al_40: 25, Al_60: 38, Al_75: 47, Al_90: 57, Al_125: 79, Al_147: 0, Al_160: 0, Le: 89.50, Ae: 46.60, Ve: 4150.0, OD: 35.18, ID: 22.56, HT: 9.78, Aw: 399.731, Ap: 18627.46 },
{mfg: 'Magnetics', pn: '0077324A7', mat: 'KoolMu', shape: 'Toroid', size: '324', Al_14: 13, Al_19: 18, Al_26: 24, Al_40: 37, Al_60: 56, Al_75: 70, Al_90: 84, Al_125: 117, Al_147: 0, Al_160: 0, Le: 89.80, Ae: 67.80, Ve: 6090.0, OD: 36.70, ID: 21.54, HT: 11.35, Aw: 364.402, Ap: 24706.46 },
{mfg: 'Magnetics', pn: '0077395A7', mat: 'KoolMu', shape: 'Toroid', size: '395', Al_14: 28, Al_19: 39, Al_26: 53, Al_40: 81, Al_60: 122, Al_75: 153, Al_90: 183, Al_125: 254, Al_147: 0, Al_160: 0, Le: 95.10, Ae: 153.70, Ve: 14617.0, OD: 40.94, ID: 21.27, HT: 17.89, Aw: 355.324, Ap: 54613.29 },
{mfg: 'Magnetics', pn: '0077254A7', mat: 'KoolMu', shape: 'Toroid', size: '254', Al_14: 19, Al_19: 26, Al_26: 35, Al_40: 54, Al_60: 81, Al_75: 101, Al_90: 121, Al_125: 168, Al_147: 0, Al_160: 0, Le: 98.40, Ae: 107.00, Ve: 10600.0, OD: 40.77, ID: 23.32, HT: 15.37, Aw: 427.117, Ap: 45701.49 },
{mfg: 'Magnetics', pn: '0077454A7', mat: 'KoolMu', shape: 'Toroid', size: '454', Al_14: 25, Al_19: 34, Al_26: 47, Al_40: 72, Al_60: 108, Al_75: 135, Al_90: 161, Al_125: 224, Al_147: 0, Al_160: 0, Le: 102.00, Ae: 147.50, Ve: 15100.0, OD: 43.84, ID: 23.39, HT: 17.27, Aw: 429.685, Ap: 63378.50 },
{mfg: 'Magnetics', pn: '0077089A7', mat: 'KoolMu', shape: 'Toroid', size: '089', Al_14: 20, Al_19: 27, Al_26: 37, Al_40: 57, Al_60: 86, Al_75: 107, Al_90: 128, Al_125: 178, Al_147: 0, Al_160: 0, Le: 116.00, Ae: 134.00, Ve: 15600.0, OD: 47.63, ID: 27.89, HT: 16.13, Aw: 610.923, Ap: 81863.69 },
{mfg: 'Magnetics', pn: '0077438A7', mat: 'KoolMu', shape: 'Toroid', size: '438', Al_14: 32, Al_19: 43, Al_26: 59, Al_40: 90, Al_60: 135, Al_75: 169, Al_90: 202, Al_125: 281, Al_147: 0, Al_160: 0, Le: 107.00, Ae: 199.00, Ve: 21300.0, OD: 47.63, ID: 23.32, HT: 18.92, Aw: 427.117, Ap: 84996.23 },
{mfg: 'Magnetics', pn: '0077725A7', mat: 'KoolMu', shape: 'Toroid', size: '725', Al_14: 41, Al_19: 56, Al_26: 76, Al_40: 117, Al_60: 175, Al_75: 219, Al_90: 269, Al_125: 366, Al_147: 0, Al_160: 0, Le: 114.00, Ae: 262.00, Ve: 29700.0, OD: 51.51, ID: 24.00, HT: 21.59, Aw: 452.389, Ap: 118525.91 },
{mfg: 'Magnetics', pn: '0077715A7', mat: 'KoolMu', shape: 'Toroid', size: '715', Al_14: 17, Al_19: 23, Al_26: 32, Al_40: 49, Al_60: 73, Al_75: 91, Al_90: 109, Al_125: 152, Al_147: 0, Al_160: 0, Le: 127.00, Ae: 125.00, Ve: 15900.0, OD: 51.69, ID: 30.94, HT: 14.35, Aw: 751.848, Ap: 93981.02 },
{mfg: 'Magnetics', pn: '0077540A7', mat: 'KoolMu', shape: 'Toroid', size: '540', Al_14: 24, Al_19: 33, Al_26: 45, Al_40: 69, Al_60: 104, Al_75: 130, Al_90: 156, Al_125: 217, Al_147: 0, Al_160: 0, Le: 126.00, Ae: 174.00, Ve: 22000.0, OD: 54.90, ID: 28.10, HT: 15.30, Aw: 620.158, Ap: 107907.44 },
{mfg: 'Magnetics', pn: '0077109A7', mat: 'KoolMu', shape: 'Toroid', size: '109', Al_14: 18, Al_19: 24, Al_26: 33, Al_40: 50, Al_60: 75, Al_75: 94, Al_90: 112, Al_125: 156, Al_147: 0, Al_160: 0, Le: 143.00, Ae: 144.00, Ve: 20700.0, OD: 58.04, ID: 34.75, HT: 14.86, Aw: 948.417, Ap: 136571.99 },
{mfg: 'Magnetics', pn: '0077195A7', mat: 'KoolMu', shape: 'Toroid', size: '195', Al_14: 32, Al_19: 44, Al_26: 60, Al_40: 92, Al_60: 138, Al_75: 172, Al_90: 207, Al_125: 287, Al_147: 0, Al_160: 0, Le: 125.00, Ae: 229.00, Ve: 28600.0, OD: 58.04, ID: 25.58, HT: 16.13, Aw: 513.914, Ap: 117686.35 },
{mfg: 'Magnetics', pn: '0077596A7', mat: 'KoolMu', shape: 'Toroid', size: '596', Al_14: 29, Al_19: 39, Al_26: 54, Al_40: 83, Al_60: 125, Al_75: 156, Al_90: 187, Al_125: 259, Al_147: 0, Al_160: 0, Le: 143.00, Ae: 237.00, Ve: 33900.0, OD: 60.60, ID: 33.00, HT: 20.50, Aw: 855.298, Ap: 202705.60 },
{mfg: 'Magnetics', pn: '0077620A7', mat: 'KoolMu', shape: 'Toroid', size: '620', Al_14: 44, Al_19: 60, Al_26: 82, Al_40: 126, Al_60: 189, Al_75: 237, Al_90: 284, Al_125: 394, Al_147: 0, Al_160: 0, Le: 144.00, Ae: 360.00, Ve: 51800.0, OD: 63.09, ID: 31.70, HT: 25.91, Aw: 789.238, Ap: 284125.71 },
{mfg: 'Magnetics', pn: '0077070A7', mat: 'KoolMu', shape: 'Toroid', size: '070', Al_14: 35, Al_19: 48, Al_26: 65, Al_40: 100, Al_60: 143, Al_75: 187, Al_90: 225, Al_125: 312, Al_147: 0, Al_160: 0, Le: 158.00, Ae: 314.00, Ve: 49700.0, OD: 69.42, ID: 34.67, HT: 21.41, Aw: 944.055, Ap: 296433.20 },
{mfg: 'Magnetics', pn: '0077778A7', mat: 'KoolMu', shape: 'Toroid', size: '778', Al_14: 47, Al_19: 64, Al_26: 88, Al_40: 135, Al_60: 205, Al_75: 256, Al_90: 306, Al_125: 425, Al_147: 0, Al_160: 0, Le: 177.20, Ae: 492.00, Ve: 81500.0, OD: 78.94, ID: 38.33, HT: 26.85, Aw: 1153.897, Ap: 567717.47 },
{mfg: 'Magnetics', pn: '0077740A7', mat: 'KoolMu', shape: 'Toroid', size: '740', Al_14: 48, Al_19: 64, Al_26: 88, Al_40: 136, Al_60: 204, Al_75: 255, Al_90: 306, Al_125: 425, Al_147: 0, Al_160: 0, Le: 184.00, Ae: 497.00, Ve: 91400.0, OD: 75.21, ID: 44.40, HT: 35.92, Aw: 1548.301, Ap: 769505.70 },
{mfg: 'Magnetics', pn: '0077866A7', mat: 'KoolMu', shape: 'Toroid', size: '866', Al_14: 16, Al_19: 22, Al_26: 30, Al_40: 45, Al_60: 68, Al_75: 85, Al_90: 102, Al_125: 142, Al_147: 0, Al_160: 0, Le: 196.00, Ae: 176.00, Ve: 34500.0, OD: 78.94, ID: 48.21, HT: 13.84, Aw: 1825.424, Ap: 321274.64 },
{mfg: 'Magnetics', pn: '0077906A7', mat: 'KoolMu', shape: 'Toroid', size: '906', Al_14: 20, Al_19: 27, Al_26: 37, Al_40: 57, Al_60: 85, Al_75: 106, Al_90: 128, Al_125: 177, Al_147: 0, Al_160: 0, Le: 196.00, Ae: 221.00, Ve: 43400.0, OD: 78.94, ID: 48.21, HT: 17.02, Aw: 1825.424, Ap: 403418.72 },
{mfg: 'Magnetics', pn: '0077102A7', mat: 'KoolMu', shape: 'Toroid', size: '102', Al_14: 26, Al_19: 35, Al_26: 48, Al_40: 74, Al_60: 111, Al_75: 139, Al_90: 167, Al_125: 232, Al_147: 0, Al_160: 0, Le: 243.00, Ae: 358.00, Ve: 86900.0, OD: 103.00, ID: 55.75, HT: 17.91, Aw: 2441.065, Ap: 873901.10 },
{mfg: 'Magnetics', pn: '0077337A7', mat: 'KoolMu', shape: 'Toroid', size: '337', Al_14: 37, Al_19: 50, Al_26: 68, Al_40: 105, Al_60: 158, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 324.00, Ae: 678.00, Ve: 220000.0, OD: 133.96, ID: 77.19, HT: 26.80, Aw: 4679.631, Ap: 3172789.72 },
{mfg: 'Magnetics', pn: '0077165A7', mat: 'KoolMu', shape: 'Toroid', size: '165', Al_14: 42, Al_19: 57, Al_26: 78, Al_40: 0, Al_60: 0, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 412.00, Ae: 987.00, Ve: 407000.0, OD: 166.50, ID: 101.02, HT: 33.15, Aw: 8015.013, Ap: 7910818.05 },
{mfg: 'Magnetics', pn: '0077171A7', mat: 'KoolMu', shape: 'Toroid', size: '171', Al_14: 42, Al_19: 58, Al_26: 80, Al_40: 0, Al_60: 0, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 386.50, Ae: 948.00, Ve: 366700.0, OD: 167.21, ID: 86.89, HT: 27.31, Aw: 5929.651, Ap: 5621308.84 },
{mfg: 'Magnetics', pn: '0079050A7', mat: 'KoolMuMax', shape: 'Toroid', size: '050', Al_14: 6, Al_19: 9, Al_26: 12, Al_40: 18, Al_60: 27, Al_75: 34, Al_90: 40, Al_125: 0, Al_147: 0, Al_160: 0, Le: 31.20, Ae: 10.90, Ve: 340.0, OD: 13.46, ID: 6.99, HT: 5.51, Aw: 38.375, Ap: 418.28 },
{mfg: 'Magnetics', pn: '0079120A7', mat: 'KoolMuMax', shape: 'Toroid', size: '120', Al_14: 8, Al_19: 11, Al_26: 15, Al_40: 24, Al_60: 35, Al_75: 43, Al_90: 52, Al_125: 0, Al_147: 0, Al_160: 0, Le: 41.20, Ae: 19.20, Ve: 791.0, OD: 17.27, ID: 9.52, HT: 7.11, Aw: 71.181, Ap: 1366.67 },
{mfg: 'Magnetics', pn: '0079380A7', mat: 'KoolMuMax', shape: 'Toroid', size: '380', Al_14: 10, Al_19: 14, Al_26: 19, Al_40: 28, Al_60: 43, Al_75: 53, Al_90: 64, Al_125: 0, Al_147: 0, Al_160: 0, Le: 41.40, Ae: 23.20, Ve: 960.0, OD: 18.03, ID: 9.02, HT: 7.11, Aw: 63.900, Ap: 1482.49 },
{mfg: 'Magnetics', pn: '0079206A7', mat: 'KoolMuMax', shape: 'Toroid', size: '206', Al_14: 7, Al_19: 10, Al_26: 14, Al_40: 21, Al_60: 32, Al_75: 41, Al_90: 49, Al_125: 0, Al_147: 0, Al_160: 0, Le: 50.90, Ae: 22.10, Ve: 1120.0, OD: 21.08, ID: 12.07, HT: 7.11, Aw: 114.421, Ap: 2528.69 },
{mfg: 'Magnetics', pn: '0079310A7', mat: 'KoolMuMax', shape: 'Toroid', size: '310', Al_14: 9, Al_19: 14, Al_26: 19, Al_40: 29, Al_60: 43, Al_75: 54, Al_90: 65, Al_125: 0, Al_147: 0, Al_160: 0, Le: 56.70, Ae: 31.70, Ve: 1800.0, OD: 23.62, ID: 13.34, HT: 8.38, Aw: 139.766, Ap: 4430.58 },
{mfg: 'Magnetics', pn: '0079350A7', mat: 'KoolMuMax', shape: 'Toroid', size: '350', Al_14: 12, Al_19: 16, Al_26: 22, Al_40: 34, Al_60: 51, Al_75: 63, Al_90: 76, Al_125: 0, Al_147: 0, Al_160: 0, Le: 58.80, Ae: 38.80, Ve: 2280.0, OD: 24.33, ID: 13.77, HT: 9.65, Aw: 148.921, Ap: 5778.15 },
{mfg: 'Magnetics', pn: '0079930A7', mat: 'KoolMuMax', shape: 'Toroid', size: '930', Al_14: 18, Al_19: 23, Al_26: 32, Al_40: 50, Al_60: 75, Al_75: 94, Al_90: 113, Al_125: 0, Al_147: 0, Al_160: 0, Le: 63.50, Ae: 65.40, Ve: 4150.0, OD: 27.69, ID: 14.10, HT: 11.94, Aw: 156.145, Ap: 10211.87 },
{mfg: 'Magnetics', pn: '0079548A7', mat: 'KoolMuMax', shape: 'Toroid', size: '548', Al_14: 14, Al_19: 20, Al_26: 28, Al_40: 41, Al_60: 61, Al_75: 0, Al_90: 91, Al_125: 0, Al_147: 0, Al_160: 0, Le: 81.40, Ae: 65.60, Ve: 5340.0, OD: 33.66, ID: 19.46, HT: 11.43, Aw: 297.423, Ap: 19510.98 },
{mfg: 'Magnetics', pn: '0079585A7', mat: 'KoolMuMax', shape: 'Toroid', size: '585', Al_14: 9, Al_19: 12, Al_26: 16, Al_40: 25, Al_60: 38, Al_75: 47, Al_90: 57, Al_125: 0, Al_147: 0, Al_160: 0, Le: 89.50, Ae: 46.60, Ve: 4150.0, OD: 35.18, ID: 22.56, HT: 9.78, Aw: 399.731, Ap: 18627.46 },
{mfg: 'Magnetics', pn: '0079324A7', mat: 'KoolMuMax', shape: 'Toroid', size: '324', Al_14: 13, Al_19: 18, Al_26: 24, Al_40: 37, Al_60: 56, Al_75: 70, Al_90: 84, Al_125: 0, Al_147: 0, Al_160: 0, Le: 89.80, Ae: 67.80, Ve: 6090.0, OD: 36.70, ID: 21.54, HT: 11.35, Aw: 364.402, Ap: 24706.46 },
{mfg: 'Magnetics', pn: '0079395A7', mat: 'KoolMuMax', shape: 'Toroid', size: '395', Al_14: 28, Al_19: 39, Al_26: 53, Al_40: 81, Al_60: 122, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 95.10, Ae: 153.70, Ve: 14617.0, OD: 40.94, ID: 21.27, HT: 17.89, Aw: 355.324, Ap: 54613.29 },
{mfg: 'Magnetics', pn: '0079254A7', mat: 'KoolMuMax', shape: 'Toroid', size: '254', Al_14: 19, Al_19: 26, Al_26: 35, Al_40: 54, Al_60: 81, Al_75: 101, Al_90: 121, Al_125: 0, Al_147: 0, Al_160: 0, Le: 98.40, Ae: 107.00, Ve: 10600.0, OD: 40.77, ID: 23.32, HT: 15.37, Aw: 427.117, Ap: 45701.49 },
{mfg: 'Magnetics', pn: '0079454A7', mat: 'KoolMuMax', shape: 'Toroid', size: '454', Al_14: 25, Al_19: 34, Al_26: 47, Al_40: 72, Al_60: 108, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 102.00, Ae: 147.50, Ve: 15100.0, OD: 43.84, ID: 23.39, HT: 17.27, Aw: 429.685, Ap: 63378.50 },
{mfg: 'Magnetics', pn: '0079089A7', mat: 'KoolMuMax', shape: 'Toroid', size: '089', Al_14: 20, Al_19: 27, Al_26: 37, Al_40: 57, Al_60: 86, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 116.00, Ae: 134.00, Ve: 15600.0, OD: 47.63, ID: 27.89, HT: 16.13, Aw: 610.923, Ap: 81863.69 },
{mfg: 'Magnetics', pn: '0079438A7', mat: 'KoolMuMax', shape: 'Toroid', size: '438', Al_14: 32, Al_19: 43, Al_26: 59, Al_40: 90, Al_60: 135, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 107.00, Ae: 199.00, Ve: 21300.0, OD: 47.63, ID: 23.32, HT: 18.92, Aw: 427.117, Ap: 84996.23 },
{mfg: 'Magnetics', pn: '0079725A7', mat: 'KoolMuMax', shape: 'Toroid', size: '725', Al_14: 41, Al_19: 56, Al_26: 76, Al_40: 117, Al_60: 175, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 114.00, Ae: 262.00, Ve: 29700.0, OD: 51.51, ID: 24.00, HT: 21.59, Aw: 452.389, Ap: 118525.91 },
{mfg: 'Magnetics', pn: '0079715A7', mat: 'KoolMuMax', shape: 'Toroid', size: '715', Al_14: 17, Al_19: 23, Al_26: 32, Al_40: 49, Al_60: 73, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 127.00, Ae: 125.00, Ve: 15900.0, OD: 51.69, ID: 30.94, HT: 14.34, Aw: 751.848, Ap: 93981.02 },
{mfg: 'Magnetics', pn: '0079540A7', mat: 'KoolMuMax', shape: 'Toroid', size: '540', Al_14: 24, Al_19: 33, Al_26: 45, Al_40: 69, Al_60: 104, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 126.00, Ae: 174.00, Ve: 22000.0, OD: 54.90, ID: 28.10, HT: 15.30, Aw: 620.158, Ap: 107907.44 },
{mfg: 'Magnetics', pn: '0079109A7', mat: 'KoolMuMax', shape: 'Toroid', size: '109', Al_14: 18, Al_19: 24, Al_26: 33, Al_40: 50, Al_60: 75, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 143.00, Ae: 144.00, Ve: 20700.0, OD: 58.04, ID: 34.75, HT: 14.86, Aw: 948.417, Ap: 136571.99 },
{mfg: 'Magnetics', pn: '0079195A7', mat: 'KoolMuMax', shape: 'Toroid', size: '195', Al_14: 32, Al_19: 44, Al_26: 60, Al_40: 92, Al_60: 138, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 125.00, Ae: 229.00, Ve: 28600.0, OD: 58.04, ID: 25.58, HT: 16.13, Aw: 513.914, Ap: 117686.35 },
{mfg: 'Magnetics', pn: '0079596A7', mat: 'KoolMuMax', shape: 'Toroid', size: '596', Al_14: 29, Al_19: 39, Al_26: 54, Al_40: 83, Al_60: 125, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 143.00, Ae: 237.00, Ve: 33900.0, OD: 60.60, ID: 33.00, HT: 20.50, Aw: 855.298, Ap: 202705.60 },
{mfg: 'Magnetics', pn: '0079620A7', mat: 'KoolMuMax', shape: 'Toroid', size: '620', Al_14: 44, Al_19: 60, Al_26: 82, Al_40: 126, Al_60: 189, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 144.00, Ae: 360.00, Ve: 51800.0, OD: 63.09, ID: 31.70, HT: 25.91, Aw: 789.238, Ap: 284125.71 },
{mfg: 'Magnetics', pn: '0079070A7', mat: 'KoolMuMax', shape: 'Toroid', size: '070', Al_14: 33, Al_19: 48, Al_26: 65, Al_40: 100, Al_60: 143, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 158.00, Ae: 314.00, Ve: 49700.0, OD: 69.42, ID: 34.67, HT: 21.41, Aw: 944.055, Ap: 296433.20 },
{mfg: 'Magnetics', pn: '0079778A7', mat: 'KoolMuMax', shape: 'Toroid', size: '778', Al_14: 47, Al_19: 64, Al_26: 88, Al_40: 135, Al_60: 205, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 177.20, Ae: 492.00, Ve: 81500.0, OD: 78.94, ID: 38.33, HT: 26.85, Aw: 1153.897, Ap: 567717.47 },
{mfg: 'Magnetics', pn: '0079740A7', mat: 'KoolMuMax', shape: 'Toroid', size: '740', Al_14: 48, Al_19: 64, Al_26: 88, Al_40: 136, Al_60: 204, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 184.00, Ae: 497.00, Ve: 91400.0, OD: 75.21, ID: 44.40, HT: 35.92, Aw: 1548.301, Ap: 769505.70 },
{mfg: 'Magnetics', pn: '0079866A7', mat: 'KoolMuMax', shape: 'Toroid', size: '866', Al_14: 16, Al_19: 22, Al_26: 30, Al_40: 45, Al_60: 68, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 196.00, Ae: 176.00, Ve: 34500.0, OD: 78.94, ID: 48.21, HT: 13.84, Aw: 1825.424, Ap: 321274.64 },
{mfg: 'Magnetics', pn: '0079906A7', mat: 'KoolMuMax', shape: 'Toroid', size: '906', Al_14: 20, Al_19: 27, Al_26: 37, Al_40: 57, Al_60: 85, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 196.00, Ae: 221.00, Ve: 43400.0, OD: 78.94, ID: 48.21, HT: 17.02, Aw: 1825.424, Ap: 403418.72 },
{mfg: 'Magnetics', pn: '0079102A7', mat: 'KoolMuMax', shape: 'Toroid', size: '102', Al_14: 26, Al_19: 35, Al_26: 48, Al_40: 74, Al_60: 111, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 243.00, Ae: 358.00, Ve: 86900.0, OD: 103.00, ID: 55.75, HT: 17.91, Aw: 2441.065, Ap: 873901.10 },
{mfg: 'Magnetics', pn: '0079337A7', mat: 'KoolMuMax', shape: 'Toroid', size: '337', Al_14: 37, Al_19: 50, Al_26: 68, Al_40: 0, Al_60: 0, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 324.00, Ae: 678.00, Ve: 220000.0, OD: 133.96, ID: 77.19, HT: 26.80, Aw: 4679.631, Ap: 3172789.72 },
{mfg: 'Magnetics', pn: '0079165A7', mat: 'KoolMuMax', shape: 'Toroid', size: '165', Al_14: 42, Al_19: 0, Al_26: 0, Al_40: 0, Al_60: 0, Al_75: 0, Al_90: 0, Al_125: 0, Al_147: 0, Al_160: 0, Le: 412.00, Ae: 987.00, Ve: 407000.0, OD: 166.50, ID: 101.02, HT: 33.15, Aw: 8015.013, Ap: 7910818.05 },
];

/*
 * This table gives physical properties of a given core size.
 * The same core size can be made from different materials and have different mu values.
 * 
 * mfg      -- manufacturer
 * shape    -- shape of core
 * size     -- label for size of core, sizes may have same OD, but different ID or HT
 * Le       -- Magnetic length of 1 winding, mm
 * Ae       -- Cross section area, mm**2
 * Ve       -- Magnetic volume, mm**3
 * Aw       -- Window area, mm**2
 * Ap       -- Area Product, mm**4
 * OD       -- Outer diameter, including finish coating, mm
 * ID       -- Inner diameter, including finish coating, mm
 * HT       -- Height, mm
 * 
 * This table is currently incomplete.  Since we are primarily interested in higher power
 * inverters, most of the small cores have not been included in this table.
 */

icosalogic.inv_design.ind_cor_size_table = [
{mfg: 'Magnetics', shape: 'Toroid', size: '93x', Le:  63.50, Ae:  65.40, Ve:   4150.0, Aw:   156, Ap:    10200, OD:  27.69, ID:  14.10, HT: 11.94 },
{mfg: 'Magnetics', shape: 'Toroid', size: '71x', Le: 127.00, Ae: 125.00, Ve:  15900.0, Aw:   751, Ap:    94000, OD:  51.69, ID:  30.94, HT: 14.35 },
{mfg: 'Magnetics', shape: 'Toroid', size: '11x', Le: 143.00, Ae: 144.00, Ve:  20700.0, Aw:   948, Ap:   137000, OD:  58.04, ID:  34.75, HT: 14.86 },
{mfg: 'Magnetics', shape: 'Toroid', size: '19x', Le: 125.00, Ae: 229.00, Ve:  28600.0, Aw:   514, Ap:   118000, OD:  58.04, ID:  25.58, HT: 16.13 },
{mfg: 'Magnetics', shape: 'Toroid', size: '61x', Le: 144.00, Ae: 360.00, Ve:  51800.0, Aw:   789, Ap:   284000, OD:  63.09, ID:  31.70, HT: 25.91 },
{mfg: 'Magnetics', shape: 'Toroid', size: '06x', Le: 158.00, Ae: 314.00, Ve:  49700.0, Aw:   945, Ap:   297000, OD:  69.42, ID:  34.67, HT: 21.41 },
{mfg: 'Magnetics', shape: 'Toroid', size: '73x', Le: 184.00, Ae: 497.00, Ve:  91400.0, Aw:  1550, Ap:   769000, OD:  75.21, ID:  44.40, HT: 35.92 },
{mfg: 'Magnetics', shape: 'Toroid', size: '86x', Le: 196.00, Ae: 176.00, Ve:  34500.0, Aw:  1820, Ap:   321000, OD:  78.94, ID:  48.21, HT: 13.84 },
{mfg: 'Magnetics', shape: 'Toroid', size: '90x', Le: 196.00, Ae: 221.00, Ve:  43400.0, Aw:  1820, Ap:   403000, OD:  78.94, ID:  48.21, HT: 17.02 },
{mfg: 'Magnetics', shape: 'Toroid', size: '778', Le: 177.20, Ae: 492.00, Ve:  81500.0, Aw:  1150, Ap:   550000, OD:  78.94, ID:  38.33, HT: 26.85 },
{mfg: 'Magnetics', shape: 'Toroid', size: '10x', Le: 243.00, Ae: 358.00, Ve:  86900.0, Aw:  2470, Ap:   885000, OD: 103.00, ID:  55.75, HT: 17.91 },
{mfg: 'Magnetics', shape: 'Toroid', size: '33x', Le: 324.00, Ae: 678.00, Ve: 220000.0, Aw:  4710, Ap:  3190000, OD: 133.96, ID:  77.19, HT: 26.80 },
{mfg: 'Magnetics', shape: 'Toroid', size: '16x', Le: 412.00, Ae: 987.00, Ve: 407000.0, Aw:  8030, Ap:  7920000, OD: 166.50, ID: 101.02, HT: 33.15 },
{mfg: 'Magnetics', shape: 'Toroid', size: '17x', Le: 386.50, Ae: 948.00, Ve: 366700.0, Aw:  5930, Ap:  5620000, OD: 167.21, ID:  86.89, HT: 27.31 },
];

/*
 * This table gives the part number, size, material, mu, and Al for a specific part.
 * This is an improved representation over the original table.
 * 
 * mfg      -- manufacturer
 * pn       -- part number
 * mat      -- material
 * size     -- size of core, mfg specific
 * mu       -- mu for this part
 * Al       -- inductance per turn
 * 
 * This table is also incomplete, as it contains entries of most interest
 * when building high-power inverters.
 */

icosalogic.inv_design.ind_cor_pn_table = [
{mfg: 'Magnetics', pn: '0077894A7', mat: 'KoolMu',    size: '93x', mu: 60, Al:  75 },
{mfg: 'Magnetics', pn: '0077101A7', mat: 'KoolMu',    size: '10x', mu: 14, Al:  26 },
{mfg: 'Magnetics', pn: '0077102A7', mat: 'KoolMu',    size: '10x', mu: 26, Al:  48 },
{mfg: 'Magnetics', pn: '0077100A7', mat: 'KoolMu',    size: '10x', mu: 40, Al:  74 },
{mfg: 'Magnetics', pn: '0077099A7', mat: 'KoolMu',    size: '10x', mu: 60, Al: 111 },
{mfg: 'Magnetics', pn: '0077336A7', mat: 'KoolMu',    size: '33x', mu: 14, Al:  37 },
{mfg: 'Magnetics', pn: '0077337A7', mat: 'KoolMu',    size: '33x', mu: 26, Al:  68 },
{mfg: 'Magnetics', pn: '0077338A7', mat: 'KoolMu',    size: '33x', mu: 40, Al: 105 },
{mfg: 'Magnetics', pn: '0077339A7', mat: 'KoolMu',    size: '33x', mu: 60, Al: 158 },
{mfg: 'Magnetics', pn: '0077164A7', mat: 'KoolMu',    size: '16x', mu: 14, Al:  42 },
{mfg: 'Magnetics', pn: '0077165A7', mat: 'KoolMu',    size: '16x', mu: 26, Al:  78 },
{mfg: 'Magnetics', pn: '0079101A7', mat: 'KoolMuMax', size: '10x', mu: 14, Al:  26 },
{mfg: 'Magnetics', pn: '0079097A7', mat: 'KoolMuMax', size: '10x', mu: 19, Al:  35 },
{mfg: 'Magnetics', pn: '0079102A7', mat: 'KoolMuMax', size: '10x', mu: 26, Al:  48 },
{mfg: 'Magnetics', pn: '0079100A7', mat: 'KoolMuMax', size: '10x', mu: 40, Al:  74 },
{mfg: 'Magnetics', pn: '0079099A7', mat: 'KoolMuMax', size: '10x', mu: 60, Al: 111 },
{mfg: 'Magnetics', pn: '0079336A7', mat: 'KoolMuMax', size: '33x', mu: 14, Al:  37 },
{mfg: 'Magnetics', pn: '0079342A7', mat: 'KoolMuMax', size: '33x', mu: 19, Al:  50 },
{mfg: 'Magnetics', pn: '0079337A7', mat: 'KoolMuMax', size: '33x', mu: 26, Al:  68 },
{mfg: 'Magnetics', pn: '0079164A7', mat: 'KoolMuMax', size: '16x', mu: 14, Al:  42 },
];

/*
 * This table gives various attributes for different inductor materials.
 * 
 * mat   -- material
 * max_j -- max conductor current density in A/mm**2
 * B_max -- max magnetic field density in T
 */

icosalogic.inv_design.ind_cor_mat_table = [
{mat: 'KoolMu',    max_j: 4, B_max: 0.6 },
{mat: 'KoolMuMax', max_j: 6, B_max: 0.8 },
];
