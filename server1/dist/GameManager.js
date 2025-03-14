"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Message_1 = require("./Message");
const Game_1 = require("./Game");
class GameManager {
    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users = [];
    }
    addUser(socket) {
        this.users.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        this.users = this.users.filter(user => user !== socket);
    }
    addHandler(socket) {
        socket.on('message', (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === Message_1.INIT_GAME) {
                if (this.pendingUser) {
                    //start
                    const game = new Game_1.Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = socket;
                }
            }
            if (message.type === Message_1.MOVE) {
                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if (game) {
                    game.moveMake(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
