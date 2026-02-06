import React from 'react'
import { Link } from 'react-router-dom'

export default function LatestProduct({ data }) {
    return (
        <>
            <section className="section-padding bg-section-2">
                <div className="container">
                    <div className="card border-0 rounded-0 p-3 depth">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-6 text-center">
                                {
                                    data && data.pic ? <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${data.pic[0]}`} className="rounded-0" style={{ height: "100%", width: "100%" }} alt="..." /> : null

                                } </div>
                            <div className="col-lg-6">
                                <div className="card-body">
                                    <h3 className="fw-bold text-center">{data?.name} </h3>
                                    <h4 className='text-center'>{data?.maincategory}/{data?.subcategory}/{data?.brand}/ </h4>
                                    <div className="d-flex justify-content-between">
                                        <h4 className='text-center'><del>&#8377;{data?.basePrice}</del>&#8377;{data?.finalPrice} <sup>{data?.discount}% Off </sup> </h4>
                                        <div dangerouslySetInnerHTML={{ __html: data?.description }}></div>
                                    </div>
                                    <div className="buttons mt-4 d-flex flex-column flex-lg-row gap-3">
                                        <Link to={`/product/${data?.id}`} className="w-100 btn btn-lg btn-outline-dark btn-ecomm px-5 py-3">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
