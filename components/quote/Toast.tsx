"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useToasts } from "@/components/quote/ToastBridge";

export interface ToastItem {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export function createToast(type: ToastItem["type"], message: string): ToastItem {
  return {
    id: `${type}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    message,
  };
}

function ToastItem({ toast, reducedMotion }: { toast: ToastItem; reducedMotion: boolean }) {
  const { removeToast } = useToasts();
  const removeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    removeTimer.current = setTimeout(() => {
      removeToast(toast.id);
    }, 5000);
    return () => {
      if (removeTimer.current) clearTimeout(removeTimer.current);
    };
  }, [toast.id, removeToast]);

  const isSuccess = toast.type === "success";

  return (
    <div className="pointer-events-auto flex items-center gap-3 rounded-xl border border-border bg-surface shadow-lg px-4 py-3 text-sm" role="alert" aria-live="polite">
      <motion.div
        key={toast.id}
        initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
          isSuccess
            ? "bg-success/10 text-success"
            : "bg-destructive/10 text-destructive"
        }`}>
          {isSuccess ? (
            <CheckCircle className="h-5 w-5" aria-hidden="true" />
          ) : (
            <AlertCircle className="h-5 w-5" aria-hidden="true" />
          )}
        </div>
        <span className="text-foreground">{toast.message}</span>
        <button
          onClick={() => {
            if (removeTimer.current) clearTimeout(removeTimer.current);
            removeToast(toast.id);
          }}
          className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss"
        >
          <span className="sr-only">Dismiss</span>
          &times;
        </button>
      </motion.div>
      </div>
    );
}

export function Toast() {
  const { toasts, removeToast } = useToasts();
  const [items, setItems] = useState<ToastItem[]>(toasts);

  useEffect(() => {
    setItems(toasts);
  }, [toasts]);

  const reducedMotion = useReducedMotion() ?? false;

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {items.map((toast) => (
        <ToastItem key={toast.id} toast={toast} reducedMotion={reducedMotion} />
      ))}
    </div>
  );
}
