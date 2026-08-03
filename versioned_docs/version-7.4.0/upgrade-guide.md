---
sidebar_position: 3
---

# Upgrade Guide

When upgrading to a newer version of Turf, see the [CHANGELOG](https://github.com/Turfjs/turf/blob/master/CHANGELOG.md) and [release notes](https://github.com/Turfjs/turf/releases) for any breaking changes.  If you are getting errors after upgrade, look to see if the [API docs](https://turfjs.org) have changed for your functions between versions and migrate them as appropriate.

How you upgrade Turf will depend on your specific environment and tooling.  Here are some guidelines to get you started.

The source of truth for published versions of Turf is [NPM](https://www.npmjs.com/package/@turf/turf?activeTab=versions).  You are welcome to use other providers that republish these packages.

## In Node.js

```bash
# If you use the all-inclusive turf library
npm update --save @turf/turf

# if you use the smaller individual turf packages
npm update --save @turf/helpers @turf/buffer
```

As of v7, both CommonJS and ESM bundles are included.

## In browser

Whether downloading locally, or including a 3rd party version of turf directly, there are multiple CDN's to choose from and each has a URL scheme that allows you to specify what version you want, with some flexibility.  Structure your URL as appropriate for your needs:

- [jsdelivr](https://www.jsdelivr.com/)
  - browse: https://www.jsdelivr.com/package/npm/@turf/turf
  - latest within major version: https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js
  - latest within minor version: https://cdn.jsdelivr.net/npm/@turf/turf@7.0/turf.min.js
  - specific version: https://cdn.jsdelivr.net/npm/@turf/turf@7.0.0/turf.min.js
- [unpkg](https://www.unpkg.com/)
  - browse: https://unpkg.com/browse/@turf/turf@7.0.0/
  - latest within major version: https://unpkg.com/@turf/turf@^7/turf.min.js
  - latest within minor version: https://unpkg.com/@turf/turf@^7.0/turf.min.js
  - specific version: https://unpkg.com/@turf/turf@7.0.0/turf.min.js

Here's an example of migrating from Turf 6.x to 7.x

```html
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
```
becomes
```html
<script src="https://cdn.jsdelivr.net/npm/@turf/turf@7/turf.min.js"></script>
```

It is not recommended to use a CDN URL that always gives you the `latest` bleeding edge version of Turf, especially in a production app.  There are breaking changes to turf functions between major versions that can leave your app in a broken state.
