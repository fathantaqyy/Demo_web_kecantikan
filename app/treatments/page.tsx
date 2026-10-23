"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Clock, Plus, X } from "lucide-react";
import { treatments, formatIDR } from "@/lib/data";

export default function TreatmentsPage() {
  const [open, setOpen] = useState<string | null>(treatments[0].slug);
  return <main className="inner-page treatments-page">
    <header className="split-hero"><div className="split-copy"><span className="eyebrow">Treatments / Yogyakarta</span><h1>A room to pause.<br/><i>A ritual to return to.</i></h1><p>Temukan perawatan demonstrasi yang dibingkai dengan konsultasi, ritme yang tenang, dan bahasa yang jujur.</p><Link href="/booking" className="button dark">Reservasi sesi demo</Link></div><div className="split-image"><Image src="/assets/clinic-interior.png" alt="Interior konsep klinik 2bshine" fill priority sizes="50vw"/></div></header>
    <section className="treatment-discovery section-pad"><div className="sticky-title"><span className="eyebrow">Treatment menu</span><h2>Choose your<br/><i>kind of care.</i></h2><p>Harga dan durasi di bawah adalah data simulasi untuk kebutuhan demo.</p></div><div className="accordion-list">{treatments.map((treatment, index) => <article className={`treatment-accordion ${open === treatment.slug ? "open" : ""}`} key={treatment.slug} style={{ "--accent": treatment.accent } as React.CSSProperties}><button onClick={() => setOpen(open === treatment.slug ? null : treatment.slug)}><span>0{index + 1}</span><div><small>{treatment.category}</small><h3>{treatment.name}</h3></div><span className="price">{formatIDR(treatment.price)}</span>{open === treatment.slug ? <X/> : <Plus/>}</button><div className="accordion-content"><p>{treatment.description}</p><div><Clock/>{treatment.duration}</div><p><b>Cocok untuk:</b> {treatment.suitable}</p><Link href={`/booking?treatment=${treatment.slug}`} className="text-link">Pilih perawatan <ArrowRight/></Link></div></article>)}</div></section>
    <section className="comparison section-pad"><span className="eyebrow">At a glance</span><h2>Ritual finder</h2><div className="compare-grid"><div className="compare-head"><span>Perawatan</span><span>Waktu</span><span>Investasi demo</span></div>{treatments.slice(0, 4).map((treatment) => <div className="compare-row" key={treatment.slug}><strong>{treatment.name}</strong><span>{treatment.duration}</span><span>{formatIDR(treatment.price)}</span></div>)}</div></section>
  </main>;
}
