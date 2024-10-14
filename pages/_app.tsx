import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontMono, fontSans } from "@/config/fonts";
import "@/styles/globals.css";
import { cn } from "@/utils/cn";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider enableSystem attribute="class" defaultTheme="system">
        <div className={cn("font-sans", fontSans.variable, fontMono.variable)}>
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
