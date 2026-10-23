"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Check, Clock, Camera, MapPin, MessageCircle } from "lucide-react";
import { clinic } from "@/lib/data";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); setSent(true); };
  return <main className="inner-page contact-page"><header className="page-hero"><span className="eyebrow">Say hello</span><h1>Come in.<br/><i>Stay awhile.</i></h1><p>Informasi lokasi dan kanal berikut adalah placeholder presentasi sampai data resmi klinik diberikan.</p></header><section className="contact-layout section-pad"><div className="contact-image"><Image src="/assets/clinic-interior.png" alt="Konsep ruang klinik 2bshine" fill sizes="50vw"/></div><div className="contact-info"><span className="eyebrow">The atelier</span><h2>{clinic.city}</h2><div className="contact-row"><MapPin/><div><strong>Alamat demo</strong><p>{clinic.address}</p></div></div><div className="contact-row"><Clock/><div><strong>Jam demonstrasi</strong><p>{clinic.hours}</p></div></div><div className="contact-row"><Camera/><div><strong>Instagram demo</strong><p>{clinic.instagram}</p></div></div><Link href="/booking" className="button dark"><MessageCircle/> Reservasi demo</Link></div></section><section className="contact-form-section section-pad"><div><span className="eyebrow">Send a note</span><h2>Ada yang ingin<br/><i>ditanyakan?</i></h2><p>Form ini menjalankan status sukses di browser tanpa mengirim data ke server.</p></div>{sent ? <div className="form-success"><Check/><h3>Pesan demo diterima.</h3><p>Tidak ada data yang dikirim. Hubungkan endpoint produksi sebelum peluncuran.</p><button className="text-link" onClick={() => setSent(false)}>Kirim pesan lain</button></div> : <form onSubmit={submit} className="contact-form"><label>Nama<input required placeholder="Nama Anda"/></label><label>Email<input type="email" required placeholder="nama@email.com"/></label><label>Topik<select><option>Produk</option><option>Perawatan</option><option>Reservasi</option><option>Lainnya</option></select></label><label>Pesan<textarea required placeholder="Ceritakan yang dapat kami bantu"/></label><button className="button dark">Kirim pesan demo</button></form>}</section></main>;
}
