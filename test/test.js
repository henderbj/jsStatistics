// jsStatistics, a little JS library with some statistics functions
// Copyright (C) 2021  Henderb Rodriguez

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

const assert = require('assert');
const stats = require('../src/jsStatistics');

describe('jsStatistics Module', function() {
  describe('#average)', function() {
    it('should throw error because data is no array', function() {
      assert.throws(()=>{stats.average('');}, {
        name: 'Error',
        message: 'data must be an array'
      });
    });

    it('should give correct average of array data', function() {
      assert.equal(stats.average([1,2,3,4]), 2.5);
    });
  });

  describe('#sumAll)', function() {
    it('should give correct sum of array data', function() {
      assert.equal(stats.sumAll([1,2,3,4]), 10);
    });
  });

  describe('#parseNumber)', function() {
    it('should throw error because data is no number', function() {
      assert.throws(()=>{stats.parseNumber('Anything');}, {
        name: 'Error',
        message: 'Tried to convert a Not-A-Number (NaN) to Float'
      });
    });

    it('should give correct value of number string', function() {
      assert.equal(stats.parseNumber('100.25'), 100.25);
    });
  });

  describe('#rsi)', function() {
    it('should give correct array of gains', function() {
      const gains = stats.gains([1.2,44.09,44.15,7,2.3,11.7]);
      const gainsFixed = gains.map(x => parseFloat(x.toFixed(2)));
      assert.deepEqual(gainsFixed, [42.89,0.06,0,0,9.4]);
    });

    it('should give correct array of losses', function() {
      const losses = stats.losses([1.3,3.5,7.7,7.11,2.13,11.17]);
      const lossesFixed = losses.map(x => parseFloat(x.toFixed(2)));
      assert.deepEqual(lossesFixed, [0,0,0.59,4.98,0]);
    });

    const testRsi = function(data, expectedData, period=14, invalidValue=-1) {
      const rsi = stats.rsi(data, period);
      const rsiFixed = rsi.map(x => {
        return parseFloat(x.toFixed(2));
      });
      const invalid = [];
      for(let i = 0; i < period; i++){
        invalid.push(invalidValue);
      }
      const expected = invalid.concat(expectedData);
      assert.deepEqual(rsiFixed, expected);
    };

    it('should give correct rsi indicator', function() {
      testRsi([1,3,7,7,2,11,38,16], [75,90.70,55.32], 5);
    });

    it('should give correct rsi indicator of more real data', function() {
      const testData=[44.34,44.09,44.15,43.61,44.33,44.83,45.10,45.42,45.84,46.08,45.89,46.03,
      45.61,46.28,46.28,46.00,46.03,46.41,46.22,45.64,46.21,46.25,45.71,46.45,45.78,45.35,44.03,44.18,44.22,44.57,43.42,42.66,43.13];
      const expectedData = [70.46, 66.25, 66.48, 69.35, 66.29, 57.92, 62.88, 63.21, 56.01, 62.34,
      54.67, 50.39, 40.02, 41.49, 41.9, 45.5, 37.32, 33.09, 37.79];
      testRsi(testData, expectedData);
    });
  });
});
