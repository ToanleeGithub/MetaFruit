import React from "react";
import { motion } from "framer-motion";
import { startingFeatures } from "../constants";
import { TypingText, TitleText, StartSteps } from ".";
import { staggerContainer, fadeIn, planetVariants } from "../utils/motion";

const GetStarted = () => {
  return (
    <section className="paddings relative z-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="innerWidth flex lg:flex-row flex-col gap-8"
      >
        <motion.div variants={planetVariants("left")} className={`flex-1 flexCenter`}>
          <img
            src="/fruittoken2.png"
            alt="get-started"
            className="w-[350px] h-[350px] object-cover rounded-full"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col"
        >
          <TypingText title="| How Metafruit Works" />
          <TitleText title={<>Get started with just a few clicks</>} />
          <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px]">
            {startingFeatures.map((feature, index) => (
              <StartSteps
                key={feature}
                number={`${index < 10 ? "0" : ""} ${index + 1}`}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GetStarted;