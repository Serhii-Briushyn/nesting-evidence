import { forwardRef, useImperativeHandle, useRef } from "react";

import {
  isDimensionLine,
  isMaterialIdLine,
  normalizeLine,
  parseScanLines,
} from "@features/nesting/lib/parse";
import { ScanParseError } from "@features/nesting/lib/errors";
import { MSG_BAD_CODE, MSG_4_5 } from "@features/nesting/lib/messages";

import type { ScanParsed } from "@features/nesting/types/scan";

export type ScanCaptureHandle = { focus: () => void; blur: () => void };

type Props = {
  onParsed: (item: ScanParsed) => void;
  onError?: (err: unknown) => void;
  blurOnParsed?: boolean;
};

type Mode = "idle" | "collect" | "discard";

export const ScanCapture = forwardRef<ScanCaptureHandle, Props>(
  ({ onParsed, onError, blurOnParsed = false }, ref) => {
    const taRef = useRef<HTMLTextAreaElement | null>(null);
    const bufferRef = useRef<string[]>([]);
    const modeRef = useRef<Mode>("idle");

    const focus = () => taRef.current?.focus();
    const blur = () => taRef.current?.blur();
    useImperativeHandle(ref, () => ({ focus, blur }), []);

    const reset = () => {
      bufferRef.current = [];
      modeRef.current = "idle";
    };

    const startCollect = (first: string) => {
      bufferRef.current = [first];
      modeRef.current = "collect";
    };

    const enterDiscard = () => {
      bufferRef.current = [];
      modeRef.current = "discard";
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key !== "Enter") return;

      const el = e.currentTarget;
      const line = normalizeLine(el.value);
      el.value = "";
      if (!line) return;

      const mode = modeRef.current;

      if (mode === "discard") {
        if (isMaterialIdLine(line)) startCollect(line);
        return;
      }

      if (mode === "idle") {
        if (!isMaterialIdLine(line)) {
          onError?.(new ScanParseError(MSG_BAD_CODE));
          enterDiscard();
          return;
        }
        startCollect(line);
        return;
      }

      if (mode === "collect") {
        if (isMaterialIdLine(line)) {
          startCollect(line);
          return;
        }

        bufferRef.current.push(line);

        if (isDimensionLine(line)) {
          const buf = bufferRef.current;
          if (buf.length !== 4 && buf.length !== 5) {
            onError?.(new ScanParseError(MSG_4_5));
            return reset();
          }
          try {
            const parsed = parseScanLines(buf);
            onParsed(parsed);
            if (blurOnParsed) el.blur();
          } catch (err) {
            onError?.(err);
          } finally {
            reset();
          }
        }
        return;
      }
    };

    return (
      <textarea
        ref={taRef}
        onKeyDown={onKeyDown}
        tabIndex={-1}
        style={{
          position: "fixed",
          width: 1,
          height: 1,
          opacity: 0,
          left: -9999,
          top: -9999,
        }}
      />
    );
  }
);
