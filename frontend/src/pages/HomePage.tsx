import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button"

export const HomePage = () => {
    const navigate = useNavigate()
    return (<div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 max-w-screen-lg">
            <div className="flex justify-center">
                <img src={'./chessboard.jpeg'} alt="placeholder" className="h-full w-full"/>
            </div>

            <div className="m-3 flex flex-col justify-center">
                <div className="flex justify-center flex-col items-center p-5">
                    <h1 className="text-2xl md:text-5xl font-bold text-white">Welcome to chess</h1>
                    <p className="m-2 text-white">Play chess Online or with friends.</p>
                </div>
                <div className="flex justify-center">
                    <Button onClick={() =>{navigate('/game')}}
                    >Play Online</Button>
                </div>
            </div>
        </div>
        </div>
    )
}
