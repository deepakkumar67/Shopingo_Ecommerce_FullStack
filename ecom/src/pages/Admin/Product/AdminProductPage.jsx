import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery';  //Import jquery
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; //import DataTables styles
import 'datatables.net';

import SideBar from '../../../components/SideBar'

import { getProduct, deleteProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
export default function AdminProductPage() {
    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteProduct({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getProduct())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [ProductStateData.length])
    return (
        <>
            <div className="page-content">

                <div className="container-fluid my-3 px-5">
                    <div className="row">
                        <div className="col-md-3">
                            <SideBar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='bg-dark text-light p-2 text-center'>Product <Link to="/admin/product/create"><i className='bi bi-plus fs-3 float-end text-light'></i></Link></h5>
                            <div className="table-responsive">
                                <table id='DataTable' className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>maincategory</th>
                                            <th>Subcategory</th>
                                            <th>Brand</th>
                                            <th>Color</th>
                                            <th>Size</th>
                                            <th>Base Price</th>
                                            <th>Discount</th>
                                            <th>Final Price</th>
                                            <th>Stock</th>
                                            <th>Stock Quantity</th>
                                            <th>Pic</th>
                                            <th>Active</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            ProductStateData.map(item => {
                                                return <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.maincategory}</td>
                                                    <td>{item.subcategory}</td>
                                                    <td>{item.brand}</td>
                                                    <td>{item.color.join()}</td>
                                                    <td>{item.size.join()}</td>
                                                    <td>&#8377;{item.basePrice}</td>
                                                    <td>{item.discount}%</td>
                                                    <td>&#8377;{item.finalPrice}</td>
                                                    <td>{item.stock ? "Yes" : "No"}</td>
                                                    <td>{item.stockQuantity}</td>
                                                    <td>
                                                        <div style={{ width: 350 }}>
                                                            {
                                                                item?.pic?.map((p, index) => {
                                                                    return <Link key={index} to={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${p}`} target='_blank' rel='noreferrer'>
                                                                        <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${p}`} height={50} width={80} className='m-1' alt="" />
                                                                    </Link>
                                                                })
                                                            }
                                                        </div>
                                                    </td>
                                                    <td>{item.active ? "Yes" : "No"}</td>
                                                    <td><Link to={`/admin/product/edit/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil-square'></i></Link></td>
                                                    <td>{localStorage.getItem("role") === "Super Admin" ? <button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button> : null} </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
