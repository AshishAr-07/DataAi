"use client";

import { useState } from 'react';
import Wrapper from './Wrapper';

const FAQItem = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-200">
        <button
            onClick={onClick}
            className="w-full py-6 text-left flex justify-between items-center"
        >
            <h3 className="text-lg font-medium ">{question}</h3>
            <span className="ml-6 shrink-0">
                {isOpen ? (
                    <span className="text-2xl  font-light">−</span>
                ) : (
                    <span className="text-2xl  font-light">+</span>
                )}
            </span>
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
        >
            <p className="leading-relaxed">{answer}</p>
        </div>
    </div>
);

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: 'What services do you provide?',
            answer: 'We provide powerful open-source data analysis tools that help you explore, visualize, and understand your data without writing complex code.'
        },
        {
            question: 'How do I get started?',
            answer: 'Getting started is easy! Simply sign up for an account, upload your data, and start exploring with our intuitive interface.'
        },
        {
            question: 'What are your pricing options?',
            answer: 'Our core features are available for free as part of our open-source offering.'
        },
        {
            question: 'Do I need coding skills to use the platform?',
            answer: 'No, our platform is designed with a no-code approach. You can analyze data, create visualizations, and generate insights using an intuitive interface without any programming knowledge.'
        }
    ];

    return (
        <Wrapper>
            <div className="flex flex-col lg:flex-row lg:gap-12 xl:gap-24">
                {/* Left column - Header */}
                <div className=" mb-8 lg:mb-0">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Frequently Asked Questions</h2>
                    <p>
                        We understand that choosing the right service requires careful consideration.
                        Here are frequently asked questions to address your concerns.
                    </p>

                </div>

                {/* Right column - FAQ items */}

                <div className="space-y-1">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>

            </div>
        </Wrapper>
    );
};

export default FAQ;