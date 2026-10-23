"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/data";
import { formatIDR } from "@/lib/data";
import { ProductVisual } from "./product-visual";
import { useCart } from "./cart-provider";

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<"story" | "ingredients" | "usage">("story");
  const { add } = useCart();
  const copy = tab === "story" ? product.description : tab === "ingredients" ? product.ingredients : product.usage;
  return <section className="product-detail section-pad">
    <div className="gallery"><div className="main-gallery"><ProductVisual product={product} large/></div><div className="gallery-detail warm"><span>{product.category}</span><b>RITUAL / 01</b></div><div className="gallery-detail label-card"><b>2b</b><span>SKIN ATELIER</span></div></div>
    <div className="product-detail-copy"><span className="eyebrow">{product.category} · Produk demonstrasi</span><h1>{product.name}</h1><div className="detail-price">{formatIDR(product.price)}</div><p className="lead">{product.short}</p><div className="detail-tabs" role="tablist">{[["story", "Cerita"], ["ingredients", "Kandungan"], ["usage", "Cara pakai"]].map(([value, label]) => <button key={value} className={tab === value ? "active" : ""} onClick={() => setTab(value as typeof tab)}>{label}</button>)}</div><p className="tab-copy">{copy}</p><div className="buy-row"><div className="quantity large"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus/></button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}><Plus/></button></div><button className="button dark grow" onClick={() => add(product.slug, quantity)}><ShoppingBag/> Tambah · {formatIDR(product.price * quantity)}</button></div><div className="demo-notice">Produk, kandungan, harga, dan instruksi di halaman ini adalah data demonstrasi. Verifikasi seluruh informasi sebelum peluncuran komersial.</div></div>
  </section>;
}
