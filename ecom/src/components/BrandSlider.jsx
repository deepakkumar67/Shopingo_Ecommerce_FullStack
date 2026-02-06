import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

import { getBrand } from "../Redux/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux';

function getSliderPerView() {
    if (window.innerWidth < 480)
        return 2
    else if (window.innerWidth < 768)
        return 3
    else if (window.innerWidth < 992)
        return 4
    else
        return 6
}
export default function BrandSlider() {
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()
    let [sliderPerView, setSlidesPerView] = useState(getSliderPerView())
    let options = {
        slidesPerView: sliderPerView,
        spaceBetween: 30,
        freeMode: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        modules: [FreeMode, Pagination, Autoplay],
        className: "mySwiper",
        loop: true,
    }

    window.addEventListener("resize", () => {
        setSlidesPerView(getSliderPerView())
    });

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])


    return (
        <>
            <section className="section-padding">
                <div className="container">
                    <div className="text-center pb-3">
                        <h3 className="mb-0 h3 fw-bold">Shop By Brands</h3>
                        <p className="mb-0 text-capitalize">Select your favorite brands and purchase</p>
                    </div>
                    <div className="brands">
                        <div className="row">
                            <Swiper {...options} >
                                {
                                    BrandStateData.map(item => {
                                        return <SwiperSlide key={item.id}>
                                            <div className="col">
                                                <div className="p-3 border rounded brand-box">
                                                    <div className="d-flex align-items-center">
                                                        <Link to={`/shop?br=${item.name}`} >
                                                            <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic}`} style={{ height: 100, width: "100%" }} alt="" />
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
