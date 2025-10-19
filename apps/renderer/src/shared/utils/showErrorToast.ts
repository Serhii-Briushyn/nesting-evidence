import toast from "react-hot-toast";

import {
  MSG_4_5,
  MSG_BAD_CODE,
  MSG_BAD_DATA,
  MSG_LAST4,
  MSG_NEED_ASSIGN,
  MSG_NEED_NUM,
  MSG_NO_DIMS,
  MSG_NO_MAT,
  MSG_NUM_MISMATCH,
  MSG_ONLY_LHM,
  MSG_SAVE_ERR,
} from "@features/nesting/lib/messages";

const ALLOWED = new Set<string>([
  MSG_4_5,
  MSG_NO_DIMS,
  MSG_BAD_DATA,
  MSG_NEED_NUM,
  MSG_NO_MAT,
  MSG_SAVE_ERR,
  MSG_NEED_ASSIGN,
  MSG_NUM_MISMATCH,
  MSG_BAD_CODE,
  MSG_ONLY_LHM,
  MSG_LAST4,
]);

export function showErrorToast(err: unknown) {
  if (err instanceof Error && ALLOWED.has(err.message)) {
    toast.error(err.message, { id: "global-error" });
    return;
  }
  console.error(err);
  toast.error("Nastala neočakávaná chyba.");
}
