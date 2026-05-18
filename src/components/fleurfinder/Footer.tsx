"use client";

import { useState } from "react";
import { Heart, Camera, MessageCircle, Send, X, Info, ShieldCheck, Mail, CheckCircle, AlertCircle, Link2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 🔧 Ganti URL di bawah ini dengan Linktree asli FLEUR PIPELINE
const LINKTREE_URL = "https://linktr.ee/fleurbouquetbandung";

// 🔧 Formspree endpoint — menggunakan email langsung (pastikan sudah diverifikasi di formspree.io)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnjrqdan";

export default function Footer() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validateEmail = (value: string) => {
    if (!value) return "Email tidak boleh kosong.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Format email tidak valid.";
    return "";
  };

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailError("");
    setSubmitState("loading");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitState("success");
        setEmail("");
      } else {
        const data = await res.json().catch(() => null);
        console.error("Formspree error:", data);
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <footer className="w-full border-t border-pink-200 bg-white/60 backdrop-blur-md mt-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-sans font-bold text-gray-800">
              FLEUR PIPELINE<span className="text-pink-500">.</span>
            </h3>
            <p className="text-gray-600 font-sans leading-relaxed">
              Bahasa bunga abadi untuk setiap momen berharga dalam hidup Anda. Pilihan premium yang tak lekang oleh waktu.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-500 hover:text-white transition-colors shadow-sm">
                <Camera className="w-5 h-5" />
              </a>
              <a href="https://wa.me/6282123880889" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-500 hover:text-white transition-colors shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="mailto:alyniche@gmail.com"
                className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 hover:bg-pink-500 hover:text-white transition-colors shadow-sm">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-sans font-bold text-gray-800">Tautan Cepat</h4>
            <ul className="space-y-3 font-sans text-gray-600 flex flex-col items-start">
              <li>
                <button onClick={() => setIsAboutOpen(true)} className="hover:text-pink-500 transition-colors cursor-pointer">
                  Tentang Kami
                </button>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-pink-500 transition-colors">Katalog Koleksi</a>
              </li>
              <li>
                <button onClick={() => setIsCareOpen(true)} className="hover:text-pink-500 transition-colors cursor-pointer">
                  Cara Perawatan
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500 transition-colors">Syarat &amp; Ketentuan</a>
              </li>
              <li>
                <a
                  href={LINKTREE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-pink-500 transition-colors font-medium group"
                >
                  <Link2 className="w-3.5 h-3.5 text-pink-400 group-hover:text-pink-500 transition-colors shrink-0" />
                  Official Linktree
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter — Everlasting Love Tips */}
          <div className="space-y-4">
            <h4 className="text-lg font-sans font-bold text-gray-800">Everlasting Love Tips</h4>
            <p className="text-gray-600 font-sans text-sm">
              Dapatkan inspirasi kado romantis dan penawaran eksklusif langsung di inbox Anda.
            </p>

            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-white border border-pink-200 rounded-2xl p-6 shadow-sm text-center"
                >
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="font-dancing text-3xl text-pink-600 mb-2"
                  >
                    Terima kasih sudah bergabung! 🌸
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-gray-600 font-sans text-sm leading-relaxed"
                  >
                    Cek inbox kamu secara berkala untuk kejutan manis dari Fleur Pipeline.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <form className="flex mt-2" onSubmit={handleNewsletterSubmit} noValidate>
                    {/* Hidden field so Formspree labels the submission nicely */}
                    <input type="hidden" name="message" value="User baru mendaftar Newsletter Fleur Pipeline" />
                    <input
                      type="email"
                      id="newsletter-email"
                      name="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError(validateEmail(e.target.value));
                      }}
                      placeholder="Alamat Email"
                      aria-label="Alamat Email"
                      className={`w-full px-4 py-3 rounded-l-xl border-y border-l bg-white/50 focus:outline-none focus:ring-1 transition-all font-sans text-sm ${
                        emailError
                          ? "border-red-300 focus:border-red-400 focus:ring-red-300"
                          : "border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={submitState === "loading"}
                      className="px-5 py-3 bg-pink-500 text-white rounded-r-xl hover:bg-pink-600 transition-all duration-300 ease-in-out hover:scale-105 shadow-md border border-pink-500 flex items-center justify-center disabled:opacity-60 shrink-0"
                    >
                      {submitState === "loading" ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </button>
                  </form>

                  <AnimatePresence>
                    {emailError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 mt-2"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <p className="text-red-400 text-xs font-sans">{emailError}</p>
                      </motion.div>
                    )}
                    {submitState === "error" && !emailError && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 mt-2"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <p className="text-red-400 text-xs font-sans">Gagal mengirim. Cek koneksi internet kamu atau coba lagi nanti.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 🔔 Pengingat aktivasi untuk Admin */}
            <p className="text-[10px] text-gray-400 mt-4 italic leading-relaxed">
              *check ur inbox
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-pink-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-sans text-gray-500">
          <p>© 2026 FLEUR PIPELINE. All rights reserved.</p>
          <p className="flex items-center">
            Dibuat dengan <Heart className="w-4 h-4 text-pink-500 mx-1 fill-pink-500" /> untuk Anda
          </p>
        </div>
      </div>

      {/* === MODALS === */}
      <AnimatePresence>
        {isAboutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative border border-pink-100"
            >
              <button onClick={() => setIsAboutOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-pink-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
              <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Info className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-gray-800 mb-4">Tentang FLEUR PIPELINE</h3>
              <p className="text-gray-600 font-sans leading-relaxed text-sm">
                FLEUR PIPELINE adalah layanan kurasi buket bunga premium yang didedikasikan untuk membantu Anda menemukan ekspresi cinta yang paling tepat. Kami menggunakan sistem cerdas untuk mencocokkan setiap kepribadian dan momen dengan bahasa bunga yang indah dan abadi.
              </p>
            </motion.div>
          </div>
        )}

        {isCareOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative border border-pink-100"
            >
              <button onClick={() => setIsCareOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-pink-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
              <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-sans font-bold text-gray-800 mb-6">Cara Perawatan</h3>
              <ul className="space-y-4 font-sans text-gray-700 text-sm">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-lg shrink-0">💧</div>
                  Jangan disiram air
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-lg shrink-0">☀️</div>
                  Hindari matahari langsung
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-lg shrink-0">🧹</div>
                  Bersihkan debu dengan kuas halus
                </li>
              </ul>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
