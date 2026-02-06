import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Breadcrum from '../components/Breadcrum'
import FormValidator from '../Validators/FormValidator'
export default function SignupPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        cpassword: "",
        concent: false
    })
    let [show, setShow] = useState(false)
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field is Mandatory",
        username: "Username Field is Mandatory",
        email: "Email Address Field is Mandatory",
        phone: "Phone Field is Mandatory",
        password: "Password Field is Mandatory",
        concent: "Please Agree to Our Terms and Conditions"
    })
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setErrorMessage(old => {
            return {
                ...old,
                [name]: name === "concent" ? (data.concent === false ? "" : "Please Agree to Our Terms and Conditions") : FormValidator(e)
            }
        })
        setData(old => {
            return {
                ...old,
                [name]: name === "concent" ? !data.concent : value

            }
        })
    }

    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error) {
            setShow(true)
        } else if (data.password !== data.cpassword) {
            setShow(true)
            setErrorMessage(old => ({
                ...old,
                password: "Password and Confirm Password Doesn't Match"
            }))
        } else {
            let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}/user`)
            response = await response.json()
            let item = response.find(x =>
                x.username?.toLowerCase() === data?.username?.toLowerCase() ||
                x.email?.toLowerCase() === data?.email?.toLowerCase()
            )
            if (item) {
                setShow(true)
                setErrorMessage(old => ({
                    ...old,
                    username: item.username?.toLowerCase() === data?.username.toLowerCase() ? "Username Already Taken" : "",
                    email: item.email?.toLowerCase() === data?.email.toLowerCase() ? "Email Already Taken" : ""
                }))
            } else {
                let res = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,
                        email: data.email,
                        phone: data.phone,
                        password: data.password,
                        role: "Buyer",
                        active: true
                    })
                })
                await res.json()
                navigate("/login")
            }
        }
    }
    return (
        <>
            <div className="page-content">
                <Breadcrum title="Create Your Account" />

                <section className="section-padding">
                    <div className="container">

                        <div className="row">
                            <div className="col-12 col-lg-8 col-xl-7 col-xxl-7 mx-auto">
                                <div className="card rounded-0">
                                    <div className="card-body p-4">
                                        <h4 className="mb-0 fw-bold text-center">Registration</h4>
                                        <hr />
                                        <p className="mb-2">Join / Sign Up using</p>
                                        <div className="social-login mb-4">
                                            <div className="row g-4">
                                                <div className="col-xl-6">
                                                    <button type="button" className="btn bg-facebook btn-ecomm w-100 text-white"><i className="bi bi-facebook me-2"></i>Facebook</button>
                                                </div>
                                                <div className="col-xl-6">
                                                    <button type="button" className="btn bg-pinterest btn-ecomm w-100 text-white"><i className="bi bi-google me-2"></i>Google</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="separator mb-4">
                                            <div className="line"></div>
                                            <p className="mb-0 fw-bold">Or</p>
                                            <div className="line"></div>
                                        </div>
                                        <form onSubmit={postData}>
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <label className="form-label">Name*</label>
                                                    <input type="text" onChange={getInputData} name='name' className={`form-control rounded-0 ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} placeholder='Full Name' />
                                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name} </p> : null}
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">Phone*</label>
                                                    <input type="text" onChange={getInputData} name='phone' className={`form-control rounded-0 ${show && errorMessage.phone ? 'border-danger' : 'border-dark'}`} placeholder='Phone Number' />
                                                    {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone} </p> : null}
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">Username*</label>
                                                    <input type="text" onChange={getInputData} name='username' className={`form-control rounded-0 ${show && errorMessage.username ? 'border-danger' : 'border-dark'}`} placeholder='Username' />
                                                    {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username} </p> : null}
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">Email Address*</label>
                                                    <input type="email" onChange={getInputData} name='email' className={`form-control rounded-0 ${show && errorMessage.email ? 'border-danger' : 'border-dark'}`} placeholder='Email Address' />
                                                    {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email} </p> : null}
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">Password*</label>
                                                    <input type="text" onChange={getInputData} name='password' className={`form-control rounded-0 ${show && errorMessage.password ? 'border-danger' : 'border-dark'}`} placeholder='Enter Password' />
                                                    {show && errorMessage.password ? <p className='text-danger'>{errorMessage.password} </p> : null}
                                                </div>

                                                <div className="col-md-6">
                                                    <label className="form-label">Confirm Password*</label>
                                                    <input type="text" onChange={getInputData} name='cpassword' className={`form-control rounded-0 ${show && errorMessage.password ? 'border-danger' : 'border-dark'}`} placeholder='Confirm Password' />
                                                </div>

                                                <div className="col-12">
                                                    <div className="form-check">
                                                        <input className="form-check-input" onChange={getInputData} type="checkbox" name='concent' />
                                                        <label className="form-check-label">
                                                            I agree to Terms and Conditions
                                                        </label>
                                                        {show && errorMessage.concent ? <p className='text-danger'>{errorMessage.concent} </p> : null}
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <hr className="my-0" />
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-dark rounded-0 btn-ecomm w-100">Sign Up</button>
                                                </div>
                                                <div className="col-12 text-center">
                                                    <p className="mb-0 rounded-0 w-100">Already have an account? <Link to="/login" className="text-danger">Sign In</Link></p>
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
