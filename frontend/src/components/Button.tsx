
export const Button = ({onClick,children}:{onClick:() => void,children:React.ReactNode}) =>{
    return (
        <button onClick={onClick}
            className="bg-green-500 hover:bg-green-700 text-white text-xl font-bold py-5 px-6 rounded">
            {children}
        </button>
    )
}