import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Breadcrum from '../components/Breadcrum'

import { getWishlist, deleteWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
export default function WishlistPage() {
    let [wishlist, setWishlist] = useState([])
    let WishlistStateData = useSelector(state => state.WishlistStateData)

    let dispatch = useDispatch()


    function getAPIData() {
        dispatch(getWishlist())
        if (WishlistStateData.length)
            setWishlist(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
        else
            setWishlist([])
    }

    function deleteRecord(id) {
        if (confirm("Are You Sure to Remove that Item From Wishlist : ")) {
            dispatch(deleteWishlist({ id: id }))
            getAPIData()
        }
    }
    useEffect(() => {
        getAPIData()
    }, [WishlistStateData.length])
    return (
        <>
            <div className="page-content">
                <Breadcrum title="Wishlist" />
                <div className="py-4 border-bottom">
                    <div className="container">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><a href="javascript:;">Home</a></li>
                                <li className="breadcrumb-item"><a href="javascript:;">Shop</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Wishlist </li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <section className="section-padding">
                    <div className="container">
                        <div className="d-flex align-items-center px-3 py-2 border mb-4">
                            <div className="text-start">
                                <h4 className="mb-0 h4 fw-bold">Wishlist ({wishlist.length} Items)</h4>
                            </div>
                            <div className="ms-auto">
                                <Link to="/shop" className="btn btn-dark btn-ecomm">Continue Shopping</Link>
                            </div>
                        </div>

                        <div className="similar-products">
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-4">
                                {
                                    wishlist.map(item => {
                                        return <div className="col" key={item.id}>
                                            <div className="card rounded-0">
                                                <button onClick={() => deleteRecord(item.id)} className="btn-close wishlist-close position-absolute end-0 top-0"></button>
                                                <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic}`} height={350} width="100%" alt="" className="card-img-top rounded-0" />
                                                <div className="card-body border-top text-center">
                                                    <p className="mb-0 product-short-name">{item.name}</p>
                                                    <div className="product-price d-flex align-items-center gap-2 mt-2 justify-content-center">
                                                        <div className="h6 fw-bold">&#8377;{item.price}</div>
                                                    </div>
                                                </div>
                                                <div className="card-footer bg-transparent text-center">
                                                    <Link to={`/product/${item.id}`} className="btn btn-dark w-100">Move to Bag</Link>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
