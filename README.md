# Turf-ssr

This repository keeps the source code of the Turf website project. Basically it uses **Vue.js** in the components and **Nuxt.js** to generate the static bundle that could be served to the client.

To run this project in your local machine you need to have installed:

* Node.js
* NPM

Then with Git you can clone the repository to a local folder with those commands:

## Development Setup

``` bash
# clone the repository to a local folder
$ git clone https://github.com/Turfjs/turf-www.git

# go to the local folder
$ cd turf-www/

# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# generate static project
# the files will be located in docs/
$ npm run generate

# go to the generated pages
$ cd docs/

# serve the project with a static server
$ npx static-server
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
