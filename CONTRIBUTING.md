## Updating existing documentation for a module
- This happens in the [Turf repository](https://github.com/turfjs/turf/) with `/packages/` directory for each module. 
- To fix the documentation for a module you need to modify the [jsdoc](https://jsdoc.app/) for an individual module found in either the `index.js` or the `index.ts`. 
  - eg to update the documentation for `@turf/along` you'd need to modify the jsdoc within `/turf/packages/turf-along/index.ts`.
- Once you've made your changes you'll need to create a pull request to the [Turf repository](https://github.com/turfjs/turf/).
  - **Note** Nothing needs to be changed in the `README.md` for a module.
- Even once your PR is accepted the docs will still need to be updated manually.

## Updating content on http://turfjs.org/
1. Clone with `turf-www` repository locally
  - `git clone https://github.com/Turfjs/turf-www.git --recursive` 
  - _Important: The `--recursive` flag is important._
2. Run `npm install`
3. Start with updating the turf project dependency:
  - `cd` into the `turf-www/turf` submodule and run `git pull origin master`
  - Run `lerna run build`, this will update the `dist/js/index.js` for each module, from which the docs are generated.
4. `cd` back to the root of the `turf-www` project
5. Run `npm run create-config`
6. Run `npm run generate`
7. Commit and push the changes

## Updating pages templates
If you would like to have a go at updating the actual website then you'll need to make changes in the `turf-www/src` folder. The pages are built using [Vue.js](https://vuejs.org/) and [Nuxt.js](https://nuxtjs.org/).

To get a server running with live-reload etc so you can work on the docs run `npm run start`. 

## Overview for how the docs work
- http://turfjs.org/ is managed as a static site using Github Pages
  - A custom domain for Github Pages in present in `/docs/CNAME`
- The `/src` directory contains the VueJS app
  - This can be run in a live preview mode using `npm run start`, note that this won't pick up changes to the module documentation.
- The API docs are generated from jsdoc markup in each module within the `/turf` submodule
  - [DocumentationJS](https://documentation.js.org/) is used to parse the jsdoc content in each module
  - The `npm run create-config` cmd calls the `/scripts/create-config.js` file, which generates the `src/assets/config.json` file which is used by the VueJS to render the docs.
- The `/src` VueJS app, is built into the final deployed docs are built using [NuxtJS](https://nuxtjs.org/) and are found in the `/docs` folder
  - These are created using the `npm run generate` cmd. 
