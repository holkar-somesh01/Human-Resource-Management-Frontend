import React from 'react'
import { Link } from 'react-router-dom'
import { useFetchHRProfileQuery } from '../../redux/apis/hrApi'
import HRDetails from '../../component/hr/HRDetails'

const HrProfile = () => {
    const { data, isSuccess, isLoading } = useFetchHRProfileQuery()
    return <>
        <div className='p-3'>
            <h1>Profile</h1>
            <p>Dashboard / Profile</p>
            <div className="conatainer">
                <div className="row">
                    <div className="col-sm-10 offset-sm-1">
                        <div className="card">
                            <div className="card-body">
                                <Link to="/hr/edit-profile" style={{ height: 30, width: 30, cursor: "pointer" }} className='bg-secondary-subtle rounded-circle text-center position-absolute end-0 mx-3'><i className="bi bi-pencil"></i></Link>
                                <div className='d-flex gap-2'>
                                    <img style={{ height: 200, width: 200, borderRadius: 100, objectFit: "cover" }} src={data && data.documents.photo} alt="" />
                                    <div>
                                        <h5><b>Name : </b>{data && data.name}</h5>
                                        <p className='text-secondary-emphasis'><span><b>Role :</b> {data && data.role}</span></p>
                                        <p><b>Department</b> :{data && data.department}</p>
                                        <span><b>Mobile No .:</b> {data && data.mobile}</span>
                                        <p><b>Anual Leave : </b> {data && data.annual}</p>
                                    </div>
                                    <div style={{ marginLeft: 20, height: 200, border: "dashed grey", width: "1px" }}></div>
                                    <div>
                                        <div className='px-3'>
                                            <p><b>Email</b> : {data && data.email}</p>
                                            <p><b>Birthday</b> : {data && data.dob}</p>
                                            <p><b>Gender</b> : {data && data.gender}</p>
                                            <p><b>Sick Leave : </b> {data && data.sick}</p>
                                            <p><b>Unpaid Leave : </b> {data && data.unpaidLeaves ? data.unpaidLeaves : 0}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HRDetails />
        </div>
    </>
}

export default HrProfile