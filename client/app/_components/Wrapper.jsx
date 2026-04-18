import React from 'react'

export default function Wrapper({ children, className = "" }) {
    return (
        <>
            <div className={`md:max-w-7xl max-w-screen-5xl mx-auto px-8 xl:px-0 py-20 ${className}`}>{children}</div>
        </>
    )
}