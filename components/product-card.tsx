"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import type { Product } from "@/lib/data";
import { formatIDR } from "@/lib/data";
import { ProductVisual } from "./product-visual";
import { useCart } from "./cart-provider";

export function ProductCard({ product, onQuickView }: { product: Product; onQuickView?: (product: Product) => void }) {
  const { add } = useCart();
  return <article className="product-card reveal">
    <div className="product-card-art">
      {product.badge && <span className="badge">{product.badge}</span>}
      <Link href={`/products/${product.slug}`} aria-label={`Lihat ${product.name}`}><ProductVisual product={product} /></Link>
      <div className="card-actions">
        {onQuickView && <button onClick={() => onQuickView(product)} aria-label="Lihat cepat"><Search /></button>}
        <button onClick={() => add(product.slug)} aria-label={`Tambah ${product.name}`}><Plus /></button>
      </div>
    </div>
    <Link href={`/products/${product.slug}`} className="product-info"><div><span>{product.category}</span><h3>{product.name}</h3></div><strong>{formatIDR(product.price)}</strong></Link>
  </article>;
}
