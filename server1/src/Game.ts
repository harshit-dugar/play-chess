import { WebSocket } from "ws";
import {Chess} from 'chess.js';
import { GAME_OVER, INIT_GAME, MOVE } from "./Message";

export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    public board: Chess;
    private startTime: Date;
    private moveCount = 0;

    constructor(player1: WebSocket, player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload:{
                color: 'white',
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload:{
                color: 'black',
            }
        }))
    }

    moveMake(socket: WebSocket, move: string | {
        from: string;
        to: string;
    }){
            //validation 
            if(this.moveCount % 2 === 0 && socket !== this.player1){
                console.log('return 1');
                return;
            }
            if(this.moveCount % 2 === 1 && socket !== this.player2){
                return;
            }
            try{
                console.log(this.board.board());
                
                this.board.move(move);
            } catch(e){
                console.log(e);
                return;
            }

            if(this.board.isGameOver()){
                //send result
                this.player1.send(JSON.stringify({
                    type: GAME_OVER,
                    data: this.board.turn() === 'w' ? 'black' : 'white'
                }))
                this.player2.send(JSON.stringify({
                    type: GAME_OVER,
                    data: this.board.turn() === 'w' ? 'black' : 'white'
                }))
            }
            if(this.moveCount %2 === 0){
                this.player2.send(JSON.stringify({
                    type: MOVE,
                    payload: move
                }))
            }else{
                this.player1.send(JSON.stringify({
                    type: MOVE,
                    payload: move
                }))
            }
            
            //Is this user move
            //Move valid

            //update and push
        this.moveCount++;
    }
}