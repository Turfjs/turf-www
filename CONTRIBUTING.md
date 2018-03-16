## Generating new documentation
_Important: to get the submodule of Turf going, you'll need to clone this repository with
the `--recursive` flag._


### Updating the API details
Changes to the API documentation happen upstream in the actual [Turf repository](https://github.com/turfjs/turf/). For example if you wanted to update the buffer documentation you would go to the [@turf/buffer/index.js](https://github.com/Turfjs/turf/blob/master/packages/turf-buffer/index.js) and edit jsdocs.

Presuming you've updated the documentation in the relevant turf module and your changes have been accepted, you can now update the docs using the following procedure:

1. Start with updating the turf project dependency: `cd` into the turf-www/turf submodule  and `git pull origin master`
2. `cd` back to the root of the turf-www project
3. Run `npm run generate`
4. Commit and push the changes

### Updating pages templates
If you would like to have a go at updating the actual website then you'll need to make changes in the `src` folder. The pages are built using [Vue.js](https://vuejs.org/) and [Nuxt.js](https://nuxtjs.org/).

To get a server running with live-reload etc so you can work on the docs run `npm run start`. 

