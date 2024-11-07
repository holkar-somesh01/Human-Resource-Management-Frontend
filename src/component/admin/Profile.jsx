import React from 'react'
import { Link } from 'react-router-dom'
import { useAdminLateEmployeeQuery } from '../../redux/apis/adminApi'

const Profile = () => {
    useAdminLateEmployeeQuery
    return <>
        <div className='p-3'>
            <h1>Profile</h1>
            <p>Dashboard / Profile</p>

            <div className="conatainer">
                <div className="row">
                    <div className="col-sm-10 offset-sm-1">
                        <div className="card">
                            <div className="card-body">
                                <Link to="/admin/edit-profile" style={{ height: 30, width: 30, cursor: "pointer" }} className='bg-secondary-subtle rounded-circle text-center position-absolute end-0 mx-3'><i className="bi bi-pencil"></i></Link>
                                <div className='d-flex gap-2'>
                                    <img style={{ height: 200, width: 200, borderRadius: 100, objectFit: "cover" }} src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    <div>
                                        <h5>John Doe</h5>
                                        <p className='text-secondary-emphasis'><span><b>Role:</b> HR</span></p>
                                        <p><b>Department</b> : Web Developer</p>
                                        <span><b>Mobile No.:</b> 8892763334</span>
                                        <p><b>Date OF Join:</b> 12/04/2023</p>
                                    </div>
                                    <div style={{ marginLeft: 20, height: 200, border: "dashed grey", width: "1px" }}></div>
                                    <div>
                                        <div className='px-3'>
                                            <p><b>Phone</b> : 8892763334</p>
                                            <p><b>Email</b> : john@gmail.com</p>
                                            <p><b>Birthday</b> : 01/01/2000</p>
                                            <p><b>Address</b> :1861 Bayonne Ave, Manchester Township, NJ, 08759</p>
                                            <p><b>Gender</b> : Male</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Profile