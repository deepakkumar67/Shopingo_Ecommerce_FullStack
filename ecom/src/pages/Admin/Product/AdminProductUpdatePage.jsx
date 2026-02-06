import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'

import SideBar from '../../../components/SideBar'

import ImageValidator from '../../../Validators/ImageValidator'
import FormValidator from '../../../Validators/FormValidator'

import { updateProduct } from "../../../Redux/ActionCreators/ProductActionCreators"

import { getProduct } from "../../../Redux/ActionCreators/ProductActionCreators"
import { getmaincategory } from "../../../Redux/ActionCreators/maincategoryActionCreators"
import { getSubcategory } from "../../../Redux/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreators"

var rte
export default function AdminProductUpdatePage() {
    let { id } = useParams()
    var refdiv = useRef(null)
    let [flag, setFlag] = useState(false)

    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        color: ["white"],
        size: ["xxl"],
        basePrice: 0,
        discount: 0,
        finalPrice: 0,
        description: "",
        stockQuantity: 1,
        stock: true,
        pic: [],
        active: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        basePrice: "",
        discount: "",
        stockQuantity: "",
        pic: ""
    })
    let [show, setShow] = useState(false)

    let ProductStateData = useSelector(state => state.ProductStateData)
    let maincategoryStateData = useSelector(state => state.maincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()

    function getInputData(e) {
        let name = e.target.name
        let value = e.target.files ? data.pic.concat(Array.from(e.target.files).map(x => "product/" + x.name)) : e.target.value
        // let value = e.target.files ?  e.target.files[0] : e.target.value

        setErrorMessage((old) => {
            return {
                ...old,
                [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)
            }
        })
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" || name === "stock" ? (value === "1" ? true : false) : value
            }
        })
    }

    function getCheckboxData(e, field) {
        let name = e.target.name
        if (field === "Color") {
            if (data.color.includes(name)) {
                if (data.color.length > 1) {
                    let index = data.color.indexOf(name)
                    data.color.splice(index, 1)
                }
            }
            else
                data.color.push(name)
        }
        else {
            if (data.size.includes(name)) {
                if (data.size.length > 1) {
                    let index = data.size.indexOf(name)
                    data.size.splice(index, 1)
                }
            }
            else
                data.size.push(name)
        }
        setFlag(!flag)
    }

    function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {
            let bp = Number.parseInt(data.basePrice)
            let d = Number.parseInt(data.discount)
            let fp = Number.parseInt(data.bp - bp * d / 100)
            let stockQuantity = Number.parseInt(data.stockQuantity)
            dispatch(updateProduct({
                ...data,
                'maincategory': data.maincategory ? data.maincategory : maincategoryStateData[0].name,
                'subcategory': data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
                'brand': data.brand ? data.brand : BrandStateData[0].name,
                'basePrice': bp,
                'discount': d,
                'finalPrice': fp,
                'stockQuantity': stockQuantity,
                'description': rte.getHTMLCode()
            }))

            // let formData = new FormData()
            // formData.append("_id", data._id)
            // formData.append("name", data.name)
            // formData.append("maincategory",  data.maincategory : maincategoryStateData[0]._id,)
            // formData.append("subcategory",  data.subcategory : SubcategoryStateData[0]._id,)
            // formData.append("brand",  data.brand : BrandStateData[0]._id,)
            // formData.append("color", data.color)
            // formData.append("size", data.size)
            // formData.append("basePrice",bp)
            // formData.append("discount",d)
            // formData.append("finalPrice",fp)
            // formData.append("stockQuantity", data.stockQuantity)
            // formData.append("description", rte.getHTMLCode())
            // formData.append("pic", data.pic)
            // formData.append("active", data.active)
            // dispatch(updateProduct(formData))

            navigate("/admin/product")
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getmaincategory())
        })()
    }, [maincategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
        })()
    }, [SubcategoryStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getBrand())
        })()
    }, [BrandStateData.length])

    useEffect(() => {
        (() => {
            rte = new window.RichTextEditor(refdiv.current);

            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setData({ ...data, ...item })
                    rte.setHTMLCode(item.description);
                }
                else
                    navigate("/admin/product")
            }
        })()
    }, [ProductStateData.length])
    return (
        <>
            <div className="page-content">

                <div className="container-fluid my-3 px-5">
                    <div className="row">
                        <div className="col-md-3">
                            <SideBar />
                        </div>
                        <div className="col-md-9">
                            <form onSubmit={postData}><div className="row">
                                <div className="col-md-12 mb-3">
                                    <label>Name*</label>
                                    <input type="text" name="name" value={data.name} onChange={getInputData} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-dark'}`} placeholder='Product Full Name' />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label>maincategory*</label>
                                    <select name="maincategory" value={data.maincategory} onChange={getInputData} className='form-select border-dark' >
                                        {
                                            maincategoryStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Subcategory*</label>
                                    <select name="subcategory" value={data.subcategory} onChange={getInputData} className='form-select border-dark' >
                                        {
                                            SubcategoryStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label>Brand*</label>
                                    <select name="brand" value={data.brand} onChange={getInputData} className='form-select border-dark' >
                                        {
                                            BrandStateData.filter(x => x.active).map(item => {
                                                return <option key={item.id}>{item.name}</option>
                                                // return <option key={item._id} value={item._id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-md-3">
                                    <label>Stock*</label>
                                    <select name="stock" value={data.stock ? "1" : "0"} onChange={getInputData} className='form-select border-dark' >
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Base Price*</label>
                                    <input type="number" name="basePrice" value={data.basePrice} onChange={getInputData} className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-dark'}`} placeholder='Product Base Price' />
                                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Discount*</label>
                                    <input type="number" name="discountPrice" value={data.discount} onChange={getInputData} className={`form-control ${show && errorMessage.discountPrice ? 'border-danger' : 'border-dark'}`} placeholder='Product Discount' />
                                    {show && errorMessage.discountPrice ? <p className='text-danger'>{errorMessage.discountPrice}</p> : null}
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Color*</label>
                                    <div className="form-control border-dark">
                                        <div className="row">
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="white" checked={data.color.includes("white")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;White</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="red" checked={data.color.includes("red")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Red</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="green" checked={data.color.includes("green")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Green</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="blue" checked={data.color.includes("blue")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Blue</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="black" checked={data.color.includes("black")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Black</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="gray" checked={data.color.includes("gray")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Gray</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="yellow" checked={data.color.includes("yellow")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Yellow</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="purple" checked={data.color.includes("purple")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Purple</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="pink" checked={data.color.includes("pink")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Pink</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="orange" checked={data.color.includes("orange")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Orange</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="violet" checked={data.color.includes("violet")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Violet</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="brown" checked={data.color.includes("brown")} onChange={(e) => getCheckboxData(e, "Color")} />
                                                <label>&nbsp;&nbsp;Brown</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mb-3">
                                    <label>Size*</label>
                                    <div className="form-control border-dark">
                                        <div className="row">
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="xxxl" checked={data.size.includes("xxxl")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;xxxl</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="xxl" checked={data.size.includes("xxl")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;xxl</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="xl" checked={data.size.includes("xl")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;xl</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="lg" checked={data.size.includes("lg")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;lg</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="md" checked={data.size.includes("md")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;md</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="sm" checked={data.size.includes("sm")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;sm</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="xs" checked={data.size.includes("xs")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;xs</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="24" checked={data.size.includes("24")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;24</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="26" checked={data.size.includes("26")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;26</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="28" checked={data.size.includes("28")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;28</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="30" checked={data.size.includes("30")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;30</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="32" checked={data.size.includes("32")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;32</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="34" checked={data.size.includes("34")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;34</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="36" checked={data.size.includes("36")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;36</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="38" checked={data.size.includes("38")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;38</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="40" checked={data.size.includes("40")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;40</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="42" checked={data.size.includes("42")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;42</label>
                                            </div>
                                            <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-6">
                                                <input type="checkbox" name="44" checked={data.size.includes("44")} onChange={(e) => getCheckboxData(e, "Size")} />
                                                <label>&nbsp;&nbsp;44</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 mb-3'>
                                    <label>Description</label>
                                    <div className='form-conrtol border-dark' ref={refdiv}></div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic*</label>
                                    <input type="file" name="pic" onChange={getInputData} multiple className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-dark'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Stock Quantity*</label>
                                    <input type="number" name="stockQuantity" value={data.stockQuantity} onChange={getInputData} placeholder='Stock Quantity' className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-dark'}`} />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Old Pics(Click on Pic to Delete)</label><br />
                                    <div>
                                        {
                                            data.pic.map((p, index) => {
                                                return <img key={index}
                                                    onClick={() => {
                                                        data.pic.splice(index, 1)
                                                        setFlag(!flag)
                                                    }}
                                                    src={`${import.meta.env.VITE_SITE_IMAGE_SERVER}/${p} `} className='m-1' height={70} width={70} />
                                            })
                                        }
                                    </div>

                                </div>


                                <div className="col-md-4 mb-3">
                                    <label>Active*</label>
                                    <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-select border-dark'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div className="col-12 mb-3">
                                    <button type="submit" className='btn btn-dark w-100'>Update</button>
                                </div>
                            </div></form>
                        </div >
                    </div >
                </div >
            </div >
        </>
    )
}
