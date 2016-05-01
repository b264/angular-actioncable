[Back to readme](https://github.com/angular-actioncable/angular-actioncable/blob/master/README.md)

## Setup Development (developed using Node v4.3.1)

 - `npm install -g gulp-cli`
 - `npm install -g karma-cli`
 - `npm install`

 - `gulp jshint` runs jshint over the `/src` javascript files
 - `gulp build` builds package in `/dist` folder
 - `gulp watch` continuously runs `gulp build` on any change of the `/src` files
 -
 - `gulp test` run tests on `/src` files (must have {Chromium or Chrome} and Firefox installed locally)
 - `gulp test-dist` run tests on `/dist/angular-actioncable.js` files (must have {Chromium or Chrome} and Firefox installed locally)
 - `gulp test-min` run tests on `/dist/angular-actioncable.min.js` files (must have {Chromium or Chrome} and Firefox installed locally)

 - `gulp serve` runs `gulp test`, `gulp watch` and `gulp build`
 - `gulp release` runs `gulp jshint`, `gulp test`, `gulp build`, `gulp test-dist` and `gulp test-min` in this order

 - before submitting a PR, make sure you successfully run:
   * `gulp test`
   * `gulp jshint`
   * `gulp build`
   * `gulp test-dist`
   * `gulp test-min`

   or run all above tasks using `gulp release`

## Publish
 - update the changelog with the new version; commit & push to master
 - change the version in `bower.json` and `package.json` and `README.md` (5 occurrences) and push a commit named `bump version` to `master` branch
 - tag a new release with the new version in github (bower will use this)
 - fetch upstream
 - publish to npm: pull master, `npm login`, `npm publish`

