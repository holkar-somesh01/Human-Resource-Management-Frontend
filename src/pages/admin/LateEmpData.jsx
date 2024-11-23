import FullCalendar from '@fullcalendar/react'
import React, { useEffect } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useAdminLateEmployeeQuery, } from '../../redux/apis/adminApi'
import Notify from 'simple-notify'


const LateEmpData = () => {
    const { data, isSuccess, isError, error, isLoading } = useAdminLateEmployeeQuery()
    const events = data && data.map(item => (
        { title: `${item.checkIn},${item.userId.name}`, start: item.date }
    ))

    useEffect(() => {
        if (isError) {
            new Notify({
                status: 'error',
                title: "Failed To Fetch",
                text: `${JSON.stringify(error, null, 2)}`,
                // text: `${error && error.data.message}`,
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
                customWrapper: ''
            })
        }
    }, [isError])
    return <>
        <div className='p-4'>
            <h4 className='text-decoration-underline'>Late Dates</h4>
        </div>
        <div className="container">
            <div className="row">
                {
                    isLoading
                        ? <>
                            <div style={{ height: 400 }} className='d-flex justify-content-center align-items-center'>
                                <div class="spinner-border text-primary"></div>
                            </div>
                        </>
                        : <div className="card">
                            <div className="card-body">
                                <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    initialView='dayGridMonth'
                                    weekends={true}
                                    events={events}
                                />
                            </div>
                        </div>
                }
            </div>
        </div>
        <div>
            NEW  Update Implimaent Here
        </div>
    </>
}
export default LateEmpData
