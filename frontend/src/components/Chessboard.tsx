import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/Game";

export const Chessboard = ({board,socket}:{
    board:({
        square: Square;
        type: PieceSymbol;
        color: Color;
    }|null)[][];
    socket:WebSocket;
}) => {
    const [from ,setFrom] = useState<null| Square>(null)
    const [to ,setTo] = useState<null| Square>(null)

    return(
        <div className="text-black">
            {board.map((row,i) => (
                <div key={i} className="flex">
                    {row.map((square,j) => {
                        return(
                        <div key={j} onClick={()=>{
                            //logic to move                             
                            console.log({
                                from,
                                to                            
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