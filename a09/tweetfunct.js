export async function buildTweets(){
    // yo uhhh where is the root
const $root =  $("#root");
const result = await axios({
    method: 'get',
    url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
    withCredentials: true,
});
    //put all of my tweets in x and then append!

    let x = `<div class="feed">`;
//50 most recent tweets
    for(let i = 0; i < 50; i++){
        //place base functionality for all of the tweet:
        

        if(result.data[i]["isMine"]){
            x+=`
            <div class="post">
            <h1> ${result.data[i]["author"]}</h1>
            <p> ${result.data[i]["body"]}</p>
            
            <h2> ${result.data[i]["replyCount"]} replies | ${result.data[i]["retweetCount"]} retweets | ${result.data[i]["likeCount"]} likes</h2>
            <div class = "buttons">
            <button class = "likebutton" id = "${result.data[i]["id"]}"> &#x2665 </button>
            <button class = "deletebutton" id = "${result.data[i]["id"]}"> &#x2672 </button>
            <button class = "editbutton" id = "${result.data[i]["id"]}"> &#x270F </button>
            <button class = "rtbutton" id = "${result.data[i]["id"]}">rt</button>
            <button class = "replybutton" id = "${result.data[i]["id"]}">reply</button>
             </div></div>
        `;
        } else {
            x+= `
            <div class="post">
            <h1> ${result.data[i]["author"]}</h1>
            <p> ${result.data[i]["body"]}</p>
            
            <h2> ${result.data[i]["replyCount"]} replies | ${result.data[i]["retweetCount"]} retweets | ${result.data[i]["likeCount"]} likes</h2>
            <div class = "buttons">
            <button class = "likebutton" id = "${result.data[i]["id"]}" > &#x2665 </button>
            <button class = "rtbutton" id = "${result.data[i]["id"]}">rt</button>
            <button class = "replybutton" id = "${result.data[i]["id"]}">reply</button>
            </div> </div>
        `;
        }
    }

    x+= `</div>`;
    $root.append(x);

}

export async function likeTweet(event){
event.preventDefault();

    if (event.target.value=="false"){
        $(result.data[i]["likeCount"]).replaceWith(result.data[i]["likeCount"]+1);
        let new_url = 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + event.target.id + "/like";
        const r_1 = await axios({
            method: 'put',
            url: new_url,
            withCredentials: true,
        });
    } else {
        $(result.data[i]["likeCount"]).replaceWith(result.data[i]["likeCount"]-1);
        let new_url = 'https://comp426-1fa20.cs.unc.edu/a09/tweets/' + event.target.id + "/unlike";
        const r_2 = await axios({
            method: 'put',
            url: new_url,
            withCredentials: true,
            
        });
    }

    $("#feed").replaceWith(buildTweets());
    


}



export async function edit(event){
    //event.preventDefault();
    //hey girls did you know that um
    let form_string = `
<form id="${event.target.id}" class = edit>
    <textarea id = "edittext">
        ${event.target.value}
    </textarea>
    <button id="${event.target.id}">send edited tweet</button>
</form>
    `;

    $("div[id='+ event.target.id +']").html(form_string);
}

export async function makeEdit(event){
    event.preventDefault();
    //what are we putting in the body
    let new_url = 'https://comp426-1fa20.cs.unc.edu/a09/tweets' + event.target.id;
    const result = await axios({
        method: 'put',
        url: 'new_url',
        withCredentials: true,
        data:{
            "body": $("textarea[id=edittext]").val(),
        },
    });

    $("#feed").replaceWith(buildTweets());
    
}



export async function replyForm(event){
   // event.preventDefault();
    //ummmm<3
    let replyid = event.target.id.toString();
    let reply_form = `
    <form id = replyid>
        <textarea id = "reply"> reply to this tweet
        </textarea>
        <button id = "${event.target.id}" class = "replybutton"> send reply </button>
    </form>
    `;
    //$('div[id='+event.target.id+']')
    let placeholder = $(document).getElementById(event.target.id);
    placeholder.html(reply_form);

}

export async function makeReply(event){
    event.preventDefault();
    let t = $("textarea[id=form_input]").val();
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data:{
            "type": "reply",
            "parent": event.target.id,
            "body":  t ,
        },
        
    });
    $("#feed").replaceWith(buildTweets());

}

export async function retweet(event){
    event.preventDefault();
    let retweetid = event.target.id.toString();
    let rt_form = ` 
    <form id = ${event.target.value}>
        <textarea id = "retweet"> retweet comment here
        </textarea>
        <button type = "submit" id = "${event.target.id}" class = "retweetsend"> send retweet </button>
    </form>
    `;

    $(document).html(rt_form);
}

export async function sendRetweet(event){
    event.preventDefault();
    const result = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });

    let rt = result.data.filter(post=> 
        post.id==event.target.id)[0];

    let x = $('textarea#retweet').val();
    const result1 = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
        data: {
            "type": "retweet",
            "parent": event.target.id,
            "body": `<div>${x}</div>`,
        },
    });
    //$().replaceWtih(());
    $("#feed").replaceWith(buildTweets());

}

export async function sendTweet(event){
    event.preventDefault();
    const result = await axios({
        method: 'post',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        
        data:{
            "type": "tweet",
            "body": $("textarea[id=form_input]").val(),
            
        },
        withCredentials: true,
    });

    $("#feed").replaceWith(buildTweets());
}


export async function deletePost(event){
    const result = await axios({
        method: 'delete',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets' + event.target.id,
        withCredentials: true,
    });
    $('#feed').replaceWith(buildTweets());
}

export const makeSite = function(){

    const $root = $("#root");

   //<div class = "site_title" >twitter</div>
   $root.append(`
   
   <form class = "make_tweet">
        <textarea id = "form_input">post and talk to the world!</textarea>
        <button type = "submit">send tweet</button>
   </form>
   
   `);
    buildTweets();

    //buildTweets();
    // $(document).on("click", ".editbutton", makeEdit);
    $(document).on("submit", ".make_tweet", sendTweet);
    $(document).on("click", ".editbutton", edit);
    $(document).on("click", ".deletebutton", deletePost);
    $(document).on("click", ".likebutton", likeTweet);

    
    $(document).on("click", ".reply", replyForm);
    $(document).on("click", ".replytweet",  makeReply);

    $(document).on("click", ".rtbutton",  retweet);
    $(document).on("submit", ".retweetsend", sendRetweet)


}

$(function(){
    makeSite();
    // $(document).on("click", ".editbutton", makeEdit);
    // $(document).on("click", ".likebutton", likeTweet);
    // $(document).on("submit", "#make_tweet", sendTweet);
});