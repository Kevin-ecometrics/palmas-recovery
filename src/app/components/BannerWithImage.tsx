import React from "react";
import { motion } from "framer-motion";

const BannerWithImage: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-6 py-12 md:px-12 md:py-24">
      {/* Texto a la izquierda */}
      <div className="w-full md:w-1/2 space-y-6">
        {/* Título */}
        <motion.h2
          className="text-4xl md:text-5xl font-bold leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The joy of travel. Where design meets authenticity.
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          className="text-xl md:text-2xl font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Experience urban essence at One Shot Hotels. From Madrid to San
          Sebastián, Valencia, Seville, Porto, and Barcelona, our prime
          locations bring you closer to the vibrant energy of each city. Stroll
          through streets steeped in history, uncover hidden gems, and immerse
          yourself in the unique character that defines each destination.
        </motion.p>

        {/* Botón */}
        <motion.button
          className="bg-transparent border-2 border-black text-black py-3 px-8 rounded-full text-lg hover:bg-black hover:text-white transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          READ MORE
        </motion.button>
      </div>

      {/* Imagen a la derecha */}
      <div className="w-full md:w-1/2">
        <motion.img
          src="https://images.unsplash.com/photo-1600380012191-d0a9bc9c6a57?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg2MnwwfDF8c2VhY2h8MjN8fGJ1aWxkaW5nfGVufDB8fHx8fDE2NjA5NzI1OTQ&ixlib=rb-1.2.1&q=80&w=1080"
          alt="Hotel view"
          className="w-full h-full object-cover rounded-xl shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </div>
  );
};

export default BannerWithImage;
