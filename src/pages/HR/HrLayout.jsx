import React from 'react'
import HrNavbar from './HrNavbar'
import { Link, Outlet } from 'react-router-dom'

const HrLayout = () => {
  return <>
    <div className='position-fixed mb-5 w-100 z-3'>
      <HrNavbar />
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
        <Link to="/hr/edit-profile" className='text-dark text-decoration-none '>
          <div className='' >Edit Profile</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2 rounded-3 bg-info-subtle my-2'>
        <Link to="/hr/add-employee" className='text-dark text-decoration-none '>
          <div className='' >Add Employee</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2 rounded-3 bg-info-subtle my-2'>
        <Link to="/hr/leave" className='text-dark text-decoration-none '>
          <div className='' >View Leave</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3  bg-info-subtle my-2'>
        <Link to="/hr/teamLead" className='text-dark text-decoration-none '>
          <div className='' > TeamLead</div>
        </Link >
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/hr/employee" className='text-dark text-decoration-none '>
          <div className='' >Employee</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/hr/employee-attendence" className='text-dark text-decoration-none '>
          <div className='' >Employee Attendence</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/hr/teamlead-attendence" className='text-dark text-decoration-none '>
          <div className='' >TeamLead Attendence</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2 rounded-3 bg-info-subtle my-2'>
        <Link to="/hr/send-request" className='text-dark text-decoration-none '>
          <div className='' >Send Leave Requiest</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2 rounded-3 bg-info-subtle my-2'>
        <Link to="/hr/hr-cal" className='text-dark text-decoration-none '>
          <div className='' >Late Details</div>
        </Link>
      </div>
    </div>
  </>
}
export default HrLayout