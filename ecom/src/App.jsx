import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import AboutPage from './pages/AboutPage'
import ContactUs from './pages/ContactUs'
import DashboardPage from './pages/DashboardPage'
import OrdersPage from './pages/OrdersPage'
import ProfilePage from './pages/ProfilePage'
import UpdateProfile from './pages/UpdateProfile'
import BuyerAddress from './pages/BuyerAddress'
import WishlistPage from './pages/WishlistPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ForgetPassword1 from './pages/ForgetPassword1'
import CartPage from './pages/CartPage'
import ProductPage from './pages/ProductPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import ErrorPage from './pages/ErrorPage'
import FeaturePage from './pages/FeaturePage'
import TestimonialPage from './pages/TestimonialPage'
import AdminHomePage from './pages/Admin/AdminHomePage'
import AdminmaincategoryPage from './pages/Admin/maincategory/AdminmaincategoryPage'
import AdminmaincategoryCreatePage from './pages/Admin/maincategory/AdminmaincategoryCreatePage'
import AdminmaincategoryUpdatePage from './pages/Admin/maincategory/AdminmaincategoryUpdatePage'
import AdminSubcategoryPage from './pages/Admin/Subcategory/AdminSubcategoryPage'
import AdminSubcategoryCreatePage from './pages/Admin/Subcategory/AdminSubcategoryCreatePage'
import AdminSubcategoryUpdatePage from './pages/Admin/Subcategory/AdminSubcategoryUpdatePage'
import AdminBrandPage from './pages/Admin/Brand/AdminBrandPage'
import AdminBrandCreatePage from './pages/Admin/Brand/AdminBrandCreatePage'
import AdminBrandUpdatePage from './pages/Admin/Brand/AdminBrandUpdatePage'
import AdminFeaturePage from './pages/Admin/Feature/AdminFeaturePage'
import AdminFeatureCreatePage from './pages/Admin/Feature/AdminFeatureCreatePage'
import AdminFeatureUpdatePage from './pages/Admin/Feature/AdminFeatureUpdatePage'
import AdminFaqCreatePage from './pages/Admin/Faq/AdminFaqCreatePage'
import AdminFaqUpdatePage from './pages/Admin/Faq/AdminFaqUpdatePage'
import AdminProductPage from './pages/Admin/Product/AdminProductPage'
import AdminProductCreatePage from './pages/Admin/Product/AdminProductCreatePage'
import AdminProductUpdatePage from './pages/Admin/Product/AdminProductUpdatePage'
import AdminSettingPage from './pages/Admin/Setting/AdminSettingPage'
import AdminFaqPage from './pages/Admin/Faq/AdminFaqPage'
import CheckoutPage from './pages/CheckoutPage'
import AdminNewsletterPage from './pages/Admin/Newsletter/AdminNewsletterPage'
import AdminContactUsPage from './pages/Admin/ContactUs/AdminContactUsPage'
import AdminCheckoutPage from './pages/Admin/Checkout/AdminCheckoutPage'
import AdminCheckoutShowPage from './pages/Admin/Checkout/AdminCheckoutShowPage'
import AdminUserPage from './pages/Admin/User/AdminUserPage'
import AdminUserUpdatePage from './pages/Admin/User/AdminUserUpdatePage'
import AdminUserCreatePage from './pages/Admin/User/AdminUserCreatePage'
import AdminContactUsShowPage from './pages/Admin/ContactUs/AdminContactUsShowPage'
import TopScroller from './components/TopScroller'

    export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <TopScroller />
            <Routes>

                <Route path='' element={<HomePage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path='/about' element={<AboutPage />} />
                <Route path='/feature' element={<FeaturePage />} />
                <Route path='/testimonial' element={<TestimonialPage />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/contactus' element={<ContactUs />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/forget-password-1' element={<ForgetPassword1 />} />

                {/* Buyer Routes */}
                {
                    localStorage.getItem("login") ?
                        <>
                            <Route path='/dashboard' element={<DashboardPage />} />
                            <Route path='/orders' element={<OrdersPage />} />
                            <Route path='/profile' element={<ProfilePage />} />
                            <Route path='/update-profile' element={<UpdateProfile />} />
                            <Route path='/buyer-address' element={<BuyerAddress />} />
                            <Route path='/wishlist' element={<WishlistPage />} />
                            <Route path='/cart' element={<CartPage />} />
                            <Route path='/checkout' element={<CheckoutPage />} />
                            <Route path='/order-confirmation' element={<OrderConfirmationPage />} />
                        </> : null
                }
                {/* Admin Routes */}
                {
                    localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
                        <>
                            <Route path='/admin' element={<AdminHomePage />} />

                            <Route path='/admin/maincategory' element={<AdminmaincategoryPage />} />
                            <Route path='/admin/maincategory/create' element={<AdminmaincategoryCreatePage />} />
                            <Route path='/admin/maincategory/edit/:id' element={<AdminmaincategoryUpdatePage />} />

                            <Route path='/admin/subcategory' element={<AdminSubcategoryPage />} />
                            <Route path='/admin/subcategory/create' element={<AdminSubcategoryCreatePage />} />
                            <Route path='/admin/subcategory/edit/:id' element={<AdminSubcategoryUpdatePage />} />

                            <Route path='/admin/brand' element={<AdminBrandPage />} />
                            <Route path='/admin/brand/create' element={<AdminBrandCreatePage />} />
                            <Route path='/admin/brand/edit/:id' element={<AdminBrandUpdatePage />} />

                            <Route path='/admin/feature' element={<AdminFeaturePage />} />
                            <Route path='/admin/feature/create' element={<AdminFeatureCreatePage />} />
                            <Route path='/admin/feature/edit/:id' element={<AdminFeatureUpdatePage />} />

                            <Route path='/admin/faq' element={<AdminFaqPage />} />
                            <Route path='/admin/faq/create' element={<AdminFaqCreatePage />} />
                            <Route path='/admin/faq/edit/:id' element={<AdminFaqUpdatePage />} />

                            <Route path='/admin/product' element={<AdminProductPage />} />
                            <Route path='/admin/product/create' element={<AdminProductCreatePage />} />
                            <Route path='/admin/product/edit/:id' element={<AdminProductUpdatePage />} />

                            <Route path='/admin/settings' element={<AdminSettingPage />} />

                            <Route path='/admin/newsletter' element={<AdminNewsletterPage />} />

                            <Route path='/admin/contactus' element={<AdminContactUsPage />} />
                            <Route path='/admin/contactus/show/:id' element={<AdminContactUsShowPage />} />

                            <Route path='/admin/checkout' element={<AdminCheckoutPage />} />
                            <Route path='/admin/checkout/show/:id' element={<AdminCheckoutShowPage />} />

                            {
                                localStorage.getItem("role") === "Super Admin" ?
                                    <>
                                        <Route path='/admin/user' element={<AdminUserPage />} />
                                        <Route path='/admin/user/create' element={<AdminUserCreatePage />} />
                                        <Route path='/admin/user/edit/:id' element={<AdminUserUpdatePage />} />
                                    </> : null
                            }

                        </> : null
                }

                <Route path='/*' element={<ErrorPage />} />

            </Routes>
            <Footer />
        </BrowserRouter>
    )
}
