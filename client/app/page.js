import React from "react";
import Features from "./_components/Features";
import HowitWork from "./_components/HowitWork";
import Hero from "./_components/Hero";
import Testimonials from "./_components/Testimonials";
import FAQ from "./_components/Faq";

export default function Home() {
  const STATS = [
    { value: "2.4M+", label: "Datasets analysed" },
    { value: "98%", label: "Uptime guarantee" },
    { value: "< 3s", label: "Average load time" },
    { value: "150+", label: "Chart types" },
  ];
  return (
    <>
      <Hero />
      <section className="bg-stone-900">
        <div className="md:max-w-7xl max-w-screen-5xl mx-auto px-8 xl:px-0 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <div key={i}>
              <p className="font-display text-[40px] font-medium text-white tracking-tight leading-none">
                {s.value}
              </p>
              <p className="text-[11px] text-stone-500 mt-2 tracking-widest uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Features />
      <Testimonials />
      <HowitWork />
      <FAQ/>
    </>
  );
}
