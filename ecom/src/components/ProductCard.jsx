import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ item }) {
    return (
        <div className="card">
            <div className="position-relative overflow-hidden">
                <div
                    className="product-options d-flex align-items-center justify-content-center gap-2 mx-auto position-absolute bottom-0 start-0 end-0">
                    <Link to={`/product/${item.id}`} className="w-100">{item.brand} </Link>
                </div>
                <Link to={`/product/${item.id}`}>
                    <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic[0]}`} className="card-img-top" style={{ height: 250, width: "100%" }} alt="..." />
                </Link>
            </div>
            <div className="card-body">
                <div className="product-info text-center">
                    <h6 className="mb-1 fw-bold product-name" style={{ height: 40 }} >{item.name} </h6>
                    <div className="ratings mb-1 h6">
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                    </div>
                    <p className="mb-0 h6 fw-bold product-price"><del>&#8377;{item.basePrice}</del>&#8377;{item.finalPrice} <sup>{item.discount}% Off </sup> </p>
                </div>

            </div>
        </div>)
}
