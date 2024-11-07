import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Link, Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return <>
    <div className='position-fixed mb-5 w-100 z-3'>
      <AdminNavbar />
    </div>
    <div className='d-flex pt-5'>
      <div style={{ width: 200 }} className='p-2 vh-100'>
        <Sidebar />
      </div >
      <div className='flex-grow-1 position-relative pt-2 bg-secondary-subtle'>
        <Outlet />
      </div>
    </div >
  </>
}
const Sidebar = () => {
  return <>
    <div className='position-fixed '>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/admin/add-hr" className='text-dark text-decoration-none '>
          <div className='' >Add HR</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/admin/leave" className='text-dark text-decoration-none '>
          <div className='' >View Leave</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/admin/hr" className='text-dark text-decoration-none '>
          <div className='' >HR's</div>
        </Link >
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/admin/teamLead" className='text-dark text-decoration-none '>
          <div className='' > TeamLead</div>
        </Link >
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/admin/employee" className='text-dark text-decoration-none '>
          <div className='' >Employee</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/admin/employee-attendence" className='text-dark text-decoration-none '>
          <div className='' >Employee Attendence</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/admin/teamlead-attendence" className='text-dark text-decoration-none '>
          <div className='' >TeamLead Attendence</div>
        </Link>
      </div>
      <div style={{ cursor: "pointer", width: 180 }} className='p-2  rounded-3 bg-info-subtle my-2'>
        <Link to="/admin/absent-Employee" className='text-dark text-decoration-none '>
          <div className='' >Absend Employee</div>
        </Link>
      </div>
    </div>
  </>
}

export default AdminLayout