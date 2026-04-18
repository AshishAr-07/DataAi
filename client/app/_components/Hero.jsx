"use client";

import React from 'react';
import { PlayIcon } from 'lucide-react';
import Wrapper from './Wrapper';
import SignUpForm from './SignupForm';
import { useRouter } from 'next/navigation';

export default function Hero() {

  const router = useRouter();

  return (
     <section className="relative overflow-hidden">
          {/* subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(circle,#78716c_1px,transparent_1px)] bg-size-[28px_28px] pointer-events-none" />
 
          <Wrapper className=" grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center relative z-10">
 
            {/* Left */}
            <div className="animate-fade-up">
              {/* Live badge */}
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-sm mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-dot" />
                Live · 2.4 M datasets analysed
              </div>
 
              <h1 className="font-display font-semibold text-5xl xl:text-6xl leading-tight tracking-tight mb-5">
                Your data,<br />
                <span className="italic text-gray-400">beautifully</span> understood.
              </h1>
 
              <p className="text-base leading-relaxed max-w-100 mb-8">
                Upload any CSV file and get instant charts, correlations, and summary
                statistics — no setup, no code, no friction.
              </p>
 
              <div className="flex flex-wrap gap-3">
                <button onClick={()=> router.push('/signup')} className="px-8 py-3 rounded-lg bg-gray-900 text-gray-50 font-medium  hover:-translate-y-0.5 transition-all duration-200">
                  Start for free
                </button>
                <button onClick={()=> router.push("#how-it-works")} className="px-8 py-3 rounded-lg border border-gray-300 text-gray-700 text-[15px] hover:bg-gray-100 hover:border-gray-400 transition-all duration-200 flex items-center gap-2">
                  <PlayIcon />
                  How it Works
                </button>
              </div>
 
            </div>
 
            {/* Right — sign-up card */}
            <div className="">
              <SignUpForm />
            </div>
          </Wrapper>
        </section>
 
  )
}
