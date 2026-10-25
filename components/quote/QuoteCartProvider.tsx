"use client";

import { createContext, useCallback, useContext, useEffect, useReducer, useRef, useState } from "react";
import type { Product } from "@/types/product";
import type {
  QuoteCartContextValue,
  QuoteCartItem,
  QuoteSnapshot,
} from "@/types/quote";
import { CART_STORAGE_KEY } from "@/types/quote";
import { MAX_QUANTITY_MT, MIN_QUANTITY_MT } from "@/types/product";
import { products } from "@/lib/products";
import { safeParseCart, generateReferenceId } from "@/lib/utils";

export interface CartState {
  items: QuoteCartItem[];
  submittedSnapshot: QuoteSnapshot | null;
}

type CartAction =
  | { type: "HYDRATE"; payload: QuoteCartItem[] }
  | { type: "ADD"; payload: { productId: string; quantity: number } }
  | { type: "UPDATE"; payload: { productId: string; quantity: number } }
  | { type: "REMOVE"; payload: { productId: string } }
  | { type: "CLEAR" }
  | { type: "SET_SUBMITTED"; payload: QuoteSnapshot }
  | { type: "CLEAR_SUBMITTED" };

const INITIAL_STATE: CartState = {
  items: [],
  submittedSnapshot: null,
};

function isValidCartItem(item: unknown): item is QuoteCartItem {
  if (!item || typeof item !== "object") return false;
  const { productId, quantity } = item as QuoteCartItem;
  const productExists = products.some((p) => p.id === productId);
  const qtyValid =
    typeof quantity === "number" &&
    Number.isFinite(quantity) &&
    quantity >= MIN_QUANTITY_MT &&
    quantity <= MAX_QUANTITY_MT;
  return typeof productId === "string" && productExists && qtyValid;
}

function loadPersistedItems(): QuoteCartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = safeParseCart<{ items?: unknown }>(raw, { items: [] });
    const items = Array.isArray(parsed.items) ? parsed.items.filter(isValidCartItem) : [];
    return items;
  } catch {
    return [];
  }
}

function persistItems(items: QuoteCartItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items }));
  } catch {
    // Storage unavailable or quota exceeded — state remains in memory.
  }
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.payload };
    case "ADD": {
      const { productId, quantity } = action.payload;
      const existing = state.items.find((i) => i.productId === productId);
      const nextItems = existing
        ? state.items.map((i) =>
            i.productId === productId
              ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_QUANTITY_MT) }
              : i
          )
        : [...state.items, { productId, quantity }];
      return { ...state, items: nextItems };
    }
    case "UPDATE": {
      const { productId, quantity } = action.payload;
      const clamped = Math.min(Math.max(quantity, MIN_QUANTITY_MT), MAX_QUANTITY_MT);
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === productId ? { ...i, quantity: clamped } : i
        ),
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.productId !== action.payload.productId) };
    case "CLEAR":
      return { ...state, items: [] };
    case "SET_SUBMITTED":
      return { ...state, submittedSnapshot: action.payload };
    case "CLEAR_SUBMITTED":
      return { ...state, submittedSnapshot: null };
    default:
      return state;
  }
}

export const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);

interface SubmissionContextValue {
  submitCart: () => QuoteSnapshot | null;
  clearSubmitted: () => void;
  submittedSnapshot: QuoteSnapshot | null;
}
export const SubmissionContext = createContext<SubmissionContextValue | null>(null);

export function QuoteCartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);
  const isMounted = useRef(false);

  // Load persisted cart after mount (never during SSR).
  useEffect(() => {
    const items = loadPersistedItems();
    dispatch({ type: "HYDRATE", payload: items });
    setHydrated(true);
    isMounted.current = true;
  }, []);

  // Persist whenever items change (after hydration).
  useEffect(() => {
    if (!isMounted.current || !hydrated) return;
    persistItems(state.items);
  }, [state.items, hydrated]);

  // Sync cart across browser tabs via storage events.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== CART_STORAGE_KEY || !event.newValue) return;
      try {
        const parsed = safeParseCart<{ items?: unknown }>(event.newValue, { items: [] });
        const items = Array.isArray(parsed.items) ? parsed.items.filter(isValidCartItem) : [];
        dispatch({ type: "HYDRATE", payload: items });
      } catch {
        // Ignore malformed storage updates from other tabs.
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const itemCount = state.items.reduce((sum, i) => sum + 1, 0);
  const totalMetricTons = state.items.reduce((sum, i) => sum + i.quantity, 0);

  const addItem = useCallback(
    (productId: string, quantity: number = 1) => {
      if (!getProductById(productId)) return;
      const qty = Math.min(Math.max(quantity, MIN_QUANTITY_MT), MAX_QUANTITY_MT);
      dispatch({ type: "ADD", payload: { productId, quantity: qty } });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (!Number.isFinite(quantity)) return;
      dispatch({ type: "UPDATE", payload: { productId, quantity } });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string) => {
      dispatch({ type: "REMOVE", payload: { productId } });
    },
    []
  );

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

  const submitCart = useCallback<() => QuoteSnapshot | null>(() => {
    if (state.items.length === 0) return null;
    const itemsSnapshot = state.items.map((item) => {
      const product = getProductById(item.productId);
      return {
        productId: item.productId,
        productName: product ? product.name : item.productId,
        quantity: item.quantity,
      };
    });
    const total = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const snapshot: QuoteSnapshot = {
      referenceId: generateReferenceId(),
      submittedAt: new Date().toISOString(),
      items: itemsSnapshot,
      totalMetricTons: total,
    };
    dispatch({ type: "SET_SUBMITTED", payload: snapshot });
    dispatch({ type: "CLEAR" });
    return snapshot;
  }, [state.items]);

  const clearSubmitted = useCallback(() => {
    dispatch({ type: "CLEAR_SUBMITTED" });
  }, []);

  function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
  }

  const cartValue: QuoteCartContextValue = {
    items: state.items,
    itemCount,
    totalMetricTons,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
  };

  const submissionValue: SubmissionContextValue = {
    submitCart,
    clearSubmitted,
    submittedSnapshot: state.submittedSnapshot,
  };

  return (
    <QuoteCartContext.Provider value={cartValue}>
      <SubmissionContext.Provider value={submissionValue}>
        {children}
      </SubmissionContext.Provider>
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) throw new Error("useQuoteCart must be used within QuoteCartProvider");
  return ctx;
}

export function useQuoteSubmission() {
  const ctx = useContext(SubmissionContext);
  if (!ctx) throw new Error("useQuoteSubmission must be used within QuoteCartProvider");
  return ctx;
}
