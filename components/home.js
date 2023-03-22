import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { Modal } from 'react-fade-modal';

const IphoneData = ({ res, seteditData, setClickeddata }) => {
    // delete data  
    const navigate = useNavigate();
    const deleteData = async () => {
        let deleteconfirm = window.confirm("Do You Wants to Delete?");
        if (deleteconfirm == true) {
            let Data = new FormData();

            Data.append('sno', res.sno);
            await axios.post('http://localhost/InternPHP/deletedata.php/', Data).then(res => {

            })
        }
    }
    return (
        <tr key={res.sno}>
            <th scope="row">{res.sno}</th>
            <td>{res.name}</td>
            <td>{res.available} units</td>
            <td>₹{res.price}</td>
            <td>₹{res.value}</td>
            <td><i style={{ cursor: "pointer" }} className="fa-regular fa-pen-to-square" onClick={() => { seteditData(true); setClickeddata(res) }}></i>
                <i style={{ cursor: "pointer", marginLeft: "20px", color: "red" }} className="fa-regular fa-trash-can" onClick={() => { deleteData(res) }}></i></td>
        </tr>
    )
}

export default function Home() {
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(0);
    const [keys, newkeys] = useState(6);
    const [keysi, newkeysi] = useState(0);
    const handlePageClick = (data) => {
        let currentPage = data.selected + 1;
        newkeys(currentPage * 6);
        newkeysi(currentPage * 6 - 6);
    }

    const notify = () => toast.success('LOGIN SUCCESSFULL!!')
    const [name, setname] = useState("");
    const getcookie = () => {
        const email = Cookies.get("user");

        let getData = new FormData();
        getData.append('email', email)
        axios.post('http://localhost/InternPHP/getData.php/', getData).then(res => {
            setname(res.data);

        })
    }

    useEffect(() => {
        getcookie();
    }, [])

    const logout = () => {
        Cookies.remove("user");
        navigate('/')
    }

    // SHOW DATA 
    const [iphone, setiphone] = useState([]);
    const [searchname, setsearchname] = useState("");
    const [Total, setTotal] = useState("");
    const [TotalPrice, settotalPrice] = useState("");
    const [outstock, setoutstock] = useState("");
    const [TotalValue, setTotalValue] = useState("");
    let showdata = async () => {
        const results = await axios.get('http://localhost/InternPHP/iphonedata.php/');
        setiphone(results.data);
        const total = results.data.length;

        setTotal(total);
        setPageCount(Math.ceil(total / 6));

        let totalPrice = 0;
        let stock = 0;
        let totalValue = 0;
        results.data.forEach(item => {
            totalPrice = totalPrice + parseInt(item.price);
            if (item.available === "0") {
                stock += 1
            }
            totalValue += parseInt(item.value);
        })
        setoutstock(stock)
        settotalPrice(totalPrice);
        setTotalValue(totalValue);

    }
    useEffect(() => {
        showdata();
    }, [])
    // update data  
    const [editData, seteditData] = useState(false);
    const [available, setavailable] = useState("");
    const [price, setprice] = useState("");
    const [value, setvalue] = useState("");
    const [Clickeddata, setClickeddata] = useState("");
    const notify2 = () => toast.success("DATA UPDATED!!")
    const notify3 = () => toast.error("SOMETHING WENT WRONG!!")

    const updata = async () => {
        let Data = new FormData();
        Data.append('available', available);
        Data.append('sno', Clickeddata.sno);
        Data.append('price', price);
        Data.append('value', value);
        await axios.post('http://localhost/InternPHP/updateiphone.php/', Data).then(res => {
            if (res.data === 1 || res.data === 11 || res.data === 111) {
                notify2();
                showdata();
                setClickeddata.available(available);
                setClickeddata.price(price);
                setClickeddata.value(value);
            } else if (res.data === 0) {
                notify3();
            }
        })
    }


    return (
        <>
            <div className=' d-flex'>
                <div style={{ width: "20%" }} className='leftside'>
                    <div className='p-3 d-flex justify-content-center' style={{ background: "black" }}>
                        <img src={require("./images/logowt.png")} className='logoimg' alt="img" />
                    </div>
                    <div style={{ textShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px" }} className='dashh p-2 mx-2 mt-2'>
                        <i className="fa-solid fa-grip-vertical mr-1"></i>
                        <h4>Dashboard</h4>
                    </div>
                    <div className='p-2'>
                        <hr style={{ width: "100%", marginTop: "0px" }} />
                        <h5 className='text-center d-flex justify-content-between'><div><i className="fa-solid fa-user mr-1"></i>Account</div>
                            <i className="fa-solid fa-chevron-down"></i></h5>
                        <h6 className='text-center d-flex texth'><i className="fa-solid fa-circle-user mr-1"></i>Profile</h6>
                        <h6 className='text-center d-flex texth'><i className="fa-solid fa-pen-to-square mr-1"></i>Edit Profile</h6>
                        <hr style={{ width: "100%" }} />
                        <h5 style={{ cursor: "pointer" }} className='text-center d-flex'><i className="fa-solid fa-comment mr-1"></i>Comment</h5>
                    </div>
                </div>
                <div className='p-2 rightside' style={{ width: "80%", position: "relative" }}>
                    <div className='d-flex justify-content-between align-content-center'>
                        <h3 className='nameshow' style={{ fontFamily: '"Poppins", sans-serif' }}>Welcome <span style={{ color: "rgb(158, 68, 242)", marginLeft: "10px" }}>{(name != "") ? name : 'Username'}</span></h3>
                        <button style={{ width: "11%" }} className='btn4' onClick={() => { logout() }}>Logout</button>
                    </div>
                    <hr style={{ width: "100%" }} />
                    <h4>Inventory Stats</h4>
                    <div style={{ color: "white", width: "80%" }} className='d-flex justify-content-around mt-3'>
                        <div className='p-3 d-flex align-content-center' style={{ background: "#62CDFF", borderRadius: "4px" }}>
                            <i style={{ fontSize: "29px" }} className="fa-solid fa-cart-shopping mr-1 mt-2"></i><div>Total Products<div>{Total}</div></div>
                        </div>
                        <div className='p-3 d-flex align-content-center' style={{ background: "#FFACAC", borderRadius: "4px" }}>
                            <i style={{ fontSize: "29px" }} className="fa-solid fa-sack-dollar mr-1 mt-2"></i><div>Total Store Price<div><span>₹</span>{TotalPrice}</div></div></div>
                        <div className='p-3 d-flex align-content-center' style={{ background: "#FFBFA9", borderRadius: "4px" }}><i style={{ fontSize: "29px" }} className="fa-solid fa-arrow-trend-down mr-1 mt-2"></i><div>Out of Stock<div>{outstock}</div></div></div>
                        <div className='p-3 d-flex align-content-center' style={{ background: "#AA77FF", borderRadius: "4px" }}><i style={{ fontSize: "29px" }} className="fa-solid fa-sack-dollar mr-1 mt-2"></i><div>Total Store Value<div><span>₹</span>{TotalValue}</div></div></div>
                    </div>
                    <hr style={{ width: "100%" }} />
                    <div className='d-flex justify-content-between'>
                        <h4>Inventory Items</h4>
                        <div style={{ position: "relative", color: "rgb(158, 68, 242)", width: "30%" }}>
                            <i style={{ position: "absolute", fontSize: "25px", top: "10px", left: "10px" }} className="fa-brands fa-searchengin"></i>
                            <input type="text" className="form-control" style={{ borderRadius: "6px", border: "2px solid rgb(158, 68, 242)", fontSize: "15px", padding: "10px 10px 10px 40px" }} placeholder="Search by name..." onChange={(e) => setsearchname(e.target.value)} />
                        </div>
                    </div>
                    <table className="table table-striped mt-2">
                        <thead style={{ border: "2px solid #37306B", borderRight: "0px", borderLeft: "0px" }}>
                            <tr>
                                <th scope="col">S/no</th>
                                <th scope="col">Name</th>
                                <th scope="col">Available</th>
                                <th scope="col">Price</th>
                                <th scope="col">Value</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iphone.filter((value) => {
                                if (searchname === "") {
                                    return value;
                                } else if ((value.name).toLowerCase().includes(searchname.toLocaleLowerCase())) {
                                    return value;
                                }
                            }).slice(keysi, keys).map(res =>
                                <IphoneData res={res} seteditData={seteditData} setClickeddata={setClickeddata} />
                            )}
                        </tbody>
                    </table>
                    <ReactPaginate breakLabel={'...'} pageCount={pageCount} onPageChange={handlePageClick} containerClassName={'pagination justify-content-center py-0 mb-0'} pageClassName={'page-item'} pageLinkClassName={'page-link'} previousClassName={'page-item'} previousLinkClassName={'page-link'} nextClassName={'page-item'} nextLinkClassName={'page-link'} activeClassName={'active'} />
                    <ToastContainer position='bottom-right' />
                </div>
            </div >
            {editData && <Modal
                seteditData={seteditData}
                modalCss='modal231'
                closeOnClickOutside={false}>
                <div style={{ display: 'block' }} className="modal modal-form" id="modalBookingForm">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <button style={{ zIndex: '644', color: "#23d4be" }} onClick={() => seteditData(false)} className="close" >
                                <i className="fa-regular fa-circle-xmark closemodal"></i>
                            </button>
                            <div className="modal-body">
                                <h3>Edit details(Optional)</h3>
                                <h6 style={{ color: "#FFD966" }}>{Clickeddata.name}</h6>
                                <div>
                                    <form onSubmit={(e) => { updata(); e.preventDefault(); }}>
                                        <div style={{ position: "relative" }} className="my-3">
                                            <i style={{ position: "absolute", left: "10px", top: "12px" }} className="fa-solid fa-bag-shopping"></i>
                                            <input className="inputs" type="tel" placeholder="Available" defaultValue={Clickeddata.available} onChange={(e) => { setavailable(e.target.value) }} />
                                        </div>
                                        <div style={{ position: "relative" }} className="my-3">
                                            <i style={{ position: "absolute", left: "10px", top: "12px" }} className="fa-solid fa-dollar-sign"></i>
                                            <input className="inputs" type="tel" placeholder="Price" defaultValue={Clickeddata.price} onChange={(e) => { setprice(e.target.value) }} />
                                        </div>
                                        <div style={{ position: "relative" }} className="my-3">
                                            <i style={{ position: "absolute", left: "10px", top: "12px" }} className="fa-solid fa-comment-dollar"></i>
                                            <input className="inputs" type="tel" placeholder="Value" defaultValue={Clickeddata.value} onChange={(e) => { setvalue(e.target.value) }} />
                                        </div>
                                        <div className="d-flex" style={{ position: "relative", justifyContent: "right" }}>
                                            <button style={{ width: "40%" }} className='btn4 my-2' type='submit' >Update</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>}
        </>
    )
}