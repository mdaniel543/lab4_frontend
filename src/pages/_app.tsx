import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider } from "@heroui/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = "G-11B0D4L100";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // 1) Inicializa GA4
    ReactGA.initialize(GA_MEASUREMENT_ID);

    // 2) Envía el pageview inicial
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    // 3) Cada vez que cambie de ruta, envía otro pageview
    const handleRouteChange = (url: string) => {
      ReactGA.send({ hitType: "pageview", page: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);


  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}
