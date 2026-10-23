"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock, MessageCircle } from "lucide-react";
import { clinic, treatments, formatIDR } from "@/lib/data";

type Booking = { treatment: string; date: string; time: string; name: string; phone: string; email: string; notes: string };
const initial: Booking = { treatment: "", date: "", time: "", name: "", phone: "", email: "", notes: "" };
const slots = ["09.00", "10.30", "12.00", "13.30", "15.00", "16.30", "18.00"];

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [booking, setBooking] = useState(initial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const selected = treatments.find((item) => item.slug === booking.treatment);
  const minDate = useMemo(() => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()), []);
  const labels = ["Perawatan", "Tanggal", "Waktu", "Detail", "Tinjau", "Selesai"];
  const valid = () => {
    if (step === 0 && !booking.treatment) return "Pilih satu perawatan untuk melanjutkan.";
    if (step === 1 && !booking.date) return "Pilih tanggal kunjungan demo.";
    if (step === 2 && !booking.time) return "Pilih salah satu slot waktu simulasi.";
    if (step === 3 && (!booking.name.trim() || !booking.phone.trim() || !booking.email.includes("@"))) return "Lengkapi nama, nomor WhatsApp, dan email yang valid.";
    return "";
  };
  const next = () => { const message = valid(); if (message) { setError(message); return; } setError(""); setStep((value) => Math.min(5, value + 1)); };
  const confirm = () => { setLoading(true); setTimeout(() => { setLoading(false); setStep(5); }, 850); };
  const whatsapp = `https://wa.me/${clinic.phone}?text=${encodeURIComponent(`Halo 2bshine, saya ingin menanyakan ketersediaan reservasi:\n\nNama: ${booking.name}\nPerawatan: ${selected?.name}\nTanggal: ${booking.date}\nWaktu: ${booking.time} WIB\n\nIni adalah permintaan dari website demo, mohon konfirmasi ketersediaannya.`)}`;

  return <div className="booking-shell">
    <div className="booking-progress">{labels.map((label, index) => <div key={label} className={index <= step ? "active" : ""}><span>{index < step ? <Check/> : index + 1}</span><small>{label}</small></div>)}</div>
    <div className="booking-card">
      {step === 0 && <div className="step-panel"><span className="eyebrow">Step 01</span><h2>Ritual mana yang memanggil?</h2><p>Pilih satu perawatan demo. Anda dapat mendiskusikan penyesuaian saat konfirmasi.</p><div className="treatment-options">{treatments.map((item) => <button className={booking.treatment === item.slug ? "selected" : ""} key={item.slug} onClick={() => setBooking({ ...booking, treatment: item.slug })}><span className="color-dot" style={{ background: item.accent }}/><div><strong>{item.name}</strong><small>{item.duration} · {formatIDR(item.price)}</small></div><span className="radio"/></button>)}</div></div>}
      {step === 1 && <div className="step-panel narrow"><span className="eyebrow">Step 02</span><h2>Kapan Anda ingin berkunjung?</h2><p>Kalender menggunakan zona waktu Asia/Jakarta. Seluruh ketersediaan bersifat simulasi.</p><label className="date-input"><CalendarDays/><input type="date" min={minDate} value={booking.date} onInput={(event) => setBooking({ ...booking, date: event.currentTarget.value })}/></label><div className="simulation-note">SIMULASI — tanggal ini belum terhubung ke sistem klinik.</div></div>}
      {step === 2 && <div className="step-panel narrow"><span className="eyebrow">Step 03</span><h2>Pilih waktu yang terasa pas.</h2><p>Slot berikut adalah contoh ketersediaan dalam WIB.</p><div className="time-slots">{slots.map((time, index) => <button key={time} disabled={index === 2 || index === 5} className={booking.time === time ? "selected" : ""} onClick={() => setBooking({ ...booking, time })}><Clock/>{time}<small>{index === 2 || index === 5 ? "Penuh (demo)" : "Tersedia (simulasi)"}</small></button>)}</div></div>}
      {step === 3 && <div className="step-panel narrow"><span className="eyebrow">Step 04</span><h2>Kenalan sebentar.</h2><p>Detail ini hanya dipakai untuk membuat ringkasan di perangkat Anda.</p><div className="form-grid"><label>Nama lengkap *<input value={booking.name} onChange={(event) => setBooking({ ...booking, name: event.target.value })} placeholder="Nama Anda"/></label><label>WhatsApp *<input value={booking.phone} onChange={(event) => setBooking({ ...booking, phone: event.target.value })} placeholder="08xxxxxxxxxx"/></label><label>Email *<input type="email" value={booking.email} onChange={(event) => setBooking({ ...booking, email: event.target.value })} placeholder="nama@email.com"/></label><label>Catatan opsional<textarea value={booking.notes} onChange={(event) => setBooking({ ...booking, notes: event.target.value })} placeholder="Hal yang ingin Anda sampaikan"/></label></div></div>}
      {step === 4 && <div className="step-panel narrow"><span className="eyebrow">Step 05</span><h2>Tinjau permintaan Anda.</h2><p>Belum ada reservasi yang dikirim atau dikonfirmasi.</p><div className="review-card"><div><span>Perawatan</span><strong>{selected?.name}</strong></div><div><span>Tanggal</span><strong>{booking.date}</strong></div><div><span>Waktu</span><strong>{booking.time} WIB</strong></div><div><span>Nama</span><strong>{booking.name}</strong></div><div><span>Harga demo</span><strong>{selected ? formatIDR(selected.price) : "—"}</strong></div></div><label className="consent"><input type="checkbox" defaultChecked/> Saya memahami bahwa ini hanya simulasi, bukan konfirmasi klinik.</label></div>}
      {step === 5 && <div className="step-panel success"><div className="success-mark"><Check/></div><span className="eyebrow">Demo complete</span><h2>Permintaan demo berhasil disusun.</h2><p>Tidak ada data yang dikirim ke klinik. Untuk alur produksi, backend reservasi perlu dihubungkan dan informasi klinik harus diverifikasi.</p><div className="review-card"><div><span>Perawatan</span><strong>{selected?.name}</strong></div><div><span>Jadwal simulasi</span><strong>{booking.date} · {booking.time} WIB</strong></div></div><a className="button whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle/> Lanjutkan via WhatsApp</a><small>Nomor WhatsApp saat ini adalah placeholder konfigurasi dan tidak mewakili klinik nyata.</small></div>}
      {error && <div className="form-error" role="alert">{error}</div>}
      {step < 5 && <div className="booking-actions">{step > 0 ? <button className="button ghost" onClick={() => { setError(""); setStep(step - 1); }}><ArrowLeft/> Kembali</button> : <span/>}<button className="button dark" onClick={step === 4 ? confirm : next} disabled={loading}>{loading ? "Menyusun ringkasan…" : step === 4 ? "Konfirmasi simulasi" : <>Lanjutkan <ArrowRight/></>}</button></div>}
    </div>
  </div>;
}
