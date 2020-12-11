import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    //return array.reduce(function(a, b){
     //   return a+b;
   // }, 0);
    return array.reduce((i, j) => (i+=j));
}
//console.log("sum function:");
//console.log(getSum([1, 2, 3, 4, 5]));


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    let sorted = array.sort((a,b) => a-b);
    let midpoint = Math.ceil(array.length / 2);
    if (array.length %2 !==0){
        return sorted[midpoint-1];
    } else {
        return (sorted[midpoint] + sorted[midpoint-1])/2;
    }
}
// console.log("median function: ");
// console.log(Math.ceil(([1,3,12,15,41,54,54]).length/2));
// console.log(getMedian([1,3,12,15,41,54,54]));
/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
function stDev(array){
    let length = array.length;
    let mean = array.reduce((a,b) => (a+b)) / length;
    return Math.sqrt(array.map(x => Math.pow(x-mean, 2)).reduce((a,b) => (a+b))/ length);
}

export function getStatistics(array) {
    let min = Math.min(...array);
    let median =  getMedian(array);
    let max = Math.max(...array);
    let standard_deviation = stDev(array);
    let variance = Math.pow(standard_deviation, 2);
    let mean = getSum(array)/array.length;;
    let length = array.length;
    let sum = getSum(array);
    return {min, median, max, variance, mean, length, sum, standard_deviation};
   
}
//console.log("statistics: ");
//console.log(getStatistics([3,2,4,5,5,5,2,6,7]));