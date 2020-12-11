/**
 *
 * @param variable
 * @returns {{type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value: *}}
 * example: identifyVariable(4);
 * returns: { type: 'number', value: 4 }
 */
export function identifyVariable(variable) {
   let type = typeof variable;
   let value = variable;
   return {type, value};
}
// console.log('identifyVariable function:');
// let hey = 'yuh aye';
// console.log(identifyVariable(hey));

/**
 *
 * @param array
 * @returns {[]}
 * example: identifyArray(['some', 3, [3, 4], false]);
 * returns: [
 { type: 'string', value: 'some' },
 { type: 'number', value: 3 },
 { type: 'object', value: [ 3, 4 ] },
 { type: 'boolean', value: false }
 ]

 */
export function identifyArray(array) {
   let id_arr = [];
   for(let i = 0; i < array.length; i++){
      let x = array[i];
      id_arr.push(identifyVariable(x));
   }
   return id_arr;
}

// console.log("id array function: UNFINISHED");
// console.log(identifyArray([1, 'yeah', [3,5], false]));

/**
 * mutates the object that is passed in.
 * @param object
 * @param key
 * @returns {*} does not have to return anything
 *
 * example:
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 removeKey(obj, 'password');
 obj now does not contain the `password` field
 */
let obj = {
   name: 'Mr. Boss',
   title: 'boss',
   age: 33,
   password: 'pass123'
};
export function removeKey(object, key) {
   delete object[key];
   //return object;
}
//console.log("removeKey function:");
//console.log(removeKey(obj, 'title'));
//console.log(obj.title);

/**
 * Does not mutate the object passed in
 * @param object
 * @param key
 * @returns {*} The object with its keys removed
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 obj = removeKeyNonDestructive(obj, 'password');
 obj will not have the `password` field only because it was assigned the result of the function.
 If only `removeKeyNonDestructive` was called, nothing would have changed.
 */
export function removeKeyNonDestructive(object, key) {
   let{[key]: omit, ...the_rest} = object;
   return the_rest;
}

/**
 * Remove and return the listed keys. Without mutating the object passed in.
 * @param object
 * @param {string[]} keyList
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * example:


 let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
 obj = removeKeys(obj, ['password', 'age']);
 // object not looks like this
 { name: 'Mr. Boss', title: 'boss' }

 * @return {*} The object with its keys removed.
 */
export function removeKeys(object, keyList) {
   for (let i = 0; i < keyList.length; i++){
      let x = removeKeyNonDestructive(object, keyList[i]);
      object = x;
   }
   return object;
}
// let ob = {
//    name: 'Mr. Boss',
//    title: 'boss',
//    age: 33,
//    password: 'pass123'
// };
// console.log(removeKeys(ob, ['password', 'age']));
// console.log(ob.age);