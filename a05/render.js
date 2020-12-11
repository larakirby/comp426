/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */
// import {heroicData} from data.js;
// import { data } from "jquery";


/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
// let month = new Date(hero.firstSeen).getUTCMonth();
//    let day = new Date(hero.firstSeen).getUTCDate();
//    let year = new Date(hero.firstSeen).getUTCFullYear();
//    let format = year + "/" + month + "/" + day;
export const renderHeroCard = function(hero) {
    
    return `
    <section class = "h_card" id="${hero.id}">
    <span style="color:${hero.backgroundColor}"> 
    <img src=${hero.img}> </span>
    <div id = "identify_hero" style="visibility: hidden">${hero.id}</div>
    <div style="color:${hero.color}">${hero.name}</div> 
    <div>${hero.subtitle}</div> 
    <h1> ${hero.first}</h1> <h1>${hero.last}</h1> 
    <h2>First seen: ${new Date(hero.firstSeen).getUTCFullYear() + "/" + new Date(hero.firstSeen).getUTCMonth() + "/" + new Date(hero.firstSeen).getUTCDate()}</h2> 
    <p>Description: ${hero.description}</p>
    <button id="${hero.id}" class = "edit">Edit</button>
    </section>`;  
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    return `
        <section class = "edit_card">
        <form id = "${hero.id}" > <span style="color:${hero.backgroundColor}"> 
            <img src=${hero.img}> 
            <div style="color:${hero.color}"> 
                <input type="text" id = "name" value="${hero.name}"> </input>
            </div> 
            <textarea id= "subtitle" rows=4>${hero.subtitle}</textarea>
            <h1> <input type="text" id ="fname" value = "${hero.first}"> </input></h1> <h1><input type="text" id = "lname" value = ${hero.last}> </input></h1> 
            <h2>First seen: <input id="firstSeen" value ="${hero.firstSeen.getFullYear()}-0${hero.firstSeen.getMonth()}-01"> </input></h2> 
            <p>Description:  <input type="text" id="desc" value = "${hero.description}"> </input>  </p>
            
            <button id="submit-btn" data-id="${hero.id}" type = "submit" >Save</button>
            <button id="${hero.id}" data-id="${hero.id}" class="cancel">Cancel</button>
        </form>
        </section>`;
};

//<div id = "identify_hero">${hero.id}</div>



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
//    let j=0;
//     for(let i=0;i<heroicData.length;i++){
//         //check if heroicdata[i] is id
//         if(heroicData[i].id == event.target.getAttribute('id')){
//             j=i;
//         }
//     }
    event.preventDefault();
    //let j = heroicData.find(h=> h.id == event.target.getAttribute('id'));
    heroicData.forEach(hero=>{
        if (hero.id == event.target.getAttribute('id')){
            let k=$(this).closest(".h_card");
            return k.replaceWith(renderHeroEditForm(hero));
        }
    });
    //let hero = heroicData[j];
   //let k=event.currentTarget.closest(".h_card");
//     let k=$(this).closest(".h_card");
//    //let k= $('#root').getElementById(heroicData[j].id);
//     //console.log(heroicData[j]);
//     return k.replaceWith(renderHeroEditForm(j));
    
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
   console.log("cancel button")
    //similar to handle edit button
    //find index of id 
    //make var, using closest: use class from edit form
    //replace edit form class thing with heroicdata @index
    //let j = heroicData.find(h=> h.id = event.target.getAttribute('data-id'));
    console.log(event.target);
    heroicData.forEach(hero=>{
        if (hero.id == event.target.getAttribute('data-id')){
            let k=$(this).closest(".edit_card");
            console.log(heroicData);
            return k.replaceWith(renderHeroCard(hero));
        }
    });
   
    // let k=$(this).closest(".edit_card");
    // return k.replaceWith(renderHeroCard(j));
    
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // try {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
   
    //event.preventDefault();
    heroicData.forEach(hero=>{
        if(hero.id == event.target.getAttribute('data-id')){
            hero.name=$("#name").val();
            hero.first=$("#fname").val();
            hero.last=$("#lname").val();
            hero.subtitle=$("#subtitle").val();
            let yr = $("#firstSeen").val().slice(0,4);
            let mnth = $("#firstSeen").val().slice(5,7);
            let date = new Date(yr, mnth);
            hero.firstSeen = date;
            hero.description=$("#desc").val();
            let k=$(event.target).closest("#edit-form");
            return $(`#${event.target.getAttribute('data-id')}`).replaceWith(renderHeroCard(hero));
        }
    });
    //$(event.target.getAttribute('data-id'))
    

    // } catch(error) {
    //     console.log(error);
    // }

    // heroicData.forEach(hero=>{
    //     if(hero.id=placeholder_id){
    //         hero.name=form_vals[0].value;
    //         hero.subtitle=form_vals[1].value;
    //         hero.first=form_vals[2].value;
    //         hero.last=form_vals[3].value;
    //             let date = new Date(form[4].value.getFullYear(), form[4].value.getFullMonth());
    //         hero.firstSeen= date;
    //         hero.description=form.vals[5].value;
    //         placeholder_hero = hero;
    //     }
    // });
    // $form.remove();
    // $root.append(placeholder_hero);

};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    let p_hero = '';
    heroes.forEach(hero=>{
        //p_hero += renderHeroCard(hero);
        $root.append(renderHeroCard(hero))
    });
    //$root.html(p_hero);
    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    // for (let i = 0; i < heroes.length; i++){
    //     $root.append(renderHeroCard(heroes[i]));
    // }


    $root.on('click', ".edit", handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
     $root.on('click', '#submit-btn', handleEditFormSubmit);

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel butt
    $root.on('click', '.cancel', handleCancelButtonPress);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);

    // $(document).on('click', '.edit', handleEditButtonPress);

    // // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    // //       submitting the form
    //  $(document).on('submit', '#edit-form', function(event){handleEditFormSubmit(this);});

    // // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    // //       clicking the cancel butt
    // $(document).on('click', '.cancel', function(){handleCancelButtonPress(this);});
});

