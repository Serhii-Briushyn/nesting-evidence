import { useState } from "react";

import { Outlet } from "react-router-dom";

import { NestingDraftProvider } from "@features/nesting/context/NestingDraftProvider";

import { Header } from "./components/Header";

export type LayoutCtx = { setHeaderExtra: (v: string) => void };

export const MainLayout = () => {
  const [headerExtra, setHeaderExtra] = useState<string>("");

  return (
    <>
      <Header extra={headerExtra} />
      <NestingDraftProvider>
        <Outlet context={{ setHeaderExtra }} />
      </NestingDraftProvider>
    </>
  );
};
