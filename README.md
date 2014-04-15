webmaker-translation-stats
==========================

[![Build Status](https://travis-ci.org/mozilla/webmaker-translation-stats.svg)](https://travis-ci.org/mozilla/webmaker-translation-stats)

Statistics for translation files adding to healthcheck

Install
``` bash
$ npm install webmaker-translation-stats
```

Requirement:

Must have `meta-translation.json` in your `locale` directory under given `locale`

Example

```bash

# Main js file
locale/
    en/
       meta-test.json
       test.json
```

Expected data in `meta-test.json`

``` json
{
  "last_update": "some date"
}
```

Include in your project

``` javascript
var wts = require("webmaker-translation-stats");

wts(['en'], path.join(__dirname, "../../locale"), function(err, data) {
  console.log("err", data);
});
```

`data` will return this json blob if no error passed in:

``` json
  {
    "en": {
      "meta-test.json": "some date"
    }
  }
```
