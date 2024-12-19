import React, { useEffect } from 'react'
import { useFetchEmployeeRequestQuery, useLazyFetchEmployeeRequestQuery } from '../../redux/apis/employeeApi'
import { io } from 'socket.io-client'
import Notify from 'simple-notify'
const ioserver = io(import.meta.env.VITE_BACKEND_URL)
const EmpLeave = () => {
    const [FetchEmployeeLeave, { data, isSuccess, isError, isLoading, error }] = useLazyFetchEmployeeRequestQuery()
    useEffect(() => {
        FetchEmployeeLeave()
        ioserver.on("updateLeaveRequest", () => { FetchEmployeeLeave() })
    }, [])
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
    if (isLoading) {
        return <>
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <div class="spinner-border text-primary"></div>
            </div>
        </>
    }
    return <>
        <div>
            <div className='d-flex justify-content-end px-3 py-2'>
            </div>
            <div className="container">
                <div className='px-3'><h3>Team Leader's Leave</h3></div>
                <div className="row p-5">
                    <table className="table table-light table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>status</th>
                                <th scope="col" className='text-center'>Employee Name</th>
                                <th scope="col" className='text-center'>From Date</th>
                                <th scope="col" className='text-center'>Day Of Leave</th>
                                <th scope="col" className='text-center'>Reson</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map(item => <tr>
                                <th className='text-center'>{item.leave}</th>
                                <td className='text-center'>{item.userId.name}</td>
                                <td className='text-center'>{item.fromDate}</td>
                                <td className='text-center'>{item.dayofLeave}</td>
                                <td className='text-center'>{item.reason}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
}

export default EmpLeave