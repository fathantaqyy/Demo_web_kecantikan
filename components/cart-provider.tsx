"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { formatIDR, getProduct } from "@/lib/data";

type CartLine = { slug: string; quantity: number };
type CartContextValue = {
  items: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (slug: string, quantity?: number) => void;
  remove: (slug: string) => void;
  update: (slug: string, quantity: number) => void;
  setOpen: (value: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try { setItems(JSON.parse(localStorage.getItem("2bshine-cart") || "[]")); } catch { setItems([]); }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem("2bshine-cart", JSON.stringify(items)); }, [items, hydrated]);

  const add = (slug: string, quantity = 1) => {
    setItems((current) => current.some((line) => line.slug === slug)
      ? current.map((line) => line.slug === slug ? { ...line, quantity: line.quantity + quantity } : line)
      : [...current, { slug, quantity }]);
    setOpen(true);
  };
  const remove = (slug: string) => setItems((current) => current.filter((line) => line.slug !== slug));
  const update = (slug: string, quantity: number) => quantity < 1 ? remove(slug) : setItems((current) => current.map((line) => line.slug === slug ? { ...line, quantity } : line));
  const count = items.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = items.reduce((sum, line) => sum + (getProduct(line.slug)?.price || 0) * line.quantity, 0);
  const value = { items, count, subtotal, isOpen, add, remove, update, setOpen };

  return <CartContext.Provider value={value}>
    {children}
    <div className={`cart-backdrop ${isOpen ? "is-open" : ""}`} onClick={() => setOpen(false)} />
    <aside className={`cart-drawer ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen} aria-label="Keranjang belanja">
      <div className="cart-head"><div><span className="eyebrow">Belanja Anda</span><h2>Keranjang <i>({count})</i></h2></div><button className="icon-btn" onClick={() => setOpen(false)} aria-label="Tutup keranjang"><X /></button></div>
      <div className="cart-lines">
        {items.length === 0 ? <div className="empty-state"><ShoppingBag /><h3>Keranjang masih kosong</h3><p>Temukan ritual yang terasa tepat untuk Anda.</p><Link href="/products" className="button dark" onClick={() => setOpen(false)}>Jelajahi produk</Link></div> : items.map((line) => {
          const product = getProduct(line.slug); if (!product) return null;
          return <div className="cart-line" key={line.slug}>
            <div className="mini-product" style={{ "--accent": product.accent } as React.CSSProperties}><span className={`mini-bottle ${product.form}`} /></div>
            <div className="cart-line-copy"><h3>{product.name}</h3><p>{formatIDR(product.price)}</p><div className="quantity"><button onClick={() => update(line.slug, line.quantity - 1)} aria-label="Kurangi"><Minus /></button><span>{line.quantity}</span><button onClick={() => update(line.slug, line.quantity + 1)} aria-label="Tambah"><Plus /></button></div></div>
            <button className="remove" onClick={() => remove(line.slug)}>Hapus</button>
          </div>;
        })}
      </div>
      {items.length > 0 && <div className="cart-foot"><div><span>Subtotal demo</span><strong>{formatIDR(subtotal)}</strong></div><Link href="/cart" className="button dark full" onClick={() => setOpen(false)}>Lihat keranjang</Link><small>Belum termasuk pengiriman. Tidak ada pembayaran nyata.</small></div>}
    </aside>
  </CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
