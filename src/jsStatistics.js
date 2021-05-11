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
};

exports.average = function(data){
  let result;
  testArray(data);
  if(data.length){
    result = exports.sumAll(data) / data.length;
  }
  else{
    result = 0;
  }
  return result;
};

exports.sumAll = function(data){
  testArray(data);
  return data.reduce(exports.sum2);
};

exports.parseNumber = function(data) {
  const parsed = parseFloat(data);
  if (isNaN(parsed)) {
    throw new Error('Tried to convert a Not-A-Number (NaN) to Float');
  }
  return parsed;
};

exports.sum2 = (accumulator, currentValue) => {
  return parseFloat(accumulator) + exports.parseNumber(currentValue);
};

// get array with gains where currentItem > (currentItem-1)
exports.gains = (data) => {
  testArray(data);
  const result = data.map((current, index, array) => {
    if(index === 0)
      return NaN;
    const previous = parseFloat(array[index-1]);
    current = parseFloat(current);

    if(current > previous){
      const myFloat = current - previous;
      return myFloat;
    }
    else return 0;
  });
  return result;
};

// get array with values where currentItem < (currentItem-1)
exports.losses = (data) => {
  testArray(data);
  const result = data.map((current, index, array) => {
    if(index === 0)
      return NaN;
    const previous = parseFloat(array[index-1]);
    current = parseFloat(current);
    if(current < previous){
      const myFloat = previous - current;
      return  myFloat;
    }
    else return 0;
  });
  return result;
};

// calculate RSI indicator of all values of data: https://www.macroption.com/rsi-calculation/
exports.rsi = (data, period=14) => {
  let rs = NaN;
  let rsiData = [];
  let avgGain, avgLoss;
  const old = {avgGain: 0, avgLoss: 0};
  testArray(data);
  const gains = exports.gains(data);
  const losses = exports.losses(data);

  for(let position = period; position < data.length; position++){
    if(position == period){
      const gainsSamples = gains.slice(position - period + 1, position + 1);
      const lossesSamples = losses.slice(position - period + 1, position + 1);
      avgGain = exports.average(gainsSamples);
      avgLoss = exports.average(lossesSamples);
    }
    else{
      const newGain = gains[position];
      const newLoss = losses[position];
      avgGain = (old.avgGain*(period - 1) + newGain) / period;
      avgLoss = (old.avgLoss*(period - 1) + newLoss) / period;
    }

    if(avgLoss > 0){
      rs = avgGain / avgLoss;
    }
    else {
      rs = 99999999999;
    }
    old.avgGain = avgGain;
    old.avgLoss = avgLoss;
    const rsi = 100-(100/(rs + 1));

    rsiData[position] = rsi;
  }
  for(let i = 0; i<period; i++){
    rsiData[i] = NaN;
  }
  return rsiData;
};
