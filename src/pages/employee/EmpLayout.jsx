import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import EmpNavbar from './EmpNavbar'

const EmpLayout = () => {
    return <>
        <div className='position-fixed mb-5 w-100 z-3'>
            <EmpNavbar />
        </div>
        <div className='d-flex pt-5 z-2 bg-white'>
            <div style={{ width: 200 }} className='p-2 vh-100 z-2 bg-white'>
                <Sidebar />
            </div >
            <div className='flex-grow-1 position-relative pt-2 bg-secondary-subtle'>
                <Outlet />
            </div>
        </div>
    </>
}
const Sidebar = () => {
    return <>
        <div className='position-fixed'>
            <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
                <Link to="/employee/edit-profile" className='text-dark text-decoration-none '>
                    <div className='' >Edit Profile</div>
                </Link>
            </div>
            <div style={{ cursor: "pointer", width: 180 }} className='p-2 rounded-3 bg-info-subtle my-2'>
                <Link to="/employee/send-request" className='text-dark text-decoration-none '>
                    <div className='' >Send Leave Requiest</div>
                </Link>
            </div>
            <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3  bg-info-subtle my-2'>
                <Link to="/employee/view-leave" className='text-dark text-decoration-none '>
                    <div className='' >View Leaves</div>
                </Link >
            </div>
            <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3  bg-info-subtle my-2'>
                <Link to="/employee/emp-cal" className='text-dark text-decoration-none '>
                    <div className='' >Late Details</div>
                </Link >
            </div>
        </div>
    </>
}
export default EmpLayout
