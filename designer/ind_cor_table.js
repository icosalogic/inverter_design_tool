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
{mfg: 'Magnetics', shape: 'Toroid', size: '93x', Le:  63.50, Ae:   65.40, Ve:   4150.0, Aw:   156, Ap:    10200, OD:  27.69, ID:  14.10, HT: 11.94 },
{mfg: 'Magnetics', shape: 'Toroid', size: '72x', Le: 113.50, Ae:  262.00, Ve:  29700.0, Aw:   452, Ap:   118000, OD:  51.51, ID:  24.00, HT: 21.59 },
{mfg: 'Magnetics', shape: 'Toroid', size: '71x', Le: 127.00, Ae:  125.00, Ve:  15900.0, Aw:   751, Ap:    94000, OD:  51.69, ID:  30.94, HT: 14.35 },
{mfg: 'Magnetics', shape: 'Toroid', size: '53x', Le: 126.00, Ae:  174.00, Ve:  22000.0, Aw:   620, Ap:   107880, OD:  54.90, ID:  28.10, HT: 15.30 },
{mfg: 'Magnetics', shape: 'Toroid', size: '11x', Le: 143.00, Ae:  144.00, Ve:  20700.0, Aw:   948, Ap:   137000, OD:  58.04, ID:  34.75, HT: 14.86 },
{mfg: 'Magnetics', shape: 'Toroid', size: '59x', Le: 143.00, Ae:  237.00, Ve:  33900.0, Aw:   855, Ap:   202635, OD:  60.60, ID:  33.00, HT: 20.50 },
{mfg: 'Magnetics', shape: 'Toroid', size: '19x', Le: 125.00, Ae:  229.00, Ve:  28600.0, Aw:   514, Ap:   118000, OD:  58.04, ID:  25.58, HT: 16.13 },
{mfg: 'Magnetics', shape: 'Toroid', size: '61x', Le: 144.00, Ae:  360.00, Ve:  51800.0, Aw:   789, Ap:   284000, OD:  63.09, ID:  31.70, HT: 25.91 },
{mfg: 'Magnetics', shape: 'Toroid', size: '06x', Le: 158.00, Ae:  314.00, Ve:  49700.0, Aw:   945, Ap:   297000, OD:  69.42, ID:  34.67, HT: 21.41 },
{mfg: 'Magnetics', shape: 'Toroid', size: '73x', Le: 184.00, Ae:  497.00, Ve:  91400.0, Aw:  1550, Ap:   769000, OD:  75.21, ID:  44.40, HT: 35.92 },
{mfg: 'Magnetics', shape: 'Toroid', size: '86x', Le: 196.00, Ae:  176.00, Ve:  34500.0, Aw:  1820, Ap:   321000, OD:  78.94, ID:  48.21, HT: 13.84 },
{mfg: 'Magnetics', shape: 'Toroid', size: '90x', Le: 196.00, Ae:  221.00, Ve:  43400.0, Aw:  1820, Ap:   403000, OD:  78.94, ID:  48.21, HT: 17.02 },
{mfg: 'Magnetics', shape: 'Toroid', size: '778', Le: 177.20, Ae:  492.00, Ve:  81500.0, Aw:  1150, Ap:   550000, OD:  78.94, ID:  38.33, HT: 26.85 },
{mfg: 'Magnetics', shape: 'Toroid', size: '10x', Le: 243.00, Ae:  358.00, Ve:  86900.0, Aw:  2470, Ap:   885000, OD: 103.00, ID:  55.75, HT: 17.91 },
{mfg: 'Magnetics', shape: 'Toroid', size: '33x', Le: 324.00, Ae:  678.00, Ve: 220000.0, Aw:  4710, Ap:  3190000, OD: 133.96, ID:  77.19, HT: 26.80 },
{mfg: 'Magnetics', shape: 'Toroid', size: '33z', Le: 324.00, Ae: 1356.00, Ve: 440000.0, Aw:  4710, Ap:  6380000, OD: 133.96, ID:  77.19, HT: 53.60 },
{mfg: 'Magnetics', shape: 'Toroid', size: '16x', Le: 412.00, Ae:  987.00, Ve: 407000.0, Aw:  8030, Ap:  7920000, OD: 166.50, ID: 101.02, HT: 33.15 },
{mfg: 'Magnetics', shape: 'Toroid', size: '16z', Le: 412.00, Ae: 1974.00, Ve: 814000.0, Aw:  8030, Ap: 15840000, OD: 166.50, ID: 101.02, HT: 66.30 },
{mfg: 'Magnetics', shape: 'Toroid', size: '16w', Le: 412.00, Ae: 2961.00, Ve:1221000.0, Aw:  8030, Ap: 23760000, OD: 166.50, ID: 101.02, HT: 99.45 },
{mfg: 'Magnetics', shape: 'Toroid', size: '17x', Le: 386.50, Ae:  948.00, Ve: 366700.0, Aw:  5930, Ap:  5620000, OD: 167.21, ID:  86.89, HT: 27.31 },
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
 * when building high-power inverters.  Most of the part numbers for smaller
 * cores are not included here.
 */

icosalogic.inv_design.ind_cor_pn_table = [
{mfg: 'Magnetics', pn: '0077894A7',   mat: 'KoolMu',      size: '93x', mu: 60, Al:  75 },
{mfg: 'Magnetics', pn: '0077615A7',   mat: 'KoolMu',      size: '61x', mu: 26, Al:  82 },
{mfg: 'Magnetics', pn: '0077616A7',   mat: 'KoolMu',      size: '61x', mu: 40, Al: 126 },
{mfg: 'Magnetics', pn: '0077617A7',   mat: 'KoolMu',      size: '61x', mu: 60, Al: 189 },
{mfg: 'Magnetics', pn: '0077074A7',   mat: 'KoolMu',      size: '06x', mu: 26, Al:  65 },
{mfg: 'Magnetics', pn: '0077073A7',   mat: 'KoolMu',      size: '06x', mu: 40, Al: 100 },
{mfg: 'Magnetics', pn: '0077072A7',   mat: 'KoolMu',      size: '06x', mu: 60, Al: 143 },
{mfg: 'Magnetics', pn: '0077873A7',   mat: 'KoolMu',      size: '86x', mu: 19, Al:  22 },
{mfg: 'Magnetics', pn: '0077868A7',   mat: 'KoolMu',      size: '86x', mu: 26, Al:  30 },
{mfg: 'Magnetics', pn: '0077872A7',   mat: 'KoolMu',      size: '86x', mu: 40, Al:  45 },
{mfg: 'Magnetics', pn: '0077913A7',   mat: 'KoolMu',      size: '90x', mu: 19, Al:  27 },
{mfg: 'Magnetics', pn: '0077908A7',   mat: 'KoolMu',      size: '90x', mu: 26, Al:  37 },
{mfg: 'Magnetics', pn: '0077912A7',   mat: 'KoolMu',      size: '90x', mu: 40, Al:  57 },
{mfg: 'Magnetics', pn: '0077775A7',   mat: 'KoolMu',      size: '778', mu: 26, Al:  88 },
{mfg: 'Magnetics', pn: '0077776A7',   mat: 'KoolMu',      size: '778', mu: 40, Al: 135 },
{mfg: 'Magnetics', pn: '0077777A7',   mat: 'KoolMu',      size: '778', mu: 60, Al: 205 },
{mfg: 'Magnetics', pn: '0077744A7',   mat: 'KoolMu',      size: '73x', mu: 19, Al:  64 },
{mfg: 'Magnetics', pn: '0077735A7',   mat: 'KoolMu',      size: '73x', mu: 26, Al:  88 },
{mfg: 'Magnetics', pn: '0077736A7',   mat: 'KoolMu',      size: '73x', mu: 40, Al: 136 },
{mfg: 'Magnetics', pn: '0077101A7',   mat: 'KoolMu',      size: '10x', mu: 14, Al:  26 },
{mfg: 'Magnetics', pn: '0077097A7',   mat: 'KoolMu',      size: '10x', mu: 19, Al:  35 },
{mfg: 'Magnetics', pn: '0077102A7',   mat: 'KoolMu',      size: '10x', mu: 26, Al:  48 },
{mfg: 'Magnetics', pn: '0077100A7',   mat: 'KoolMu',      size: '10x', mu: 40, Al:  74 },
{mfg: 'Magnetics', pn: '0077099A7',   mat: 'KoolMu',      size: '10x', mu: 60, Al: 111 },
{mfg: 'Magnetics', pn: '0077336A7',   mat: 'KoolMu',      size: '33x', mu: 14, Al:  37 },
{mfg: 'Magnetics', pn: '0077342A7',   mat: 'KoolMu',      size: '33x', mu: 19, Al:  50 },
{mfg: 'Magnetics', pn: '0077337A7',   mat: 'KoolMu',      size: '33x', mu: 26, Al:  68 },
{mfg: 'Magnetics', pn: '0077338A7',   mat: 'KoolMu',      size: '33x', mu: 40, Al: 105 },
{mfg: 'Magnetics', pn: '0077339A7',   mat: 'KoolMu',      size: '33x', mu: 60, Al: 158 },
{mfg: 'Magnetics', pn: '0077164A7',   mat: 'KoolMu',      size: '16x', mu: 14, Al:  42 },
{mfg: 'Magnetics', pn: '0077163A7',   mat: 'KoolMu',      size: '16x', mu: 19, Al:  57 },
{mfg: 'Magnetics', pn: '0077165A7',   mat: 'KoolMu',      size: '16x', mu: 26, Al:  78 },
{mfg: 'Magnetics', pn: '0077164A7*2', mat: 'KoolMu',      size: '16z', mu: 14, Al:  84 },
{mfg: 'Magnetics', pn: '0077164A7*3', mat: 'KoolMu',      size: '16w', mu: 14, Al: 126 },
{mfg: 'Magnetics', pn: '0079535A7',   mat: 'KoolMuMax',   size: '53x', mu: 26, Al:  45 },
{mfg: 'Magnetics', pn: '0079536A7',   mat: 'KoolMuMax',   size: '53x', mu: 40, Al:  69 },
{mfg: 'Magnetics', pn: '0079537A7',   mat: 'KoolMuMax',   size: '53x', mu: 60, Al: 104 },
{mfg: 'Magnetics', pn: '0079189A7',   mat: 'KoolMuMax',   size: '19x', mu: 40, Al:  92 },
{mfg: 'Magnetics', pn: '0079192A7',   mat: 'KoolMuMax',   size: '19x', mu: 60, Al: 138 },
{mfg: 'Magnetics', pn: '0079733A7',   mat: 'KoolMuMax',   size: '72x', mu: 40, Al: 117 },
{mfg: 'Magnetics', pn: '0079726A7',   mat: 'KoolMuMax',   size: '72x', mu: 60, Al: 175 },
{mfg: 'Magnetics', pn: '0079215A7',   mat: 'KoolMuMax',   size: '11x', mu: 19, Al:  24 },
{mfg: 'Magnetics', pn: '0079111A7',   mat: 'KoolMuMax',   size: '11x', mu: 26, Al:  33 },
{mfg: 'Magnetics', pn: '0079212A7',   mat: 'KoolMuMax',   size: '11x', mu: 40, Al:  50 },
{mfg: 'Magnetics', pn: '0079601A7',   mat: 'KoolMuMax',   size: '59x', mu: 26, Al:  54 },
{mfg: 'Magnetics', pn: '0079600A7',   mat: 'KoolMuMax',   size: '59x', mu: 40, Al:  83 },
{mfg: 'Magnetics', pn: '0079599A7',   mat: 'KoolMuMax',   size: '59x', mu: 60, Al: 125 },
{mfg: 'Magnetics', pn: '0079615A7',   mat: 'KoolMuMax',   size: '61x', mu: 26, Al:  82 },
{mfg: 'Magnetics', pn: '0079616A7',   mat: 'KoolMuMax',   size: '61x', mu: 40, Al: 126 },
{mfg: 'Magnetics', pn: '0079617A7',   mat: 'KoolMuMax',   size: '61x', mu: 60, Al: 189 },
{mfg: 'Magnetics', pn: '0079074A7',   mat: 'KoolMuMax',   size: '06x', mu: 26, Al:  65 },
{mfg: 'Magnetics', pn: '0079073A7',   mat: 'KoolMuMax',   size: '06x', mu: 40, Al: 100 },
{mfg: 'Magnetics', pn: '0079072A7',   mat: 'KoolMuMax',   size: '06x', mu: 60, Al: 143 },
{mfg: 'Magnetics', pn: '0079873A7',   mat: 'KoolMuMax',   size: '86x', mu: 19, Al:  22 },
{mfg: 'Magnetics', pn: '0079868A7',   mat: 'KoolMuMax',   size: '86x', mu: 26, Al:  30 },
{mfg: 'Magnetics', pn: '0079872A7',   mat: 'KoolMuMax',   size: '86x', mu: 40, Al:  45 },
{mfg: 'Magnetics', pn: '0079913A7',   mat: 'KoolMuMax',   size: '90x', mu: 19, Al:  27 },
{mfg: 'Magnetics', pn: '0079908A7',   mat: 'KoolMuMax',   size: '90x', mu: 26, Al:  37 },
{mfg: 'Magnetics', pn: '0079912A7',   mat: 'KoolMuMax',   size: '90x', mu: 40, Al:  57 },
{mfg: 'Magnetics', pn: '0079774A7',   mat: 'KoolMuMax',   size: '778', mu: 14, Al:  47 },
{mfg: 'Magnetics', pn: '0079772A7',   mat: 'KoolMuMax',   size: '778', mu: 19, Al:  64 },
{mfg: 'Magnetics', pn: '0079775A7',   mat: 'KoolMuMax',   size: '778', mu: 26, Al:  88 },
{mfg: 'Magnetics', pn: '0079776A7',   mat: 'KoolMuMax',   size: '778', mu: 40, Al: 135 },
{mfg: 'Magnetics', pn: '0079777A7',   mat: 'KoolMuMax',   size: '778', mu: 60, Al: 205 },
{mfg: 'Magnetics', pn: '0079734A7',   mat: 'KoolMuMax',   size: '73x', mu: 14, Al:  48 },
{mfg: 'Magnetics', pn: '0079744A7',   mat: 'KoolMuMax',   size: '73x', mu: 19, Al:  64 },
{mfg: 'Magnetics', pn: '0079735A7',   mat: 'KoolMuMax',   size: '73x', mu: 26, Al:  88 },
{mfg: 'Magnetics', pn: '0079736A7',   mat: 'KoolMuMax',   size: '73x', mu: 40, Al: 136 },
{mfg: 'Magnetics', pn: '0079737A7',   mat: 'KoolMuMax',   size: '73x', mu: 60, Al: 204 },
{mfg: 'Magnetics', pn: '0079101A7',   mat: 'KoolMuMax',   size: '10x', mu: 14, Al:  26 },
{mfg: 'Magnetics', pn: '0079097A7',   mat: 'KoolMuMax',   size: '10x', mu: 19, Al:  35 },
{mfg: 'Magnetics', pn: '0079102A7',   mat: 'KoolMuMax',   size: '10x', mu: 26, Al:  48 },
{mfg: 'Magnetics', pn: '0079100A7',   mat: 'KoolMuMax',   size: '10x', mu: 40, Al:  74 },
{mfg: 'Magnetics', pn: '0079099A7',   mat: 'KoolMuMax',   size: '10x', mu: 60, Al: 111 },
{mfg: 'Magnetics', pn: '0079336A7',   mat: 'KoolMuMax',   size: '33x', mu: 14, Al:  37 },
{mfg: 'Magnetics', pn: '0079342A7',   mat: 'KoolMuMax',   size: '33x', mu: 19, Al:  50 },
{mfg: 'Magnetics', pn: '0079337A7',   mat: 'KoolMuMax',   size: '33x', mu: 26, Al:  68 },
{mfg: 'Magnetics', pn: '0079164A7',   mat: 'KoolMuMax',   size: '16x', mu: 14, Al:  42 },
{mfg: 'Magnetics', pn: '0079164A7*2', mat: 'KoolMuMax',   size: '16z', mu: 14, Al:  84 },
{mfg: 'Magnetics', pn: '0079164A7*3', mat: 'KoolMuMax',   size: '16w', mu: 14, Al: 126 },
{mfg: 'Magnetics', pn: '0079169A7',   mat: 'KoolMuMax',   size: '17x', mu: 14, Al:  42 },
{mfg: 'Magnetics', pn: '0076337A7',   mat: 'KoolMuHf',    size: '33x', mu: 26, Al:  68 },
{mfg: 'Magnetics', pn: '0070074A7',   mat: 'KoolMuUltra', size: '06x', mu: 26, Al:  65 },
{mfg: 'Magnetics', pn: '0070735A7',   mat: 'KoolMuUltra', size: '73x', mu: 26, Al:  88 },
{mfg: 'Magnetics', pn: '0070736A7',   mat: 'KoolMuUltra', size: '73x', mu: 40, Al: 136 },
{mfg: 'Magnetics', pn: '0070737A7',   mat: 'KoolMuUltra', size: '73x', mu: 60, Al: 204 },
{mfg: 'Magnetics', pn: '0070868A7',   mat: 'KoolMuUltra', size: '86x', mu: 26, Al:  30 },
{mfg: 'Magnetics', pn: '0070872A7',   mat: 'KoolMuUltra', size: '86x', mu: 40, Al:  45 },
{mfg: 'Magnetics', pn: '0070867A7',   mat: 'KoolMuUltra', size: '86x', mu: 60, Al:  68 },
{mfg: 'Magnetics', pn: '0070908A7',   mat: 'KoolMuUltra', size: '90x', mu: 26, Al:  37 },
{mfg: 'Magnetics', pn: '0070912A7',   mat: 'KoolMuUltra', size: '90x', mu: 40, Al:  57 },
{mfg: 'Magnetics', pn: '0070907A7',   mat: 'KoolMuUltra', size: '90x', mu: 60, Al:  85 },
{mfg: 'Magnetics', pn: '0070775A7',   mat: 'KoolMuUltra', size: '778', mu: 26, Al:  88 },
{mfg: 'Magnetics', pn: '0070776A7',   mat: 'KoolMuUltra', size: '778', mu: 40, Al: 135 },
{mfg: 'Magnetics', pn: '0070777A7',   mat: 'KoolMuUltra', size: '778', mu: 60, Al: 205 },
{mfg: 'Magnetics', pn: '0070102A7',   mat: 'KoolMuUltra', size: '10x', mu: 26, Al:  48 },
{mfg: 'Magnetics', pn: '0070337A7',   mat: 'KoolMuUltra', size: '33x', mu: 26, Al:  68 },
];

/*
 * This table gives various attributes for different inductor materials.
 * 
 * mat   -- material
 * max_j -- max conductor current density in A/mm**2
 * B_max -- max magnetic field density in T
 */

icosalogic.inv_design.ind_cor_mat_table = [
{mat: 'KoolMu',      max_j: 4, B_max: 0.6 },
{mat: 'KoolMuMax',   max_j: 6, B_max: 0.8 },
{mat: 'KoolMuHf',    max_j: 4, B_max: 0.6 },
{mat: 'KoolMuUltra', max_j: 4, B_max: 0.6 },
];
