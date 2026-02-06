import React from 'react'
import { Link } from 'react-router-dom'

export default function SideBar() {
    return (
        <div className="list-group">
            <Link to="/admin" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-house fs-4'></i><span className='float-end'>Home</span></Link>
            <Link to="/admin/maincategory" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-grid fs-4'></i><span className='float-end'>maincategory</span></Link>
            <Link to="/admin/subcategory" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-grid fs-4'></i><span className='float-end'>Subcategory</span></Link>
            <Link to="/admin/brand" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-award fs-4'></i><span className='float-end'>Brand</span></Link>
            <Link to="/admin/product" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-box fs-4'></i><span className='float-end'>Product</span></Link>
            <Link to="/admin/feature" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-gem fs-4'></i><span className='float-end'>Features</span></Link>
            <Link to="/admin/faq" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-question fs-4'></i><span className='float-end'>Faq</span></Link>
            <Link to="/admin/newsletter" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-envelope fs-4'></i><span className='float-end'>Newsletters</span></Link>
            <Link to="/admin/contactus" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-telephone fs-4'></i><span className='float-end'>Contactus</span></Link>
            <Link to="/admin/checkout" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-cart-check fs-4'></i><span className='float-end'>Checkout</span></Link>
            <Link to="/admin/settings" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-gear fs-4'></i><span className='float-end'>Settings</span></Link>
            {
                localStorage.getItem("role") === "Super Admin" ? 
                <Link to="/admin/user" className="list-group-item bg-dark text-light mb-1" aria-current="true"><i className='bi bi-people fs-4'></i><span className='float-end'>User</span></Link>:null

            }
        </div>
    )
}
