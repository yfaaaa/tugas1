"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  // Animasi Stagger untuk list menu
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white p-6 overflow-hidden">
      {/* Background Glow Estetik */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Konten Utama */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center text-center max-w-lg w-full"
      >
        {/* Badge Sekolah */}
        <motion.span
          variants={itemVariants}
          className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-zinc-400 tracking-wider mb-6 backdrop-blur-sm"
        >
          🚀 SMK TELKOM MALANG • TUGAS RPL 1
        </motion.span>

        {/* Judul Aplikasi */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
        >
          Toko Online App
        </motion.h1>

        {/* Deskripsi */}
        <motion.p
          variants={itemVariants}
          className="text-zinc-400 text-sm md:text-base max-w-sm mb-12 font-light leading-relaxed"
        >
          Selamat datang di platform tugas dashboard toko online multi-role (Admin & User).
        </motion.p>

        {/* Menu Navigasi Utama */}
        <motion.div variants={itemVariants} className="w-full max-w-sm space-y-4 px-4">
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/login"
                className="block py-3.5 w-full bg-blue-600 hover:bg-blue-700 font-semibold text-center rounded-2xl shadow-lg transition-colors"
              >
                Sign In
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="block py-3.5 w-full bg-white/5 hover:bg-white/10 border border-white/10 text-center font-semibold rounded-2xl backdrop-blur-md transition-colors"
              >
                Register
              </Link>
            </motion.div>
          </div>

          {/* Divider Pembatas */}
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-xs font-mono text-white/20">PORTFOLIO MENU</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Akses Cepat ke Profil Kamu */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.99 }}>
            <Link
              href="/profil"
              className="block py-3 w-full bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white text-center text-sm font-medium rounded-xl transition-all"
            >
              Lihat Profil Biodata Saya 👤
            </Link>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          variants={itemVariants}
          className="mt-20 text-xs font-mono text-zinc-600 tracking-widest"
        >
          BUILT WITH NEXT.JS & TAILWIND
        </motion.footer>
      </motion.div>
    </main>
  );
}