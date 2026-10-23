import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { SerumStory } from "@/components/serum-scene";
import { ProductCard } from "@/components/product-card";
import { products, treatments } from "@/lib/data";

export default function Home() {
  return <main>
    <SerumStory />
    <section className="editorial-banner section-pad" id="discover">
      <div className="banner-image image-reveal"><Image src="/assets/hero-editorial.png" alt="Kampanye editorial 2bshine dengan ritual serum" fill priority sizes="100vw" /></div>
      <div className="banner-overlay" />
      <div className="banner-copy reveal"><span className="eyebrow light">Your skin, your pace</span><h2>Beauty feels better<br/>when it feels <i>like you.</i></h2><p>Ritual skincare dan pengalaman perawatan yang dirancang untuk membuat setiap kunjungan terasa personal.</p><Link href="/about" className="button ivory">Cerita 2bshine</Link></div>
      <div className="banner-note"><span>2BSHINE / YK</span><span>Editorial 01</span></div>
    </section>

    <section className="philosophy section-pad">
      <div className="section-kicker reveal">Mengapa 2bshine</div>
      <div className="philosophy-heading reveal"><h2>A kind of beauty that<br/><i>doesn’t ask you to change.</i></h2><p>Kami melihat perawatan kulit sebagai percakapan—dimulai dengan mendengar, lalu memilih ritual yang terasa relevan untuk Anda.</p></div>
      <div className="value-grid">
        <article className="value-card dark reveal"><span>01</span><ShieldCheck/><h3>Dipilih dengan niat</h3><p>Setiap rekomendasi demo dimulai dari konsultasi dan kebutuhan unik, bukan tren sesaat.</p></article>
        <article className="value-card rose reveal"><span>02</span><Sparkles/><h3>Pengalaman sensorial</h3><p>Tekstur, aroma, cahaya, dan sentuhan dipikirkan sebagai satu ritual yang utuh.</p></article>
        <article className="value-image image-reveal"><Image src="/assets/serum-portrait.png" alt="Potret editorial dengan serum" fill sizes="(max-width: 700px) 100vw, 32vw" /></article>
        <article className="value-card light reveal"><span>03</span><Leaf/><h3>Lembut & bertanggung jawab</h3><p>Bahasa yang jujur, tanpa klaim medis berlebihan, dan pilihan yang terasa lebih sadar.</p></article>
      </div>
    </section>

    <section className="category-strip">
      {[["01", "Cleansers", "Mulai dari kanvas yang tenang"], ["02", "Serums", "Satu tetes yang terasa personal"], ["03", "Moisturisers", "Kenyamanan yang menetap"], ["04", "Sun Care", "Perlindungan untuk setiap hari"]].map(([n, title, copy]) => <Link href={`/products?category=${title}`} className="category-item" key={title}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowRight/></Link>)}
    </section>

    <section className="products-feature section-pad">
      <div className="section-heading reveal"><div><span className="eyebrow">Our best rituals</span><h2>Dipilih untuk<br/><i>ritual harianmu.</i></h2></div><p>Fiksi produk untuk presentasi—masing-masing memiliki identitas kemasan, warna, dan cerita sendiri.</p><Link href="/products" className="text-link">Lihat semua <span>↗</span></Link></div>
      <div className="product-grid home-grid">{products.slice(0, 4).map((product) => <ProductCard product={product} key={product.slug}/>)}</div>
    </section>

    <section className="feature-product section-pad">
      <div className="feature-watermark">EMBUN</div>
      <div className="feature-image image-reveal"><Image src="/assets/product-collection.png" alt="Koleksi produk skincare 2bshine" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
      <div className="feature-copy reveal"><span className="eyebrow">The collection / 01</span><h2>Soft formulas.<br/><i>Strong rituals.</i></h2><p>Enam objek perawatan dalam satu palet yang hangat—dibuat sebagai prototipe visual untuk membayangkan koleksi 2bshine.</p><ul><li><Check/> Tekstur ringan untuk ritual berlapis</li><li><Check/> Identitas kemasan yang mudah dikenali</li><li><Check/> Informasi produk transparan dan ringkas</li></ul><Link href="/products" className="button dark">Jelajahi koleksi</Link></div>
    </section>

    <section className="treatments-home section-pad">
      <div className="treatment-visual image-reveal"><Image src="/assets/clinic-interior.png" alt="Interior konsep klinik 2bshine" fill sizes="(max-width: 800px) 100vw, 52vw" /></div>
      <div className="treatment-list"><span className="eyebrow">In the atelier</span><h2>Perawatan yang<br/><i>mengikuti ritmemu.</i></h2>{treatments.slice(0, 3).map((treatment, index) => <Link href="/treatments" key={treatment.slug} className="treatment-row"><span>0{index + 1}</span><div><h3>{treatment.name}</h3><p>{treatment.duration} · Konsultasi sebelum sesi</p></div><ArrowRight/></Link>)}<Link href="/booking" className="button dark">Pilih jadwal demo</Link></div>
    </section>

    <section className="testimonials section-pad">
      <div className="testimonial-intro reveal"><span className="demo-pill">TESTIMONI DEMO</span><h2>Notes from<br/><i>the glow room.</i></h2><p>Nama, kutipan, dan penilaian berikut sepenuhnya fiktif untuk kebutuhan presentasi visual.</p></div>
      <div className="quote-card reveal"><div className="stars">★★★★★</div><blockquote>“Ruangnya membuat saya merasa tenang sejak pertama masuk. Ritualnya tidak terasa tergesa—semuanya dijelaskan dengan hangat.”</blockquote><div><strong>Alya P.</strong><span>Profil demonstrasi · Yogyakarta</span></div></div>
      <div className="quote-card small reveal"><div className="stars">★★★★★</div><blockquote>“Saya suka pendekatannya yang sederhana dan tidak berlebihan.”</blockquote><div><strong>Nara K.</strong><span>Profil demonstrasi</span></div></div>
    </section>

    <section className="instagram section-pad" id="instagram"><div className="insta-head reveal"><span>@2bshine.demo</span><h2>A quiet corner<br/><i>of our world.</i></h2><p>Galeri Instagram terinspirasi · konten demo</p></div><div className="insta-grid"><div className="insta tall image-reveal"><Image src="/assets/serum-portrait.png" alt="Editorial kulit bercahaya" fill sizes="33vw"/></div><div className="insta image-reveal"><Image src="/assets/product-collection.png" alt="Koleksi skincare" fill sizes="33vw"/></div><div className="insta wide image-reveal"><Image src="/assets/clinic-interior.png" alt="Interior klinik" fill sizes="50vw"/></div><div className="insta image-reveal"><Image src="/assets/hero-editorial.png" alt="Ritual serum" fill sizes="33vw"/></div></div></section>
  </main>;
}
