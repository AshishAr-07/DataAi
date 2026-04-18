import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-stone-900 text-white px-6 py-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                <div className="flex items-center gap-2.5">
                    <Link href="/"><span className="font-semibold text-2xl tracking-tight">DataAi</span></Link>
                </div>

                <nav className="flex items-center gap-7">
                    {[{name:"Home", href: "/"}, {name:"Features", href: "#features"}, {name:"How it Works", href: "#how-it-works"}, {name:"Sign Up", href: "/signup"}].map((l) => (
                        <Link key={l.name} href={l.href} className='text-sm text-white/80'>
                            {l.name}
                        </Link>
                    ))}
                </nav>

                <p className="text-sm">© 2026 DataAi. All rights reserved.</p>
            </div>
        </footer>
    )
}
