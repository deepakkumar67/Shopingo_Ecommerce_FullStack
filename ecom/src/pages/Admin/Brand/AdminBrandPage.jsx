import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import $ from 'jquery';  //Import jquery
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; //import DataTables styles
import 'datatables.net';

import SideBar from '../../../components/SideBar'

import { getBrand, deleteBrand } from "../../../Redux/ActionCreators/BrandActionCreators"
export default function AdminBrandPage() {
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteBrand({ id: id }))
            getAPIData()
        }
    }
    function getAPIData() {
        dispatch(getBrand())
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [BrandStateData.length])
    return (
        <>
            <div className="page-content">

                <div className="container-fluid my-3 px-5">
                    <div className="row">
                        <div className="col-md-3">
                            <SideBar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='bg-dark text-light p-2 text-center'>Brand <Link to="/admin/brand/create"><i className='bi bi-plus fs-3 float-end text-light'></i></Link></h5>
                            <div className="table-responsive">
                                <table id='DataTable' className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Pic</th>
                                            <th>Active</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            BrandStateData.map(item => {
                                                return <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td><Link to={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic}`} target='_blank' rel='noreferrer'>
                                                        <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic}`} height={50} width={80} alt="" />
                                                    </Link>
                                                    </td>
                                                    <td>{item.active ? "Yes" : "No"}</td>
                                                    <td><Link to={`/admin/brand/edit/${item.id}`} className='btn btn-primary'><i className='bi bi-pencil-square'></i></Link></td>
                                                    <td>{localStorage.getItem("role") === "Super Admin"?<button onClick={() => deleteRecord(item.id)} className='btn btn-danger'><i className='bi bi-trash'></i></button>:null} </td>
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
