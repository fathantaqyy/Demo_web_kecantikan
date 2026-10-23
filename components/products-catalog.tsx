"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, type Product, formatIDR } from "@/lib/data";
import { ProductCard } from "./product-card";
import { ProductVisual } from "./product-visual";
import { useCart } from "./cart-provider";

const categories = ["Semua", "Serum", "Pembersih", "Pelembap", "Proteksi"];

export function ProductsCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sort, setSort] = useState("featured");
  const [quick, setQuick] = useState<Product | null>(null);
  const { add } = useCart();
  const filtered = useMemo(() => {
    const list = products.filter((product) => (category === "Semua" || product.category === category) && `${product.name} ${product.short}`.toLowerCase().includes(query.toLowerCase()));
    return [...list].sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : a.name.localeCompare(b.name));
  }, [category, query, sort]);

  return <>
    <div className="catalog-tools">
      <label className="search-field"><Search/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari ritual atau produk" aria-label="Cari produk"/></label>
      <div className="category-tabs" role="group" aria-label="Kategori produk">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <label className="sort-field"><SlidersHorizontal/><span>Urutkan</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Pilihan</option><option value="low">Harga terendah</option><option value="high">Harga tertinggi</option></select></label>
    </div>
    <div className="catalog-count"><span>{filtered.length} produk demo</span><span>Semua harga dalam Rupiah</span></div>
    {filtered.length ? <div className="product-grid catalog-grid">{filtered.map((product) => <ProductCard product={product} key={product.slug} onQuickView={setQuick}/>)}</div> : <div className="no-results"><h2>Tidak ada ritual yang ditemukan.</h2><button className="text-link" onClick={() => { setQuery(""); setCategory("Semua"); }}>Bersihkan filter</button></div>}
    <div className={`modal-backdrop ${quick ? "is-open" : ""}`} onClick={() => setQuick(null)}/>
    {quick && <div className="quick-modal" role="dialog" aria-modal="true" aria-label={`Lihat cepat ${quick.name}`}><button className="icon-btn close" onClick={() => setQuick(null)}><X/></button><ProductVisual product={quick} large/><div className="quick-copy"><span className="eyebrow">{quick.category} · Demo product</span><h2>{quick.name}</h2><strong>{formatIDR(quick.price)}</strong><p>{quick.description}</p><button className="button dark full" onClick={() => { add(quick.slug); setQuick(null); }}>Tambah ke keranjang</button></div></div>}
  </>;
}
