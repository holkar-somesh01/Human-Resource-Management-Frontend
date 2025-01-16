import React, { useState } from 'react'
import Login from '../authentication/Login'

const Home = () => {
    const [navigateLogin, setNavigateLogin] = useState(true)
    const [loginData, setLoginData] = useState("")
    return <>
        {navigateLogin ? <div className='vh-100 d-flex justify-content-between'>
            <div className='d-flex justify-content-center align-items-center vh-100 ms-5'>
                <div className='p-3 '>
                    <h4 style={{ fontFamily: "-moz-initial" }} className=''>We Are Crative</h4>
                    <h1 className='fs-1'>𝑯𝒖𝒎𝒂𝒏 𝑹𝒆𝒔𝒐𝒖𝒓𝒄𝒆 𝑴𝒂𝒏𝒂𝒈𝒆𝒎𝒆𝒏𝒕</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt, possimus.</p>
                    <div>
                        <div className="row">
                            <div className="col-sm-3">
                                <button onClick={e => {
                                    setNavigateLogin(false)
                                    setLoginData("Admin")
                                }} type="button" className="btn btn-primary">Admin Login</button>
                            </div>
                            <div className="col-sm-3">
                                <button onClick={e => {
                                    setNavigateLogin(false)
                                    setLoginData("Hr")
                                }} type="button" className="btn btn-primary">Hr Login</button>
                            </div>
                            <div className="col-sm-3">
                                <button onClick={e => {
                                    setNavigateLogin(false)
                                    setLoginData("TeamLead")
                                }} type="button" className="btn btn-primary">TeamLead Login</button>
                            </div>
                            <div className="col-sm-3">
                                <button onClick={e => {
                                    setNavigateLogin(false)
                                    setLoginData("Employee")
                                }} type="button" className="btn btn-primary">Employee Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>
                <img className='img-fluid vh-100' src="https://templatebundle.net/wp/moto/netw1/human-resource/wp-content/uploads/sites/4/2019/06/88.png" alt="" />
            </div>
        </div>
            :
            <><Login loginData={loginData} /></>
        }

    </>
}

export default Home