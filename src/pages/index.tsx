import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useState } from "react";

// all components
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Tokeninfo from "@/components/Home/Tokeninfo";
import Service from "@/components/Home/Service";
import Roadmap from "@/components/Home/Roadmap";
import Tokenomics from "@/components/Home/Tokenomics";
import Whitepaper from "@/components/Home/Whitepaper";
import Team from "@/components/Home/Team";
import FAQ from "@/components/Home/FAQ";
export default function Home() {
  return (
    <div className=" relative overflow-x-hidden ">
      <Hero />
      <About />
      <Service />
      <Whitepaper/>
      <Roadmap />
      <Tokenomics/>
      <FAQ/>
      <Team/>
    </div>
  );
}
