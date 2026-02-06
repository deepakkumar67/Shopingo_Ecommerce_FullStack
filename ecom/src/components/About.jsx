import React from 'react'
import BrandSlider from '../components/BrandSlider'
import Feature from '../components/Feature'


export default function About() {
    return (
        <>
            <section className="section-padding">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-12 col-xl-6">
                            <h3 className="fw-bold">Our Story</h3>
                            <p>Welcome to Shopingo — where quality meets trust, and shopping becomes a joyful experience.

                                Founded with a passion for delivering value, Shopingo began its journey with a simple goal: to bring customers reliable, stylish, and affordable products all in one place. In a world full of options, we wanted to stand out by offering not just products — but handpicked items that reflect quality, comfort, and current trends.</p>
                            <p>At Shopingo, we carefully select every product, ensuring it meets our high standards. Whether it’s fashion, accessories, or lifestyle essentials, we believe our customers deserve only the best. Our team works tirelessly to keep up with changing styles and evolving needs, offering collections that are both practical and fashionable.</p>
                            <p>But our story is more than just products. It’s about people — our customers. We prioritize a seamless shopping experience with secure payments, quick delivery, and dedicated customer support, because your trust means everything to us.

                                As we grow</p>
                            <p>Our mission stays the same: to make online shopping simple, honest, and enjoyable.</p>
                        </div>
                        <div className="col-12 col-xl-6">
                            <img src="/assets/img/banner5.jpg" className="img-fluid h-100" alt="" />
                        </div>
                    </div>

                    <Feature />
                    <BrandSlider />

                </div>
            </section>
        </>
    )
}
