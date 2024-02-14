import { ConnectWallet } from "@thirdweb-dev/react";
import Image from "next/image";
import { Navbar, Hero, About, Explore, GetStarted, Roadmap, Footer, Dev } from "../components";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Explore />
      <GetStarted />
      <Dev />
      <Roadmap />
      <Footer />
    </div>
  );
}
