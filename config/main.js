// DEPENDENCIES
const path = require('path');

// EXTERNAL FILES
const headers = require('./headers');
const pushManifest = require('./push_manifest');
const sitemap = require('./sitemap');
const serviceWorker = require('./service_worker');
const redirects = require('./redirects');
const rewrites = require('./rewrites');

// PATHS
const dist = path.resolve(__dirname + '/../dist');

module.exports = {
  // The name of the project in firebase
  project: 'pint-site',
  // The staging environment in firebase
  stage: 'pint-site-stage',
  // Firebase headers
  headers,
  // An array of push manifest objects.
  pushManifest,
  // An array of redirect objects
  redirects,
  // An array of rewrite objects
  rewrites,
  // An array of sitemap object
  sitemap,
  // A folder path of where to generate the static files
  dist,
  // The configuration object for workbox
  serviceWorker: serviceWorker(dist),
  // The folder path containing all files that will be copied over to dist
  src: 'src',
  // The .html file where all statically generated files will be cloned from, and injected content into.
  host: 'src/core/host.html',
  // The path to the app-shell.html file
  shell: 'src/core/app-shell.html',
  // The path to the folder containing page partials, to be generated to static files.
  pages: 'src/pages',
  legacy: true,
};