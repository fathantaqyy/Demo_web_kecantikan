import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProduct } from "@/lib/data";
import { ProductDetailClient } from "@/components/product-detail-client";
import { ProductCard } from "@/components/product-card";
import { Suspense } from "react";

export function generateStaticParams() { return products.map(({ slug }) => ({ slug })); }

async function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.slug !== slug && item.category === product.category).slice(0, 3);
  return <main className="inner-page detail-page"><div className="crumbs"><Link href="/products">Produk</Link><span>/</span><span>{product.name}</span></div><ProductDetailClient product={product}/><section className="related section-pad"><div className="section-heading"><div><span className="eyebrow">Keep exploring</span><h2>Ritual yang<br/><i>berjalan bersamanya.</i></h2></div></div><div className="product-grid">{related.map((item) => <ProductCard product={item} key={item.slug}/>)}</div></section></main>;
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return <Suspense fallback={<main className="inner-page"><div className="page-hero"><h1>Menyiapkan ritual…</h1></div></main>}><ProductContent params={params}/></Suspense>;
}
