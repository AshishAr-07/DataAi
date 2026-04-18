import React from 'react'
import Wrapper from './Wrapper'

export default function Testimonials() {

    const testimonials = [
        {
            quote: "DataAi cut our weekly reporting prep from 4 hours to under 10 minutes. The auto-profiling alone is worth it.",
            name: "Priya Nair",
            initials: "PN",
            accent: "bg-amber-500",
        },
        {
            quote: "I uploaded a 10,000-row CSV and had a correlation matrix and six charts ready before my coffee was done. Genuinely impressive.",
            name: "Marco Van Basten",
            initials: "MB",
            accent: "bg-teal-500",
        },
        {
            quote: "Our non-technical stakeholders finally understand our data. The no-code interface means they can explore it themselves.",
            name: "Hemant Yadav",
            initials: "HY",
            accent: "bg-violet-500",
        },
    ]
    return (
        <>
            <section id='testimonials' className="bg-stone-900 text-white overflow-hidden relative">

                <Wrapper className=" relative z-10">

                    <div className="text-center mb-14">
                        <span className="inline-block bg-gray-100 text-black text-xs font-medium tracking-wider uppercase px-4 py-1.5 rounded-full border border-gray-100">
                            Testimonials
                        </span>
                        <h2 className="text-4xl md:text-5xl font-medium mt-4 tracking-tight text-stone-50">
                            Trusted by Thousands across the globe
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {testimonials.map((t) => (
                            <div key={t.name} className="bg-stone-800/60 border border-stone-700 rounded-2xl p-7 flex flex-col gap-6">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" className="shrink-0">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="leading-relaxed flex-1">"{t.quote}"</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-9 h-9 rounded-full ${t.accent} flex items-center justify-center text-[12px] font-semibold  shrink-0`}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-stone-100">{t.name}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Wrapper>
            </section></>
    )
}
