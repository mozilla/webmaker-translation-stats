var fs = require("fs");
var path = require("path");

module.exports = function(locales, pathTolocale, callback) {console.log(locales, pathTolocale)
  var localeObject = {};
  locales.forEach(function(locale) {
    locale = locale.replace("-", "_");
    localeObject[locale] = {};
    var newPathTolocale = path.join(pathTolocale, locale);
    fs.readdirSync(newPathTolocale).forEach(function(fileName) {console.log(fileName)
      if(!fileName.match(/^meta-/)) {
        return;
      }
      fullPath = path.join(newPathTolocale, fileName);
      console.log(fullPath)
      try {
        data = require(fullPath);
        localeObject[locale][fileName] = data.last_update;
      } catch (e) {
        console.error(e.message);
        return callback(e, null);
      }
    });
  });
  callback(null, localeObject);
};
