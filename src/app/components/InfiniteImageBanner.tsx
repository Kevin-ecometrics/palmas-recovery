"use client";

import { motion } from "framer-motion";

const IMAGES_TOP = [
  "https://images.unsplash.com/photo-1501117716987-c8e1ecb2106d?w=800&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
];

const IMAGES_BOTTOM = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800&q=80",
  "https://images.unsplash.com/photo-1470163395405-d2b80e7450ed?w=800&q=80",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
];

function MarqueeRow({ images }: { images: string[] }) {
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        }}
      >
        {[...images, ...images].map((src, index) => (
          <div
            key={index}
            className="w-[280px] h-[180px] flex-shrink-0 overflow-hidden"
          >
            <img
              src={src}
              alt="Gallery"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteImageBanner() {
  return (
    <section className="py-24 bg-white">
      <div className="flex flex-col gap-12">
        {/* TOP ROW */}
        <MarqueeRow images={IMAGES_TOP} />

        {/* CENTER CONTENT */}
        <div className="text-center">
          <h2 className="text-4xl font-serif mb-4">Collecting</h2>
          <p className="text-4xl font-serif italic mb-6">unique moments</p>

          <span className="inline-flex items-center gap-2 bg-[#c7bddf] text-black px-5 py-2 rounded-md text-sm">
            @oneshot_hotels
          </span>
        </div>

        {/* BOTTOM ROW */}
        <MarqueeRow images={IMAGES_BOTTOM} />
      </div>
    </section>
  );
}
