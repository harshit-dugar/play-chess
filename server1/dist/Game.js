"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const Message_1 = require("./Message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: Message_1.INIT_GAME,
            payload: {
                color: 'white',
            }
        }));
        this.player2.send(JSON.stringify({
            type: Message_1.INIT_GAME,
            payload: {
                color: 'black',
            }
        }));
    }
    moveMake(socket, move) {
        //validation 
        if (this.moveCount % 2 === 0 && socket !== this.player1) {
            console.log('return 1');
            return;
        }
        if (this.moveCount % 2 === 1 && socket !== this.player2) {
            return;
        }
        try {
            console.log(this.board.board());
            this.board.move(move);
        }
        catch (e) {
            console.log(e);
            return;
        }
        if (this.board.isGameOver()) {
            //send result
            this.player1.send(JSON.stringify({
                type: Message_1.GAME_OVER,
                data: this.board.turn() === 'w' ? 'black' : 'white'
            }));
            this.player2.send(JSON.stringify({
                type: Message_1.GAME_OVER,
                data: this.board.turn() === 'w' ? 'black' : 'white'
            }));
        }
        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: Message_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: Message_1.MOVE,
                payload: move
            }));
        }
        //Is this user move
        //Move valid
        //update and push
        this.moveCount++;
    }
}
exports.Game = Game;
