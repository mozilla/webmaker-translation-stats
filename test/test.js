var should = require("should");
var path = require("path");
var wts = require("../index.js");

describe("API Tests", function () {
  it("Can call the function with good parameter", function (done) {
    should(function(){
      wts(['en'], path.join(__dirname, "../locale"), function(err, data) {
        data.should.containDeep({ en: { 'meta-test.json': 'date' } });
        done();
      })
    }).not.throw();
  });

  // it("Can call the function with good parameter", function (done) {
  //   should(function(){
  //     wts(['ba'], path.join(__dirname, "../locale"), function(err, data) {
  //       // console.log(err, data);
  //       done();
  //     });
  //   }).throw();
  // });
});

