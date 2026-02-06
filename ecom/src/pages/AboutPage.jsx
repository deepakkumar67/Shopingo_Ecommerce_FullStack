import React from 'react'
import Breadcrum from '../components/Breadcrum'
import About from '../components/About'

export default function AboutPage() {
    return (
        <>
            <div className="page-content">
                <Breadcrum title="About Us" />
                <About />
            </div>
        </>
    )
}
