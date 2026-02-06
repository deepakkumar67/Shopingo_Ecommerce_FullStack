import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import SideBar from '../../../components/SideBar'

import { getCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreators"
import { useParams } from 'react-router-dom';
import { select } from 'redux-saga/effects';
export default function AdminCheckoutShowPage() {
    let { id } = useParams()
    let [data, setData] = useState({})
    let [flag, setFlag] = useState(false)

    let [orderStatus, setOrderStatus] = useState("")
    let [paymentStatus, setPaymentStatus] = useState("")

    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()

    function updateRecord() {
        if (confirm("Are You Sure to Update Status of that Item : ")) {
            data.orderStatus = orderStatus
            data.paymentStatus = paymentStatus
            dispatch(updateCheckout({ ...data }))
            setFlag(!flag)
        }
    }

    function getAPIData() {
        dispatch(getCheckout())
        if (CheckoutStateData.length) {
            let item = CheckoutStateData.find(x => x.id === id)
            setData(item)
            setOrderStatus(item.orderStatus)
            setPaymentStatus(item.paymentStatus)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [CheckoutStateData.length])
    return (
        <>
            <div className="page-content">

                <div className="container-fluid my-3 px-5">
                    <div className="row">
                        <div className="col-md-3">
                            <SideBar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='bg-dark text-light p-2 text-center'>Checkout Query</h5>
                            <div className="table-responsive">
                                <table className='table table-bordered'>
                                    <tbody>
                                        <tr>
                                            <th>Id</th>
                                            <td>{data.id}</td>
                                        </tr>
                                        <tr>
                                            <th>User</th>
                                            <td>
                                                {data.address?.name}<br />
                                                {data.address?.email},{data.address?.phone}<br />
                                                {data.address?.address}<br />
                                                {data.address?.pin},{data.address?.city},{data.address?.state}<br />

                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Order Status</th>
                                            <td>{data.orderStatus}
                                                {
                                                    data.orderStatus !== "Delivered" ?
                                                        <select onChange={(e) => setOrderStatus(e.target.value)} className='form-select border-dark mt-3'>
                                                            <option>Order is Placed</option>
                                                            <option>Order is Packed</option>
                                                            <option>Order is Ready to Ship</option>
                                                            <option>Order is Shipped</option>
                                                            <option>Order is in Transit</option>
                                                            <option>Order is Reached to the Final Delevery Station</option>
                                                            <option>Order is Out for Delevery</option>
                                                            <option>Delivered</option>
                                                        </select> : null
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Payment Mode</th>
                                            <td>{data.paymentMode}</td>
                                        </tr>
                                        <tr>
                                            <th>Payment Status</th>
                                            <td>{data.paymentStatus}
                                                {
                                                    data.paymentStatus !== "Done" ?
                                                        <select onChange={(e) => setPaymentStatus(e.target.value)} className='form-select border-dark mt-3'>
                                                            <option>Pending</option>
                                                            <option>Done</option>
                                                        </select> : null
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Subtotal</th>
                                            <td>&#8377;{data.subtotal}</td>
                                        </tr>
                                        <tr>
                                            <th>Shipping</th>
                                            <td>&#8377;{data.shipping}</td>
                                        </tr>
                                        <tr>
                                            <th>Total</th>
                                            <td>&#8377;{data.total}</td>
                                        </tr>
                                        <tr>
                                            <th>RPPID</th>
                                            <td>{data.rppid ?? "N/A"}</td>
                                        </tr>
                                        <tr>
                                            <th>Date</th>
                                            <td>{new Date(data.date).toLocaleString()}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                {
                                                    data.orderStatus !== "Delivered" || data.paymentStatus === "pending" ?
                                                        <button onClick={updateRecord} className='btn btn-dark w-100'>Update</button> : null
                                                }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h5 className='text-center'>Checkout Products</h5>
                            <div className="card-body">
                                {
                                    data?.products?.map((p, index) => {
                                        return <div className="d-flex flex-xl-row gap-3 mb-3" key={index}>
                                            <div className="product-img">
                                                <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${p.pic}`} width="120" height={100} alt="" />
                                            </div>
                                            <div className="product-info flex-grow-1">
                                                <h5 className="fw-bold mb-1">{p.name} </h5>
                                                <p className="mb-0"> {p.brand} - {p.color}</p>
                                                <div className="mt-3 hstack gap-2">
                                                    <button type="button" className="btn btn-sm border rounded-0">Size : {p.size}</button>
                                                    <button type="button" className="btn btn-sm border rounded-0">Qty : {p.qty}</button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
