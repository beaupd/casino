import React, { FC, ReactNode } from "react"

interface Props {
    children: ReactNode
    isActive?: boolean
    className?: string
    onClick?: () => void
}

const NavButton: FC<Props> = ({ children, isActive, className, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`mx-1 text-white ${
                isActive && "bg-white text-black"
            }  hover:bg-white hover:text-black rounded py-2 px-3 ${className}`}
        >
            {children}
        </button>
    )
}

export default NavButton
