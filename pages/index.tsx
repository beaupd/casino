import React, { useState } from "react"
import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Header from "../components/Header"
import Login from "../components/Login"
import CountdownTimer from "../components/CountdownTimer"
import {
    useAddress,
    useContract,
    useContractRead,
    useContractWrite,
} from "@thirdweb-dev/react"
import { ethers } from "ethers"
import { currency } from "../constants"
import toast from "react-hot-toast"

const Home: NextPage = () => {
    const address = useAddress()
    const [quantity, setQuantity] = useState<number>(1)
    const { contract, isLoading } = useContract(
        process.env.NEXT_PUBLIC_LOTTERY_CONTRACT_ADDRESS
    )
    const { data: lastWinner } = useContractRead(contract, "lastWinner")
    const { data: lastWinnerAmount } = useContractRead(
        contract,
        "lastWinnerAmount"
    )
    const { data: expiration } = useContractRead(contract, "expiration")
    const { data: remainingTickets } = useContractRead(
        contract,
        "RemainingTickets"
    )
    const { data: currentWinningReward } = useContractRead(
        contract,
        "CurrentWinningReward"
    )
    const { data: ticketPrice } = useContractRead(contract, "ticketPrice")
    const { data: ticketCommission } = useContractRead(
        contract,
        "ticketCommission"
    )

    const { mutateAsync: BuyTickets } = useContractWrite(contract, "BuyTickets")

    const handleBuy = async () => {
        if (!ticketPrice) return

        const notification = toast.loading("Buying your tickets...")

        try {
            const data = await BuyTickets([
                {
                    value: ethers.utils.parseEther(
                        (
                            Number(ethers.utils.formatEther(ticketPrice)) *
                            quantity
                        ).toString()
                    ),
                },
            ])
            toast.success("Tickets purchased succesfully!", {
                id: notification,
            })
        } catch (err) {
            toast.error("Whoops something went wrong!", {
                id: notification,
            })
            console.error("contract call failure", err)
        }
    }

    // #todo set logic to wrapper (authenticated)

    if (isLoading) return <h1>Loading...</h1>

    if (!address) {
        return <Login />
    }

    return (
        <div className="bg-slate-900 h-screen">
            <Head>
                <title>Casino</title>
            </Head>

            <Header />

            <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
                <div className="text-white">{lastWinner}</div>

                <div className="stats-container">
                    <h1 className="text-white text-5xl text-center">
                        Next Draw
                    </h1>

                    <div className="flex justify-between p-2 space-x-2">
                        <div className="stats">
                            <h2 className="text-white text-sm">Total Pool</h2>
                            <p>
                                {currentWinningReward &&
                                    ethers.utils.formatEther(
                                        currentWinningReward
                                    )}{" "}
                                {currency}
                            </p>
                        </div>
                        <div className="stats">
                            <h2 className="text-sm">Tickets Remaining</h2>
                            <p className="text-xl">
                                {remainingTickets?.toNumber()}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 mb-3">
                        <CountdownTimer />
                    </div>
                </div>

                <div className="stats-container space-y-2">
                    <div className="stats-container">
                        <div className="flex justify-between items-centedr text-white pb-2">
                            <h2>Price per ticket</h2>
                            <p>
                                {ticketPrice &&
                                    ethers.utils.formatEther(ticketPrice)}{" "}
                                {currency}
                            </p>
                        </div>

                        <div className="flex text-white items-center space-x-2 bg-slate-900 border-slate-800 border p-4">
                            <p>TICKETS</p>
                            {/* #TODO  MAKE SAVE INPUT (BACKEND) */}
                            <input
                                className="flex w-full bg-transparent text-right outline-none"
                                type="number"
                                min={1}
                                max={10}
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(Number(e.target.value))
                                }
                            />
                        </div>

                        <div className="space-y-2 mt-5">
                            <div className="flex items-center justify-between text-emerald-600 text-sm italic font-extrabold">
                                <p>Total cost of tickets</p>
                                <p>
                                    {ticketPrice &&
                                        Number(
                                            ethers.utils.formatEther(
                                                ticketPrice
                                            )
                                        ) * quantity}
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-emerald-600 text-xs italic">
                                <p>Service fees</p>
                                <p>
                                    {" "}
                                    {ticketCommission &&
                                        ethers.utils.formatEther(
                                            ticketCommission
                                        )}{" "}
                                    {currency}
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-emerald-600 text-xs italic">
                                <p>Network Fees</p>
                                <p>TBC</p>
                            </div>
                        </div>
                        <button
                            disabled={
                                expiration?.toString() <
                                    Date.now().toString() ||
                                remainingTickets?.toNumber() === 0
                            }
                            onClick={handleBuy}
                            className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600 px-10 py-5 rounded-md text-white shadow-xl disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-100 disabled:cursor-not-allowed"
                        >
                            Buy Tickets
                        </button>
                    </div>
                </div>
            </div>

            <h1 className="text-white">CRAZY CASINO</h1>
        </div>
    )
}

export default Home
