const modules = require.context('../views', true, /\/mock\.js$/);

modules.keys().forEach(key => modules(key));
