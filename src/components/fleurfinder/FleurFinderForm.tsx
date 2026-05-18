"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowRight, ArrowLeft, Heart, Sparkles, CalendarPlus,
  User, Users, GraduationCap, BookOpen, HeartHandshake,
  PartyPopper, Gift, Stethoscope, Flower2, Siren,
} from "lucide-react";
import { getFlowerRecommendation } from "@/lib/recommender";

type IconType = React.ElementType;

interface Option {
  label: string;
  icon?: IconType;
}

interface StepData {
  id: string;
  title: string;
  subtitle?: string;
  type: "grid" | "buttons";
  options: Option[];
}

// ─────────────────────────────────────────────────────────
// QUIZ STEPS — Status & Situation FIRST (penentu utama)
// ─────────────────────────────────────────────────────────
const STEPS: StepData[] = [
  {
    id: "status",
    title: "Bunga ini buat siapa?",
    subtitle: "Jawaban ini jadi penentu utama rekomendasimu ✨",
    type: "buttons",
    options: [
      { label: "Partner/GF/BF",  icon: HeartHandshake },
      { label: "Bestie/Sahabat",  icon: Users },
      { label: "Orang Tua",       icon: User },
      { label: "Guru/Dosen",      icon: BookOpen },
      { label: "Diri Sendiri",    icon: Heart },
      { label: "HTS",             icon: Sparkles },
      { label: "Istri/Suami",     icon: HeartHandshake },
    ],
  },
  {
    id: "situation",
    title: "Dalam rangka apa?",
    subtitle: "Tiap momen punya bunga yang sempurna 🌸",
    type: "grid",
    options: [
      { label: "Anniversary",           icon: HeartHandshake },
      { label: "Ulang Tahun",           icon: PartyPopper },
      { label: "Wisuda",                icon: GraduationCap },
      { label: "Minta Maaf",            icon: Siren },
      { label: "Cepat Sembuh",          icon: Stethoscope },
      { label: "First Date",            icon: Flower2 },
      { label: "Surprise Tanpa Alasan", icon: Gift },
      { label: "Pengen aja",            icon: Sparkles },
    ],
  },
  {
    id: "aura",
    title: "Aura Warna",
    type: "grid",
    options: [
      { label: "Sage Green" },
      { label: "Midnight Blue" },
      { label: "Charcoal Black" },
      { label: "Ash Grey" },
      { label: "Sand Beige" },
      { label: "Terracotta" },
      { label: "Forest Green" },
      { label: "Dusty Pink" },
      { label: "Royal Purple" },
    ],
  },
  {
    id: "playlist",
    title: "Playlist Genre",
    type: "grid",
    options: [
      { label: "Pop" },
      { label: "Indie" },
      { label: "Hip-hop" },
      { label: "Rap" },
      { label: "Hipdut" },
      { label: "R&B" },
      { label: "Rock" },
      { label: "Jazz" },
      { label: "Classic" },
    ],
  },
  {
    id: "aroma",
    title: "Aroma",
    type: "grid",
    options: [
      { label: "Woody" },
      { label: "Citrus" },
      { label: "Sea Salt" },
      { label: "Sandalwood" },
      { label: "Coffee" },
      { label: "White Musk" },
      { label: "Matcha" },
      { label: "Vanilla" },
      { label: "Floral" },
    ],
  },
  {
    id: "budget",
    title: "Berapa Budget Anda?",
    type: "buttons",
    options: [
      { label: "Under 100k" },
      { label: "100k-200k" },
      { label: "Above 200k" },
    ],
  },
  {
    id: "kesan",
    title: "Kesan apa yang ingin kamu berikan?",
    type: "buttons",
    options: [
      { label: "Lucu/Gemas" },
      { label: "Elegan/Mewah" },
      { label: "Simpel/Tulus" },
      { label: "Unik/Berkesan" },
    ],
  },
  {
    id: "lovelanguage",
    title: "Apa Love Language si penerima?",
    type: "buttons",
    options: [
      { label: "Words of Affirmation" },
      { label: "Acts of Service" },
      { label: "Receiving Gifts" },
      { label: "Quality Time" },
      { label: "Physical Touch" },
    ],
  },
];

// ─────────────────────────────────────────────────────────
// Pastel card colour options
// ─────────────────────────────────────────────────────────
const CARD_COLORS = [
  { label: "Pastel Pink",   bg: "#fce4ec", text: "#880e4f" },
  { label: "Pastel Purple", bg: "#ede7f6", text: "#4527a0" },
  { label: "Pastel Green",  bg: "#e8f5e9", text: "#1b5e20" },
];

// ─────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────
const slideVariants = {
  hidden:  (dir: number) => ({ x: dir > 0 ? "50%" : "-50%", opacity: 0, scale: 0.95 }),
  visible: { x: 0, opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 30 } },
  exit:    (dir: number) => ({ x: dir > 0 ? "-50%" : "50%", opacity: 0, scale: 0.95, transition: { type: "spring" as const, stiffness: 300, damping: 30 } }),
};

// ─────────────────────────────────────────────────────────
export default function FleurFinderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction,   setDirection]   = useState(1);
  const [answers,     setAnswers]     = useState<Record<string, string>>({});
  const [showResult,  setShowResult]  = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [greetingText, setGreetingText] = useState("");
  const [cardColorIdx, setCardColorIdx] = useState(0); // pastel colour index

  const handleSelect = (stepId: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: option }));
  };

  const handleNext = () => {
    if (!answers[STEPS[currentStep].id]) {
      toast.error("Mohon pilih salah satu opsi terlebih dahulu.");
      return;
    }
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep((p) => p + 1);
    } else {
      setDirection(1);
      setIsGenerating(true);
      setTimeout(() => { setIsGenerating(false); setShowResult(true); }, 2000);
    }
  };

  const handleBack = () => {
    if (showResult) { setDirection(-1); setShowResult(false); return; }
    if (currentStep > 0) { setDirection(-1); setCurrentStep((p) => p - 1); }
  };

  const progressPercentage = showResult
    ? 100
    : Math.round((currentStep / STEPS.length) * 100);

  const recommendation = showResult ? getFlowerRecommendation(answers) : null;
  const cardColor = CARD_COLORS[cardColorIdx];

  // ─── RESULT SCREEN ───────────────────────────────────
  if (showResult && recommendation) {
    const waText = encodeURIComponent(
      `Halo FLEUR PIPELINE! Saya tertarik dengan produk ${recommendation.name} dari hasil kuis.`
    );

    return (
      <motion.div
        custom={direction} variants={slideVariants} initial="hidden" animate="visible" exit="exit"
        className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/60 border border-white/40 p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-pink-200/50 flex flex-col items-center text-center space-y-5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/30 to-transparent pointer-events-none" />

        <Sparkles className="w-10 h-10 text-pink-500 mb-1 relative z-10" />
        <h2 className="text-3xl font-bold italic text-gray-800 relative z-10">Rekomendasi Sempurna</h2>

        <div className="w-full relative rounded-2xl overflow-hidden aspect-video shadow-lg mb-1 z-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={recommendation.imageUrl} alt={recommendation.name} className="w-full h-full object-cover" />
        </div>

        <h3 className="text-xl font-bold italic text-pink-700 relative z-10">{recommendation.name}</h3>
        <p className="text-pink-500 font-bold text-sm z-10">{recommendation.priceDisplay}</p>
        <p className="text-gray-600 text-sm italic px-4 relative z-10 leading-relaxed">&ldquo;{recommendation.whyThisFlower}&rdquo;</p>

        {/* ── Greeting Card ── */}
        <div className="w-full flex flex-col md:flex-row gap-5 mt-2 relative z-10 text-left bg-white/40 p-4 rounded-2xl border border-white/50">
          <div className="flex-1 space-y-3">
            <label className="text-sm font-bold text-gray-700">Pesan di Kartu Ucapan</label>

            {/* Colour Picker */}
            <div className="flex items-center gap-2 flex-wrap">
              {CARD_COLORS.map((c, i) => (
                <button
                  key={c.label}
                  title={c.label}
                  onClick={() => setCardColorIdx(i)}
                  style={{ backgroundColor: c.bg, borderColor: cardColorIdx === i ? c.text : "transparent" }}
                  className="w-7 h-7 rounded-full border-2 transition-all hover:scale-110 shadow-sm"
                />
              ))}
              <span className="text-xs text-gray-400">{cardColor.label}</span>
            </div>

            <textarea
              value={greetingText}
              onChange={(e) => setGreetingText(e.target.value)}
              placeholder="Tulis pesan romantis kamu di sini..."
              className="w-full p-3 rounded-xl border border-pink-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none h-28 font-sans text-sm"
            />
          </div>

          {/* Card Preview */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <motion.div
              layout
              style={{ backgroundColor: cardColor.bg }}
              className="w-56 h-40 rounded-xl shadow-lg border border-white/60 p-5 transform rotate-2 flex items-center justify-center text-center relative overflow-hidden transition-colors duration-500"
            >
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-pink-300/30 to-transparent" />
              <Heart className="absolute bottom-3 right-3 w-4 h-4 opacity-30" style={{ color: cardColor.text }} />
              <p
                className="font-dancing text-[1.3rem] leading-snug"
                style={{ color: cardColor.text }}
              >
                {greetingText || "Pesan kamu akan tampil di sini..."}
              </p>
            </motion.div>
            <p className="text-xs text-gray-400 mt-2.5 tracking-wide">✦ Preview Kartu Ucapan ✦</p>
          </div>
        </div>

        <div data-cursor="star" className="flex w-full gap-3 pt-4 border-t border-pink-200/50 relative z-10 flex-col sm:flex-row">
          <button
            onClick={handleBack}
            className="flex-1 py-3 px-4 rounded-2xl border-2 border-pink-300 text-pink-700 font-semibold hover:bg-pink-50 transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Ubah Jawaban
          </button>

          <button
            onClick={() => {
              const nextYear = new Date();
              nextYear.setFullYear(nextYear.getFullYear() + 1);
              const d = nextYear.toISOString().replace(/-|:|\\.\\d\\d\\d/g, "").slice(0, 8);
              window.open(`https://calendar.google.com/calendar/r/eventedit?text=Pesan+Bunga+di+FLEUR+PIPELINE&dates=${d}T090000Z/${d}T100000Z`, "_blank");
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-white border border-pink-200 text-pink-600 font-semibold hover:bg-pink-50 transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center gap-2 text-sm"
          >
            <CalendarPlus className="w-4 h-4" /> Ingatkan Saya
          </button>

          <button
            onClick={() => window.open(`https://wa.me/6282123880889?text=${waText}`, "_blank")}
            className="flex-[1.5] py-3 px-4 rounded-2xl bg-[#25D366] text-white font-semibold hover:bg-[#128C7E] transition-all duration-300 ease-in-out hover:scale-105 flex items-center justify-center shadow-lg gap-2"
          >
            <Sparkles className="w-4 h-4" /> Konsultasi via WhatsApp
          </button>
        </div>
      </motion.div>
    );
  }

  // ─── LOADING SKELETON ────────────────────────────────
  if (isGenerating) {
    return (
      <motion.div
        custom={direction} variants={slideVariants} initial="hidden" animate="visible" exit="exit"
        className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/60 border border-white/40 p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-pink-200/50 flex flex-col items-center text-center space-y-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 to-pink-50/50 animate-pulse pointer-events-none" />
        <Sparkles className="w-12 h-12 text-pink-300 mb-2 animate-pulse" />
        <h2 className="text-3xl font-bold italic text-gray-700 animate-pulse z-10">
          Sedang merangkai rekomendasi bunga untukmu...
        </h2>
        <div className="w-full relative rounded-2xl bg-gray-200/50 animate-pulse aspect-video shadow-lg mb-2 z-10" />
        <div className="h-7 w-1/2 bg-gray-200/50 rounded-full animate-pulse z-10" />
        <div className="h-4 w-3/4 bg-gray-200/50 rounded-full animate-pulse z-10" />
      </motion.div>
    );
  }

  // ─── QUIZ STEPS ──────────────────────────────────────
  const step = STEPS[currentStep];

  return (
    <div className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/60 border border-white/40 p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-pink-200/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-pink-200/30 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100/30 blur-3xl rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      {/* Progress Bar */}
      <div className="mb-7 relative z-10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-pink-600 font-bold tracking-widest uppercase text-xs">
            Langkah {currentStep + 1} dari {STEPS.length}
          </span>
          <span className="text-gray-400 text-xs font-medium">{progressPercentage}%</span>
        </div>
        <div className="h-2 w-full bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-300 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="min-h-[300px] flex flex-col relative z-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction} variants={slideVariants} initial="hidden" animate="visible" exit="exit"
            className="flex flex-col flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-bold italic text-gray-800 mb-2 text-center">{step.title}</h2>
            {step.subtitle && (
              <p className="text-sm text-pink-400 text-center mb-6">{step.subtitle}</p>
            )}
            {!step.subtitle && <div className="mb-6" />}

            {/* GRID layout */}
            {step.type === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {step.options.map((option) => {
                  const isSelected = answers[step.id] === option.label;
                  const Icon = option.icon;
                  return (
                    <motion.button
                      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      key={option.label}
                      onClick={() => handleSelect(step.id, option.label)}
                      className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 transition-all duration-300 ${
                        isSelected
                          ? "border-pink-500 bg-pink-50 shadow-md shadow-pink-200/50 text-pink-700"
                          : "border-white/60 bg-white/50 text-gray-600 hover:border-pink-300 hover:bg-white/80 hover:shadow-lg"
                      }`}
                    >
                      {Icon && <Icon className={`w-7 h-7 mb-2 ${isSelected ? "text-pink-500" : "text-gray-400"}`} />}
                      <span className="font-semibold text-sm text-center leading-tight">{option.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              /* BUTTONS layout */
              <div className="flex flex-col gap-3 mb-8">
                {step.options.map((option) => {
                  const isSelected = answers[step.id] === option.label;
                  const Icon = option.icon;
                  return (
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      key={option.label}
                      onClick={() => handleSelect(step.id, option.label)}
                      className={`w-full py-4 px-6 rounded-2xl border-2 transition-all duration-300 text-left font-semibold flex items-center justify-between ${
                        isSelected
                          ? "border-pink-500 bg-pink-50 shadow-md shadow-pink-200/50 text-pink-700"
                          : "border-white/60 bg-white/50 text-gray-600 hover:border-pink-300 hover:bg-white/80"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {Icon && <Icon className={`w-5 h-5 ${isSelected ? "text-pink-500" : "text-gray-400"}`} />}
                        {option.label}
                      </span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${isSelected ? "border-pink-500 bg-pink-500" : "border-gray-300"}`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex w-full justify-between items-center mt-auto pt-4 border-t border-pink-100/50">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`py-3 px-6 rounded-full transition-colors flex items-center font-semibold border-2 ${
              currentStep === 0
                ? "opacity-0 pointer-events-none"
                : "border-pink-300 text-pink-600 hover:bg-pink-50"
            }`}
          >
            <ArrowLeft className="w-5 h-5 mr-2" /> Kembali
          </button>

          <button
            onClick={handleNext}
            disabled={!answers[step.id]}
            className={`py-3 px-8 rounded-full font-semibold flex items-center transition-all shadow-lg ${
              !answers[step.id]
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-pink-500 text-white hover:bg-pink-600 hover:shadow-pink-500/30"
            }`}
          >
            {currentStep === STEPS.length - 1 ? "Lihat Rekomendasi" : "Lanjut"}
            {currentStep < STEPS.length - 1 && <ArrowRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
}
