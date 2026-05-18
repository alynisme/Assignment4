"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, QrCode, Landmark, CheckCircle2, MessageCircle, ChevronLeft } from "lucide-react";
import Image from "next/image";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: string;
}

type Method = "qris" | "va" | null;

function randomVA() {
  return `8808${Math.floor(10000000 + Math.random() * 90000000)}`;
}

export default function PaymentModal({ isOpen, onClose, productName, productPrice }: PaymentModalProps) {
  const [method, setMethod] = useState<Method>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const vaNumber = useMemo(() => randomVA(), [isOpen]);

  const handleClose = () => { setMethod(null); onClose(); };

  const waQRIS = () => {
    window.open(`https://wa.me/6282123880889?text=${encodeURIComponent(`Halo FLEUR PIPELINE! Saya sudah scan QRIS untuk pembelian ${productName}. Ini bukti bayarnya!`)}`, "_blank");
    handleClose();
  };

  const waVA = () => {
    window.open(`https://wa.me/6282123880889?text=${encodeURIComponent(`Halo FLEUR PIPELINE, saya sudah membayar via VA untuk ${productName}.`)}`, "_blank");
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            key="modal"
            data-cursor="star"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl shadow-black/10 overflow-hidden font-sans"
          >
            {/* Thin top accent */}
            <div className="h-1 bg-gradient-to-r from-pink-300 via-pink-500 to-pink-300" />

            <div className="p-6">

              {/* ── Close Button ── */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-pink-100 hover:text-pink-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* ── Header ── */}
              <div className="text-center mb-5 pr-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-1">Pembayaran</p>
                <h2 className="text-base font-bold italic text-gray-800 leading-snug line-clamp-1">{productName}</h2>
                <span className="inline-block mt-1.5 bg-pink-500 text-white text-xs font-bold px-3 py-0.5 rounded-full">
                  {productPrice}
                </span>
              </div>

              {/* ════════════════════════════
                  METHOD PICKER (initial state)
              ════════════════════════════ */}
              <AnimatePresence mode="wait">
                {method === null && (
                  <motion.div
                    key="picker"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="grid grid-cols-2 gap-3"
                  >
                    {[
                      { id: "qris" as Method, Icon: QrCode, label: "QRIS" },
                      { id: "va" as Method, Icon: Landmark, label: "Bank VA" },
                    ].map(({ id, Icon, label }) => (
                      <button
                        key={id!}
                        onClick={() => setMethod(id)}
                        className="flex flex-col items-center gap-2 py-5 rounded-2xl border-2 border-pink-100 bg-pink-50 text-pink-600 hover:border-pink-400 hover:bg-pink-100 hover:shadow-md hover:shadow-pink-100 transition-all font-semibold text-sm"
                      >
                        <Icon className="w-6 h-6" />
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* ════════════════════════════
                    QRIS VIEW
                ════════════════════════════ */}
                {method === "qris" && (
                  <motion.div
                    key="qris"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-center gap-4"
                  >
                    {/* Back */}
                    <button onClick={() => setMethod(null)} className="self-start flex items-center gap-1 text-xs text-gray-400 hover:text-pink-500 transition-colors mb-1">
                      <ChevronLeft className="w-3.5 h-3.5" /> Ganti metode
                    </button>

                    {/* QR Image — compact */}
                    <div className="w-40 h-40 relative rounded-2xl overflow-hidden border border-pink-100 bg-white shadow-sm flex items-center justify-center">
                      <Image
                        src="/qr_dummy_fpl.png"
                        alt="QRIS FLEUR PIPELINE"
                        fill
                        className="object-contain p-2"
                        priority
                      />
                    </div>

                    <p className="text-xs text-gray-400 text-center leading-relaxed px-2">
                      Scan QRIS di atas dan lakukan pembayaran sesuai nominal.
                    </p>

                    {/* CTA */}
                    <button
                      onClick={waQRIS}
                      className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-pink-500 text-white hover:bg-pink-600 active:scale-95 transition-all shadow-md shadow-pink-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Konfirmasi Pembayaran via WhatsApp
                    </button>
                    <p className="text-xs text-gray-300 text-center -mt-1">Kirim bukti bayar ke admin via WA</p>
                  </motion.div>
                )}

                {/* ════════════════════════════
                    BANK VA VIEW
                ════════════════════════════ */}
                {method === "va" && (
                  <motion.div
                    key="va"
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-3"
                  >
                    {/* Back */}
                    <button onClick={() => setMethod(null)} className="self-start flex items-center gap-1 text-xs text-gray-400 hover:text-pink-500 transition-colors">
                      <ChevronLeft className="w-3.5 h-3.5" /> Ganti metode
                    </button>

                    <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bank</span>
                        <span className="font-semibold text-gray-700">BCA / Mandiri</span>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Nomor Virtual Account</p>
                        <div className="bg-white rounded-xl border border-pink-200 px-4 py-2.5 shadow-sm">
                          <span className="font-bold text-pink-700 text-base tracking-widest">{vaNumber}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Nominal</span>
                        <span className="font-bold text-pink-600">{productPrice}</span>
                      </div>

                      {/* Payment Completed */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        <div>
                          <p className="font-bold text-green-700 text-xs">Payment Completed</p>
                          <p className="text-green-400 text-xs">Pembayaran berhasil diproses ✓</p>
                        </div>
                      </motion.div>
                    </div>

                    {/* CTA */}
                    <button
                      onClick={waVA}
                      className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-pink-500 text-white hover:bg-pink-600 active:scale-95 transition-all shadow-md shadow-pink-200"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Hubungi Admin
                    </button>
                    <p className="text-xs text-gray-300 text-center -mt-1">Konfirmasi pembayaran VA kamu ke admin</p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
