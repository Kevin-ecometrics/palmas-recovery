import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const Banner: React.FC = () => {
  return (
    <motion.div
      className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center"
      style={{
        backgroundImage: `url('https://via.placeholder.com/1500')`, // Reemplaza con tu imagen
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Contenido centrado */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10 px-4 sm:px-8 md:px-16">
        {/* Título */}
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          ONEshot Friends
        </motion.h2>

        {/* Subtítulo */}
        <motion.p
          className="text-xl md:text-2xl mb-6"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Join our club and enjoy exclusive benefits
        </motion.p>

        {/* Botón */}
        <motion.button
          className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full text-lg flex items-center justify-center hover:bg-white hover:text-black transition duration-300"
          whileHover={{ scale: 1.1 }}
        >
          More information
          <FaArrowRight className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Banner;
