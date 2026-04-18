import React from 'react'
import Wrapper from './Wrapper';
import { FiBarChart2, FiLock, FiTool } from 'react-icons/fi';

export default function Features() {
    const FEATURES = [
        {
            icon:<FiBarChart2 size={30}/>,
            title: "Instant Visualizations",
            desc: "Auto-generate charts, histograms, and scatter plots from raw CSV data in seconds.",
        },

        {
            icon: <FiTool size={30}/>,
            title: "No-Code Interface",
            desc: "Drag, filter, and pivot your data without writing a single line of SQL or Python.",
        },
        {
            icon: <FiLock size={30}/>,
            title: "Secure & Private",
            desc: "End-to-end encryption ensures your data is never stored or shared beyond your session.",
        },
    ];
    return (
        <section id='features'>
            <Wrapper>
                <div className="text-center mb-12">
                    <span className="inline-block bg-white border border-gray-200  text-xs font-medium tracking-wider uppercase px-4 py-1.5 rounded-full">
                        Features
                    </span>
                    <h2 className="text-4xl md:text-5xl font-medium mt-4 tracking-tight">
                        Everything your data needs
                    </h2>
                    <p className="text-md mt-3 max-w-4xl mx-auto leading-relaxed">
                        A complete toolkit — from raw upload to shareable report.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FEATURES.map((f, i) => (
                        <div
                            key={i}
                            className="bg-white border border-stone-100 rounded-xl p-8 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="w-11 h-11 rounded-2xl bg-gray-50 group-hover:bg-gray-100 flex items-center justify-center mb-5  text-gray-800">
                                {f.icon}
                            </div>
                            <h3 className="text-xl md:text-2xl font-semibold mb-2 tracking-tight">{f.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </Wrapper>
        </section>
    )
}
