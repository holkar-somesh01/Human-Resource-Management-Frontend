import FullCalendar from '@fullcalendar/react'
import React, { useEffect } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useLateEmpDataQuery } from '../../redux/apis/employeeApi'
import Notify from 'simple-notify'

const EmpCalender = () => {
    const { data, isSuccess, isError, error, isLoading } = useLateEmpDataQuery()

    const events = data && data.map(item => (
        { title: `Login Time ${item.checkIn}`, start: item.date }
    ))
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

    </>
}
const RenderEventContent = (eventInfo) => {
    return <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
    </>
}
export default EmpCalender