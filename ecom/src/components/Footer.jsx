import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import NewsLetter from "./NewsLetter"

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Footer() {
    let [data, setData] = useState({})
    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()
    
    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                setData({
                    map1: SettingStateData[0].map1 ? SettingStateData[0].map1 : "",
                    address: SettingStateData[0].address ? SettingStateData[0].address : "",
                    email: SettingStateData[0].email ? SettingStateData[0].email : "",
                    phone: SettingStateData[0].phone ? SettingStateData[0].phone : "",
                    whatsapp: SettingStateData[0].whatsapp ? SettingStateData[0].whatsapp : "",
                    facebook: SettingStateData[0].facebook ? SettingStateData[0].facebook : "",
                    youtube: SettingStateData[0].youtube ? SettingStateData[0].youtube : "",
                    instagram: SettingStateData[0].instagram ? SettingStateData[0].instagram : "",
                    linkedin: SettingStateData[0].linkedin ? SettingStateData[0].linkedin : "",
                    twitter: SettingStateData[0].twitter ? SettingStateData[0].twitter : "",
                })
            }
            else {
                setData({
                    map1: import.meta.env.VITE_SITE_MAP1,
                    address: import.meta.env.VITE_SITE_ADDRESS,
                    email: import.meta.env.VITE_SITE_EMAIL,
                    phone: import.meta.env.VITE_SITE_PHONE,
                    whatsapp: import.meta.env.VITE_SITE_WHATSAPP,
                    facebook: import.meta.env.VITE_SITE_FACEBOOK,
                    linkedin: import.meta.env.VITE_SITE_LINKEDIN,
                    twitter: import.meta.env.VITE_SITE_TWITTER,
                    instagram: import.meta.env.VITE_SITE_INSTAGRAM,
                    youtube: import.meta.env.VITE_SITE_YOUTUBE,
                })
            }
        })()
    }, [SettingStateData.length])
    return (
        <>
            <NewsLetter />
            <section className="footer-section bg-section-2 section-padding bg-dark">
                <div className="container">
                    <div className="row row-cols-1 row-cols-lg-4 g-4">
                        <div className="col">
                            <div className="footer-widget-6">
                                <img src="/assets/images/logo2.png" className="logo-img mb-3" alt="" />
                                <h5 className="text-light mb-3 fw-bold">About Us</h5>
                                <p className="text-light mb-2" style={{ textAlign: "justify" }}>Your trusted destination for quality products, great deals, and fast delivery. Shop online 24/7. Secure payments. Easy returns. Customer support always here to help.</p>
                            </div>
                            <h5 className="text-light mt-4 fw-bold">Follow Us</h5>
                            <div className="social-link d-flex align-items-center gap-2">
                                <Link to={data.facebook} target='_blank' rel='noreferror'><i className="text-light me-2 fs-4  bi bi-facebook"></i></Link>
                                <Link to={data.twitter} target='_blank' rel='noreferror'><i className="text-light me-2 fs-4  bi bi-twitter"></i></Link>
                                <Link to={data.linkedin} target='_blank' rel='noreferror'><i className="text-light me-2 fs-4  bi bi-linkedin"></i></Link>
                                <Link to={data.youtube} target='_blank' rel='noreferror'><i className="text-light me-2 fs-4  bi bi-youtube"></i></Link>
                                <Link to={data.instagram} target='_blank' rel='noreferror'><i className="text-light me-2 fs-4  bi bi-instagram"></i></Link>
                            </div>
                        </div>
                        <div className="col">
                            <div className="footer-widget-7">
                                <h5 className="text-light mt-3 mb-3 fw-bold">Quick Links</h5>
                                <ul className="widget-link list-unstyled">
                                    <li><Link className='text-light ' to="/">Home</Link></li>
                                    <li><Link className='text-light ' to="/about">About</Link></li>
                                    <li><Link className='text-light ' to="/shop">Shop</Link></li>
                                    <li><Link className='text-light ' to="/feature">Features</Link></li>
                                    <li><Link className='text-light ' to="/testimonial">Testimonial</Link></li>
                                    <li><Link className='text-light ' to="/contactus">Contactus</Link></li>

                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="footer-widget-8">
                                <h5 className="text-light mt-3 mb-3 fw-bold">Our Policies</h5>
                                <ul className="widget-link list-unstyled">
                                    <li><Link className='text-light ' to="#">Privacy Policy</Link></li>
                                    <li><Link className='text-light ' to="#">Terms & Condition</Link></li>
                                    <li><Link className='text-light ' to="#">Refund Policy</Link></li>
                                    <li><Link className='text-light ' to="#">Data Policy</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col">
                            <div className="footer-widget-9">

                                <div className="mb-3 mt-3">
                                    <h5 className="text-light mb-0 fw-bold">Address</h5>
                                    <p className="text-light mb-0 text-light">
                                        <Link className='text-light' to={data.map1} target='_blank' rel='noreferrer'>{data.address} </Link>
                                    </p>
                                </div>
                                <div className="mb-3 mt-3">
                                    <h5 className="text-light mb-0 fw-bold">Email</h5>
                                    <p className="text-light mb-0 text-light">
                                        <Link className='text-light' to={`mailto:${data.email}`} target='_blank' rel='noreferrer'>{data.email}</Link>
                                    </p>
                                </div>
                                <div className="mb-3 mt-3">
                                    <h5 className="text-light mb-0 fw-bold">Contact Us</h5>
                                    <p className="text-light mb-0 text-light">
                                        <Link className='text-light' to={`tel:${data.phone}`} target='_blank' rel='noreferrer'>{data.phone}</Link>
                                    </p>
                                </div>
                                <div className="mb-3 mt-3">
                                    <h5 className="text-light mb-0 fw-bold">Whatsapp</h5>
                                    <p className="text-light mb-0 text-light">
                                        <Link className='text-light' to={`https://wa.me/:${data.phone}`} target='_blank' rel='noreferrer'>{data.phone}</Link>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="my-5"></div>
                    {/* <div className="row">
                        <div className="col-12">
                            <div className="text-center">
                                <h5 className="fw-bold mb-3">Download Mobile App</h5>
                            </div>
                            <div className="app-icon d-flex flex-column flex-sm-row align-items-center justify-content-center gap-2">
                                <div>
                                    <a href="javascript:;">
                                        <img src="/assets/images/play-store.webp" width="160" alt="" />
                                    </a>
                                </div>
                                <div>
                                    <a href="javascript:;">
                                        <img src="/assets/images/apple-store.webp" width="160" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </section>

        </>
    )
}
