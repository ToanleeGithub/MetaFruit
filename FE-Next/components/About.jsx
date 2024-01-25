import React from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "../utils/motion";
import { TypingText } from "./CustomTexts";

const About = () => {
  return (
    <section className="paddings">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        className="innerWidth"
      >
        <TypingText title="| About MetaFruit" textStyles="text-center" />

        <motion.p
          variants={fadeIn("up", "tween", 0.2, 1)}
          className="mt-2 lg:w-[70%] w-full mx-auto font-mono font-light sm:text-[20px] text-[16px] text-center text-white"
        >
          <span className="font-extrabold text-white font-mono">MetaFruit</span> introduces a
          groundbreaking <span className="font-extrabold text-white font-mono">idle game </span>{" "}
          project where the world of virtual farming and NFT technology blend seamlessly. In this
          unique ecosystem, players can cultivate a diverse array of fruit-themed NFTs based on the
          ERC-1155 standard, each with its own rarity and value. By tending to your digital orchard,
          you unlock the potential to farm ERC-20 tokens, establishing a vibrant economy where
          effort and strategy translate into real-world rewards.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default About;
