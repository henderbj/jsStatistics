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
const stats = require('../../jsStatistics');

describe('jsStatistics Module', function() {
	describe('#average)', function() {
		it('should throw error because data is no array', function() {
			assert.throws(()=>{stats.average('')}, {
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
			assert.throws(()=>{stats.parseNumber('Anything')}, {
				name: 'Error',
				message: 'Tried to convert a Not-A-Number (NaN) to Float'
			});
		});

		it('should give correct value of number string', function() {
			assert.equal(stats.parseNumber("100.25"), 100.25);
		});   
	});

	describe('#rsi)', function() {
		it('should give correct array of gains', function() {
			assert.deepEqual(stats.gains([1,3,7,7,2,11]), [2,4,0,0,9]);
		});

		it('should give correct array of losses', function() {
			assert.deepEqual(stats.losses([1,3,7,7,2,11]), [0,0,0,5,0]);
		});

		it('should give correct rsi indicator', function() {
			assert.equal(stats.rsi([1,3,7,7,2,11]), 75);
		});

		it('should give correct rsi indicator of more real data', function() {
			const testdata = [44.34,44.09,44.15,43.61,44.33,44.83,45.10,45.42,45.84,46.08,45.89,
        46.03,45.61,46.28,46.28];
			assert.equal(stats.rsi(testdata), 70.46413502109705);
		});
	});
});