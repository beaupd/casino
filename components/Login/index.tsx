import React from "react"
import { useMetamask } from "@thirdweb-dev/react"

const Login = () => {
    const connectWithMetaMask = useMetamask()
    return (
        <div className="h-screen bg-slate-900 flex flex-col items-center justify-center">
            <h1 className="text-6xl text-white font-bold">You have to login</h1>
            <button
                onClick={connectWithMetaMask}
                className="bg-white rounded-lg shadow-lg font-bold py-5 px-8 mt-10"
            >
                Login with Metamask
            </button>
        </div>
    )
}

export default Login
