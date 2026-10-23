"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { getProduct, formatIDR } from "@/lib/data";
import { ProductVisual } from "@/components/product-visual";

export default function CartPage() {
  const { items, subtotal, update, remove } = useCart();
  return <main className="inner-page cart-page"><header className="page-hero"><span className="eyebrow">Your edit</span><h1>Keranjang <i>ritual.</i></h1><p>Keranjang tersimpan secara lokal untuk demonstrasi. Checkout dan pembayaran nyata belum tersedia.</p></header><section className="cart-page-layout section-pad">
    {items.length === 0 ? <div className="empty-page"><ShoppingBag/><h2>Belum ada yang dipilih.</h2><p>Mulai dari serum, pembersih, atau ritual kelembapan pilihan kami.</p><Link href="/products" className="button dark">Jelajahi koleksi</Link></div> : <><div className="cart-page-lines">{items.map((line) => { const product = getProduct(line.slug); if (!product) return null; return <article className="cart-page-line" key={line.slug}><div className="cart-art"><ProductVisual product={product}/></div><div><span className="eyebrow">{product.category}</span><Link href={`/products/${product.slug}`}><h2>{product.name}</h2></Link><p>{formatIDR(product.price)}</p><div className="quantity large"><button onClick={() => update(line.slug, line.quantity - 1)}><Minus/></button><span>{line.quantity}</span><button onClick={() => update(line.slug, line.quantity + 1)}><Plus/></button></div></div><strong>{formatIDR(product.price * line.quantity)}</strong><button className="trash" onClick={() => remove(line.slug)} aria-label="Hapus"><Trash2/></button></article>})}</div><aside className="order-summary"><span className="eyebrow">Ringkasan demo</span><h2>Order summary</h2><div><span>Subtotal</span><strong>{formatIDR(subtotal)}</strong></div><div><span>Pengiriman</span><span>Dihitung saat checkout</span></div><hr/><div className="total"><span>Total sementara</span><strong>{formatIDR(subtotal)}</strong></div><button className="button dark full" onClick={() => alert("Checkout belum tersedia dalam presentasi demo ini.")}>Lanjut ke checkout demo</button><small>Tombol ini tidak memproses pembayaran.</small></aside></>}
  </section></main>;
}
