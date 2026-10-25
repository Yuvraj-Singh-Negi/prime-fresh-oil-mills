"use client";

import { createContext, useCallback, useContext, useReducer, useState } from "react";
import type { ToastItem } from "@/components/quote/Toast";
import { createToast } from "@/components/quote/Toast";

interface ToastState {
  toasts: ToastItem[];
}

type ToastAction =
  | { type: "ADD"; payload: ToastItem }
  | { type: "REMOVE"; payload: string };

const ToastContext = createContext<{
  toasts: ToastItem[];
  addToast: (type: ToastItem["type"], message: string) => void;
  removeToast: (id: string) => void;
} | null>(null);

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case "ADD":
      return { toasts: [...state.toasts, action.payload] };
    case "REMOVE":
      return { toasts: state.toasts.filter((t) => t.id !== action.payload) };
    default:
      return state;
  }
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = useCallback(
    (type: ToastItem["type"], message: string) => {
      dispatch({ type: "ADD", payload: createToast(type, message) });
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    dispatch({ type: "REMOVE", payload: id });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts: state.toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToasts() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToasts must be used within ToastProvider");
  return ctx;
}
