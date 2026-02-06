import React from 'react'

export default function Breadcrum({ title }) {
    return (
        <div className="py-4 border-bottom">
            <div className="container-fluid d-flex justify-content-center">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><a href="javascript:;">Home</a></li>
                        <li className="breadcrumb-item"><a href="javascript:;">{title}</a></li>
                    </ol>
                </nav>
            </div>
        </div>
    )
}
