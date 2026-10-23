import { BookingFlow } from "@/components/booking-flow";
import { Suspense } from "react";

export const metadata = { title: "Reservasi Demo — 2bshine" };
export default function BookingPage() { return <main className="inner-page booking-page"><header className="page-hero booking-hero"><span className="eyebrow">Your time, held gently</span><h1>Reservasi <i>ritualmu.</i></h1><p>Alur pemesanan demonstrasi. Jadwal belum terhubung dengan sistem klinik dan tidak menghasilkan janji temu nyata.</p></header><section className="section-pad"><Suspense fallback={<div className="booking-card">Menyiapkan kalender Asia/Jakarta…</div>}><BookingFlow/></Suspense></section></main>; }
