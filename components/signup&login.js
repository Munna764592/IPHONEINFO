import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

export default function S_L() {
    const navigate = useNavigate();
    const [signup, setsignup] = useState(false);
    const [showotps, setshowotps] = useState(false);
    const [showotpl, setshowotpl] = useState(false);

    const notify = () => toast.success("SIGNUP SUCCESSFULL!!")
    const notify1 = () => toast.success("OTP SENT TO YOUR EMAIL ID!!")
    const notify2 = () => toast.error("WRONG OTP!!")
    const notify3 = () => toast.error("EMAIL ALREADY EXIST!!")
    // registration 
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [id, setid] = useState("");
    const [otps, setotps] = useState("");

    let fData = new FormData();
    fData.append('name', name);
    fData.append('email', email);
    fData.append('id', id);
    const handleSubmitS = () => {
        axios.post('http://localhost/InternPHP/signData.php/', fData).then(res => {
            if (res.data === 3) {
                notify3()
            } else if (res.data === 1) {
                setshowotps(true);
                notify1();
            }
        })
    }

    const otpvers = () => {
        let otpData = new FormData();
        otpData.append('otp', otps);
        otpData.append('email', email);
        axios.post('http://localhost/InternPHP/otpverifys.php/', otpData).then(res => {
            if (res.data === 0) {
                notify2();
            } else if (res.data === 1) {
                notify();
                setemail("");
                setname("");
                setotps("");
                setshowotps(false);
                setsignup(false);
            }
        })
    }
    // login   
    const [emaill, setemaill] = useState("")
    const [idl, setidl] = useState("")
    const [otpl, setotpl] = useState("")
    const notify4 = () => toast.error("USER DIDN'T EXIST");

    let loginData = new FormData();
    loginData.append('email', emaill);
    loginData.append('person_id', idl);
    const handleSubmitl = () => {
        axios.post('http://localhost/InternPHP/login.php/', loginData).then(res => {
            if (res.data === 0) {
                notify4();
            } else if (res.data === 1) {
                setshowotpl(true);
                notify1();
            }
        })
    }
    const verifyotpl = () => {
        let otpData = new FormData();
        otpData.append('otp', otpl);
        otpData.append('email', emaill);
        axios.post('http://localhost/InternPHP/otpverifys.php/', otpData).then(res => {
            if (res.data === 0) {
                notify2();
            } else if (res.data === 1) {
                setemaill("");
                setotpl("");
                setshowotpl(false);
                cookie();
                navigate("/home.js")
            }
        })
    }

    const cookie = () => {
        if (emaill != "") {
            Cookies.set("user", emaill, {
                expires: 1,
                secure: true,
                sameSite: 'strict',
                path: '/'
            })
        }
    }

    return (
        <>
            <div className="sin-log">
                <img src={require("./images/logobt.png")} className='logoimg2' alt="img" />
                <div className={signup ? "boxls p-3" : "boxls p-3 d-none"}>
                    <form style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "100%" }} onSubmit={(e) => { handleSubmitS(); e.preventDefault() }}>
                        <div style={{ borderRadius: "50%", background: "white", height: "80px", width: "80px" }} className='iconp p-3'>
                            <i style={{ marginTop: "5px" }} className="fa-brands fa-3x fa-sketch"></i>
                        </div>
                        <div style={{ width: "90%", position: "relative" }}>
                            <i style={{ position: "absolute", top: "21px", left: "10px" }} className="fa-regular fa-user"></i>
                            <input className='my-2 inputs' type="text" placeholder='Name' defaultValue={name} onChange={(e) => { setname(e.target.value) }} required />
                        </div>
                        <div style={{ width: "90%", position: "relative" }}>
                            <i style={{ position: "absolute", top: "21px", left: "10px" }} className="fa-regular fa-envelope"></i>
                            <input className='my-2 inputs' type="email" placeholder='Email' defaultValue={email} onChange={(e) => { setemail(e.target.value) }} required />
                        </div>
                        <div className={showotps ? 'd-flex' : 'd-flex d-none'} style={{ width: "90%", position: "relative" }}>
                            <i style={{ position: "absolute", top: "21px", left: "10px", width: "30%" }} className="fa-solid fa-key"></i>
                            <input className='my-2 inputs' type="text" placeholder='OTP' defaultValue={otps} onChange={(e) => { setotps(e.target.value) }} />
                            <a className='btn4otp my-2' onClick={() => otpvers()}>Verify OTP</a>
                        </div>
                        <div style={{ width: "90%", position: "relative" }}>
                            <i style={{ position: "absolute", top: "21px", left: "10px" }} className="fa-solid fa-fingerprint"></i>
                            <input className='my-2 inputs' type="text" placeholder='Person Id' defaultValue={id} onChange={(e) => { setid(e.target.value) }} required />
                        </div>
                        <div style={{ width: "90%", position: "relative" }}>
                            <button className='btn4 my-2' type='submit' >SignUp</button>
                        </div>
                        <div className='my-1 d-flex justify-content-between' style={{ width: "90%", position: "relative" }}>
                            <div style={{ cursor: "pointer" }} onClick={() => setsignup(false)}>Login</div>
                            <div className='d-flex'>
                                <div style={{ cursor: "pointer" }}><i className="fa-brands fa-facebook mr-1"></i></div>
                                <div style={{ cursor: "pointer" }}><i className="fa-brands fa-whatsapp mr-1"></i></div>
                                <div style={{ cursor: "pointer" }}><i className="fa-brands fa-twitter"></i></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className={signup ? "boxls p-3 d-none" : "boxls p-3"}>
                    <form style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "100%" }} onSubmit={(e) => { e.preventDefault(); handleSubmitl() }}>
                        <div style={{ borderRadius: "50%", background: "white", height: "80px", width: "80px" }} className='iconp p-3'>
                            <i className="fa-solid fa-3x fa-meteor"></i>
                        </div>
                        <div style={{ width: "90%", position: "relative" }}>
                            <i style={{ position: "absolute", top: "21px", left: "10px" }} className="fa-regular fa-envelope"></i>
                            <input className='my-2 inputs' type="email" placeholder='Email' defaultValue={emaill} onChange={(e) => { setemaill(e.target.value) }} required />
                        </div>
                        <div className={showotpl ? 'd-flex' : 'd-flex d-none'} style={{ width: "90%", position: "relative" }}>
                            <i style={{ position: "absolute", top: "21px", left: "10px" }} className="fa-solid fa-key"></i>
                            <input className='my-2 inputs' type="text" placeholder='OTP' defaultValue={otpl} onChange={(e) => { setotpl(e.target.value) }} />
                            <a className='btn4otp my-2' onClick={() => verifyotpl()}>Verify OTP</a>
                        </div>
                        <div style={{ width: "90%", position: "relative" }}>
                            <i style={{ position: "absolute", top: "21px", left: "10px" }} className="fa-solid fa-fingerprint"></i>
                            <input className='my-2 inputs' type="text" placeholder='Person Id' defaultValue={idl} onChange={(e) => { setidl(e.target.value) }} required />
                        </div>
                        <div style={{ width: "90%", position: "relative" }}>
                            <button className='btn4 my-2' type='submit' >LogIn</button>
                        </div>
                        <div className='my-1 d-flex justify-content-between' style={{ width: "90%", position: "relative" }}>
                            <div style={{ cursor: "pointer" }} onClick={() => setsignup(true)}>SignUp</div>
                            <div className='d-flex'>
                                <div style={{ cursor: "pointer" }}><i className="fa-brands fa-facebook mr-1"></i></div>
                                <div style={{ cursor: "pointer" }}><i className="fa-brands fa-whatsapp mr-1"></i></div>
                                <div style={{ cursor: "pointer" }}><i className="fa-brands fa-twitter"></i></div>
                            </div>
                        </div>
                    </form>
                </div>
                <ToastContainer position='bottom-right' />
            </div>
        </>
    )
}