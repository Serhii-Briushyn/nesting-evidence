import { useEffect } from "react";

import { useHeaderExtra } from "./useHeaderExtra";

export const useNestingHeader = (value: string) => {
  const { setHeaderExtra } = useHeaderExtra();
  useEffect(() => {
    setHeaderExtra(value.trim() || "");
    return () => setHeaderExtra("");
  }, [value, setHeaderExtra]);
};
