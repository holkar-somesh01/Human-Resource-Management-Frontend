import React from 'react'
import { useFetchTeamLeadsQuery } from '../../redux/apis/hrApi'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const HrTeamLead = () => {
    const { data, isSuccess, isError, isLoading } = useFetchTeamLeadsQuery()
    let HREmployeesExpot = data && data.map(item => ({
        name: item.name,
        Department: item.department,
        Role: item.role,
        Mobile: item.mobile,
        Email: item.email,
        Gender: item.gender,
        DOB: item.dob,
        Status: item.status,
    }))
    const EXPORTHREmployees = ({ HREmployeesExpot, fileName }) => {
        const worksheet = XLSX.utils.json_to_sheet(HREmployeesExpot);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendence');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    };
    return <>
        <div className='p-3 w-100'>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h3>WelCome HR!</h3>
                    <p>TeamLead</p>
                </div>
                <button type="button" onClick={e => EXPORTHREmployees({ HREmployeesExpot, fileName: "Employee's" })} class="btn btn-danger btn-sm">TeamLead's Export</button>
            </div>
            <div>
                <h1 className='text-decoration-underline text-body-secondary text-center mb-2'>TeamLead</h1>
                <div className="container">
                    <div className="row">
                        {data && data.map(item => <div className="col-sm-4 my-2">
                            <div class="card"><div class="card-body">
                                <div className='d-flex gap-3'>
                                    <img style={{ height: 100, width: 100, borderRadius: 550, objectFit: "cover" }} src="https://images.unsplash.com/photo-1727950183920-654c2feee258?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                    <div>
                                        <h5>{item.name}</h5>
                                        <span className='fs-6'>{item.department}</span>
                                        <div className='fs-6'>{item.role}</div>
                                    </div>
                                </div>
                                <button type="button" className="btn w-100 my-2 btn-info">View Details</button>
                            </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default HrTeamLead

