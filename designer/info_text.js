/*
 * Contents of the information pop up for each data item in the app.
 */

// icosalogic = {};
// icosalogic.inv_design = {};
icosalogic.inv_design.info_text = [
{key: 'configs',            itxt: '<b>cur_cfg:</b> Select one of the defined configs using the drop down.<br>' +
                                  'Delete the currently selected config with the Delete button.<br>' +
				  'The Print button can be used to print/backup/export the config data.<br>' +
				  'Hitting ESC will close the print dialog window.<br>' +
                                  'The status circle is red if any component in the config is<br>' +
                                  'in error, or green if the config is OK.'},
{key: 'new_cfg',            itxt: '<b>new_cfg:</b> To create a new config, enter a name in the box, and click Create.<br>' +
                                  'Data for a config is stored in the local browser storage, and is not shared across ' +
				  'different computers or users.<br>' +
                                  'A config persists until you delete it, purge it, or clear the browser storage.'},
{key: 'cfg_purge',          itxt: '<b>cfg_purge:</b> Purge deletes all configs, and reloads the app from scratch with the default config.'},

// Basics
{key: 'out_freq',           itxt: '<b>f<sub>out</sub>:</b> The 2 commonly used AC frequencies are 50 and 60 Hz.'},
{key: 'out_freq_omega',     itxt: '<b>ω<sub>out</sub>:</b> Omega value for the output frequency.  Equal to 2 * π * f<sub>out</sub>.  (Read only)'},
{key: 'skin_depth_out',     itxt: '<b>d<sub>skin_out</sub>:</b> Skin depth at f<sub>out</sub>.<br>' +
                                  'Skin depth at f<sub>out</sub> will be greater than at f<sub>sw</sub>, see below.<br>' +
                                  'Equal to 503000 * sqrt(1.678e-8 / f<sub>out</sub>) mm. (Read only)'},
{key: 'sw_freq',            itxt: '<b>f<sub>sw</sub>:</b> This is the output transistor switching frequency.<br>' +
                                  'More precisely, this is the frequency at which we decide to turn the FET on/off.<br>' +
				  'Calculations involving both on and off phases should consider f<sub>sw</sub> / 2 as<br>' +
				  'the effective maximum frequency.'},
{key: 'sw_omega',           itxt: '<b>ω<sub>sw</sub>:</b> Omega value for the effective sw frequency.<br>Equal to 2 * π * (f<sub>sw</sub> / 2). (Read only)'},
{key: 'sw_cycle_us',        itxt: '<b>t<sub>sw</sub>:</b> Cycle time for the sw frequency in microseconds.<br>' +
                                  'Equal to 1e6 / f<sub>sw</sub>. (Read only)'},
{key: 'skin_depth_sw',      itxt: '<b>d<sub>skin_sw</sub>:</b> Skin depth at f<sub>sw</sub>.<br>' +
				  'Designers of inverters operating at higher frequencies must take skin<br>' +
				  'depth into account when selecting conductors.<br>' +
                                  'Since cycle-by-cycle switching takes at minimum 2 cycles for a complete on/off<br>' +
				  'transition, the skin depth is calculated at f<sub>sw</sub> / 2.<br>' +
                                  'Equal to 503000 * sqrt(1.678e-8 / (f<sub>sw</sub> / 2)) mm. (Read only)'},
{key: 'out_amps',           itxt: '<b>I<sub>out</sub>:</b> Enter the max output current for this config.'},
{key: 'out_voltage',        itxt: '<b>V<sub>rms</sub>:</b> Enter the output RMS voltage produced for this config.'},
{key: 'out_voltage_pp',     itxt: '<b>V<sub>pp</sub>:</b> The peak-to-peak output voltage.  Equal to V<sub>rms</sub> * sqrt(2) * 2. (Read only)'},
{key: 'out_lines',          itxt: '<b>lines:</b> Enter the number of output lines for this config.'},
{key: 'out_watts',          itxt: '<b>P<sub>out</sub>:</b> Total power produced by this config.  Equal to<br>' +
                                  'I<sub>out</sub> * V<sub>rms</sub> * lines.  (Read only)'},
{key: 'est_eff',            itxt: '<b>η:</b> Enter the estimated efficiency for this config.  Usually this is between 80 and 99%.'},
{key: 'i_in_line',          itxt: '<b>I<sub>in_line</sub>:</b> Estimated min, nominal and max input currents per line for this config.<br>' +
                                  'Equal to (I<sub>out</sub> * V<sub>rms</sub>) / (η * V<sub>pack</sub>).  Note that lower pack voltages require<br>' +
                                  'higher currents for the same output power. (Read only)'},
{key: 'i_in',               itxt: '<b>I<sub>in</sub>:</b> Estimated total min, nominal and max input currents for this config.<br>' +
                                  'Equal to lines*I<sub>in_line</sub>.  Note that lower pack voltages require<br>' +
                                  'higher currents for the same output power. (Read only)'},

// Battery
{key: 'bat_v_cell',         itxt: '<b>V<sub>cell</sub>:</b> The min, nominal, and max voltage for each cell in the battery pack.'},
{key: 'bat_series',         itxt: '<b>bat_series:</b> The number of cells in series in the pack.'},
{key: 'v_pack',             itxt: '<b>V<sub>pack</sub>:</b> These values are calculated from the min, nominal,<br>' +
                                  'and max cell voltages times the number of cells in<br>' +
                                  'series in the pack.  This value is invalid if V_pack_min<br>' +
                                  'is less than Vpp.'},

// Bus Configuration
{key: 'bus_type',           itxt: '<b>bus_type:</b> Choices are a point-to-point stranded wire, or a laminated, multilayer bus.'},
{key: 'j_cond',             itxt: '<b>j<sub>cond</sub>:</b> Current density in conductors.  Good values are between 4.0 and 6.0'},
{key: 'wire_pn',            itxt: '<b>wire_pn:</b> Select a wire to satisfy the requirements.'},
{key: 'wire_awg',           itxt: '<b>wire_awg:</b> The American Wire Gauge (AWG) of the wire. (Read only)'},
{key: 'wire_dia',           itxt: '<b>wire_dia:</b> The diameter of the wire, including insulation. (Read only)'},
{key: 'wire_strand_dia',    itxt: '<b>wire_strand_dia:</b> The diameter of a single strand in the wire. (Read only)'},
{key: 'wire_strands',       itxt: '<b>wire_strands:</b> The number of strands in the wire.  Must be 1 or more. (Read only)'},
{key: 'wire_i_sw',          itxt: '<b>I<sub>wire_in</sub>:</b> The current carrying capacity of the wire at the switching frequency, assuming J<sub>cond</sub> A/mm<sup>2</sup>, and including skin effect.<br>' +
                                  'Equal to SA * strands * J<sub>cond</sub>, where strand radius SR = strand_dia / 2, and strand area SA = SR<sup>2</sup> * π if SR <= d<sub>skin_sw</sub>, or<br>' +
				  'SA = (SR<sup>2</sup> - (SR - d<sub>skin_sw</sub>)<sup>2</sup>) * π if SR > d<sub>skin_sw</sub>.<br>' +
				  'This value should be greater than I<sub>in_max</sub>. (Read only)'},
{key: 'wire_i_out',         itxt: '<b>I<sub>wire_in</sub>:</b> The current carrying capacity of the wire at the output frequency, assuming J<sub>cond</sub> A/mm<sup>2</sup>, and including skin effect.<br>' +
                                  'Equal to SA * strands * J<sub>cond</sub>, where strand radius SR = strand_dia / 2, and strand area SA = SR<sup>2</sup> * π if SR <= d<sub>skin_out</sub>, or<br>' +
				  'SA = (SR<sup>2</sup> - (SR - d<sub>skin_out</sub>)<sup>2</sup>) * π if SR > d<sub>skin_out</sub>.<br>' +
				  'This value should be greater than I<sub>out</sub>. (Read only)'},
{key: 'wire_r_sw',          itxt: '<b>R<sub>wire_in</sub>:</b> The resistance of the wire at the switching frequency, including skin effect.<br>' +
                                  'Equal to SA * strands * 1.75e-8, where strand radius SR = strand_dia / 2, and strand area SA = SR<sup>2</sup> * π if SR <= d<sub>skin_sw</sub>, or<br>' +
				  'SA = (SR<sup>2</sup> - (SR - d<sub>skin_sw</sub>)<sup>2</sup>) * π if SR > d<sub>skin_sw</sub>. (Read only)'},
{key: 'wire_r_out',         itxt: '<b>r<sub>wire_in</sub>:</b> The resistance of the wire at the output frequency, including skin effect.<br>' +
                                  'Equal to SA * strands * 1.75e-8, where strand radius SR = strand_dia / 2, and strand area SA = SR<sup>2</sup> * π if SR <= d<sub>skin_out</sub>, or<br>' +
				  'SA = (SR<sup>2</sup> - (SR - d<sub>skin_out</sub>)<sup>2</sup>) * π if SR > d<sub>skin_out</sub>. (Read only)'},
{key: 'bb_cu_recommend',    itxt: '<b>d<sub>CU recommend</sub>:</b> Recommended CU layer thickness. Approximately 2 * d<sub>skin_sw</sub>. (Read only)'},
{key: 'bb_cu_use_recommend',itxt: '<b>use_cu_recommend:</b> Check this box if you would like to use the recommended CU thickness.<br>' +
                                  'Otherwise, uncheck the box and enter a value in d<sub>CU actual</sub> below.'},
{key: 'bb_cu_thickness',    itxt: '<b>d<sub>CU actual</sub>:</b> Enter the CU thickness of each layer used in the bus bar.<br>' +
                                  'This value is set to d<sub>CU recommend</sub> if use_cu_recommend is checked.<br>' +
				  'If setting manually, choose a value greater than or equal to 2 * d<sub>skin_sw</sub>.'},
{key: 'bb_min_width',       itxt: '<b>min_cond_width:</b> Enter the minimum current path width in the bus bar.<br>' +
				  'Wider current paths usually require fewer layers in the bus bar (to a point).'},
{key: 'bb_num_layers',      itxt: '<b>cu_layers:</b> Number of CU layers required to carry I<sub>in</sub>, taking into account skin effect at f<sub>sw</sub>.<br>' +
                                  'Equal to I<sub>out</sub> / (J<sub>cond</sub> * bb_min_width * 2 * d<sub>skin_sw</sub>). (Read only)'},
{key: 'bb_i',               itxt: '<b>I<sub>bb</sub>:</b> The current capacity of the bus bar taking into account skin depth at f<sub>sw</sub>.<br>' +
                                  'The usable thickness UT = min(2 * d<sub>skin_sw</sub>, d<sub>CU actual</sub>).<br>' +
                                  'Equal to UT * min_cond_width * cu_layers * J<sub>cond</sub>.<br>' +
				  'This value should be greater than I<sub>in_max</sub>. (Read only)'},
{key: 'bb_i_out',           itxt: '<b>I<sub>bb_out</sub>:</b> The current capacity of the bus bar taking into account skin depth at f<sub>out</sub>.<br>' +
                                  'The usable thickness UT = min(2 * d<sub>skin_out</sub>, d<sub>CU actual</sub>).<br>' +
                                  'Equal to UT * min_cond_width * cu_layers * J<sub>cond</sub>.<br>' +
				  'This value should be greater than I<sub>out</sub>. (Read only)'},
{key: 'bb_sub_thickness',   itxt: '<b>d<sub>substrate</sub>:</b> Enter the thickness of the substrate on which the bus bar is built.<br>' +
                                  'Usually, this is 1.6 mm FR-4.'},
{key: 'bb_ild_thickness',   itxt: '<b>d<sub>ild</sub>:</b> Enter the thickness of the insulating layer between CU layers.'},
{key: 'bb_total_thickness', itxt: '<b>d<sub>total</sub>:</b> The total thickness of the bus bar, including the substrate, insulation, and copper layers.<br>' +
                                  'Equal to d<sub>substrate</sub> + 2 * (d<sub>CU actual</sub> * cu_layers) + 2 * (d<sub>ild</sub> * (cu_layers - 1)). (Read only)'},
                                  
// DC Link Capacitor
{key: 'dcl_dc_rms_factor',  itxt: '<b>dcl_dc_rms_factor:</b> Factor used to adjust the RMS current handled by the DC link capacitor.'},
{key: 'dcl_i_rms_max',      itxt: '<b>dcl_i_rms_max:</b> The RMS current handled by the DC link capacitor.<br>' +
                                  'Equal to I<sub>in_max</sub> * dcl_dc_rms_factor. (Read only)'},
{key: 'dcl_v_ripple',       itxt: '<b>dcl_v_ripple:</b> The maximum desired voltage ripple on the input.'},
{key: 'dcl_z_ripple',       itxt: '<b>dcl_z_ripple:</b> Equal to dcl_v_ripple / dcl_i_rms_max. (Read only)'},
{key: 'dcl_c_req',          itxt: '<b>C<sub>required</sub>:</b> Equal to 1000000 / (ω<sub>sw</sub> * dcl_z_ripple). (Read only)'},
{key: 'dcl_fom',            itxt: '<b>FoM:</b> A dimensionless value used to size the capacitor.<br>' +
                                  'Equal to dcl_v_ripple / ω<sub>sw</sub>. (Read only)'},
{key: 'dcl_cap_pn',         itxt: '<b>dcl_cap_pn:</b> Select a capacitor to satisfy the requirements.'},
{key: 'dcl_mfg',            itxt: '<b>dcl_mfg:</b>              From the datasheet. (Read only)'},
{key: 'dcl_tech',           itxt: '<b>dcl_tech:</b>             From the datasheet. (Read only)'},
{key: 'dcl_c',              itxt: '<b>C<sub>dcl</sub>:</b>      From the datasheet. (Read only)'},
{key: 'dcl_v_dc_max',       itxt: '<b>V<sub>dcl_dc</sub>:</b>   From the datasheet. (Read only)'},
{key: 'dcl_i_rms',          itxt: '<b>I<sub>dcl_rms</sub>:</b>  From the datasheet. (Read only)'},
{key: 'dcl_esl',            itxt: '<b>ESL<sub>dcl</sub>:</b>    From the datasheet. (Read only)'},
{key: 'dcl_esr',            itxt: '<b>ESR<sub>dcl</sub>:</b>    From the datasheet. (Read only)'},
{key: 'dcl_th_cc',          itxt: '<b>R<sub>dcl_θ_cc</sub>:</b> From the datasheet. (Read only)'},
{key: 'dcl_th_ca',          itxt: '<b>R<sub>dcl_θ_ca</sub>:</b> From the datasheet. (Read only)'},
{key: 'dcl_count',          itxt: '<b>dcl_count:</b> Select the number of capacitors to satisfy the requirements.'},
{key: 'dcl_fom_cap',        itxt: '<b>FoM_cap:</b> Figure of merit for the selected capacitor.<br>' +
                                  'Equal to I<sub>dcl_rms</sub> / C<sub>dcl</sub>. (Read only)'},
{key: 'dcl_fom_total',      itxt: '<b>FoM_total:</b> Equal to FoM_cap * dcl_count.<br>Should be greater than or equal to FoM above. (Read only)'},
{key: 'dcl_i_total',        itxt: '<b>I<sub>total</sub>:</b> Equal to I<sub>dcl_rms</sub> * dcl_count.<br>Should be greater than or equal to dcl_i_rms_max. (Read only)'},
{key: 'dcl_c_total',        itxt: '<b>C<sub>total</sub>:</b> Equal to C<sub>dcl</sub> * dcl_count.<br>' +
				  'Should be greater than or equal to C<sub>required</sub> * 0.9. (Read only)'},

// FET
{key: 'fet_count',          itxt: '<b>fet_count:</b> Select the number of FETs to satisfy the requirements.'},
{key: 'fet_pn',             itxt: '<b>fet_pn:</b> Select one of the FET options below.'},
{key: 'fet_mfg',            itxt: '<b>fet_mfg:</b>                 From the datasheet. (Read only)'},
{key: 'fet_tech',           itxt: '<b>fet_tech:</b>                From the datasheet. (Read only)'},
{key: 'fet_pkg',            itxt: '<b>fet_pkg:</b>                 From the datasheet. (Read only)'},
{key: 'fet_nhb',            itxt: '<b>fet_pkg:</b> The number of FETs required to form a half bridge circuit.<br>' +
                                  'This should be 1 for half bridge modules like CAS300M, or 2 for packages containing a signle FET. (Read only)'},
{key: 'fet_max_v',          itxt: '<b>V<sub>fet_max</sub>:</b>     From the datasheet. (Read only)'},
{key: 'fet_max_i',          itxt: '<b>I<sub>fet_max</sub>:</b>     From the datasheet. (Read only)'},
{key: 'fet_max_i_hot',      itxt: '<b>I<sub>fet_max_hot</sub>:</b> From the datasheet. (Read only)'},
{key: 'fet_r_ds_on',        itxt: '<b>R<sub>ds_on</sub>:</b>       From the datasheet. (Read only)'},
{key: 'qg',                 itxt: '<b>Q<sub>g</sub>:</b>           From the datasheet. (Read only)'},
{key: 't_d_on',             itxt: '<b>t<sub>d(on)</sub>:</b>       From the datasheet. (Read only)'},
{key: 't_rise',             itxt: '<b>t<sub>rise</sub>:</b>        From the datasheet. (Read only)'},
{key: 't_d_off',            itxt: '<b>t<sub>d(off)</sub>:</b>      From the datasheet. (Read only)'},
{key: 't_fall',             itxt: '<b>t<sub>fall</sub>:</b>        From the datasheet. (Read only)'},
{key: 'r_th_jc',            itxt: '<b>R<sub>θ_jc</sub>:</b>        From the datasheet. (Read only)'},
{key: 'r_g_ext',            itxt: '<b>R<sub>g_ext</sub>:</b>       From the datasheet. (Read only)'},
{key: 'r_g_int',            itxt: '<b>R<sub>g_int</sub>:</b>       From the datasheet. (Read only)'},
{key: 'v_g_on',             itxt: '<b>V<sub>g_on</sub>:</b>        From the datasheet. (Read only)'},
{key: 'v_g_off',            itxt: '<b>V<sub>g_off</sub>:</b>       From the datasheet. (Read only)'},
{key: 'c_iss',              itxt: '<b>C<sub>iss</sub>:</b>         From the datasheet. (Read only)'},
{key: 'c_oss',              itxt: '<b>C<sub>oss</sub>:</b>         From the datasheet. (Read only)'},
{key: 'c_rss',              itxt: '<b>C<sub>rss</sub>:</b>         From the datasheet. (Read only)'},
{key: 'e_on',               itxt: '<b>E<sub>on</sub>:</b>          The energy required to turn the FET on.  From the datasheet. (Read only)'},
{key: 'e_off',              itxt: '<b>E<sub>off</sub>:</b>         The energy required to turn the FET off.  From the datasheet. (Read only)'},
{key: 'v_swe',              itxt: '<b>V<sub>swe</sub>:</b>         The voltage at which E<sub>on</sub> and E<sub>off</sub> were measured.  From the datasheet. (Read only)'},
{key: 't_dead',             itxt: '<b>t<sub>dead</sub>:</b> Minimum dead time.<br>' +
                                  'Equal to max(t<sub>d(off)</sub> + t<sub>fall</sub> - t<sub>d(on)</sub>, 0). (Read only)'},
{key: 'fet_max_i_actual',   itxt: '<b>I<sub>fet_max_actual</sub>:</b> Maximum current per FET.<br>' +
                                  'Equal to I<sub>out</sub> * sqrt(2) / fet_count.  ' +
				  'Status is green if this value is less than I<sub>fet_max_hot</sub>.<br>' +
				  'This is a very ambitious rating, as FETs are typically limited by implementation-dependent thermal constraints. (Read only)'},
{key: 'r_th_ca',            itxt: '<b>R<sub>θ_ca</sub>:</b> Thermal resistance from FET case to ambient air, heat sink, or cool plate.'},

// Gate driver
{key: 'gd_r_on',            itxt: '<b>R<sub>gd_on</sub>:</b> The internal on resistance of the gate driver.<br>' +
                                  'The default value is for the UCC5390E device.'},
{key: 'gd_r_off',           itxt: '<b>R<sub>gd_off</sub>:</b> The internal off resistance of the gate driver.<br>' +
                                  'The default value is for the UCC5390E device.'},
{key: 'gd_i_on',            itxt: '<b>I<sub>gd_on</sub>:</b> The estimated current through the gate driver to turn on the FET.<br>' +
                                  'Equal to (V<sub>g_on</sub> - V<sub>g_off</sub>) / (R<sub>gd_on</sub> + R<sub>g_ext</sub> + R<sub>g_int</sub>). (Read only)'},
{key: 'gd_i_off',           itxt: '<b>I<sub>gd_off</sub>:</b> The estimated current through the gate driver to turn off the FET.<br>' +
                                  'Equal to (V<sub>g_on</sub> - V<sub>g_off</sub>) / (R<sub>gd_off</sub> + R<sub>g_ext</sub> + R<sub>g_int</sub>). (Read only)'},
{key: 'gd_dc_on',           itxt: '<b>gd_dc_on:</b> The FET turn on duty cycle for one switching cycle.<br>' +
                                  'Equal to (t<sub>d(on)</sub> + t<sub>rise</sub>) / t<sub>sw</sub>. (Read only)'},
{key: 'gd_dc_off',          itxt: '<b>gd_dc_off:</b> The FET turn off duty cycle for one switching cycle.<br>' +
                                  'Equal to (t<sub>d(off)</sub> + t<sub>fall</sub>) / t<sub>sw</sub>. (Read only)'},
{key: 'gd_i_avg',           itxt: '<b>I<sub>gd_avg</sub>:</b> The average gate driver current for one FET on/off cycle.<br>' +
                                  'Equal to I<sub>gd_on</sub> * gd_dc_on + I<sub>gd_off</sub> * gd_dc_off. (Read only)'},
{key: 'gd_p_avg',           itxt: '<b>P<sub>gd_avg</sub>:</b> The average gate driver power for on turn on/off cycle.<br>' +
                                  'Equal to I<sub>gd_avg</sub> * (V<sub>g_on</sub> - V<sub>g_off</sub>). (Read only)'},
{key: 'gd_bs_vf',           itxt: '<b>V<sub>f_bs</sub>:</b> Enter the forward voltage of the bootstrap diode.'},
{key: 'gd_bs_cf',           itxt: '<b>gd_bs_cf:</b> Enter the scaling factor for the bootstrap capacitor.<br>' +
                                  'Recommended values are between 10 and 20.<br>' +
				  'Values too large will cause startup issues charging the bootstrap capacitor.'},
{key: 'gd_c_bs',            itxt: '<b>C<sub>bs</sub>:</b> The calculated value of the bootstrap capacitor.<br>' +
                                  'Equal to Q<sub>g</sub> / (V<sub>g_on</sub> - V<sub>g_off</sub>) * fet_count * gd_bs_cf. (Read only)'},
{key: 'gd_r_bs',            itxt: '<b>R<sub>bs</sub>:</b> The calculated value of the bootstrap resistor.<br>' +
                                  'Equal to 1e9 / (ω<sub>sw</sub> * Q<sub>g</sub> / (V<sub>g_on</sub> - V<sub>g_off</sub>)). (Read only)'},
{key: 'gd_c_vdd',           itxt: '<b>C<sub>vdd</sub>:</b> The calculated value of the power supply capacitor feeding the bootstrap diode.<br>' +
                                  'Equal to C<sub>bs</sub> * gd_bs_cf. (Read only)'},

// Output LC / LCL Filter
{key: 'pct_sat_hr',         itxt: '<b>%<sub>sat_hr</sub>:</b> The inductor saturation headroom, as a percentage ' +
                                  'of maximum output current.'},
{key: 'i_sat_hr',           itxt: '<b>I<sub>sat_hr</sub>:</b> The inductor saturation headroom, in amps. (Read only)'},
{key: 'l_grid_max',         itxt: '<b>L<sub>grid_max</sub>:</b> An estimated grid inductance used while computing number of turns<br>' +
                                  'to be used on the output filter inductors.'},
{key: 'of_type',            itxt: '<b>of_type:</b> The type of the output filter, either LCL or LC.<br>' +
                                  'LCL is the default filter type, but at higher frequencies (50-60kHz) the algorithm <br>' +
				  'may not find valid candidates, so it reverts to an LC filter. (Read only)'},
{key: 'of_f_5',             itxt: '<b>f<sub>lc_min5</sub>, f<sub>lc_max5</sub>:</b> The target LC frequency range for a 5 octave buffer between f<sub>grid</sub> and f<sub>sw</sub>. (Read only)'},
{key: 'of_f_6',             itxt: '<b>f<sub>lc_min6</sub>, f<sub>lc_max6</sub>:</b> The target LC frequency range for a 6 octave buffer between f<sub>grid</sub> and f<sub>sw</sub>. (Read only)'},
{key: 'of_ndx_sugg',        itxt: '<b>n<sub>suggested</sub>:</b> The designer evaluates a large number of output filter component alternatives,<br>' +
                                  'eliminating those that do not meet filter and resonance criteria, and allows the user to browse<br>' +
				  'through them using the + and - buttons.  ' +
				  'Select one to best fit the project or component availability requirements.<br>' +
				  'This value is the index of the currently-selected option from the list.'},
{key: 'of_h1_sugg',         itxt: '<b>L<sub>1_suggested</sub>:</b> The L1 inductance value for the currently selected filter suggestion. (Read only)'},
{key: 'of_c_sugg',          itxt: '<b>C<sub>suggested</sub>:</b> The capacitance value for the currently selected filter suggestion. (Read only)'},
{key: 'of_h2_sugg',         itxt: '<b>L<sub>2_suggested</sub>:</b> The L2 inductance value for the currently selected filter suggestion. (Read only)'},
{key: 'of_delta_sugg',      itxt: '<b>δ<sub>suggested</sub>:</b> The δ value for the currently selected filter suggestion.<br>' +
                                  'Generally, lower δ values indicate a better LCL filter solution. (Read only)'},
{key: 'of_f_res_sugg',      itxt: '<b>f<sub>res_sugg</sub>:</b> For LCL filters, this is the resonant frequency of the current suggested filter solution.<br>' +
                                  'Preferred values between f<sub>sw</sub>/2 and f<sub>sw</sub>/6 may be stable without requiring a damping resistor.<br><br>' +
				  'For LC filters, this is the cutoff frequency of the current suggested filter solution.<br>' +
				  'Acceptable values are at least 5 octaves above f<sub>out</sub> and 5 octaves below f<sub>sw</sub>.<br>' +
				  'Preferred values are at least 6 octaves above f<sub>out</sub> and 6 octaves below f<sub>sw</sub>. (Read only)'},
{key: 'of_f_res_actual',    itxt: '<b>f<sub>res_actual</sub>:</b> For LCL filters, this is the resonant frequency of the actual LCL filter as configured.<br>' +
                                  'For LC filters, this is the cutoff frequency of the configured LC filter.<br>' +
                                  'Since inductor values vary under load, this value is given for both zero and 100% load.<br>' +
				  'See f<sub>res_sugg</sub> help info for acceptable and preferred values. (Read only)'},
{key: 'of_r_damping',       itxt: '<b>R<sub>damping</sub>:</b> The calculated damping resistor for the actual LCL filter as configured.<br>' +
                                  'Since inductor values vary under load, this is given for both zero load and 100% load.<br>' +
				  'Depending on the resonant frequency, the damping resistor may be optional. (Read only)'},
 
// Inductors
{key: 'ind_type',           itxt: '<b>ind_type:</b> Select either off-the-shelf, custom, or air-core inductor.)'},
{key: 'ind1_target',        itxt: '<b>L<sub>1_target</sub>:</b> Enter the desired inductance value for L1.'},
{key: 'ind2_target',        itxt: '<b>L<sub>2_target</sub>:</b> Enter the desired inductance value for L2.'},
{key: 'ind_lii',            itxt: '<b>LI<sup>2</sup>:</b> The inductance times the current squared.  This value is used to select<br>' +
                                  'an appropriately sized inductor core. (Read only)'},
{key: 'ind_target_ap',      itxt: '<b>A<sub>p_target</sub>:</b> The target area product.<br>' +
                                  'Equal to LI<sup>2</sup> * sqrt(2) * 1e6 / (B<sub>max</sub> * J * k).<br>' +
				  'Compare this with the A<sub>p</sub> of a candidate inductor core. (Read only)'},
{key: 'ind_core_pn',        itxt: '<b>ind_core_pn:</b> Select an inductor core to satisfy the requirements.'},
{key: 'ind_core_mfg',       itxt: '<b>ind_core_mfg:</b> The manufacturer of the inductor core.'},
{key: 'ind_mat',            itxt: '<b>ind_mat:</b> The material used in the inductor core. (Read only)'},
{key: 'ind_od',             itxt: '<b>ind_od:</b> The outside diameter of the inductor core. (Read only)'},
{key: 'ind_id',             itxt: '<b>ind_id:</b> The inside diamter of the inductor core. (Read only)'},
{key: 'ind_ht',             itxt: '<b>ind_ht:</b> The height of the inductor core. (Read only)'},
{key: 'ind_mu',             itxt: '<b>mu:</b> The relative permeability of the selected core. (Read only)'},
{key: 'ind_ap',             itxt: '<b>A<sub>p</sub>:</b> The area product is proportional to the power handling capacity of the inductor core. (Read only)'},
{key: 'ind_al',             itxt: '<b>A<sub>l</sub>:</b> This attribute specifies the inductance resulting from a given number<br>' +
                                  ' of wiring turns around the inductor core. (Read only)'},
{key: 'ind_turns_max',      itxt: '<b>ind_turns_max:</b> The maximum number of turns of the currently selected wire that will fit<br>' +
                                  'in the window of the currently selected inductor core. (Read only)'},
{key: 'ind_turns_l1',       itxt: '<b>ind_turns_l1:</b> The maximum number of turns of the currently selected wire that will fit<br>' +
                                  'in the first winding layer of the currently selected inductor core. (Read only)'},
{key: 'ind_turns',          itxt: '<b>ind_turns:</b> The computed number of wiring turns around the core to yield the desired inductance.<br>' +
                                  'This takes into account the inductance change of the core at 100% load. (Read only)'},
{key: 'ind_winding_factor', itxt: '<b>winding_factor:</b> The percentage of the inductor inside window area taken by the winding.<br>' +
                                  'This number cannot exceed 100%. (Read only)'},
{key: 'ind_r_core',         itxt: '<b>r<sub>ind_core</sub>:</b> Select the radius of the air core inductor.<br>' +
                                  'A larger radius gives more inductance per turn.'},
{key: 'ind_len',            itxt: '<b>ind_len:</b> The length of the inductor winding.<br>' +
                                  'Equal to ind_turns * wire_dia.<br>' +
				  'If you use a laminated bus bar, you can temporarily change the bus bar type<br>' +
				  'to point-to-point, select a wire option, then change back to laminated bus bar.<br>' +
				  'The selected wire option will be used in the inductor calculations,<br>' +
				  'even after switching back to laminated bus bar. (Read only)'},
{key: 'ind_wound_area',     itxt: '<b>ind_wound_area:</b> An estimate of the surface area of the wound inductor.<br>' +
				  'This is used to estimate temperature rise under load. (Read only)'},
{key: 'ind_h_eff',          itxt: '<b>L<sub>ind</sub>:</b> The computed inductance for this configuration.<br>' +
                                  'This value is computed for both zero and 100% load, since the inductance changes under load.<br>' +
                                  'For custom inductors, this is equal to ind_turns<sup>2</sup> * A<sub>l</sub>.<br>' +
				  'For air core inductors, this is equal to (ind_turns<sup>2</sup> * ind_r_core<sup>2</sup>) / (9 * ind_r_core + 10 * ind_len). (Read only)'},
{key: 'ind_pn',             itxt: '<b>ind_pn:</b> Select an inductor to satisfy the requirements.'},
{key: 'ind_mfg',            itxt: '<b>ind_mfg:</b>                From the datasheet. (Read only)'},
{key: 'ind_h',              itxt: '<b>L<sub>ind</sub>:</b>        From the datasheet. (Read only)'},
{key: 'ind_r_dc_typ',       itxt: '<b>R<sub>ind_dc_typ</sub>:</b> From the datasheet. (Read only)'},
{key: 'ind_r_dc_max',       itxt: '<b>R<sub>ind_dc_max</sub>:</b> From the datasheet. (Read only)'},
{key: 'ind_i_dt40',         itxt: '<b>I<sub>ind_dt40</sub>:</b>   From the datasheet. (Read only)'},
{key: 'ind_i_dt100',        itxt: '<b>I<sub>ind_dt100</sub>:</b>  From the datasheet. (Read only)'},
{key: 'ind_i_sat20',        itxt: '<b>I<sub>ind_sat20</sub>:</b>  From the datasheet. (Read only)'},
{key: 'ind_i_sat30',        itxt: '<b>I<sub>ind_sat30</sub>:</b>  From the datasheet. (Read only)'},
{key: 'ind_count',          itxt: '<b>ind_count:</b> Select the number of inductors to satisfy the requirements.'},
{key: 'ind_h_total',        itxt: '<b>L<sub>total</sub>:</b>  The total inductance.<br>' +
                                  'Equal to L<sub>ind</sub> / ind_count. (Read only)'},
{key: 'ind_r_total',        itxt: '<b>R<sub>ind_total</sub>:</b>  The total resistance.<br>' +
                                  'Equal to R<sub>ind_dc_max</sub> / ind_count. (Read only)'},

// Output Capacitor
{key: 'oc_target',          itxt: '<b>C<sub>target</sub>:</b> The capacitance value from the currently selected output filter suggestion. (Read only)'},
{key: 'oc_pn',              itxt: '<b>oc_pn:</b> Select a capacitor to satisfy the requirements.'},
{key: 'oc_mfg',             itxt: '<b>oc_mfg:</b>              From the datasheet. (Read only)'},
{key: 'oc_tech',            itxt: '<b>oc_tech:</b>             From the datasheet. (Read only)'},
{key: 'oc_c',               itxt: '<b>C<sub>oc</sub>:</b>      From the datasheet. (Read only)'},
{key: 'oc_v_dc',            itxt: '<b>V<sub>oc_dc</sub>:</b>   From the datasheet. (Read only)'},
{key: 'oc_i_rms',           itxt: '<b>I<sub>oc_rms</sub>:</b>  From the datasheet. (Read only)'},
{key: 'oc_esl',             itxt: '<b>ESL<sub>oc</sub>:</b>    From the datasheet. (Read only)'},
{key: 'oc_esr',             itxt: '<b>ESR<sub>oc</sub>:</b>    From the datasheet. (Read only)'},
{key: 'oc_th_cc',           itxt: '<b>R<sub>oc_θ_cc</sub>:</b> From the datasheet. (Read only)'},
{key: 'oc_th_ca',           itxt: '<b>R<sub>oc_θ_ca</sub>:</b> From the datasheet. (Read only)'},
{key: 'oc_count',           itxt: '<b>oc_count:</b> Select the number of capacitors to satisfy the requirements.'},
{key: 'oc_c_total',         itxt: '<b>C<sub>total</sub>:</b> Equal to C<sub>oc</sub> * oc_count. (Read only)'},

// Thermal
{key: 't_ambient',          itxt: '<b>t_ambient:</b> Enter the ambient temperature of the space in which the inverter will operate.'},
{key: 'th_p_dcl',           itxt: '<b>P<sub>dcl</sub>:</b> The power dissipated by the DC link capacitors.<br>' +
                                  'Equal to (dcl_i_rms_max / dcl_count)<sup>2</sup> * ESR<sub>dcl</sub>. (Read only)'},
{key: 'th_t_dcl_core',      itxt: '<b>t<sub>dcl_core</sub>:</b> Equal to t<sub>ambient</sub> + P<sub>dcl</sub> * ([effective] R<sub>dcl_θ_cc</sub> + R<sub>dcl_θ_ca</sub>).<br>' +
                                  'Effective R<sub>dcl_θ_cc</sub> above 10 kHz is R<sub>dcl_θ_cc</sub> * (f<sub>sw</sub> / 1000 - 10) / 100.<br>' +
                                  'This value should be less than 70°C. (Read only)'},
{key: 'th_pgsw',            itxt: '<b>P<sub>gsd</sub>:</b> The power dissipated inside the gate driver.<br>' +
                                  'Equal to (V<sub>g_on</sub> - V<sub>g_off</sub>)<sup>2</sup> * Q<sub>g</sub> * f<sub>sw</sub> / 2. (Read only)'},
{key: 'th_prgext',          itxt: '<b>P<sub>rgext</sub>:</b> Power dissipated by the external gate resistor.<br>' +
                                  'Equal to R<sub>g_ext</sub> * ((I<sub>gd_on</sub><sup>2</sup> * (t<sub>d(on)</sub> + t<sub>rise</sub>) * f<sub>sw</sub>) + ' +
                                  '(I<sub>gd_off</sub><sup>2</sup> * (t<sub>d(off)</sub> + t<sub>fall</sub>) * f<sub>sw</sub>)). (Read only)'},
{key: 'th_prgint',          itxt: '<b>P<sub>rgint</sub>:</b> Power dissipated in the FET due to gate switching.<br>' +
                                  'Equal to R<sub>g_int</sub> * ((I<sub>gd_on</sub><sup>2</sup> * (t<sub>d(on)</sub> + t<sub>rise</sub>) * f<sub>sw</sub>) + ' +
                                  '(I<sub>gd_off</sub><sup>2</sup> * (t<sub>d(off)</sub> + t<sub>fall</sub>) * f<sub>sw</sub>)). (Read only)'},
{key: 'th_pfi',             itxt: '<b>P<sub>fi</sub>:</b> The power dissipated in the FET due to conduction losses.<br>' +
                                  'Equal to I<sub>fet_max_actual</sub><sup>2</sup> * R<sub>ds(on)</sub> * 0.5 (assuming 50% duty cycle). (Read only)'},
{key: 'th_pfsw',            itxt: '<b>P<sub>fsw</sub>:</b> The power dissipated in the FET due to switching losses.<br>' +
                                  'Equal to (E<sub>on</sub> + E<sub>off</sub>) * 1e-6 * (f<sub>sw</sub> / 2) * (V<sub>pack_max</sub> / V<sub>swe</sub>). (Read only)'},
{key: 't_fet_junction',     itxt: '<b>t<sub>fet_junction</sub>:</b> The junction temperature of the FET.<br>' +
                                  'Equal to t<sub>ambient</sub> + (P<sub>rgint</sub> + P<sub>fi</sub> + P<sub>fsw</sub>) * R<sub>θ_jc</sub>.<br>' +
                                  'The limit on the junction temperature may be as high as 175°C. (Read only)'},
{key: 'th_p_ind',           itxt: '<b>P<sub>ind</sub>:</b> The power dissipated by the inductor.<br>' +
                                  'Calculated using core loss Method 1 from the Magnetics Powder Core catalog version 2020, page 20. (Read only)'},
{key: 'th_t_ind_core',      itxt: '<b>t<sub>ind_core</sub>:</b> Estimated inductor core temperature.<br>' +
                                  'For custom inductors: Calculated using the temperature rise calculation from the Magnetics Powder Core catalog.<br>' +
                                  'For OTS inductors: I<sub>ind</sub> <= I<sub>ind_dt40</sub>, equal to t<sub>ambient</sub> + I<sub>ind</sub> * 40 / ' +
                                  'I<sub>ind_dt40</sub>.<br>' +
                                  'For I<sub>ind</sub> > I<sub>ind_dt40</sub>, equal to t<sub>ambient</sub> + 40.0 + (I<sub>ind</sub> - I<sub>ind_dt40</sub>) * 60 / ' +
                                  '(I<sub>ind_dt100</sub> - I<sub>ind_dt40</sub>).<br>' +
                                  'Assume I<sub>ind</sub> = I<sub>out</sub> / ind_count.<br>' +
                                  'This value should stay below 155°C. (Read only)'},
{key: 'th_p_oc',            itxt: '<b>P<sub>oc</sub>:</b> The power dissipated by the output capacitor.<br>' +
                                  'Equal to (I<sub>out</sub> * 0.5 / oc_count)<sup>2</sup> * ESR<sub>oc</sub>.<br>' +
                                  'Assumes half the output ripple is consumed by the inductor. (Read only)'},
{key: 'th_t_oc_core',       itxt: '<b>t<sub>oc_core</sub>:</b> Estimated output capacitor core temperature.<br>' +
                                  'Equal to t<sub>ambient</sub> + P<sub>oc</sub> * ([effective] R<sub>oc_θ_cc</sub> + R<sub>oc_θ_ca</sub>).<br>' +
                                  'Effective R<sub>oc_θ_cc</sub> above 10 kHz is R<sub>oc_θ_cc</sub> * (f<sub>sw</sub> / 1000 - 10) / 100.<br>' +
                                  'This value should be less than 70°C. (Read only)'},
{key: 'th_total_loss',      itxt: '<b>P<sub>total_loss</sub>:</b> The total power dissipated by the various components listed above.<br>' +
                                  'The power loss for each component is multiplied by the number of instances of that component.<br>' +
				  'Note that the FET count is doubled, since there are 2 FETs in a half bridge configuration.<br>' +
				  'Note also that, except for the DC link cap, all component counts are multiplied by the number of output lines. (Read only)'},
{key: 'th_calc_eff',        itxt: '<b>η<sub>calc</sub>:</b> The calculated efficiency of the inverter.<br>' +
                                  'Equal to 100 - P<sub>out</sub> / (P<sub>out</sub> + P<sub>total_loss</sub>). (Read only)'},
];
