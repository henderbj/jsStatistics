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

const testArray = function(data){
	if(!Array.isArray(data)){
		throw new Error('data must be an array');
	}
}

exports.average = function(data){
	testArray(data);
	return exports.sumAll(data) / data.length;
}

exports.sumAll = function(data){
	testArray(data);
	return data.reduce(exports.sum2);
}

exports.parseNumber = function(data) {
	const parsed = parseFloat(data)
	if (isNaN(parsed)) {
		throw new Error('Tried to convert a Not-A-Number (NaN) to Float');
	}
	return parsed;
}

exports.sum2 = (accumulator, currentValue) => {
	return parseFloat(accumulator) + exports.parseNumber(currentValue);
}

// get array with gains where currentItem > (currentItem-1)
exports.gains = (data) => {
	const result = data.map((current, index, array) => {
		if(index === 0)
			return null;
		if(current > array[index-1]){
			return parseFloat(current) - parseFloat(array[index-1]);
		}
		else return 0;
	});
  return result.slice(1); //first element removed
}

// get array with values where currentItem < (currentItem-1)
exports.losses = (data) => {
	const result = data.map((current, index, array) => {
		if(index === 0)
			return null;
		if(current < array[index-1]){
			return  parseFloat(array[index-1]) - parseFloat(current);
		}
		else return 0;
	});
  return result.slice(1); //first element removed
}

// calculate RSI indicator of all values of data: https://www.macroption.com/rsi-calculation/
exports.rsi = (data) => {
	const ups = exports.gains(data);
	const downs = exports.losses(data);
	const avgUps = exports.average(ups);
	const avgDowns = exports.average(downs);
	const rs = avgUps / avgDowns;
	const rsi = 100 - (100 / (rs + 1));
	return rsi;
}
