/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    let sum = a+b;
    return a  + ' + ' + b +' = '  + sum;
}
// console.log("sumToString function:");
// console.log(sumToString(5, 6));

/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export default function getIncreasingArray(startNumber, endNumber) {
 var array = [];
 for (let i=startNumber; i<=endNumber; i++) {
     array.push(i);
 }
 return array;
}
// console.log("getIncreasingArray function:");
// console.log(getIncreasingArray(8,12));

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    let max = Math.max(...numbers);
    let min= Math.min(...numbers);
    //let string1 = 'min: ' + min;
    //let string2 = 'max: ' + max
    return {min, max};
    //return 'min: ' + min + ', max: ' + max;

}
// var test_arr = [5, 7, 11, 200, 0];
// console.log('max/min function:');
// console.log(maxAndMin(test_arr));

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */

// console.log("countArray function: UNFINISHED");
// console.log(countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]]));
export function countArray(array) {
    let count_arr = {};
  for (let i = 0; i < array.length; i++){
     // count_arr.push(eachcount(array, array[i]));
     if(!count_arr[array[i]]){
         count_arr[array[i]] = 0;
     }
     ++count_arr[array[i]];
  }
  return count_arr;
}
// function eachcount(array, key) {
//     var count = 0;
//     array.forEach((k) => (k === key ));
//     return count;
// }


//how 2 delete unwanted ones </3 ugh im a bad coder
