'use strict';

var expect = require('chai').expect;

var testUtils = require('../testUtils');

var util = require('../../lib/digitalocean/util');

describe('utility functions', function() {
  describe('decamelizeKeys', function() {
    var simple_obj = {
      attr_one: 'foo',
      attr_two: 'bar'
    };

    var simpleCamelObj = {
      attrOne: 'foo',
      attrTwo: 'bar'
    };

    var complex_obj = {
      attr_one: 'foo',
      attr_two: {
        nested_attr1: 'bar'
      },
      attr_three: {
        nested_attr2: {
          nested_attr3: [{
            nested_in_array1: 'baz'
          }, {
            nested_in_array2: 'hello'
          }, {
            nested_in_array3: ['world', 'boo']
          }]
        }
      }
    };

    var complexCamelObj = {
      attrOne: 'foo',
      attrTwo: {
        nestedAttr1: 'bar'
      },
      attrThree: {
        nestedAttr2: {
          nestedAttr3: [{
            nestedInArray1: 'baz'
          }, {
            nestedInArray2: 'hello'
          }, {
            nestedInArray3: ['world', 'boo']
          }]
        }
      }
    };

    it('converts simple objects with camelcased keys to underscored', function() {
      expect(util.decamelizeKeys(simpleCamelObj)).to.deep.equal(simple_obj);
    });

    it('converts complex objects with camelcased keys to underscored', function() {
      expect(util.decamelizeKeys(complexCamelObj)).to.deep.equal(complex_obj);
    });
  });

  describe('extractListArguments', function() {
    describe('without a callback', function() {
      it('extracts params with a page', function() {
        var args = { '0': 1, 'length': 1 };
        var parsed = util.extractListArguments(args, 0);
        expect(parsed.params).to.deep.equal([1]);
      });

      it('extracts params with a per page', function() {
        var args = { '0': 1, '1': 2, 'length': 2 };
        var parsed = util.extractListArguments(args, 0);
        expect(parsed.params).to.deep.equal([1, 2]);
      });

      it('extracts a query object', function() {
        var query = { page: 1, perPage: 2 };
        var args = { '0': query, 'length': 1 };
        var parsed = util.extractListArguments(args, 0);
        expect(parsed.params).to.deep.equal([query]);
      });
    });

    describe('with a callback', function() {
      it('extracts params with a page', function() {
        var callback = function() {};
        var args = { '0': 1, '1': callback, 'length': 2 };
        var parsed = util.extractListArguments(args, 0);
        expect(parsed.params).to.deep.equal([1]);
        expect(parsed.callback).to.equal(callback);
      });

      it('extracts params with a per page', function() {
        var callback = function() {};
        var args = { '0': 1, '1': 2, '2': callback, 'length': 3 };
        var parsed = util.extractListArguments(args, 0);
        expect(parsed.params).to.deep.equal([1, 2]);
        expect(parsed.callback).to.equal(callback);
      });

      it('extracts a query object', function() {
        var callback = function() {};
        var query = { page: 1, perPage: 2 };
        var args = { '0': query, '1': callback,'length': 2 };
        var parsed = util.extractListArguments(args, 0);
        expect(parsed.params).to.deep.equal([query]);
        expect(parsed.callback).to.equal(callback);
      });

      it('extracts the callback', function() {
        var callback = function() {};
        var args = { '0': callback,'length': 1 };
        var parsed = util.extractListArguments(args, 0);
        expect(parsed.callback).to.equal(callback);
      });
    });

    describe('with a prepended argument', function() {
      describe('without a callback', function() {
        it('extracts params with a page', function() {
          var args = { '0': 0, '1': 1, 'length': 2 };
          var parsed = util.extractListArguments(args, 1);
          expect(parsed.identifier).to.equal(0);
          expect(parsed.params).to.deep.equal([1]);
        });

        it('extracts params with a per page', function() {
          var args = { '0': 0, '1': 1, '2': 2, 'length': 3 };
          var parsed = util.extractListArguments(args, 1);
          expect(parsed.identifier).to.equal(0);
          expect(parsed.params).to.deep.equal([1, 2]);
        });

        it('extracts a query object', function() {
          var query = { page: 1, perPage: 2 };
          var args = { '0': 0, '1': query, 'length': 2 };
          var parsed = util.extractListArguments(args, 1);
          expect(parsed.identifier).to.equal(0);
          expect(parsed.params).to.deep.equal([query]);
        });

        it('extracts an id', function() {
          var args = { '0': 0, 'length': 1 };
          var parsed = util.extractListArguments(args, 1);
          expect(parsed.identifier).to.equal(0);
        });
      });

      describe('with a callback', function() {
        it('extracts params with a page', function() {
          var callback = function() {};
          var args = { '0': 0, '1': 1, '2': callback, 'length': 3 };
          var parsed = util.extractListArguments(args, 1);
          expect(parsed.identifier).to.equal(0);
          expect(parsed.params).to.deep.equal([1]);
          expect(parsed.callback).to.equal(callback);
        });

        it('extracts params with a per page', function() {
          var callback = function() {};
          var args = { '0': 0, '1': 1, '2': 2, '3': callback, 'length': 4 };
          var parsed = util.extractListArguments(args, 1);
          expect(parsed.identifier).to.equal(0);
          expect(parsed.params).to.deep.equal([1, 2]);
          expect(parsed.callback).to.equal(callback);
        });

        it('extracts a query object', function() {
          var callback = function() {};
          var query = { page: 1, perPage: 2 };
          var args = { '0': 0, '1': query, '2': callback,'length': 3 };
          var parsed = util.extractListArguments(args, 1);
          expect(parsed.identifier).to.equal(0);
          expect(parsed.params).to.deep.equal([query]);
          expect(parsed.callback).to.equal(callback);
        });

        it('extracts an id', function() {
          var callback = function() {};
          var args = { '0': 0, '1': callback, 'length': 2 };
          var parsed = util.extractListArguments(args, 1);
          expect(parsed.identifier).to.equal(0);
          expect(parsed.callback).to.equal(callback);
        });
      });
    });
  });
});