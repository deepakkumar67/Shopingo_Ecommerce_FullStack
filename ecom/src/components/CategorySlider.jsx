import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';


function getSliderPerView() {
    if (window.innerWidth < 480)
        return 1
    else if (window.innerWidth < 768)
        return 2
    else
        return 3
}
export default function CategorySlider({ title, data }) {
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




    return (
        <>
            <section className="section-padding">
                <div className="container">
                    <div className="text-center pb-3">
                        <h3 className="mb-0 h3 fw-bold">Shop By {title} </h3>
                        <p className="mb-0 text-capitalize">Select your favorite brands and purchase</p>
                    </div>
                    <div className="brands">
                        <div className="row">
                            <Swiper {...options} >
                                {
                                    data.map(item => {
                                        return <SwiperSlide key={item.id}>
                                            <div className="col">
                                                <div className="p-3 border rounded brand-box">
                                                    <div className="d-flex align-items-center">
                                                        <Link to={`/shop?${title==="maincategory"?"mc=":"sc="} ${item.name}`} >
                                                            <img src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${item.pic}`} style={{ height: 300, width: "100%" }} alt="" />
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
