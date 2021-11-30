# Remove irritating headers from websites
Playing with creating a Firefox extension that can select hide headers from websites.

## Development installation

### Temporary without reload
See the following page for complete instructions: <https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/>. In short:

Go to <about:debugging#/runtime/this-firefox> and choose *Load Temporary Add-on...*.

* After making changes, reload the extension by pressing *Reload*.
* To inspect logging from *background.js*, open the *Inspect* tab (which opens up <about:devtools-toolbox?id=addon@cedernaes.com&type=extension>).
* To inspect logging from *content-script.js*, open the corresponding tab and inspect it with the regular dev-tools.

### Using web-ext with livereload
The extension can be run using `web-ext` as well, which is described on this page: <https://github.com/mozilla/web-ext>. In short:

Install nodejs with npm. Then run the following command to install web-ext globally:
```bash
npm install -g web-ext
```

The extension can then be loaded and run into a browser by running `web-ext run`.