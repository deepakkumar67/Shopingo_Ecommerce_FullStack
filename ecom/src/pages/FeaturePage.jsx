import React from 'react'
import Breadcrum from '../components/Breadcrum'
import Feature from '../components/Feature'

export default function FeaturePage() {
    return (
        <>
            <div className="page-content">
                <Breadcrum title="Features" />
                <Feature />
            </div>
        </>
    )
}
