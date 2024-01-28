import React from "react";
import { motion } from "framer-motion";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="paddings">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        className="innerWidth flexCenter flex-col"
      >
        <div className="flexCenter flex-col z-[10]">
          <motion.h1 variants={textVariant(1.1)} className="heroHeading gradient-text">
            META FRUIT
          </motion.h1>
        </div>

        <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="w-full relative mt-2">
          <div className="absolute w-full h-[300px] hero-gradient -top-[30px] rounded-tl-[40px] z-[-1]" />
          <div className="relative w-full sm:h-[500px] h-[350px] rounded-tl-[40px] overflow-hidden">
            <Image src="/fruitcover.webp" alt="Fruit cover" fill style={{ objectFit: "cover" }} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
