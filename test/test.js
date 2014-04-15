var should = require("should");
var path = require("path");
var wts = require("../index.js");

describe("API Tests", function () {
  it("Call with good parameters", function (done) {
    should(function(){
      wts(['en'], path.join(__dirname, "../locale"), function(err, data) {
        data.should.containDeep({ en: { 'meta-test.json': 'date' } });
        done();
      })
    }).not.throw();
  });

  it("Call with bad locale", function (done) {
    should(function(){
      wts(['ba'], path.join(__dirname, "../locale"), function(err, data) {
        data.should.containEql('Error: Path does not exist for ba');
        done();
      });
    }).not.throw();
  });

  it("Call with empty locale", function (done) {
    should(function(){
      wts([], path.join(__dirname, "../locale"), function(err, data) {
        data.should.containEql('Error: You have passed an empty array of locales');
        done();
      });
    }).not.throw();
  });

  it("Call with empty index of locale", function (done) {
    should(function(){
      wts(['', 'en'], path.join(__dirname, "../locale"), function(err, data) {
        data.should.containEql('Error: You have passed an empty array of locales');
        done();
      });
    }).not.throw();
  });

  it("Call with wrong path to locale folder", function (done) {
    should(function(){
      wts(['en'], path.join(__dirname, "../../locale"), function(err, data) {
        data.should.containEql('Error: You have passed wrong path to locale folder');
        done();
      });
    }).not.throw();
  });

  it("Call with wrong path to locale folder and unknown locale", function (done) {
    should(function(){
      wts(['ba'], path.join(__dirname, "../../locale"), function(err, data) {
        data.should.containEql('Error: You have passed wrong path to locale folder');
        done();
      });
    }).not.throw();
  });

  it("Call with wrong path to locale folder and unknown locale", function (done) {
    should(function(){
      wts([''], path.join(__dirname, "../../locale"), function(err, data) {
        data.should.containEql('Error: You have passed an empty array of locales');
        done();
      });
    }).not.throw();
  });

  it("Call with an empty file", function (done) {
    should(function(){
      wts(['bad'], path.join(__dirname, "../locale"), function(err, data) {
        err.toString().should.containEql('Failed to read file: bad/meta-bad.json');
        done();
      });
    }).not.throw();
  });

});

