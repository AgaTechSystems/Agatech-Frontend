import "@/styles/globals.css";
import "@/styles/costom.css"
import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { ToastContainer, toast } from "react-toastify";
import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Layout from "../Layout/layout";
import store from "../store/store";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "../error/error";
import { useRouter } from "next/router";
import { Web3Modal } from "../context/Web3Modal";



export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);
  const { pathname } = useRouter();
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      {ready ? (
        <ErrorBoundary>
          <Web3Modal>
          
            <ThemeProvider attribute="class">
              <ToastContainer />
              <Provider store={store}>
              <Layout pathname={pathname}>
                  <Component {...pageProps} />
                </Layout>
              </Provider>
            </ThemeProvider>
            </Web3Modal>
        </ErrorBoundary>
      ) : null}
    </>
  );
}
