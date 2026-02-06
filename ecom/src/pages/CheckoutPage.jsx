import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Breadcrum from '../components/Breadcrum'

import { getCart, deleteCart } from "../Redux/ActionCreators/CartActionCreators"
import { createCheckout } from "../Redux/ActionCreators/CheckoutActionCreators"
import { getProduct, updateProduct } from "../Redux/ActionCreators/ProductActionCreators"

export default function CheckoutPage() {
    let [outOfStock, setOutOfStock] = useState(false)
    let [address, setAddress] = useState([])
    let [selectedAddress, setSelectedAddress] = useState({})
    let [mode, setMode] = useState("COD")

    let [cart, setCart] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function PlaceOrder() {
        let item = {
            userId: localStorage.getItem("userid"),
            address: selectedAddress,
            orderStatus: "Order is Placed",
            paymentMode: mode,
            paymentStatus: "Pending",
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            date: new Date(),
            products: cart
        }

        dispatch(createCheckout(item))
        cart.forEach(item => {
            let p = ProductStateData.find(x => x.id === item.product)
            p.stockQuantity = p.stockQuantity - item.qty
            p.stock = p.stockQuantity === 0 ? false : true
            dispatch(updateProduct(p))
            dispatch(deleteCart({ id: item.id }))
        })
        navigate("/order-confirmation")
    }

    function calculation(cart) {
        let sum = 0
        cart.forEach(x => sum = sum + x.total)
        if (sum > 0 && sum < 1000) {
            setShipping(150)
            setTotal(sum + 150)
        }
        else {
            setShipping(0)
            setTotal(sum)
        }
        setSubtotal(sum)
    }

    useEffect(() => {
        (() => {
            dispatch(getCart())
            if (CartStateData && CartStateData.length) {
                let filteredCart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                setCart(filteredCart)
                calculation(filteredCart)
            }
            else {
                setCart([])
                calculation([])
            }
        })()
    }, [CartStateData.length])


    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}/address`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            response = await response.json()
            setAddress(response.filter(x => x.user === localStorage.getItem("userid")))
            setSelectedAddress({ ...response[0] })
        })()
    }, [])

    useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (CartStateData.length && ProductStateData.length) {
                let cart = CartStateData.filter(x => x.user === localStorage.getItem("userid"))
                cart.forEach(item => {
                    let p = ProductStateData.find(x => x.id === item.product)
                    if (p.stock === false) {
                        setOutOfStock(true)

                    }
                })
            }
        })()
    }, [ProductStateData.length, CartStateData.length])
    return (
        <div className="page-content">
            <Breadcrum title="Place Order" />
            <section className="section-padding">
                <div className="container">
                    <div className="d-flex align-items-center px-3 py-2 border mb-4">
                        <div className="text-start">
                            <h4 className="mb-0 h4 fw-bold">Select Delivery Address</h4>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-12 col-lg-6">
                            <h6 className="fw-bold mb-3 py-2 px-3 bg-light">Select Delivery Address</h6>
                            {
                                address.map((item, index) => {
                                    return <div className="card rounded-0 mb-3" key={item.id} onClick={() => setSelectedAddress({ ...address[index] })}>
                                        {selectedAddress?.id === item.id ?
                                            <i className='bi bi-check fs-1' style={{
                                                position: "absolute",
                                                right: 0
                                            }}></i> : null}
                                        <div className="card-body">
                                            <div className="gap-3" key={item.id}>
                                                <div className="address-info form-check flex-grow-1 border-3">
                                                    <p className="form-check-label">
                                                        <span className="fw-bold mb-0 h5">{item.name}</span><br />
                                                        {item.address} <br />
                                                        {item.pin},{item.city},{item.state} <br />
                                                        Mobile: <span className="text-dark fw-bold me-5 ">{item.phone}</span>
                                                        Email: <span className="text-dark fw-bold">{item.email}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            <div className="card rounded-0 payment-method">
                                <div className="row g-0">
                                    <div className="col-12 bg-light">
                                        <div className="nav flex-column nav-pills">
                                            <button onClick={() => setMode("COD")} className="nav-link rounded-0 mb-2" type="button"><i className="bi bi-cash-stack me-2"></i>Cash On Delivery
                                                {mode === "COD" ?
                                                    <i className='bi bi-check fs-1' style={{
                                                        position: "absolute",
                                                        right: 0,
                                                        top: -10
                                                    }}></i> : null}
                                            </button>

                                            <button onClick={() => setMode("Net Banking")} className="nav-link rounded-0 border-bottom-0" type="button"><i className="bi bi-bank2 me-2"></i>Net Banking
                                                {mode === "Net Banking" ?
                                                    <i className='bi bi-check fs-1' style={{
                                                        position: "absolute",
                                                        right: 0,
                                                        top: 40
                                                    }}></i> : null}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6">
                            <div className="card rounded-0 mb-3">
                                <div className="card-body">
                                    <h5 className="fw-bold mb-4 text-center">Order Summary</h5>
                                    <div className='mb-3'>
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cart.map(item => {
                                                        return <tr key={item.id}>
                                                            <td>{item.name}</td>
                                                            <td>{item.price}</td>
                                                            <td>{item.qty}</td>
                                                            <td>{item.total}</td>
                                                        </tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <hr />
                                    <hr />
                                    <div className="hstack align-items-center justify-content-between">
                                        <p className="mb-0">Bag Total</p>
                                        <p className="mb-0">&#8377;{subtotal}</p>
                                    </div>
                                    <hr />
                                    <div className="hstack align-items-center justify-content-between">
                                        <p className="mb-0">Delivery</p>
                                        <p className="mb-0">&#8377;{shipping}</p>
                                    </div>
                                    <hr />
                                    <div className="hstack align-items-center justify-content-between fw-bold text-content">
                                        <p className="mb-0">Total Amount</p>
                                        <p className="mb-0">&#8377;{total}</p>
                                    </div>
                                    {
                                        cart.length && outOfStock === false ?
                                            <div className="d-grid mt-4">
                                                <button type="button" onClick={PlaceOrder} className="btn btn-dark btn-ecomm py-3 px-5">Place Order</button>
                                            </div> :
                                            <p className='mt-3 text-danger text-center'>One or More Item From Your Cart is Out Of Stock </p>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
