"use client";

import { Direction, DirectionProvider } from "@radix-ui/react-direction";
import { Provider as JotaiProvider } from "jotai";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";
import { ReactNode } from "react";

type Props = { children: ReactNode; dir: Direction };

const Providers = ({ children, dir }: Props) => {
  return (
    <DirectionProvider dir={dir}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Theme appearance="inherit" accentColor="crimson" grayColor="slate">
          <JotaiProvider>{children}</JotaiProvider>
        </Theme>
      </ThemeProvider>
    </DirectionProvider>
  );
};

export default Providers;
