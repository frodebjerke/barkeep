var join = require("path").resolve;
var base = './web';

var notify = require('gulp-notify');

module.exports = {
    base: base,
    output: './public',
    path: {
        "scripts": join(base, "app.js"),
        "scriptsWatch": join(base, "**/*.js"),
        "less": join(base, "style/barkeep.less"),
        "lessWatch": join(base, "style/**/*.less")
    },

    join: join,

    plumb: {
        errorHandler: notify.onError('Error: <%- error.message %>')
    }
};
