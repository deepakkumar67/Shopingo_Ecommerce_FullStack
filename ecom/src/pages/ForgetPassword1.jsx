import React from 'react'
import Breadcrum from '../components/Breadcrum'

export default function ForgetPassword1() {
    return (
        <>
            <div className="page-content">
                <Breadcrum title="Reset Password" />
                <section className="py-5">
                    <div className="container">

                        <div className="row">
                            <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                                <div className="card rounded-0">
                                    <div className="card-body p-4">
                                        <h4 className="mb-4 fw-bold text-center">Reset Password</h4>

                                        <form>
                                            <div className="row g-4">
                                                <div className="col-12">
                                                    <label for="exampleNewPassword" className="form-label">New Password</label>
                                                    <input type="text" className="form-control rounded-0" id="exampleNewPassword" />
                                                </div>
                                                <div className="col-12">
                                                    <label for="examplePassword" className="form-label">Confirm Password</label>
                                                    <input type="text" className="form-control rounded-0" id="examplePassword" />
                                                </div>
                                                <div className="col-12">
                                                    <button type="button" className="btn btn-dark rounded-0 btn-ecomm w-100">Change Password</button>
                                                </div>
                                                <div className="col-12 text-center">
                                                    <p className="mb-0 rounded-0 w-100 btn  btn-ecomm border border-dark"><i className="bi bi-arrow-left me-2"></i>Return to Login</p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </>
    )
}
