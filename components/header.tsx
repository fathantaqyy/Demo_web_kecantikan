"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart-provider";

const links = [
  ["/products", "Shop"], ["/treatments", "Perawatan"], ["/about", "Cerita Kami"], ["/contact", "Kunjungi"]
];

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();
  return <header className="site-header">
    <div className="nav-shell">
      <button className="menu-btn" aria-label="Buka menu" onClick={() => setMenu(true)}><Menu /></button>
      <nav className="desktop-nav" aria-label="Navigasi utama">{links.slice(0, 2).map(([href, label]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}</nav>
      <Link href="/" className="logo" aria-label="2bshine beranda"><span>2b</span>shine<small>skin atelier</small></Link>
      <nav className="desktop-nav end" aria-label="Navigasi tambahan">{links.slice(2).map(([href, label]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>)}</nav>
      <button className="cart-button" onClick={() => setOpen(true)} aria-label={`Buka keranjang, ${count} item`}><ShoppingBag /><span>{count}</span></button>
    </div>
    <div className={`mobile-menu ${menu ? "is-open" : ""}`}>
      <button className="icon-btn" onClick={() => setMenu(false)} aria-label="Tutup menu"><X /></button>
      <div className="mobile-menu-logo">2bshine</div>
      {links.map(([href, label], index) => <Link key={href} href={href} onClick={() => setMenu(false)}><span>0{index + 1}</span>{label}</Link>)}
      <Link href="/booking" className="button blush" onClick={() => setMenu(false)}>Reservasi kunjungan</Link>
    </div>
  </header>;
}
