turf-www
========

turf-www is the website for [Turf](http://github.com/turfjs/turf). It lives at http://turfjs.org/.

## Structure

The main sections of turf-www are:

- [homepage](http://turfjs.org)
- [API docs](http://turfjs.org/static/docs)
- [examples and tutorials](http://turfjs.org/learn.html)

## Contributing

### Documentation

To learn about contributing documentation, read [DOCUMENTATION.md](https://github.com/Turfjs/turf-www/blob/master/DOCUMENTATION.md) in this repo.

### Testing

phantomjs (version 2.0.0) is needed in order to run the tests.

```sh
$ brew install phantomjs
$ npm install
$ npm run build
$ npm run test
```
This will load all of the api-docs pages and save screenshots to the test/img/ directory.

### Examples and Tutorials

If you have examples or tutorials you have written, please open an issue and someone will add them to [learn.html](https://github.com/Turfjs/turf-www/blob/gh-pages/learn.html).

Our list of examples and tutorials will be growing and changing over time.

### Turf.js

To contribute to Turf.js, head to the [main Turf repo](https://github.com/Turfjs/turf).
