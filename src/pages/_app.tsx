import "home/styles/globals.css";
import type { AppProps } from "next/app";

import localFont from "next/font/local";

const NeueMontreal = localFont({
  src: [
    {
      path: "../../public/fonts/NeueMontreal-Regular.otf",
      weight: "450",
    },
    {
      path: "../../public/fonts/NeueMontreal-Light.otf",
      weight: "300",
    },
    {
      path: "../../public/fonts/NeueMontreal-Bold.otf",
      weight: "800",
    },
    {
      path: "../../public/fonts/NeueMontreal-Medium.otf",
      weight: "530",
    },
  ],
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={NeueMontreal.className}
      style={{ width: "100% !important" }}
    >
      <Component {...pageProps} />
    </div>
  );
}
