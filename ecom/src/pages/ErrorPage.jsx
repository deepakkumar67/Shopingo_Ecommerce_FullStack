import React, { useEffect } from 'react'
import Breadcrum from '../components/Breadcrum'
import { Link, useNavigate } from 'react-router-dom'

export default function ErrorPage() {
    let navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            if (localStorage.getItem("login")) {
                if (localStorage.getItem("role") !== "Buyer" && window.location.pathname === "/admin")
                    navigate(0)
                else if (localStorage.getItem("role") === "Buyer" && window.location.pathname === "/dashboard")
                    navigate(0)
            }
        }, 500)
    }, [window.location.href])
    return (
        <>
            <div className="page-content">
                <Breadcrum title="404! Page Not Found" />
                <section className="section-padding">
                    <div className="container">

                        <div className="separator mb-3">
                            <div className="line"></div>
                            <h3 className="mb-0 h3 fw-bold">OOPS!</h3>
                            <div className="line"></div>
                        </div>
                        <div className="border p-4 text-center w-100">
                            <h5 className="fw-bold mb-2">404! Page Not Found</h5>
                            <div className="btn-group w-25 mt-2">
                                <Link to="/" className=' w-50 btn btn-secondary'>Home</Link>
                                <Link to="/shop" className='w-50 btn btn-primary'>Shop Now</Link>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </>
    )
}
