## Generating new documentation

_Important: to get the submodule of Turf going, you'll need to clone this repository with
the `--recursive` flag._

### Starting a test server

Run `npm run serve` - this will show you the currently compiled docs at http://localhost:9080

### Updating the API page

Changes to the API documentation happen upstream in the actual [Turf repository](https://github.com/turfjs/turf/). For example if you wanted to update the buffer documentation you would go to the [@turf/buffer/index.js](https://github.com/Turfjs/turf/blob/master/packages/turf-buffer/index.js) and edit jsdocs.

Presuming you've updated the documentation in the relevant turf module and your changes have been accepted, you can now update the docs using the following procedure:

1. Start with updating the turf project dependency: `cd` into the turf-www/turf submodule  and `git pull origin master`
2. `cd` back to the root of the turf-www project
3. Run `npm run deploy`
4. Commit and push the changes

### Updating the API template

If you would like to have a go at updating the API template run `npm run serveAPI`. This will require a knowledge of how jsdoc templates work. Once the API server is running you can edit the files with template/turf_2017. Once you are finished run `npm run deploy` and commit your changes.

### Updating the other pages

Other pages are updated simply by editing the relevant html files in the root directory of the repo. If you'd like to update the assets (like the custom.css) please do so in the template/turf_2017/assets folder as the assets folder gets overwritten when `npm run deploy` is run.

