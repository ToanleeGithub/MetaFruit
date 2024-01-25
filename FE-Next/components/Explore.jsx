"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import { exploreWorlds } from "../constants";
import { staggerContainer } from "../utils/motion";
import { ExploreCard, TitleText, TypingText } from ".";

const Explore = () => {
  const [active, setActive] = useState("world-1");

  return (
    <section className="paddings">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="innerWidth flex flex-col"
      >
        <TypingText title="| The Fruit" textStyles="text-center" />
        <TitleText
          title={
            <>
              Choose the fruit you want <br className="md:block hidden" /> to plant
            </>
          }
          textStyles="text-center"
        />

        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={index}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
