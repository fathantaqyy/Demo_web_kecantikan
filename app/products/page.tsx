import { ProductsCatalog } from "@/components/products-catalog";

export const metadata = { title: "Produk — 2bshine" };

export default function ProductsPage() {
  return <main className="inner-page products-page">
    <header className="page-hero catalog-hero"><span className="eyebrow">The skincare edit</span><h1>Ritual yang kecil.<br/><i>Rasa yang menetap.</i></h1><p>Koleksi fiktif yang dibuat khusus untuk demo 2bshine. Tidak ada inventori atau transaksi nyata.</p></header>
    <section className="catalog section-pad"><ProductsCatalog/></section>
  </main>;
}
