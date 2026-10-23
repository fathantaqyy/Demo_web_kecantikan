export type Product = {
  slug: string;
  name: string;
  category: "Serum" | "Pembersih" | "Pelembap" | "Proteksi";
  price: number;
  short: string;
  description: string;
  ingredients: string;
  usage: string;
  accent: string;
  form: "dropper" | "pump" | "jar" | "tube";
  badge?: string;
};

export const products: Product[] = [
  { slug: "embun-barrier-serum", name: "Embun Barrier Serum", category: "Serum", price: 289000, short: "Serum hidrasi untuk ritual pagi yang lembut.", description: "Formula demo bertekstur ringan yang dirancang sebagai bagian dari ritual hidrasi harian. Data produk ini bersifat ilustratif untuk presentasi.", ingredients: "Demo: niacinamide, panthenol, hyaluronic complex.", usage: "Demo: gunakan 2–3 tetes setelah membersihkan wajah.", accent: "#c9908e", form: "dropper", badge: "Terlaris" },
  { slug: "sela-gentle-cleanser", name: "Sela Gentle Cleanser", category: "Pembersih", price: 179000, short: "Pembersih rendah busa untuk keseharian.", description: "Konsep pembersih wajah lembut dengan sensasi nyaman dan hasil akhir tidak terasa kesat.", ingredients: "Demo: amino acid surfactant, oat extract, allantoin.", usage: "Demo: pijat pada wajah basah, lalu bilas bersih.", accent: "#b9a68e", form: "pump" },
  { slug: "niskala-renew-serum", name: "Niskala Renew Serum", category: "Serum", price: 329000, short: "Ritual malam dengan tekstur silky.", description: "Konsep serum malam premium untuk tampilan kulit yang terasa lebih halus dan terawat.", ingredients: "Demo: bakuchiol, squalane, peptide complex.", usage: "Demo: gunakan malam hari dan lanjutkan dengan pelembap.", accent: "#735856", form: "dropper", badge: "Baru" },
  { slug: "rasa-cloud-cream", name: "Rasa Cloud Cream", category: "Pelembap", price: 259000, short: "Krim ringan dengan sensasi cloud-soft.", description: "Konsep pelembap harian dengan tekstur cushiony yang mudah diratakan.", ingredients: "Demo: ceramide blend, beta glucan, ectoin.", usage: "Demo: aplikasikan merata pada wajah dan leher.", accent: "#d6b8ac", form: "jar" },
  { slug: "surya-silk-spf", name: "Surya Silk SPF 50", category: "Proteksi", price: 219000, short: "Proteksi harian dengan hasil akhir satin.", description: "Konsep sunscreen ringan untuk rutinitas pagi. Klaim dan nilai SPF hanya untuk kebutuhan demo dan belum mewakili produk nyata.", ingredients: "Demo: hybrid UV filters, vitamin E, bisabolol.", usage: "Demo: gunakan sebagai langkah terakhir dan aplikasikan ulang.", accent: "#e3c76c", form: "tube" },
  { slug: "teduh-cica-gel", name: "Teduh Cica Gel", category: "Pelembap", price: 199000, short: "Gel dingin untuk jeda yang menenangkan.", description: "Konsep gel-cream segar untuk melengkapi ritual perawatan sederhana.", ingredients: "Demo: centella complex, aloe, panthenol.", usage: "Demo: gunakan tipis pada wajah setelah serum.", accent: "#8aa48e", form: "jar" },
  { slug: "laras-milk-cleanser", name: "Laras Milk Cleanser", category: "Pembersih", price: 189000, short: "Milk cleanser lembut dan comforting.", description: "Konsep first cleanser dengan tekstur susu yang nyaman untuk ritual malam.", ingredients: "Demo: rice milk, squalane, oat lipid.", usage: "Demo: pijat pada wajah kering, lalu bilas.", accent: "#d4c1a7", form: "pump" },
  { slug: "purnama-eye-serum", name: "Purnama Eye Serum", category: "Serum", price: 249000, short: "Sentuhan ringan untuk area mata.", description: "Konsep serum area mata dengan aplikator presisi dan sensasi ringan.", ingredients: "Demo: caffeine, peptide, licorice extract.", usage: "Demo: tepuk perlahan di sekitar tulang orbital.", accent: "#9d87a1", form: "dropper" },
];

export type Treatment = { slug: string; name: string; category: string; duration: string; price: number; description: string; suitable: string; accent: string };

export const treatments: Treatment[] = [
  { slug: "signature-dew-facial", name: "Signature Dew Facial", category: "Facial", duration: "75 menit", price: 485000, description: "Ritual facial relaksasi dengan pembersihan, pijat ringan, dan masker yang disesuaikan melalui konsultasi.", suitable: "Untuk pengalaman perawatan berkala dan relaksasi.", accent: "#d8aaa4" },
  { slug: "calm-barrier-ritual", name: "Calm Barrier Ritual", category: "Skin Ritual", duration: "60 menit", price: 425000, description: "Ritual lembut yang berfokus pada kenyamanan kulit tanpa klaim hasil medis.", suitable: "Untuk kulit yang menginginkan sesi perawatan minimal dan menenangkan.", accent: "#aab7a2" },
  { slug: "luminous-reset", name: "Luminous Reset", category: "Advanced Care", duration: "90 menit", price: 675000, description: "Sesi perawatan wajah komprehensif dengan tahapan yang ditentukan setelah konsultasi.", suitable: "Untuk agenda perawatan khusus sebelum momen penting.", accent: "#c6a779" },
  { slug: "sculpt-and-rest", name: "Sculpt & Rest Massage", category: "Massage", duration: "45 menit", price: 350000, description: "Pijat wajah dan bahu yang dirancang untuk pengalaman relaksasi.", suitable: "Untuk melepas ketegangan dan menikmati waktu jeda.", accent: "#a98c83" },
  { slug: "teen-gentle-care", name: "Teen Gentle Care", category: "Facial", duration: "50 menit", price: 315000, description: "Pengenalan ritual perawatan dasar dengan pendekatan ringan dan edukatif.", suitable: "Untuk remaja, dengan persetujuan orang tua/wali bila diperlukan.", accent: "#d5bdcf" },
  { slug: "back-clarity-ritual", name: "Back Clarity Ritual", category: "Body Care", duration: "60 menit", price: 445000, description: "Ritual pembersihan dan perawatan kulit area punggung untuk pengalaman yang lebih menyeluruh.", suitable: "Untuk perawatan tubuh berkala.", accent: "#baa68f" },
];

export const clinic = {
  name: "2bshine",
  city: "Yogyakarta",
  address: "Lokasi demo — Yogyakarta, DI Yogyakarta",
  hours: "Senin–Sabtu · 09.00–19.00 WIB",
  phone: "6280000000000",
  instagram: "@2bshine.demo",
};

export const formatIDR = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

export const getProduct = (slug: string) => products.find((product) => product.slug === slug);
