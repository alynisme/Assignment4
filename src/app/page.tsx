"use client";

import { motion, useMotionValue, useMotionValueEvent } from "framer-motion";
import { Flower, Leaf, Info, Star } from "lucide-react";
import FleurFinderForm from "@/components/fleurfinder/FleurFinderForm";
import FAQSection from "@/components/fleurfinder/FAQSection";
import Footer from "@/components/fleurfinder/Footer";
import PaymentModal from "@/components/fleurfinder/PaymentModal";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Komponen Floating Petals yang Diperkaya
function FloatingPetals() {
  const [petals, setPetals] = useState<{ id: number; left: string; delay: number; size: number; rotation: number; duration: number; emoji: string }[]>([]);

  useEffect(() => {
    const emojis = ["🌸", "💮", "🌺", "✨"];
    const generatedPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      size: Math.random() * 20 + 15, // 15px to 35px
      rotation: Math.random() * 360,
      duration: Math.random() * 15 + 10, // 10s to 25s falling speed
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-50px] drop-shadow-md"
          initial={{ y: -50, x: 0, rotate: petal.rotation, opacity: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
            rotate: [petal.rotation, petal.rotation + 180, petal.rotation + 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
          style={{ 
            left: petal.left,
            fontSize: `${petal.size}px`,
            filter: 'blur(1px)' // Slight blur for depth effect
          }}
        >
          {petal.emoji}
        </motion.div>
      ))}
    </div>
  );
}

export default function Page() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const [activeTestiIndex, setActiveTestiIndex] = useState(0);
  const [paymentModal, setPaymentModal] = useState<{ name: string; price: string } | null>(null);

  useMotionValueEvent(dragX, "change", (latest) => {
    const itemWidth = 320; // Approx card width + gap
    let index = Math.round(Math.abs(latest) / itemWidth);
    if (index > 8) index = 8;
    if (index < 0) index = 0;
    setActiveTestiIndex(index);
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-[#FFC0CB] to-[#FFFFFF] flex flex-col items-center py-20 px-4 relative overflow-x-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-pink-200/40 blur-3xl rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[5%] w-[30rem] h-[30rem] bg-pink-300/30 blur-3xl rounded-full pointer-events-none z-0" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40rem] h-[40rem] bg-white/40 blur-3xl rounded-full pointer-events-none z-0" />

      {/* Floating Petals */}
      <FloatingPetals />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full text-center space-y-6 mt-10 mb-20 z-10 relative"
      >
        {/* Floating Images (Hero Framing) */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 md:-left-32 top-0 w-32 h-40 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl shadow-pink-300/50 border border-white/40 hidden sm:block rotate-[-5deg]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/bluerosesbouquet.jpg" 
            alt="Blue Roses Bouquet" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-16 md:-right-32 top-10 w-32 h-40 md:w-48 md:h-64 rounded-2xl overflow-hidden shadow-2xl shadow-pink-300/50 border border-white/40 hidden sm:block rotate-[8deg]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/bunnytigerlilybouquet.jpg" 
            alt="Bunny Tiger Lily Bouquet" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Floral Ornament Decoration */}
        <div className="flex justify-center items-center gap-3 mb-6 opacity-80">
          <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-transparent to-pink-400 rounded-full"></div>
          <Leaf className="text-green-400/70 w-5 h-5 -rotate-12" />
          <Flower className="text-pink-500 w-7 h-7 animate-pulse" />
          <Leaf className="text-green-400/70 w-5 h-5 rotate-12 scale-x-[-1]" />
          <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-transparent to-pink-400 rounded-full"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-sans text-gray-800 drop-shadow-sm leading-tight">
          FLEUR PIPELINE:<br/>
          <span className="text-pink-600">Temukan Bahasa Bunga untuk Si Dia</span>
        </h1>
        <p className="text-lg md:text-xl font-sans text-gray-700 max-w-2xl mx-auto leading-relaxed mt-6">
          Sistem rekomendasi buket personal untuk membantu Anda memilih bunga yang paling tepat, sesuai budget dan situasi.
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full z-10 mb-32"
      >
        <FleurFinderForm />
      </motion.div>

      {/* Featured Bouquets Gallery */}
      <motion.div 
        id="catalog-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mx-auto z-10 text-center mt-10"
      >
        <h2 className="text-4xl font-sans font-bold text-gray-800 mb-4">Inspirasi Buket Terpopuler</h2>
        <p className="text-gray-600 font-sans mb-12 max-w-2xl mx-auto">Sembari mencari, lihatlah beberapa karya buket pilihan pelanggan kami yang telah sukses menyampaikan perasaan mereka.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Blue Roses Bouquet",
              image: "/bluerosesbouquet.jpg",
              desc: "Misteri, keunikan, dan kemustahilan yang menjadi nyata.",
              priceDisplay: "300k",
            },
            {
              name: "Bunny Tiger Lily Bouquet",
              image: "/bunnytigerlilybouquet.jpg",
              desc: "Keberanian, kekayaan, dan pesona yang menggemaskan.",
              priceDisplay: "250k",
            },
            {
              name: "Classic Rose Bouquet",
              image: "/classicrosebouquet.jpg",
              desc: "Simbol romansa abadi dan kemewahan.",
              priceDisplay: "120k",
            },
            {
              name: "Cookies and Flower Basket",
              image: "/cookiesandflowerbasket.jpg",
              desc: "Kehangatan, persahabatan, dan rasa manis dalam hidup.",
              priceDisplay: "75k",
            },
            {
              name: "Custom Flower Language Bouquet",
              image: "/customflowerlanguagebouquet.jpg",
              desc: "Pesan tersembunyi yang disesuaikan khusus untuknya.",
              priceDisplay: "70k",
            },
            {
              name: "Custom Makeup (BUNDLE)",
              image: "/custommakeupbouquet.jpg",
              desc: "Perhatian dan perawatan tulus untuk kesehariannya.",
              priceDisplay: "150k (exclude makeup)",
            },
            {
              name: "Custom Skincare Bouquet",
              image: "/customskincarebouquet.jpg",
              desc: "Simbol perlindungan, kelembutan, dan cinta diri.",
              priceDisplay: "150k (exclude skincare)",
            },
            {
              name: "Lacy Lily Bouquet",
              image: "/lacylilybouquet.jpg",
              desc: "Keanggunan yang suci dan ketulusan hati.",
              priceDisplay: "90k",
            },
            {
              name: "Lego Roses Bouquet",
              image: "/legorosesbouquet.jpg",
              desc: "Cinta yang dibangun perlahan dan bertahan selamanya.",
              priceDisplay: "170k",
            },
            {
              name: "Lilac Lily Single Bouquet",
              image: "/lilaclilysinglebouquet.jpg",
              desc: "Pesona anggun, kemurnian, dan ketenangan jiwa.",
              priceDisplay: "25k",
            },
            {
              name: "Single Tulip Bouquet",
              image: "/singletulipbouquet.jpg",
              desc: "Pengakuan cinta yang murni dan tulus.",
              priceDisplay: "20k",
            },
            {
              name: "Themed Bouquet",
              image: "/themedbouquet.jpg",
              desc: "Perayaan karakter dan keunikan personal.",
              priceDisplay: "20k",
            }
          ].map((flower, idx) => (
            <motion.div 
              key={idx}
              data-cursor="flower"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -12, scale: 1.03 }}
              className="backdrop-blur-xl bg-white/30 border border-white/60 p-5 rounded-[2rem] shadow-2xl shadow-pink-200/50 flex flex-col items-center text-center overflow-hidden h-full group"
            >
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 relative shadow-inner">
                <Image 
                  src={flower.image} 
                  alt={flower.name} 
                  fill
                  priority={idx < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
                
                {/* Tooltip */}
                <motion.div 
                  initial="initial"
                  whileHover="hover"
                  className="absolute top-4 right-4 z-20 cursor-help"
                >
                  <div className="w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-pink-500 shadow-sm transition-colors hover:bg-pink-500 hover:text-white">
                    <Info className="w-4 h-4" />
                  </div>
                  <motion.div 
                    variants={{
                      initial: { opacity: 0, y: 10, scale: 0.95, pointerEvents: "none" },
                      hover: { opacity: 1, y: 0, scale: 1, pointerEvents: "auto" }
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full right-0 mb-2 w-48 p-4 rounded-xl bg-white shadow-xl border border-pink-100 text-xs text-gray-600 font-sans text-left origin-bottom-right"
                  >
                    <div className="font-bold text-pink-700 mb-1 font-sans text-sm">Bahasa Bunga:</div>
                    {flower.desc}
                  </motion.div>
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold text-pink-700 mb-1">{flower.name}</h3>
              <p className="text-pink-600 font-bold mb-2">{flower.priceDisplay}</p>
              <p className="text-gray-600 font-sans text-sm pb-4 flex-grow">{flower.desc}</p>
              <button
                onClick={() => setPaymentModal({ name: flower.name, price: flower.priceDisplay })}
                className="w-full mt-auto py-3 rounded-xl bg-pink-500 text-white font-semibold hover:bg-pink-600 transition-colors shadow-md hover:shadow-pink-300/50 text-sm"
              >
                Pesan Sekarang
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mx-auto z-10 text-center mt-24 px-4"
      >
        <h2 className="text-4xl font-sans font-bold text-gray-800 mb-4">Apa Kata Mereka</h2>
        <p className="text-gray-600 font-sans mb-16 max-w-2xl mx-auto">Kisah cinta dan senyum yang mekar berkat FLEUR PIPELINE.</p>
        
        <div ref={carouselRef} className="cursor-grab overflow-hidden w-full py-10 mt-2">
          <motion.div 
            drag="x"
            dragConstraints={carouselRef}
            style={{ x: dragX }}
            className="flex gap-6 w-max px-4 md:px-10"
          >
            {[
              { name: "Sasha", age: 17, category: "Kado Bestie", text: "Lucu bangeeet buat ngasih surprise ke bestie yang lagi ultah. Wanginya awet dan desainnya gak pasaran sama sekali! 💖", color: "bg-pink-100/60" },
              { name: "Amel", age: 18, category: "Anniversary", text: "Buketnya super aesthetic! Ngasih ini ke pacar pas anniv, dia sampe nangis terharu. Packagingnya premium parah sih.", color: "bg-pink-50/80" },
              { name: "Raka", age: 19, category: "Buat Crush", text: "Sumpah ngebantu banget! Gue bingung mau ngasih apa buat crush, eh direkomendasiin buket gerbera. Langsung di-notice dong! 😭✨", color: "bg-pink-100/80" },
              { name: "Dika", age: 20, category: "Minta Maaf", text: "Penyelamat pas lagi ngambek-ngambekan woy! Beli peony dari sini, langsung dimaafin. Thanks FLEUR PIPELINE! 🙏", color: "bg-rose-100/80" },
              { name: "Vanya", age: 21, category: "Self Reward", text: "Self reward beli bunga buat diri sendiri gapapa kan? Jujurly bikin kamar jadi makin aesthetic dan mood naik tiap hari 🌸", color: "bg-pink-50/90" },
              { name: "Nadia", age: 22, category: "Wisuda", text: "Dipake buat foto wisuda cakep polll. Warnanya on point banget sama kebaya gue, temen-temen pada nanyain beli di mana wkwk.", color: "bg-purple-100/60" },
              { name: "Kevin", age: 24, category: "Anniversary", text: "Awalnya skeptis beli bunga online, tapi pas dateng... gila sih, rapi banget. Cewek gue seneng parah. Bakal langganan!", color: "bg-blue-50/80" },
              { name: "Rio", age: 25, category: "Kado Ibu", text: "Ngasih ini buat Hari Ibu, nyokap sampe speechless. Kualitas bunganya top tier, ga layu-layu kayak bunga asli biasa.", color: "bg-orange-50/80" },
              { name: "Tasya", age: 27, category: "Wedding", text: "Sumpah nyesel baru tau FLEUR PIPELINE sekarang. Bunga abadi buat pajangan nikahan gue beneran jadi center of attention! 🥺", color: "bg-rose-50/90" }
            ].map((testi, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`backdrop-blur-xl ${testi.color} border border-white/60 p-6 pt-10 rounded-[2rem] shadow-xl shadow-pink-200/30 flex flex-col items-center text-center relative shrink-0 w-[300px] md:w-[350px]`}
              >
                <div className="absolute -top-6 w-16 h-16 rounded-full bg-pink-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${testi.name}&backgroundColor=ffdfdf`} alt={testi.name} className="w-full h-full object-cover p-1" />
                </div>
                <div className="flex gap-1 mb-3 mt-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 font-sans text-sm mb-6 leading-relaxed flex-grow">"{testi.text}"</p>
                
                <div className="mt-auto w-full border-t border-white/50 pt-4">
                  <h4 className="text-pink-800 font-sans font-bold text-lg">{testi.name}, {testi.age}</h4>
                  <span className="inline-block mt-1 px-3 py-1 bg-white/60 text-pink-600 rounded-full text-xs font-semibold uppercase tracking-wider">{testi.category}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-2 mt-4 mb-8">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${activeTestiIndex === i ? "w-8 bg-pink-500" : "w-2 bg-pink-300"}`}
            />
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mx-auto z-10 text-center mt-32 mb-16 px-4"
      >
        <h2 className="text-4xl font-sans font-bold text-gray-800 mb-4">Sering Ditanyakan (FAQ)</h2>
        <p className="text-gray-600 font-sans mb-10 max-w-2xl mx-auto">Jawaban cepat untuk pertanyaan yang paling sering diajukan tentang bunga abadi kami.</p>
        <FAQSection />
      </motion.div>

      <Footer />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={!!paymentModal}
        onClose={() => setPaymentModal(null)}
        productName={paymentModal?.name ?? ""}
        productPrice={paymentModal?.price ?? ""}
      />
    </main>
  );
}



