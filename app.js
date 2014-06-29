var express = require('express');
var fs = require('fs');
var express = require('express');
var exphbs = require('express3-handlebars');
var config = require('./config/config');
var fs = require('fs');
var mongoconf = require('./config/mongo')

mongoconf.connectToMongo();


var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app = express();

app.use(express.static(config.root + '/public'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());
app.engine('.hbs', exphbs({extname: ".hbs"}));
app.set('view engine', '.hbs');
app.set('views', config.root + '/app/views');

// Configuration
app.configure( function() {
});


require('./config/routes.js')(app);

app.listen(3000);
