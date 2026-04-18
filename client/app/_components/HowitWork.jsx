import React from 'react'
import Wrapper from './Wrapper';

export default function HowitWork() {

    const STEPS = [
        { num: "01", title: "Create an account", desc: "Sign up in under 30 seconds. Start exploring." },
        { num: "02", title: "Upload your CSV", desc: "Drag and drop any CSV file up to 100 MB." },
        { num: "03", title: "Explore your data", desc: "Interact with auto-generated insights and charts immediately." },
    ];
    return (
        <>
            <section id='how-it-works' >
                <Wrapper>

                    <div className="text-center mb-12">
                        <span className="inline-block text-xs bg-white border border-gray-200 font-medium tracking-wider uppercase px-4 py-1.5 rounded-full">
                            How it works
                        </span>
                        <h2 className="text-4xl md:text-5xl font-medium mt-4 tracking-tight">
                            Insights in three steps
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* connector line desktop */}
                        <div className="hidden md:block absolute top-6 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px bg-stone-200" />

                        {STEPS.map((s, i) => (
                            <div key={i} className="text-center relative">
                                <div className="w-20 h-20 rounded-full border border-stone-200 bg-white flex items-center justify-center mx-auto mb-5 relative z-10">
                                    <span className="text-xl text-gray-400">{s.num}</span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-semibold mb-2.5 tracking-tight">{s.title}</h3>
                                <p className="text-[14px] text-gray-400 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </section>

        </>
    )
}
