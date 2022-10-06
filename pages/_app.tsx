import "../styles/globals.css"
import type { AppProps } from "next/app"
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react"
import { Toaster } from "react-hot-toast"

const Website = ({ Component, pageProps }: AppProps) => {
    return (
        <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
            <Component {...pageProps} />
            <Toaster />
        </ThirdwebProvider>
    )
}

export default Website
