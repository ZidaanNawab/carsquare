import { useSyncExternalStore } from "react";

/** Tiny localStorage-backed list store (shortlist, compare). */
function createListStore(key: string, max = Infinity) {
  const listeners = new Set<() => void>();
  let cache: string[] | null = null;
  const EMPTY: string[] = [];
  const read = (): string[] => {
    if (typeof window === "undefined") return EMPTY;
    if (cache) return cache;
    try { cache = JSON.parse(localStorage.getItem(key) || "[]"); } catch { cache = []; }
    return cache!;
  };
  const write = (v: string[]) => {
    cache = v;
    localStorage.setItem(key, JSON.stringify(v));
    listeners.forEach((l) => l());
  };
  const subscribe = (l: () => void) => { listeners.add(l); return () => listeners.delete(l); };
  return {
    use: () => useSyncExternalStore(subscribe, read, () => EMPTY),
    toggle: (slug: string) => {
      const cur = read();
      if (cur.includes(slug)) write(cur.filter((s) => s !== slug));
      else if (cur.length < max) write([...cur, slug]);
      else return false;
      return true;
    },
    clear: () => write([]),
  };
}

export const shortlist = createListStore("ol-shortlist");
export const compare = createListStore("ol-compare", 3);
