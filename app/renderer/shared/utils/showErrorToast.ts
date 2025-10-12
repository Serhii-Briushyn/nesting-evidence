import toast from "react-hot-toast";

import {
  MSG_ENTER_NESTING,
  MSG_INVALID_FIRST,
  MSG_LINES_4_5,
  MSG_MISSING_DIMS,
  MSG_MISSING_MATERIAL,
  MSG_SAVE_FAILED,
  MSG_LEFTOVER_NEEDS_ASSIGNED,
  MSG_ASSIGNED_MISMATCH,
} from "@features/nesting/lib/messages";

const ALLOWED = new Set<string>([
  MSG_INVALID_FIRST,
  MSG_LINES_4_5,
  MSG_MISSING_DIMS,
  MSG_ENTER_NESTING,
  MSG_MISSING_MATERIAL,
  MSG_SAVE_FAILED,
  MSG_LEFTOVER_NEEDS_ASSIGNED,
  MSG_ASSIGNED_MISMATCH,
]);

export function showErrorToast(err: unknown) {
  if (err instanceof Error && ALLOWED.has(err.message)) {
    toast.error(err.message, { id: "global-error" });
    return;
  }
  console.error(err);
}
