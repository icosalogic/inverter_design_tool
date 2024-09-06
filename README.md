# Inverter Design Tool

This tool can be used by designers to set basic parameters and select components of a DC-AC inverter.
Here are the primary design assumptions for inverters configured with this tool:

1. The primary target market addressed with this tool is battery-powered residential split-phase inverters
with output currents up to hundreds of amps.  Parts of this tool may be useful in designing 3-phase traction
inverters for the mobility market, but that was not an objective.
2. The battery at minimum state of charge is assumed to have a voltage greater than the peak-to-peak AC output voltage,
thus no output transformer is required.

# Features

- Set the FET switching algorithm to either PWM or cycle-by-cycle.
- Set basic attributes of the inverter, such as FET switching frequency, number of output lines, output AC frequency, maximum output current, etc.
- Set the number of cells in the battery, and the maximum and minimum voltage of each cell.
- Set the bus configuration to either laminated bus bar or point-to-point wiring with a specific gauge wire.
- Size the DC-Link capacitor(s), and select from a list of hundreds of choices.
- Select the size and number of FETs to use.
- Specify soft switching effects on switching losses.
- Evaluate gate driver requirements, and size bootstrap circuit components.
- Choose between LCL and LC output filters, and evaluate component values.
- Select inductor types from off-the-shelf parts, custom wound toroid cores, or custom wound air cores.
- Evaluate winding options for custom inductors.
- Select output filter capacitors from a list of choices.
- Evaluate thermal constraints of the crucial components in the inverter.
- Calculate total losses, and estimate inverter efficiency.

# Usage

This application can be accessed by two methods:
1. By serving the files via a web server.
2. By downloading the files from github to your local machine, and accessing it via a `file://` URL.  This option is especially appealing if you need to work offline.

Just click the designer/index.html file to run the app.

A version of this app is available online at [beta.icosalogic.com/inv_design/](http://beta.icosalogic.com/inv_design/).

# Configurations

This application allows you save different configurations and switch between them.
Each configuration has a name; the default configuration is named "default".
You can make a copy of a configuration so one can explore design alternatives without perturbing known good configurations.
Configurations are stored in the user-specific local browser storage, and persist across reboots and login sessions.
Deleting browser files will also remove this application's configurations from browser local storage.

Because configurations are user-specific and local, they are not shared.
You can use the print option to create a text version of a configuration, which you can cut and paste
into a file if you want to back it up, or share it with others.

# Configuration Status

Components with current, voltage, or thermal constraints have a colored status dot to the right of the setting.
This dot is red if the currently configured value exceeds the constraint, yellow if the value is marginal,
or green if the value is within the bounds of the constraint.

The status of individual settings rolls up to the status of the section in which they appear.
The status of all the sections roll up to the status of the currently selected configuration.

# Help Information

Every line has an information icon ⓘ that a user can click to display helpful information about
the current setting.

# Component Files

Attributes of capacitors, FETs, off-the-shelf inductors, and inductor cores are stored in data files.
Users can add entries for additional components as desired.
