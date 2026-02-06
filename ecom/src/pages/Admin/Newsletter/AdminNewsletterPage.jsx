import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import $ from 'jquery';  //Import jquery
import 'datatables.net-dt/css/dataTables.dataTables.min.css'; //import DataTables styles
import 'datatables.net';

import SideBar from '../../../components/SideBar'

import { getNewsletter, deleteNewsletter, updateNewsletter } from "../../../Redux/ActionCreators/NewsletterActionCreators"
export default function AdminNewsletterPage() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)
    let NewsletterStateData = useSelector(state => state.NewsletterStateData)
    let dispatch = useDispatch()

    function deleteRecord(id) {
        if (confirm("Are You Sure to Delete that Item : ")) {
            dispatch(deleteNewsletter({ id: id }))
            getAPIData()
        }
    }
    function updateRecord(id) {
        if (confirm("Are You Sure to Update Status of that Item : ")) {
            let item = data.find(x => x.id === id)
            let index = data.findIndex(x => x.id === id)
            item.active = !item.active
            data[index].active = item.active
            dispatch(updateNewsletter({ ...item })
            )
            setFlag(!flag)
        }
    }

    function getAPIData() {
        dispatch(getNewsletter())
        if (NewsletterStateData.length)
            setData(NewsletterStateData)
        else
            setData([])
        let time = setTimeout(() => {
            $('#DataTable').DataTable()
        }, 500)
        return time
    }
    useEffect(() => {
        let time = getAPIData()
        return () => clearTimeout(time)
    }, [NewsletterStateData.length])
    return (
        <>
            <div className="page-content">

                <div className="container-fluid my-3 px-5">
                    <div className="row">
                        <div className="col-md-3">
                            <SideBar />
                        </div>
                        <div className="col-md-9">
                            <h5 className='bg-dark text-light p-2 text-center'>Newsletter</h5>
                            <div className="table-responsive">
                                <table id='DataTable' className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Email</th>
                                            <th>Active</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data.map(item => {
                                                return <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td style={{ cursor: "pointer" }} onClick={() => updateRecord(item.id)} >{item.active ? "Yes" : "No"}</td>
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
