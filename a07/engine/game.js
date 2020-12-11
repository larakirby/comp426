/*
Add your code for Game here
 */

export default class Game {
    constructor(size){
        let filler_array = new Array(size*size);
        filler_array.fill(0);
        // let tile_1_index = Math.floor(Math.random(size)*10);
        // let tile_2_index = Math.floor(Math.random(size)*10);
        // if (tile_1_index==tile_2_index){
        //     tile_2_index=Math.floor(Math.random(size)*10);
        // }
        // filler_array[tile_1_index] = 2;
        // filler_array[tile_2_index] = 2;
        this.gameState={
            board: filler_array,
            score: 0,
            won: false,
            over: false
        }

        //do i need to do this^ or this -->
        this.board=filler_array;
        this.size=size;
        this.won=false;
        this.over=false;
        this.score=0;
        
        //callback...? arrays
        this.moves = [];
        this.wins = [];
        this.losses = [];
        this.positionPlacement();
        this.positionPlacement();
    } 

    positionPlacement(){
        let available=[];
        let amt=0;
        let len = 0;
        this.board.forEach(tile=>{
            if (tile==0){
                len = available.length;
                available[len]=amt;
            }
            amt+=1;
        });
        let to_assign = Math.floor((Math.random()*available.length));

        //RANDOM NUMBER CREATION
        let n = Math.random();
        let random=0;

        //10% chance of being 4, otherwise is a 2
        if(n>=.9){
            random= 4;
        } else {
            random= 2;
        }
        //FINISHED GENERATING RANDOM NUMBER

        this.board[available[to_assign]]=random;
    }


    setupNewGame(){
        let b = new Array(this.size*this.size).fill(0);
        this.board= b;
        this.won=false;
        this.over=false;

        //put some numbers in to begin!!!!!!
        this.positionPlacement();
        this.positionPlacement();
    }

    loadGame(gameState){
        this.board=gameState.board;
        this.score=gameState.score;
        this.won=gameState.won;
        this.over=gameState.over;
    }

    move(direction){
        let b = this.board;
        if(direction=='left'){
            this.left();
            //break;
        } else if (direction=='right'){
            this.right();
            //break;
        } else if ((direction=='up')){
            this.up();
            //break;
        } else if (direction=='down'){
            this.down();
            //break;
        }
        let tally = 0;
        let indx=0;
        for(let indx = 0; indx<Math.pow(this.size, 2); indx+=1){
            if(this.board[indx] != b[indx]){
                //set random position here
                this.positionPlacement();
                break;
            }
        }
        this.moves.forEach(m=>{
            m(this.getGameState());
        });
        //if not finished/won yet
        if(!this.won){
            indx=0;
            for(let indx = 0; indx<Math.pow(this.size,2); indx++){
                if(this.board[indx] == 2048){
                    //if we have a 2048 the game is finished
                    this.won=true;
                    this.wins.forEach(w=>{
                        //unsure what this actually does?
                        w(this.getGameState());
                        //this.positionPlacement();
                    });

                    break;
                }
                }
        }
        indx=0;
        this.over = true;
        for(indx; indx<Math.pow(this.size, 2); indx++){
            if(this.board[indx]==0){
                this.over=false;
                break;
            }
            //left
            if(indx+1<Math.pow(this.size, 2)
            && ((indx+1)%this.size) != 0
            && this.board[indx] == this.board[indx+1]){
                this.over=false;
                break;
            }
            //right
            if(indx-1 >= 0 
                &&((indx-1) % this.size) != (this.size-1) 
                && this.board[indx] == this.board[indx-1]){
                    this.over=false;
                    break;
            }
            //up
            if(indx+this.size<Math.pow(this.size,2)
                && this.board[indx]==this.board[indx+this.size]){
                    this.over=false;
                    break;
            }
            //down
            if(indx-this.size>=0 
                &&this.board[indx] == this.board[indx-this.size]){
                    this.over=false;
                    break;
                }

        }
        if(this.over){
            this.losses.forEach(l=>{
                l(this.getGameState());
            });
        }
    }

    toString(){
        let game_string = '';
        let i = 0;
        game_string+= 'Score: ' + this.score + " won: " + this.won + " over: " + this.over + "\n";
        this.board.forEach(square=>{
            game_string+= `[${square}]`;
            if(i%this.size == this.size-1){
                game_string+='\n';
            }
            i++;
        });
        return game_string;
    }
    onMove(callback){
        this.moves[this.moves.length] = callback;
    }

    onWin(callback){
        this.wins[this.wins.length] = callback;
    }

    onLose(callback){
        this.losses[this.losses.length] = callback;
    }

    getGameState(){
        return{
            "board": this.board,
            "score": this.score,
            "won": this.won,
            "over": this.over
        }
    }

    //HELPER METHODS: DIRECTIONS

    left(){
        //let i = 0;
        let tile=0;
        this.board.forEach(square=>{
            let row = tile % this.size;
            let indx = 1;
            while(row+indx < this.size && this.board[tile] == 0){
                    if(this.board[tile+indx] != 0){
                        this.board[tile] = this.board[tile + indx];
                        this.board[tile+indx] = 0;
                    }
                indx+=1;
            }
            tile+=1;
        });
        //reset our tile to check
        tile = 0;
        this.board.forEach(square=>{
            let row = tile % this.size;
            let indx = 1;
            if(tile<Math.pow(this.size,2) && row+indx<this.size && this.board[tile] == this.board[tile+1] && this.board[tile]!=0){
                this.board[tile] = this.board[tile]*2;
                this.board[tile+indx] = 0;
                this.score+= this.board[tile];
                tile=tile+2;
            } else {
                tile++;
            }
        });

        tile=0;
        this.board.forEach(square=>{
            let row = tile % this.size;
            let indx = 1;
            while(row+indx < this.size && this.board[tile] == 0){
                    if(this.board[tile+indx] != 0){
                        this.board[tile] = this.board[tile + indx];
                        this.board[tile+indx] = 0;
                    }
                indx+=1;
            }
            tile+=1;
        });
        this.positionPlacement();

    }

    right(){
        let tile = Math.pow(this.size, 2) -1;
        this.board.forEach(square=>{
            let row = tile % this.size;
            let indx=1;
            while(row-indx>=0 &&this.board[tile] == 0){
                if(this.board[tile-indx]!=0){
                    this.board[tile]=this.board[tile-indx];
                    this.board[tile-indx]=0;
                }
                indx++;
            }
            tile-=1;
        });
        tile = Math.pow(this.size, 2)-1;
        this.board.forEach(square=>{
            let row = tile%this.size;
            let indx=1;
            if(tile>=0 && row-indx>=0 
                && this.board[tile-indx] == this.board[tile] 
                && this.board[tile] !=0){
                    this.board[tile] = this.board[tile]*2;
                    this.board[tile-indx]=0;
                    this.score+=this.board[tile];
                    tile-=2;
            } else {
                tile-=1;
            }
        });

        tile = Math.pow(this.size, 2) -1;
        this.board.forEach(square=>{
            let row = tile % this.size;
            let indx=1;
            while(row-indx>=0 &&this.board[tile] == 0){
                //iterate indx?
                if(this.board[tile-indx]!=0){
                    this.board[tile]=this.board[tile-indx];
                    this.board[tile-indx]=0;
                }
                indx++;
            }
            tile-=1;
        });
        this.positionPlacement();

    }

    up(){
        let tally = 0;
        this.board.forEach(square=>{
            //let indx=0;
            let indx=1;
            let place = tally+this.size*indx;
            while(place<Math.pow(this.size, 2) 
            && this.board[tally]==0){
                if(this.board[place] !=0){
                    this.board[tally] = this.board[place];
                    this.board[place] = 0;
                    break;
                } else {
                    //indx--;
                    //
                    indx+=1;
                    place=tally+this.size*indx;
                }
            }
            tally+=1;
        });

        //reset count
        tally=0;
        this.board.forEach(square=>{
            let indx =1;
            let place = tally+ this.size*indx;
            if(place<Math.pow(this.size,2) 
            && this.board[tally]!=0
            && this.board[tally]==this.board[place]){
                this.board[tally]= 2*this.board[place];
                this.board[place]=0;
                this.score+=this.board[tally];
                tally+=1;
            } else{
                tally+=1;
            }
        });

        tally = 0;
        this.board.forEach(square=>{
            let indx=1;
            let place = tally+this.size*indx;
            while(place<Math.pow(this.size, 2) 
            && this.board[tally]==0){
                if(this.board[place] !=0){
                    //HELPPP

                    this.board[tally] = this.board[place];
                    this.board[place] = 0;
                    break;
                } else {
                    indx+=1;
                    place=tally+this.size*indx;
                }
            }
            tally+=1;
        });
        this.positionPlacement();
    }
    
    down(){
        let tile = Math.pow(this.size, 2)-1;
        this.board.forEach(square=>{
            let indx=1;
            let place= tile-indx*this.size;
            while(place>=0 &&this.board[tile]==0){
                if(this.board[place]!=0){
                    this.board[tile]=this.board[place];
                    this.board[place]=0;
                    
                    break;
                } else {
                    //???????
                    indx+=1;
                    place = tile-indx*this.size;
                }
            }
            tile-=1;
        });

        tile = Math.pow(this.size, 2)-1;
        this.board.forEach(square=>{
            let indx=1;
            let place= tile - this.size*indx;
            if (place>=0 
                && this.board[tile]!=0
                && this.board[tile]==this.board[place]){
                    //this.board[tile] = this.board[place-1];
                    this.board[tile] = this.board[place]*2;
                    this.board[place]=0;
                    this.score+=this.board[tile];
                }
                tile-=1;
        });

        tile = Math.pow(this.size, 2)-1;
        this.board.forEach(square=>{
            let indx=1;
            let place= tile-indx*this.size;
            while(place>=0 &&this.board[tile]==0){
                if(this.board[place]!=0){
                    this.board[tile]=this.board[place];
                    //this.board[tile] = this.board[place]*2;
                    this.board[place]=0;
                    break;
                } else {
                    indx+=1;
                    place = tile-indx*this.size;
                }
            }
            tile-=1;
        });
        this.positionPlacement();
    }


}



