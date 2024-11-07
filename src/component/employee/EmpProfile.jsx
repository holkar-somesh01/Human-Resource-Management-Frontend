import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFetchemployeeProfileQuery } from '../../redux/apis/employeeApi'
import Notify from 'simple-notify'
import EmpDetails from './EmpDetails'

const EmpProfile = () => {
    const { data, isSuccess, isLoading, isError, error } = useFetchemployeeProfileQuery()
    useEffect(() => {
        if (isError) {
            new Notify({
                status: 'error',
                title: "Failed To Fetch.",
                text: `${error.data.message}`,
                effect: 'fade',
                speed: 200,
                customClass: '',
                customIcon: '',
                showIcon: true,
                showCloseButton: true,
                autoclose: true,
                autotimeout: 3000,
                notificationsGap: null,
                notificationsPadding: null,
                type: 'outline',
                position: 'right top',
                customWrapper: '',
            })
        }
    }, [isError])
    return <>
        <div className='p-3'>
            <h1>Profile</h1>
            <p>Dashboard / Profile</p>

            <div className="conatainer">
                <div className="row">
                    <div className="col-sm-10 offset-sm-1">
                        <div className="card">
                            <div className="card-body">
                                <Link to="/teamlead/edit-profile" style={{ height: 30, width: 30, cursor: "pointer" }} className='bg-secondary-subtle rounded-circle text-center position-absolute end-0 mx-3'><i className="bi bi-pencil"></i></Link>
                                <div className='d-flex gap-2'>
                                    <img style={{ height: 200, width: 200, borderRadius: 100, objectFit: "cover" }} src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    <div>
                                        <h5><b>Name :</b>{data && data.name}</h5>
                                        <p className='text-secondary-emphasis'><span><b>Role : </b> {data && data.role}</span></p>
                                        <p><b>Department</b> : {data && data.department}</p>
                                        <span><b>Mobile No .:</b> {data && data.mobile}</span>
                                        <p className='py-3'><b>Annual Leave.:</b> {data && data.annual}</p>
                                    </div>
                                    <div style={{ marginLeft: 20, height: 200, border: "dashed grey", width: "1px" }}></div>
                                    <div>
                                        <div className='px-3'>
                                            <p><b>Email</b> : {data && data.email}</p>
                                            <p><b>Birthday</b> : {data && data.dob}</p>
                                            <p><b>Gender</b> : {data && data.gender}</p>
                                            <p><b>UnPaid Leave.:</b> {data && data.unpaidLeaves ? data.unpaidLeaves : 0}</p>
                                            <p><b>Sick Leave.:</b> {data && data.sick ? data.sick : 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EmpDetails />
        </div>
    </>
}

export default EmpProfile