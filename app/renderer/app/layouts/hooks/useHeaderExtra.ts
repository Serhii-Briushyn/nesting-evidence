import { useOutletContext } from "react-router-dom";

import type { LayoutCtx } from "../MainLayout";

export function useHeaderExtra() {
  return useOutletContext<LayoutCtx>();
}
