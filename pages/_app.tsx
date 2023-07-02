import { Header } from "@/components";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>CMS Blog</title>
                <link rel="icon" href="/favicon.ico" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Header />
            <Component {...pageProps} />
        </>
    );
}
