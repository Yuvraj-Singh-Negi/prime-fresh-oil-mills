export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatMetricTons(value: number): string {
  if (value % 1 === 0) {
    return `${value.toLocaleString()} MT`;
  }
  return `${value.toFixed(3).replace(/\.0+$/, "")} MT`;
}

export function generateReferenceId(): string {
  const segment = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `PFO-2026-${segment}`;
}

export function safeParseCart<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}
