var fs = require("fs");
var path = require("path");

module.exports = function(locales, pathTolocale, callback) {
  var errFlag = false;
  if(locales.length < 1 || locales.indexOf('') >= 0) {
    errFlag = true;
    return callback(null, "Error: You have passed an empty array of locales");
  }
  if(!fs.existsSync(pathTolocale)) {
    errFlag = true;
    return callback(null, "Error: You have passed wrong path to locale folder");
  }
  var localeObject = {};
  locales.forEach(function(locale) {
    locale = locale.replace("-", "_");
    localeObject[locale] = {};
    var newPathTolocale = path.join(pathTolocale, locale);
    if(!fs.existsSync(newPathTolocale)) {
      errFlag = true;
      return callback(null, "Error: Path does not exist for " + locale);
    } else {
      fs.readdirSync(newPathTolocale).forEach(function(fileName) {
        if(!fileName.match(/^meta-/)) {
          return;
        }
        fullPath = path.join(newPathTolocale, fileName);
        try {
          data = require(fullPath);
          localeObject[locale][fileName] = data.last_update;
        } catch (e) {
          errFlag = true;
          return callback(new Error("Failed to read file: " + locale + "/" + fileName), null);
        }
      });
    }
  });
  if(!errFlag) {
    callback(null, localeObject);
  }
};
