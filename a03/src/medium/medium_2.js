import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */

 ////////////////////////////////////////////////////////// allCarStats helper functions ////////////////////////////////////////////////
//sum initializers for avg mpg
let city_count = 0;
let highway_count = 0;
//empty array to put all year stats in
let years = [];
//sum initializer for hybrids
let hybrid_count = 0;
for(let i = 0; i<mpg_data.length; i++){
    //adding mpg's
    city_count += mpg_data[i].city_mpg;
    highway_count += mpg_data[i].highway_mpg;
    //calling getStatistics on all years, adding to an array
    years.push(mpg_data[i].year);
    //counting hybrids
    if(mpg_data[i].hybrid==true){
        hybrid_count += 1;
    } 
}

//dividing out the city and highway avgs
let city = (city_count ) / (mpg_data.length);
let highway = (highway_count ) / (mpg_data.length);
//getting statistics
let all_yr_stats = getStatistics(years);
//dividing out the hybrid ratio
let hybrid_ratio = hybrid_count / mpg_data.length;
////////////////////////////////////////////////////////// end allCarStats helper functions //////////////////////////////////////////

 export const allCarStats = {
    avgMpg: {city, highway},
    allYearStats: all_yr_stats,
    ratioHybrids: hybrid_ratio,
};
// console.log(allCarStats.avgMpg);
// console.log(allCarStats.allYearStats);
// console.log(allCarStats.ratioHybrids);

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
// let hybrid_array = [];
// console.log(mpg_data[0].make);
// console.log(mpg_data[1].make);
// for(let i = 0; i<mpg_data.length; i++){
//     if(mpg_data[i].hybrid = true){
//         hybrid_array.push(mpg_data[i]);
//         //collect them by make, and count
//     }
// }

// let makes_and_counts = [];
// for(let i = 0; i<hybrid_array.length; i++){
//     if(true){
//         //collect them by make, and count
//         var h = {make: hybrid_array[i].make, count = 0};
//         makes_and_counts[i] = h;
//     }
// }
// console.log(mpg_data[0]);
// console.log(mpg_data[1]);
// console.log(mpg_data[2]);

let hybrid_array = [];
//array with only hybrids:
hybrid_array = mpg_data.filter(car => car.hybrid==true);
//console.log(hybrid_array[10]);
//want to use countArray to sort through hybrids per car
let alph_hybrid_array = [];
alph_hybrid_array = hybrid_array.sort((a,b) => a.make.localeCompare(b.make));

//next: will count the amount present of each make in the list of hybrids
//(counts the amt of hybrids)
//it only works in order which is why i just sorted alphabetically
let a = []; 
let b = [];
var last_elem;
for (let i = 0; i <alph_hybrid_array.length; i++ ) {
    if (alph_hybrid_array[i].make!==last_elem ) {
            a.push(alph_hybrid_array[i]);
            b.push(1);
    } else {b[b.length-1]++;}
    last_elem = alph_hybrid_array[i].make;
}

//now that we have the list of makes with corresponding # hybrids, we can sort them this way and store them hopefully!!!
let sorted_hybs = [];
for (let i=0;i<b.length; i++){
    var x = {car: a[i], frequency: b[i]};
    sorted_hybs.push(x);
}
//sort by amount of hybrids!
let final_sort = [];
sorted_hybs = sorted_hybs.sort((x,y) => y.frequency-x.frequency);
for(let i = 0; i< sorted_hybs.length; i++){
    for(let j=0; j < sorted_hybs[i].b; i++){
        let x = {make: alpha_hybrid_array[i].make, hybrids: alpha_hybrid_array[i].id};
        final_sort.push(x);
    }
}

console.log(final_sort[0]);






export const moreStats = {
    makerHybrids: final_sort,
    avgMpgByYearAndHybrid: undefined
};



//////////////helper fn taken from mild1 to modify:////////////////////////////////////////////////////
// export function countArray(array) {
//     let count_arr = {};
//   for (let i = 0; i < array.length; i++){
//      // count_arr.push(eachcount(array, array[i]));
//      if(count_arr[array[i]]==false){
//          count_arr[array[i]] = 0;

//      }
//      ++count_arr[array[i]];
//   }
//   return count_arr;
// }