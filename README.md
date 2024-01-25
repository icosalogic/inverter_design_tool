# Inverter Design Tool

This tool can be used by designers to set basic parameters and select components of DC-AC inverters.
The primary design constraint is that the DC source has a minimum voltage greater than two times the
peak-to-peak AC voltage, thus no output transformer is required.

This application can be accessed by two methods:
1. By serving the files via a web server.
2. By downloading the files from github to your local machine.  This option is especially appealing if you need to work offline.

Just click the designer/index.html file to run the app.

# Configurations

This application allows you save different configurations and switch between them.
Each configuration has a name; the default configuration is named "default".
Configurations are stored in the user-specific local browser storage, and persist across reboots and login sessions.
Deleting browser files will also remove this application's configurations.

Because configurations are user-specific and local, they are not shared.
You can use the print option to create a text version of a configuration, which you can cut and paste
into a file if you want to back it up, or share it with others.

# Configuration Status

Components with current or voltage constraints have a colored status dot to the right of the setting.
This dot is red if the currently configured value exceeds the constraint, yellow if the value is marginal,
or green if the value is within the bounds of the constraint.

The status of individual settings rolls up to the status of the section in which they appear.
The status of all the sections roll up to the status of the currently selected configuration.

# Help Information

Every line has an information icon, a circle with an "i" inside, that will display helpful information about
the current setting.
