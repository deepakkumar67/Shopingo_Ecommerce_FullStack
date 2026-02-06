import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast, { Toaster } from 'react-hot-toast';

import Breadcrum from '../components/Breadcrum'

import { getCart, updateCart, deleteCart } from "../Redux/ActionCreators/CartActionCreators"
import { createWishlist, getWishlist } from "../Redux/ActionCreators/WishlistActionCreators"
import OrderDetails from '../components/OrderDetails'
import { Link } from 'react-router-dom';
export default function CartPage() {
    let [cart, setCart] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let dispatch = useDispatch()

    function updateRecord(option, id) {
        let item = cart.find(x => x.id === id)
        let index = cart.findIndex(x => x.id === id)
        if (option === "DEC" && item.qty === 1)
            return
        else if (option === "DEC") {
            item.qty = item.qty - 1
            item.total = item.total - item.price
        }
        else if (option === "INC" && item.qty < item.stockQuantity) {
            {
                item.qty = item.qty + 1
                item.total = item.total + item.price
            }
        }
        cart[index].qty = item.qty
        cart[index].total = item.total

        dispatch(updateCart({ ...item }))
        calculation(cart)
    }

    function deleteRecord(id) {
        if (confirm("Are You Sure to Remove that Item From Cart : ")) {
            dispatch(deleteCart({ id: id }))
            getAPIData()
        }
    }


    function addToWishlist(id) {
        let cartItem = cart.find(x => x.id === id)
        let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,
                name: cartItem.name,
                brand: cartItem.brand,
                price: cartItem.price,
                color: cartItem.color,
                size: cartItem.size,
                stockQuantity: cartItem.stockQuantity,
                pic: cartItem.pic
            }
            dispatch(createWishlist(item))
            notify("Item Added to Wishlist")
        }
        else
            notify("Item Already Exist in Wishlist")
    }
    const notify = (msg) => toast(msg);

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

   function getAPIData() {
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
}


    useEffect(() => {
        getAPIData()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [CartStateData.length])
    return (
        <>
            <div className="page-content">
                <Breadcrum title="Cart" />
                <section className="section-padding">
                    <div className="container">
                        <div className="d-flex align-items-center px-3 py-2 border mb-4">
                            <div className="text-start">
                                <h4 className="mb-0 h4 fw-bold">My Bag ({cart.length} items)</h4>
                            </div>
                            <div className="ms-auto">
                                <Link to="/shop" className="btn btn-light btn-dark">Continue Shopping</Link>
                            </div>
                        </div>
                        <div className="row g-4">
                            <div className="col-12 col-xl-8">
                                {
                                    cart.map(item => {
                                        return <div className="card rounded-0 mb-3" key={item.id}>
                                            <div className="card-body">
                                                <div className="d-flex flex-column flex-lg-row gap-3">
                                                    <div className="product-img">
                                                        <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic}`} width="200px" height="200px" alt="" />
                                                    </div>
                                                    <div className="product-info flex-grow-1">
                                                        <h5 className="fw-bold mb-0">{item.name}</h5>
                                                        <h6 className="fw-bold mb-0">{item.name}({item.stockQuantity} Left In Stock) </h6>
                                                        <div className="product-price d-flex align-items-center gap-2 mt-3">
                                                            <div className="h6 fw-bold">&#8377;{item.price} X {item.qty} = &#8377;{item.total} </div>
                                                        </div>
                                                        <div className="mt-3 hstack gap-2">
                                                            <button type="button" className="btn btn-sm btn-light border rounded-0">Size :{item.size} </button>
                                                            <button type="button" className="btn btn-sm btn-light border rounded-0">Color :{item.color} </button>
                                                        </div>
                                                        <div className='mt-3'>
                                                            <div className="btn-group">
                                                                <button className='btn btn-sm btn-dark' onClick={() => updateRecord('DEC', item.id)}><i className='bi bi-dash fs-5'></i></button>
                                                                <h3 style={{ width: 50 }} className='text-center'>{item.qty} </h3>
                                                                <button className='btn btn-sm btn-dark' onClick={() => updateRecord('INC', item.id)}><i className='bi bi-plus fs-5'></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="d-none d-lg-block vr"></div>
                                                    <div className="d-grid gap-2 align-self-start align-self-lg-center">
                                                        <button type="button" className="btn btn-ecomm" onClick={() => deleteRecord(item.id)}><i className="bi bi-x-lg me-2"></i>Remove</button>
                                                        <button type="button" className="btn dark btn-ecomm" onClick={() => addToWishlist(item.id)}><i className="bi bi-suit-heart me-2"></i>Move to Wishlist</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="col-12 col-xl-4">
                                {
                                    cart.length ? <OrderDetails subtotal={subtotal} shipping={shipping} total={total} /> : null

                                }
                                {/* <div className="card rounded-0">
                                    <div className="card-body">
                                        <h5 className="fw-bold mb-4">Apply Coupon</h5>
                                        <div className="input-group">
                                            <input type="text" className="form-control rounded-0" placeholder="Enter coupon code" />
                                            <button className="btn btn-dark btn-ecomm rounded-0" type="button">Apply</button>
                                        </div>
                                    </div>
                                </div> */}


                            </div>
                        </div>

                    </div>
                </section>
                <Toaster
                    position='bottom-left'
                    toastOptions={{
                        className: '',
                        style: {
                            border: '1px solid #713200',
                            padding: '10px',
                            color: 'green',
                        },
                    }}
                />            </div>
        </>
    )
}
