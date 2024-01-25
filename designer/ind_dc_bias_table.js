/*
 * Material properties data for powder inductor cores.
 *
 * TODO: combine all these tables into 1?
 * 
 * This table gives the parameters for the equation:
 *
 *     ep = 1 / (a + b H**c)
 *
 * where H is Oersteds (Oe).
 * ep is the effective permiability with the given DC bias applied.
 *
 * mfg      -- manufacturer
 * mat      -- material
 * shape    -- shape of core
 * mu       -- permissivity
 * a        -- a parameter
 * b        -- a parameter
 * c        -- a parameter
 */

icosalogic.inv_design.ind_dc_bias_table = [
{mat: 'KoolMu',     mu:  14, a: 0.01, b: 4.938e-8, c: 2.000 },
{mat: 'KoolMu',     mu:  26, a: 0.01, b: 5.226e-7, c: 1.819 },
{mat: 'KoolMu',     mu:  40, a: 0.01, b: 2.177e-6, c: 1.704 },
{mat: 'KoolMu',     mu:  60, a: 0.01, b: 2.142e-6, c: 1.855 },
{mat: 'KoolMu',     mu:  75, a: 0.01, b: 3.885e-6, c: 1.819 },
{mat: 'KoolMu',     mu:  90, a: 0.01, b: 5.830e-6, c: 1.819 },
{mat: 'KoolMu',     mu: 125, a: 0.01, b: 2.209e-5, c: 1.636 },
{mat: 'KoolMuMax',  mu:  14, a: 0.01, b: 8.274e-9, c: 2.239 },
{mat: 'KoolMuMax',  mu:  19, a: 0.01, b: 3.136e-8, c: 2.111 },
{mat: 'KoolMuMax',  mu:  26, a: 0.01, b: 3.444e-8, c: 2.205 },
{mat: 'KoolMuMax',  mu:  40, a: 0.01, b: 5.919e-7, c: 1.855 },
{mat: 'KoolMuMax',  mu:  60, a: 0.01, b: 5.917e-7, c: 2.000 },
{mat: 'HighFlux',   mu:  14, a: 0.01, b: 3.389e-8, c: 1.923 },
{mat: 'HighFlux',   mu:  26, a: 0.01, b: 4.205e-9, c: 2.426 },
{mat: 'HighFlux',   mu:  40, a: 0.01, b: 1.841e-8, c: 2.409 },
{mat: 'HighFlux',   mu:  60, a: 0.01, b: 6.413e-8, c: 2.291 },
{mat: 'HighFlux',   mu: 125, a: 0.01, b: 1.403e-7, c: 2.465 },
{mat: 'HighFlux',   mu: 147, a: 0.01, b: 1.207e-6, c: 2.131 },
{mat: 'HighFlux',   mu: 160, a: 0.01, b: 1.704e-6, c: 2.094 },

];

/*
 * DC magnetization table
 * B = ((a + bH + cH**2) / (1 + dH + eH**2)) ** x
 */
icosalogic.inv_design.ind_dc_mag_table = [
{mat: 'KoolMu',    mu:  14, a: 3.918E-02, b: 1.856E-02, c: 4.812E-04, d: 1.390E-01, e: 4.478E-04, x: 1.875},
{mat: 'KoolMu',    mu:  26, a: 3.763E-02, b: 1.712E-02, c: 5.155E-04, d: 9.190E-02, e: 4.909E-04, x: 1.812},
{mat: 'KoolMu',    mu:  40, a: 3.789E-02, b: 1.632E-02, c: 5.355E-04, d: 7.365E-02, e: 5.110E-04, x: 1.665},
{mat: 'KoolMu',    mu:  60, a: 3.601E-02, b: 1.721E-02, c: 5.401E-04, d: 5.624E-02, e: 5.156E-04, x: 1.577},
{mat: 'KoolMu',    mu:  75, a: 3.111E-02, b: 2.286E-02, c: 5.343E-04, d: 5.568E-02, e: 4.982E-04, x: 1.614},
{mat: 'KoolMu',    mu:  90, a: 2.965E-02, b: 2.538E-02, c: 5.142E-04, d: 5.305E-02, e: 4.867E-04, x: 1.578},
{mat: 'KoolMu',    mu: 125, a: 2.730E-02, b: 2.946E-02, c: 5.038E-04, d: 5.274E-02, e: 4.639E-04, x: 1.471},
{mat: 'KoolMuMax', mu:  14, a: 3.945E-02, b: 1.922E-02, c: 4.882E-04, d: 1.430E-01, e: 4.217E-04, x: 1.895},
{mat: 'KoolMuMax', mu:  19, a: 3.915E-02, b: 1.866E-02, c: 5.237E-04, d: 1.225E-01, e: 4.368E-04, x: 1.859},
{mat: 'KoolMuMax', mu:  26, a: 6.405E-02, b: 1.572E-02, c: 1.572E-02, d: 9.685E-02, e: 4.568E-04, x: 1.813},
{mat: 'KoolMuMax', mu:  40, a: 3.810E-02, b: 1.720E-02, c: 5.982E-04, d: 8.225E-02, e: 4.852E-04, x: 1.684},
{mat: 'KoolMuMax', mu:  60, a: 3.589E-02, b: 1.862E-02, c: 6.201E-04, d: 6.341E-02, e: 4.897E-04, x: 1.630},
];

/*
 * Core loss table
 * 
 * P = a * B**b * f**c
 * 
 * where B is in Tesla (T), f is in kHz
 */
icosalogic.inv_design.ind_loss_table = [
{mat: 'KoolMu',    mu:  14, a:  80.55, b: 1.988, c: 1.541},
{mat: 'KoolMu',    mu:  26, a:  52.36, b: 1.988, c: 1.541},
{mat: 'KoolMu',    mu:  40, a:  52.36, b: 1.988, c: 1.541},
{mat: 'KoolMu',    mu:  60, a:  44.30, b: 1.988, c: 1.541},
{mat: 'KoolMu',    mu:  75, a:  44.30, b: 1.988, c: 1.541},
{mat: 'KoolMu',    mu:  90, a:  44.30, b: 1.988, c: 1.541},
{mat: 'KoolMu',    mu: 125, a:  44.30, b: 1.988, c: 1.541},
{mat: 'KoolMuMax', mu:  14, a: 144.49, b: 2.072, c: 1.379},
{mat: 'KoolMuMax', mu:  19, a: 128.84, b: 2.072, c: 1.379},
{mat: 'KoolMuMax', mu:  26, a: 113.53, b: 2.072, c: 1.379},
{mat: 'KoolMuMax', mu:  40, a: 113.53, b: 2.072, c: 1.379},
{mat: 'KoolMuMax', mu:  60, a: 113.53, b: 2.072, c: 1.379},
];
