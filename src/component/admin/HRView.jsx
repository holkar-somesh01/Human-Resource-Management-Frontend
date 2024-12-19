import React, { useEffect } from 'react'
import { useLazyFetchHRQuery } from '../../redux/apis/adminApi'
import { io } from 'socket.io-client'
import Notify from 'simple-notify'

const IoServer = io(import.meta.env.VITE_BACKEND_URL)
const HRView = () => {
    const [FetchHR, { data, isSuccess, isError, isLoading, error }] = useLazyFetchHRQuery()
    useEffect(() => {
        FetchHR()
        IoServer.on("add-hr-admin", () => {
            FetchHR()
        })
    }, [])
    useEffect(() => {
        if (isError) {
            new Notify({
                status: 'error',
                title: `Failed To Fetch.`,
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
    return <>
        <div>
            <div className='p-4'>
                <table class="table table-dark table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map(item => <tr>
                            <td>{item.name}</td>
                            <td>{item.role}</td>
                            <td>{item.email}</td>
                            <td>{item.department}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default HRView