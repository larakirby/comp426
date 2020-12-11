/**
 * Course: COMP 426
 * Assignment: a04
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
    return `<span style="color:${hero.backgroundColor}"> 
                <img src=${hero.img}> 
                <div style="color:${hero.color}">${hero.name}</div> 
                <div>${hero.subtitle}</div> 
                <h1> ${hero.first}</h1> <h1>${hero.last}</h1> 
                <h2>First seen: ${hero.firstSeen}</h2> 
                <p>Description: ${hero.description}</p>
                <button>Edit</button></span>`;  
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return `<form> <span style="color:${hero.backgroundColor}"> 
        <img src=${hero.img}> 
        <div style="color:${hero.color}"> 
        <input value=${hero.name}> </input>
        </div> 
        <div>${hero.subtitle}</div> 
        <h1> <input value = ${hero.first}> </input></h1> <h1><input value = ${hero.last}> </input></h1> 
        <h2>First seen: <input value ="${hero.firstSeen.getFullYear()}-0${hero.firstSeen.getMonth()}-01"> </input></h2> 
        <textarea rows = "4"> <p>Description: <input value = ${hero.description}></input></p> </textarea>
        <button>Edit</button></span>
        <button type = "submit" >Save</button>
        <button>Cancel</button>
        </form`;
};





/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    for (let i = 0; i < heroes.length; i++){
        $root.append(renderHeroCard(heroes[i]));
    }
    // TODO: Append the hero cards to the $root element
        
    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];
    $root.append(renderHeroEditForm(randomHero));
    // TODO: Generate the hero edit form using renderHeroEditForm()
        // renderHeroEditForm(randomHero);
    // TODO: Append the hero edit form to the $root element
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
