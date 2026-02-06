import React, { useState } from 'react'
import Breadcrum from '../components/Breadcrum'

import { Link, useNavigate } from 'react-router-dom'
export default function LoginPage() {
    let [data, setData] = useState({
        username: "",
        password: ""
    })
    let [errorMessage, setErrorMessage] = useState("")
    let navigate = useNavigate()

    function getInputData(e) {
        let { name, value } = e.target
        setData(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let response = await fetch(`${import.meta.env.VITE_SITE_BACKEND_SERVER}/user`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        let item = response.find(x => x.username === data?.username || x.email === data?.username)
        if (item && item.active === false) {
            setErrorMessage("Your Account is Blocked Due to Some UnAuthorized Activity. Please Contact Us to Unblock Your Account")
        }
        else if (item && item.password === data.password) {
            localStorage.setItem("login", true)
            localStorage.setItem("userid", item.id)
            localStorage.setItem("name", item.name)
            localStorage.setItem("role", item.role)
            if (item.role === "Buyer")
                navigate("/dashboard")
            else
                navigate("/admin")
        }
        else
            setErrorMessage("Invalid Username or Password")
    }
    return (
        <>
            <div className="page-content">
                <Breadcrum title="Login To Your Account" />
                <section className="section-padding">
                    <div className="container">

                        <div className="row">
                            <div className="col-12 col-lg-6 col-xl-5 col-xxl-4 mx-auto">
                                <div className="card rounded-0">
                                    <div className="card-body p-4">
                                        <h4 className="mb-0 fw-bold text-center">User Login</h4>
                                        <hr />
                                        <p className="mb-2">Join / Sign In using</p>
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
                                                <div className="col-12">
                                                    <label className="form-label">Username</label>
                                                    <input type="text" name='username' onChange={getInputData} className={`form-control rounded-0 ${errorMessage ? 'boder-danger' : 'border-dark'}`} placeholder='Username or Email Address' />
                                                    {errorMessage ? <p className='text-danger'>{errorMessage} </p> : null}
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label">Password</label>
                                                    <input type="password" name='password' onChange={getInputData} className={`form-control rounded-0 ${errorMessage ? 'boder-danger' : 'border-dark'}`} placeholder='Password ' />
                                                </div>
                                                <div className="col-12">
                                                    <a href="javascript:;" className="text-content btn bg-light rounded-0 w-100"><i className="bi bi-lock me-2"></i>Forgot Password</a>
                                                </div>
                                                <div className="col-12">
                                                    <hr className="my-0" />
                                                </div>
                                                <div className="col-12">
                                                    <button type="submit" className="btn btn-dark rounded-0 btn-ecomm w-100">Login</button>
                                                </div>
                                                <div className="col-12 text-center">
                                                    <p className="mb-0 rounded-0 w-100">Don't have an account? <Link to="/signup" className="text-danger">Sign Up</Link></p>
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
