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
});