import React from "react";
import { AppLayout } from "../components";
import Image from "next/image";
import { motion } from "framer-motion";

const Ticket = () => {
  const listVariant = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.5,
      },
    },
  };

  const itemVariant = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <AppLayout>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        className="flex flex-col gap-5"
      >
        <h1 className="text-center md:text-6xl text-3xl text-rose-500">Ticket</h1>
        <p className="text-center md:text-2xl text-xl text-white font-mono">
          Buy Tickets with $FRUIT to participate in various activities.
        </p>
        <h1 className="text-center md:text-4xl text-2xl text-white">(COMING SOON!)</h1>
        <motion.div
          variants={listVariant}
          initial="hidden"
          animate="show"
          className="sm:flex hidden justify-center items-center gap-7"
        >
          <motion.div variants={itemVariant} className="flex flex-col justify-center items-center gap-2">
            <Image src="/luckydraw.jpg" width={200} height={200} className="rounded-xl" />
            <p className="text-rose-600">LUCKY WHEEL</p>
          </motion.div>
          <motion.div variants={itemVariant} className="flex flex-col justify-center items-center gap-2">
            <Image src="/insidestruggle.webp" width={200} height={200} className="rounded-xl" />
            <p className="text-rose-600">INSIDE STRUGGLE</p>
          </motion.div>
          <motion.div variants={itemVariant} className="flex flex-col justify-center items-center gap-2">
            <Image src="/luckynumber.webp" width={200} height={200} className="rounded-xl" />
            <p className="text-rose-600">LUCKY NUMBER</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AppLayout>
  );
};

export default Ticket;
