var fs        = require('fs'),
 path      = require('path');

  fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = require(path.join(__dirname, file));
    var name=file.replace(".js","");
    name=name.charAt(0).toUpperCase()+name.slice(1);
    exports[name] = model;
  });