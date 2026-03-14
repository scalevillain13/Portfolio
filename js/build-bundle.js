var fs = require('fs');
var path = require('path');
var dir = __dirname;
var order = ['nav.js','nav-highlight.js','hero-typing.js','footer.js','scroll-animations.js','code-typing.js','portfolio-modal.js','portfolio-tabs.js','portfolio-filter.js'];
var parts = order.map(function(f) { return fs.readFileSync(path.join(dir, f), 'utf8'); });
fs.writeFileSync(path.join(dir, 'scripts.bundle.js'), parts.join('\n'), 'utf8');
console.log('scripts.bundle.js written');
