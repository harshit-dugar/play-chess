import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/Game";

export const Chessboard = ({chess,setBoard ,board,socket}:{
    chess: any;
    setBoard: any;
    board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    }|null)[][];
    socket:WebSocket;
}) => {
    const [from ,setFrom] = useState<null| Square>(null)

    return(
        <div className="text-black">
            {board.map((row,i) => (
                <div key={i} className="flex">
                    {row.map((square,j) => {
                        const squareMove = String.fromCharCode(97 +(j%8)) + ""+(8-i)  as Square                        
                        return(
                        <div key={j} onClick={()=>{
                            //logic to move
                            if(!from){
                                setFrom(squareMove)
                            }else{
                                socket.send(JSON.stringify({
                                    type:MOVE,
                                    payload:{
                                        move:{
                                            from,
                                            to: squareMove
                                        }
                                    }
                                }))                                            
                            }
                            chess.move({
                                from,
                                to: squareMove
                            });
                            setBoard(chess.board());
                            console.log({
                                from,
                                to: squareMove                            
                            });                            
                        }
                        }className={`w-16 h-16 flex justify-center items-center ${i % 2 === j % 2 ? 'bg-green-400' : 'bg-gray-300'}`}>
                            {square && square.type}
                        </div>
                    )})}
                </div>
            ))}
        </div>
    )
}