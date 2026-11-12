'use strict';

// Английский словарь (DEFAULT_LOCALE и фоллбэк для остальных языков, см. gulp/i18n/index.mjs)
export default {
  'cache.init': 'Initializing dependency cache...',
  'cache.setCalled': 'setDependencyCache() called.',
  'cache.memoryUsage': 'memory used:',
  'cache.counts': 'Components in cache: {{components}}, sections in cache: {{sections}}, templates: {{templates}}',
  'cache.reset': 'Cache cleared ({{reason}})',
  'cache.memoryLimitExceeded': 'Memory limit exceeded: {{used}} MB',
  'cache.usedFromCache': 'DEPENDENCY CACHE',
  'cache.usedFresh': 'NEW DEPENDENCY ANALYSIS',
  'cache.componentsStat': 'components: {{count}} (in {{files}} files)',
  'cache.sectionsStat': 'sections: {{count}} (in {{files}} files)',
  'cache.templatesStat': 'templates: {{count}} (in {{files}} files)',

  'debug.noData': 'No data for {{label}}',
  'debug.tableSummary': 'dependencyMap -> {{label}}s: {{count}} items',
  'table.fileCount': 'Files count',
  'table.usedIn': 'Used in',

  'monitor.notificationTitle': 'Gulp monitor',
  'monitor.resourceExceeded': 'Resource threshold exceeded',
  'monitor.statFailed': 'failed to read stats: {{error}}',

  'watcher.changed': 'Changed:',

  'notify.startError': 'Gulp startup error',
  'notify.buildError': 'Gulp build error',
  'notify.serverError': 'Gulp server startup error',
  'notify.devMessage': 'project started, happy coding!',
  'notify.buildMessage': 'check for the build folder in the parent directory.',
  'notify.devTitle': 'Hello world!',
  'notify.buildTitle': 'Build complete',

  'info.sectionAbout': 'About',
  'info.app': 'App',
  'info.version': 'Version',
  'info.license': 'License',
  'info.sectionSystem': 'System',
  'info.os': 'OS',
  'info.platform': 'Platform',
  'info.arch': 'Arch',
  'info.sectionRuntime': 'Runtime',
  'info.runtimeLabel': 'Runtime',
  'info.modeLabel': 'Mode',
  'info.modeDev': 'Development',
  'info.modeProd': 'Production',

  'errors.sass': 'Oops! Sass errored',
  'errors.njk': 'Oops! Nunjucks template errored',
  'errors.scripts': 'Oops! Scripts errored',
  'errors.json': 'Oops! Json errored',
  'errors.vendors': 'Oops! Vendor plugin errored',
  'errors.assets': 'Oops! Assets file errored',

  'styles.initBuild': 'Initializing main.scss build',

  'depmap.incrementalUpdate': 'Incrementally updated "{{label}}" -> files: {{count}}',
  'depmap.fileSynced': 'Synced file "{{path}}" -> links updated',

  'common.none': '(none)',
  'common.readFileFailed': '⚠️ Failed to read file: {{file}}',

  'nunjucks.jsonDirectPage': 'Updated JSON {{name}} -> rebuilding only the page "{{page}}.njk"',
  'nunjucks.jsonLinkedRebuild': 'Updated JSON {{name}} -> linked to an entity -> rebuilding {{count}} file(s):',
  'nunjucks.jsonNoLinks': 'Updated JSON {{name}} -> no links -> rebuilding all pages',
  'nunjucks.globalJson': 'Updated global JSON ({{name}}) -> rebuilding all pages',
  'nunjucks.pageUpdated': 'Updated page template -> rebuilding "{{name}}"',
  'nunjucks.componentUpdated': 'Updated component "{{name}}" -> rebuilding file(s):',
  'nunjucks.sectionUpdated': 'Updated section "{{name}}" -> rebuilding file(s):',
  'nunjucks.templateUpdated': 'Updated template "{{name}}" -> rebuilding file(s):',
  'nunjucks.updateNoLinks': 'Update "{{name}}" -> no links, rebuilding all pages',
  'nunjucks.unknownOrFull': 'Unknown change or full render -> rebuilding all pages',
};
