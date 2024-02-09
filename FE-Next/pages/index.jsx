import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import { Navbar, Hero, About, Explore, GetStarted, Roadmap, Footer } from "../components";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Explore />
      <GetStarted />
      <Roadmap />
      <Footer />
    </div>
  );
}
