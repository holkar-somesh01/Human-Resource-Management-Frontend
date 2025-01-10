import React, { useEffect, useState } from 'react'
import { useLazyFetchHRLeaveQuery, useUpdateHrLeaveMutation } from '../../redux/apis/adminApi'
import Notify from 'simple-notify'
import { io } from 'socket.io-client';

const IoServer = io(import.meta.env.VITE_BACKEND_URL);

const HrLeave = () => {
    const [fetchHRLEAVE, { data, isLoading }] = useLazyFetchHRLeaveQuery()
    const [leaveData, setLeaveData] = useState({})
    const [updateHrLeave, { isSuccess, isError, error }] = useUpdateHrLeaveMutation()
    useEffect(() => {
        fetchHRLEAVE()
        IoServer.on("SendLeaveRequest", () => {
            fetchHRLEAVE()
        })
        IoServer.on("leave-update", () => {
            fetchHRLEAVE()
        })

    }, [])
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
                title: `Failed To Updated.`,
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
    if (isLoading) {
        return <>
            <div className='d-flex justify-content-center align-items-center vh-75'>
                <div class="spinner-border text-primary"></div>
            </div>
        </>
    }
    return <>
        <div>
            <div className='d-flex justify-content-end px-3 py-2'>
            </div>
            <div className="container">
                <div className='px-3'><h3>HR Leave</h3></div>
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
                            {data && data.map(item =>
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
                                        onClick={e => updateHrLeave({ leave: "accept", dayofLeave: leaveData.dayofLeave, _id: leaveData._id })}
                                        type="button"
                                        class="btn btn-success btn-sm w-100 my-1">
                                        Accept
                                    </button>
                                    </li>
                                    <li><button
                                        onClick={e => updateHrLeave({ leave: "reject", dayofLeave: leaveData.dayofLeave, _id: leaveData._id })}
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

export default HrLeave