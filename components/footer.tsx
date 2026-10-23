import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";
import { clinic } from "@/lib/data";

export function Footer() {
  return <footer className="footer">
    <div className="footer-cta">
      <span className="eyebrow light">A moment for your skin</span>
      <h2>Temukan ritual<br/><i>yang terasa milikmu.</i></h2>
      <Link href="/booking" className="circle-link" aria-label="Mulai reservasi"><ArrowUpRight /></Link>
    </div>
    <div className="footer-grid">
      <div><div className="footer-logo"><span>2b</span>shine</div><p>Skin atelier dan beauty clinic di Yogyakarta. Seluruh informasi layanan dan produk di situs ini adalah konten demo presentasi.</p></div>
      <div><span className="footer-label">Jelajahi</span><Link href="/products">Produk</Link><Link href="/treatments">Perawatan</Link><Link href="/about">Tentang</Link><Link href="/booking">Reservasi</Link></div>
      <div><span className="footer-label">Kunjungi</span><p>{clinic.address}</p><p>{clinic.hours}</p><Link href="/contact">Petunjuk & kontak</Link></div>
      <div><span className="footer-label">Sosial</span><a href="#instagram"><Camera /> {clinic.instagram}</a><p>Instagram demo</p></div>
    </div>
    <div className="footer-bottom"><span>© 2026 2bshine — Presentation demo</span><span>Yogyakarta · Indonesia</span></div>
  </footer>;
}
