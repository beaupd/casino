import React from "react"
import NavButton from "./NavButton"
import { Bars3BottomRightIcon } from "@heroicons/react/24/solid"
import { useAddress, useDisconnect } from "@thirdweb-dev/react"

const Header = () => {
    const address = useAddress()
    const disconnect = useDisconnect()

    return (
        <header className="w-full flex justify-between px-5 items-center md:h-16 h-24">
            <div>
                <h1 className="text-white">CASINO</h1>
                <span className="text-white">
                    User: {address?.substring(0, 5)}...
                    {address?.substring(address.length, address.length - 5)}
                </span>
            </div>

            <menu className="hidden md:block">
                <NavButton isActive>BUY TICKETS</NavButton>
                <NavButton onClick={disconnect}>LOGOUT</NavButton>
            </menu>

            <nav>
                <Bars3BottomRightIcon className="w-8 h-8 mx-auto cursor-pointer text-white" />
                <NavButton className="md:hidden">LOGOUT</NavButton>
            </nav>
        </header>
    )
}

export default Header
