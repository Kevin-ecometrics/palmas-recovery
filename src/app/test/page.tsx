// "use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { useRef } from "react";

// const cards = [
//   {
//     title: "Private Trip",
//     description: "Paris is for lovers – and for dreamers.",
//     image: "/img/private.jpg",
//   },
//   {
//     title: "Brand Collaboration",
//     description: "Exclusive lifestyle brand partnerships.",
//     image: "/img/brand.jpg",
//   },
//   {
//     title: "Corporate Experiences",
//     description: "Immersive corporate gatherings in Paris.",
//     image: "/img/corporate.jpg",
//   },
// ];

// export default function StackedScrollCards() {
//   const ref = useRef<HTMLDivElement>(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end end"],
//   });

//   return (
//     <section ref={ref} className="relative h-[300vh] bg-[#f6efe6]">
//       <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
//         <div className="relative w-full max-w-6xl h-[80vh]">
//           {cards.map((card, i) => {
//             const start = i / cards.length;
//             const end = (i + 1) / cards.length;

//             // 👉 clip reveal desde abajo
//             const clipPath = useTransform(
//               scrollYProgress,
//               [start, end],
//               ["inset(100% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
//             );

//             // 👉 movimiento sutil (NO slide fuerte)
//             const y = useTransform(scrollYProgress, [start, end], [40, 0]);

//             return (
//               <motion.div
//                 key={i}
//                 style={{
//                   clipPath,
//                   y,
//                   zIndex: i + 1,
//                 }}
//                 className="absolute inset-0 bg-[#f1dfc8] rounded-3xl overflow-hidden flex"
//               >
//                 {/* LEFT */}
//                 <div className="w-1/2 p-16 flex flex-col justify-center">
//                   <h2 className="text-5xl font-serif mb-6">{card.title}</h2>
//                   <p className="text-lg text-gray-600">{card.description}</p>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="w-1/2">
//                   <img
//                     src={card.image}
//                     alt={card.title}
//                     className="h-full w-full object-cover rounded-r-3xl"
//                   />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function ScrollZoomIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Zoom controlado SOLO en esta sección
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 2.4]);

  const opacity = useTransform(scrollYProgress, [0, 0.9, 1], [1, 1, 0]);

  return (
    <>
      {/* SECCIÓN ZOOM */}
      <section ref={sectionRef} className="relative h-[150vh] bg-black">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.img
            src="/logo.png"
            alt="Zoom intro"
            style={{ scale, opacity }}
            className="w-64 md:w-96 rounded-2xl"
          />
        </div>
      </section>

      {/* CONTENIDO NORMAL */}
      <section className="min-h-screen bg-white px-8 py-24">
        <h2 className="text-4xl font-bold mb-6">{t("testPage.title")}</h2>
        <p className="max-w-2xl text-lg text-gray-700">
          {t("testPage.description")}
        </p>
      </section>
    </>
  );
}
