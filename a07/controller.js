import Game from './engine/game.js'

//my random jquery lines
// <script src = "node_modules/jquery/dist/jquery.js"></script>
    
export const constructBoard=function(score, board){
    let board_html = ` <div id = "background"> <h1> 2048</h1> 
                        <h2>how to play? use the up, down, left, and right arrows 
                        to combine like numbers in this game of 2048.</h2>`;
        
   
    for (let i =0;i<4;i++){
       board_html+=`<div class = "rows">`;
        for(let j = 0; j < 4; j++){
        let tile_to_place='';
            tile_to_place = board[(i*4) + j];
            board_html+=`<div class="square"> <p> ${tile_to_place} </p> </div>`;
            
        }
        board_html += '</div>';
    }

    board_html+=`
                <div> 
                <h1> score: ${score} </h1>
                </div>

                <button id="start">
                    <div> reset game </div> 
                 </button> </div>
                    `;
    

return board_html;
}

export const finishGame = function(gameState){
    let game_html = 
    `<div>
        <h1>2048 </h1>
        <h2>the game is over, and you have lost.</h2>
        <h2>your final score: ${gameState.score}</h2>
        <button class = "button" id="start">
            <h1>play again</h1>
        </button>
    </div>`;
    return game_html;
}

// export const handleFinishGame = function(event){
//     let game_html = 
//         `<div>
//         <h1>2048 </h1>
//         <h1>score: ${score} </h1>
//         <h2>the game is over, and you have lost.</h2>
//         <button id="start">
//             <h1>replay</h1>
//         </button>
//         </div>`;
//         return()
// }

export const winGame = function(gameState){
    let game_html = 
    `<div>
        <h1>2048 </h1>
        <h1>score: ${score} </h1>
        <h2>you won</h2>
        <button id="end">
            <h1>end game</h1>
        </button>

        <button id="start">
            <h1>continue playing</h1>
        </button>
    </div>`;
    return game_html;
}

$(function(){
    let current_game;
    let win=false;
    const $root = $('#root');

    if(!current_game){
        current_game = new Game(4);
    }
    
    //initialize page to start
    $('#root').html(constructBoard(0, current_game.getGameState().board));


   // current_game.onLose(display message with function or other)


    $(document).on('keydown', k => {
        //console.log("KEY PRESS");
        //do i need the prevent default or nah
        k.preventDefault();
        var board_elements;
        board_elements = document.getElementsByClassName("square");
        //console.log(board_elements);
        // if(current_game){
        //     if(board_elements[0]){
        //         if(k.name=='right'){
        //             current_game.move('right');
        //         } else if (k.name=='left'){
        //             current_game.move('left');
        //         } else if (k.name=='up'){
        //             current_game.move('up');
        //         } else if(k.name=='down'){
        //             current_game.move('down');
        //         }
        if(current_game && board_elements[0]){
                if(k.keyCode==40){
                    current_game.move('down');
                } else if(k.keyCode==39){
                    current_game.move('right');
                } else if (k.keyCode==38){
                    current_game.move('up');
                } else if (k.keyCode==37){
                    current_game.move('left');
                }
            
            
            //$('#root').on('click', '#start', function(event){
                //MAYBE just append it???
                // $('#root').html(constructBoard(0, current_game.getGameState().board));
            
            //});
        
        $('#root').html(constructBoard(current_game.getGameState().score, current_game.getGameState().board));
            
            //$root.replaceWith(constructBoard(current_game.getGameState().board, current_game.getGameState().score));
           // console.log(current_game.getGameState());
            if(current_game.getGameState().over){
                $root.html(finishGame(current_game.getGameState()));
            }
            if(current_game.getGameState().won && win){
                // console.log(current_game.getGameState());
                win=true;
                $root.html(wonGame(current_game.getGameState()));
            }
        }

    });


   //debugger
   //$root.html(constructBoard(0, (new Game(4)).getGameState().board));
   
   $('#root').on('click', '#start', function(event){
       //console.log("i'm doing things")
        current_game.setupNewGame();
        $root.html(constructBoard(0, (new Game(4)).getGameState().board));
       // current_game.score=0;
    });
    $('#root').on('click', '#end', function(event){
        $root.html(finishGame(current_board.getGameState()));
    });



});

