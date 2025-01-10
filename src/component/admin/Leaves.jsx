import React, { useEffect, useRef, useState } from 'react'
import { useFetchTeamLeadLeaveRequestQuery, useFindemployeeleaverequestQuery, useLazyFetchTeamLeadLeaveRequestQuery, useLazyFindemployeeleaverequestQuery, useUpdateLeaveRequestMutation } from '../../redux/apis/hrApi'
import Notify from 'simple-notify'
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { io } from 'socket.io-client'


const ioserver = io(import.meta.env.VITE_BACKEND_URL)

const Leaves = () => {
    const [employeeCompo, setEmployeeCompo] = useState(false)
    const [UpdateLeave, { isSuccess, isError, error, isLoading }] = useUpdateLeaveRequestMutation()
    const [EmployeeLeave, { data: EmployeeData }] = useLazyFindemployeeleaverequestQuery()
    const [TamLeadLeave, { data: TeamLeadData }] = useLazyFetchTeamLeadLeaveRequestQuery()
    const [leaveData, setLeaveData] = useState({})
    let TeamLeadLeave = TeamLeadData && TeamLeadData.map(item => ({
        Leave: item.leave, Name: item.userId.name, LeaveDate: item.fromDate, DayOFLeave: item.dayofLeave, Reason: item.reason
    }))
    let EmployeeLeaveExcel = EmployeeData && EmployeeData.map(item => ({
        Leave: item.leave, Name: item.userId.name, LeaveDate: item.fromDate, DayOFLeave: item.dayofLeave, Reason: item.reason
    }))
    const TeamLeadExport = ({ TeamLeadLeave, fileName }) => {
        const worksheet = XLSX.utils.json_to_sheet(TeamLeadLeave);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendence');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    };
    const EmployeeExport = ({ EmployeeLeaveExcel, fileName }) => {
        const worksheet = XLSX.utils.json_to_sheet(EmployeeLeaveExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendence');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    };
    useEffect(() => {
        if (isSuccess) {
            new Notify({
                status: 'success',
                title: `Leave Updated`,
                text: `Leave Updated message send to user's email.`,
                effect: 'fade',
                speed: 300,
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
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            new Notify({
                status: 'error',
                title: `Error Occupied While Updating Leave.`,
                text: `${error.data.message}`,
                effect: 'fade',
                speed: 300,
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
    useEffect(() => {
        EmployeeLeave()
        ioserver.on("send-employee-leave", () => {
            EmployeeLeave()
        })
        TamLeadLeave()
        ioserver.on("send-teamlead-leave", () => {
            TamLeadLeave()
        })
    }, [])
    return <>
        <div>
            <div className='d-flex justify-content-end px-3 py-2'>
                <div className='d-flex justify-content-between gap-2'>
                    <button onClick={e => setEmployeeCompo(false)} type="button" class="btn btn-info btn-sm">Employee's Leave</button>
                    <button onClick={e => setEmployeeCompo(true)} type="button" class="btn btn-info btn-sm">TeamLead's Leave</button>
                    {
                        employeeCompo ? <>
                            <button onClick={e => TeamLeadExport({ TeamLeadLeave, fileName: "TeamLead Leave" })} type="button" class="btn btn-danger btn-sm">TeamLead Leave Export</button>
                        </> : <>
                            <button onClick={e => EmployeeExport({ EmployeeLeaveExcel, fileName: "Employee Leave" })} type="button" class="btn btn-danger btn-sm">Employee Leave Export</button>
                        </>
                    }
                </div>
            </div>
            <div div className="container">
                <div className='px-3'><h3>{employeeCompo ? "Team Leader's Leave" : "Employee's Leave"}</h3></div>
                <div className="row p-5">
                    <table className="table table-light table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>Status</th>
                                <th scope="col" className='text-center'>Employee Name</th>
                                <th scope="col" className='text-center'>From Date</th>
                                <th scope="col" className='text-center'>Day Of Leave</th>
                                <th scope="col" className='text-center'>Reson</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employeeCompo
                                ? TeamLeadData && TeamLeadData.map(item =>
                                    <tr id="dropdownMenuButton1" onClick={e => setLeaveData(item)} data-bs-toggle="dropdown">
                                        <th className='text-center'>{item.leave}</th>
                                        <td className='text-center'>{item.userId.name}</td>
                                        <td className='text-center'>{item.fromDate}</td>
                                        <td className='text-center'>{item.dayofLeave}</td>
                                        <td className='text-center'>{item.reason}</td>
                                    </tr>)
                                : EmployeeData && EmployeeData.map(item =>
                                    <tr id="dropdownMenuButton1" onClick={e => setLeaveData(item)} data-bs-toggle="dropdown">
                                        <th className='text-center'>{item.leave}</th>
                                        <td className='text-center'>{item.userId.name}</td>
                                        <td className='text-center'>{item.fromDate}</td>
                                        <td className='text-center'>{item.dayofLeave}</td>
                                        <td className='text-center'>{item.reason}</td>
                                    </tr>)}
                            <div class="dropdown">
                                {leaveData && <ul class="dropdown-menu">
                                    <li><button
                                        onClick={e => UpdateLeave({ leave: "accept", dayofLeave: leaveData.dayofLeave, _id: leaveData._id })}
                                        type="button"
                                        class="btn btn-success btn-sm w-100 my-1">
                                        Accept
                                    </button>
                                    </li>
                                    <li><button
                                        onClick={e => UpdateLeave({ leave: "reject", dayofLeave: leaveData.dayofLeave, _id: leaveData._id })}
                                        type="button"
                                        class="btn btn-danger btn-sm w-100 my-1">
                                        Reject
                                    </button>
                                    </li>
                                </ul>}
                            </div>
                        </tbody>
                    </table>

                </div>
            </div>
        </div >
    </>
}

export default Leaves