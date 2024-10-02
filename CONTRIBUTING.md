## Updating documentation for a module

Documentation is generated automatically wherever possible directly from the Turf source code. Best practice is to submit a PR to update the documentation in the relevant package of the turf repository.

For example, to update the documentation for `@turf/along` you would modify the JSDoc comments within [`/turf/packages/turf-along/index.ts`](https://github.com/Turfjs/turf/blob/master/packages/turf-along/index.ts).

As part of the commit process, the README.md in the turf-along directory will automatically be updated to reflect your changes.

Periodically the Turf website is also updated to reflect the latest documentation generated from the source code. It is similar to the README.md though has some extra features such as interactive example maps.

## Updating the Turf website

The content of the Turf website resides in a separate repository, which links to the turf repo as a submodule.

1. A custom script (generate-api-mdx.ts) generates MDX (extended Markdown) describing the API directly from the Turf source files. generate-api-mdx.ts does any custom handling Turf requires, for example generating the interactive maps used to display examples.
1. Docusaurus then processes that MDX into a static HTML website.
1. The HTML files are uploaded to github pages where they become publicly accessible via https://turfjs.org

### Terminology confusion

Docusaurus lets us publish multiple versions of the documentation simultaneously, accessed via a dropdown in the top menu. The terminology used can be a bit confusing though.

Currently on the website we have versions:

| Label | Docusaurus         | Description                                                                                                              |
| ----- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Next  | Current            | Bleeding edge _unversioned_ documentation from the git repo. Probably hasn't yet been published to NPM                   |
| 7.0.0 | Latest             | The most recent versioned snapshot of the documentation. This is the default shown to users when first visiting the site |
| 6.5.0 | a previous version | Archived documentation from a version that is neither Current or Latest                                                  |

When we upload a new release of Turf to NPM we take a snapshot of the _Current_ documentation and copy that into version _whatever_. Docusaurus then points "Latest" at this newly minted version.

### Generate documentation to version as 7.1.0

In this step you will take a snapshot of the _Current_ documentation, and save it as version 7.1.0.

First thing to do is make sure _Current_ points to the code (and hence, the documentation) for 7.1.0. It likely points to the HEAD of the tree, which may not necessarily be 7.1.0, especially if there have already been some bug fixes between releasing to NPM and updating the documentation. So we will temporarily point _Current_ to the 7.1.0 code, generate our 7.1.0 snapshot, and then restore it to what it was.

To do this we link the `turf/` submodule directory in turf-www to the relevant commit in the turf repo. In the example below commit `68915ee` refers to the 7.1.0 tag in the turf repo:

```
$ git -C turf/ checkout 68915ee
```

Now that the `turf/` submodule points to 7.1.0 code regenerate the API documentation:

```
$ npx tsx ./scripts/generate-api-mdx.ts
```

You will likely see many changes to MDX files in the `docs/` directory.

Run docusaurus to view the site in dev mode and highlight any missing routes, etc. Docusaurus is pretty good at finding problems. Fix any issues manually, usually by tweaking the MDX.

```
$ npm run start
```

Note the generated documentation will appear under the _Next_ drop down menu.

You could at this point commit the changes. However we're about to make a versioned snapshot which we _will_ commit, so it's not absolutely necessary.

Now, version the contents of _Current_ as 7.1.0:

```
$ npm run docusaurus docs:version 7.1.0
```

You will now see many more changes in the `versioned_docs` directory. This is the snapshot we want to commit and publish. Before we do that though, switch back to the HEAD of our git repo and regenerate the _Current_ documentation based on that code:

```
$ git submodule update --init
$ npx tsx ./scripts/generate-api-mdx.ts
```

Most, if not all, of the changes in docs/ should revert. If any remain review them as they may have previously been committed as manual corrections (and thus can be discarded).

You'll likely have changes in these locations:

```
api-sidebar.ts <- might change
versions.json <- should be a line added for the new version snapshot
docs/ <- maybe a couple of changed files
versioned_docs/ <- many new files
versioned_sidebars/ <- one new file
```

Once everything looks good, commit all the files and push to your fork:

```
$ git add .
$ git commit -m "Adding v7.1.0 documentation snapshot."
$ git push
```

### Publishing to turfjs.org

To build and publish the site, you simply need to create a PR from your fork to turf-www:master. This will run a test build as a github action.

When your PR is merged into master, another github action will deploy the content automatically to github pages.
