import { AppMode, ToolConfig } from './types';
import { 
  Lightbulb, 
  FileText, 
  Scale, 
  TrendingUp, 
  Globe, 
  Cpu, 
  MessageSquare 
} from 'lucide-react';

export const APP_NAME = "MitraUMKM";

export const TOOLS: Record<string, ToolConfig> = {
  [AppMode.IDEATION]: {
    id: AppMode.IDEATION,
    title: "Ide & Inovasi Produk",
    description: "Brainstorming ide produk inovatif dan sempurnakan konsep agar sesuai kebutuhan pasar.",
    icon: "Lightbulb",
    systemInstruction: "Anda adalah ahli Manajemen Produk dan Konsultan Inovasi untuk UMKM. Bantu pengguna mencari ide produk, menyempurnakan nilai jual, dan mengidentifikasi peluang pasar. Fokus pada strategi implementasi yang praktis dan hemat biaya untuk usaha kecil. JAWABLAH SELALU DALAM BAHASA INDONESIA.",
    promptPlaceholder: "cth. Saya punya toko roti kecil, bagaimana cara membuat produk yang unik?",
    suggestedPrompts: [
      "Berikan 5 ide produk unik untuk merek pakaian ramah lingkungan.",
      "Bagaimana cara mengubah hobi kerajinan tanah liat menjadi bisnis?",
      "Saran menu kopi kekinian untuk menarik pelanggan Gen Z."
    ]
  },
  [AppMode.BUSINESS_PLAN]: {
    id: AppMode.BUSINESS_PLAN,
    title: "Perencanaan Bisnis",
    description: "Buat rencana bisnis komprehensif dan dokumen strategi secara instan.",
    icon: "FileText",
    systemInstruction: "Anda adalah Pakar Strategi Bisnis Senior. Bantu UMKM membuat rencana bisnis yang terstruktur. Jawaban Anda harus terorganisir dengan judul yang jelas: Ringkasan Eksekutif, Analisis Pasar, Rencana Operasional, dan Proyeksi Keuangan. Gunakan nada profesional namun menyemangati. JAWABLAH SELALU DALAM BAHASA INDONESIA.",
    promptPlaceholder: "cth. Buat rencana bisnis untuk jasa grooming hewan panggilan.",
    suggestedPrompts: [
      "Buat Business Model Canvas untuk agensi pemasaran digital.",
      "Tulis visi dan misi untuk jasa kebersihan ramah lingkungan.",
      "Apa risiko operasional utama untuk bisnis food truck?"
    ]
  },
  [AppMode.LEGAL]: {
    id: AppMode.LEGAL,
    title: "Izin & Legalitas",
    description: "Panduan tentang izin usaha, lisensi, dan proses pendaftaran resmi.",
    icon: "Scale",
    systemInstruction: "Anda adalah Penasihat Kepatuhan Hukum untuk usaha kecil di Indonesia. Berikan panduan umum tentang pendaftaran bisnis (NIB, PT/CV), izin edar (PIRT, BPOM), dan sertifikasi Halal. PENTING: Selalu sertakan penafian bahwa Anda adalah AI dan pengguna harus berkonsultasi dengan ahli hukum setempat. JAWABLAH SELALU DALAM BAHASA INDONESIA.",
    promptPlaceholder: "cth. Izin apa saja yang saya perlukan untuk membuka restoran?",
    suggestedPrompts: [
      "Apa perbedaan antara PT Perorangan, CV, dan PT biasa?",
      "Daftar periksa (checklist) untuk mendaftarkan merek dagang (HAKI).",
      "Bagaimana cara mengurus sertifikasi Halal untuk produk makanan?"
    ]
  },
  [AppMode.FUNDRAISING]: {
    id: AppMode.FUNDRAISING,
    title: "Pendanaan & Modal",
    description: "Buat pitch deck dan jelajahi opsi pendanaan seperti KUR, hibah, atau investor.",
    icon: "TrendingUp",
    systemInstruction: "Anda adalah Konsultan Keuangan UMKM. Bantu pengguna memahami opsi pendanaan (KUR, investor angel, modal ventura, bootstrapping). Bantu menyusun pitch deck dan ringkasan keuangan. Fokus pada kejelasan dan cerita yang meyakinkan. JAWABLAH SELALU DALAM BAHASA INDONESIA.",
    promptPlaceholder: "cth. Bantu saya menulis proposal untuk investor.",
    suggestedPrompts: [
      "Slide apa saja yang wajib ada dalam presentasi ke investor?",
      "Sebutkan 5 cara kreatif mendanai startup tanpa pinjaman bank.",
      "Bagaimana cara menghitung valuasi bisnis yang belum untung?"
    ]
  },
  [AppMode.MARKETING]: {
    id: AppMode.MARKETING,
    title: "Pemasaran & Ekspor",
    description: "Kembangkan strategi pemasaran dan pelajari prosedur ekspor.",
    icon: "Globe",
    systemInstruction: "Anda adalah Direktur Pemasaran Global. Berikan saran tentang strategi penjualan, pemasaran digital, akuisisi pelanggan, dan prosedur ekspor. Fokus pada strategi ROI tinggi yang dapat ditindaklanjuti untuk anggaran kecil. JAWABLAH SELALU DALAM BAHASA INDONESIA.",
    promptPlaceholder: "cth. Bagaimana cara mulai ekspor kerajinan tangan ke Eropa?",
    suggestedPrompts: [
      "Buat strategi peluncuran produk baru dengan anggaran nol rupiah.",
      "Dokumen apa saja yang biasanya diperlukan untuk ekspor makanan?",
      "Bagaimana cara menggunakan media sosial untuk mencari klien B2B?"
    ]
  },
  [AppMode.DIGITIZATION]: {
    id: AppMode.DIGITIZATION,
    title: "Transformasi Digital",
    description: "Integrasikan teknologi untuk mengotomatisasi operasi dan berkembang lebih cepat.",
    icon: "Cpu",
    systemInstruction: "Anda adalah CTO untuk usaha kecil. Rekomendasikan perangkat lunak, alat otomatisasi, dan strategi pengembangan web untuk memodernisasi UMKM. Jelaskan konsep teknis dengan istilah sederhana. JAWABLAH SELALU DALAM BAHASA INDONESIA.",
    promptPlaceholder: "cth. Aplikasi apa yang cocok untuk manajemen stok?",
    suggestedPrompts: [
      "Saran teknologi (tech stack) untuk toko online kecil.",
      "Bagaimana cara menggunakan AI untuk membalas chat pelanggan otomatis?",
      "Apa keuntungan memindahkan data inventaris ke cloud?"
    ]
  },
  [AppMode.CHAT]: {
    id: AppMode.CHAT,
    title: "Pusat Pengetahuan UMKM",
    description: "Panduan komprehensif Anda untuk memulai bisnis, izin, ekspor, dan keuangan.",
    icon: "MessageSquare",
    systemInstruction: "Anda adalah Pusat Pengetahuan UMKM dan Asisten Bisnis Utama. Anda memiliki pengetahuan luas tentang: \n1. Memulai bisnis (perencanaan, struktur)\n2. Pendaftaran Legal & Izin (NIB, PIRT, Halal, Pajak)\n3. Peraturan Ekspor (dokumen, prosedur)\n4. Opsi Pendanaan (KUR, hibah, VC)\n5. Strategi Penjualan & Pemasaran.\n\nTujuan Anda adalah memberikan jawaban yang jelas, ringkas, dan dapat ditindaklanjuti untuk setiap pertanyaan terkait menjalankan Usaha Mikro, Kecil, atau Menengah. Susun jawaban Anda dengan judul dan poin-poin agar mudah dibaca. JAWABLAH SELALU DALAM BAHASA INDONESIA.",
    promptPlaceholder: "Tanyakan tentang izin, modal, ekspor, atau strategi bisnis...",
    suggestedPrompts: [
      "Izin apa yang diperlukan untuk ekspor makanan?",
      "Bagaimana cara mendaftar NIB dan berapa biayanya?",
      "Jelaskan jenis-jenis pembiayaan/KUR yang tersedia untuk UMKM.",
      "Apa peraturan utama untuk ekspor produk ke negara ASEAN?"
    ]
  }
};