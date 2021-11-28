# Remove irritating headers from websites
Playing with creating a Firefox extension that can select hide headers from websites.

## Development installation
Go to <about:debugging#/runtime/this-firefox> and choose *Load Temporary Add-on...*.

* After making changes, reload the extension by pressing *Reload*.
* To inspect logging from *background.js*, open the *Inspect* tab (which opens up <about:devtools-toolbox?id=addon@cedernaes.com&type=extension>).
* To inspect logging from *content-script.js*, open the corresponding tab and inspect it with the regular dev-tools.
