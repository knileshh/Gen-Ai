import { useState } from "react"
import axios from 'axios'



export function MainnDiv(){


    const [answer, setAnswer] = useState("")
    const [param, setParam] = useState("")
    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setParam(e.target.value)
    }


    const getAnswer = async () => {
        setLoading(true)
        try {
            await axios.post("http://localhost:3000/", { param })
            .then((response)=> {
                // console.log(response)
                setAnswer(response.data)
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }


    return <>
        <div className="h-screen w-screen bg-black p-5">
            <div className="h-1/2 w-1/2 bg-blue-800">
            <div className="text-3xl font-bold underline text-sky p-5">Enter the prompt: </div>
            <div><input className="m-5 bg-green-400" type="text" onChange={ handleInputChange }></input></div>
            {console.log(param)}
            <button onClick={ getAnswer } className="m-5 bg-red-500">Ask me!</button>

            {/* <div> Response: { answer } </div> */}
            <div className="text-white">

            {loading ? ( <div> Aane de... </div>) : (<div>Hn aa gya ye lo: {answer} </div>)}
            </div>
            </div>
        </div>

    </>
} 

