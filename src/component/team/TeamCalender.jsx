import FullCalendar from '@fullcalendar/react'
import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useLateEmpDataQuery } from '../../redux/apis/employeeApi'
import { useLateTeamLeadDataQuery } from '../../redux/apis/teamLeadApi'

const TeamCalender = () => {
    const { data, isSuccess, isError, error, isLoading } = useLateTeamLeadDataQuery()

    const events = data && data.map(item => (
        { title: `Login Time ${item.checkIn}`, start: item.date }
    ))
    return <>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
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
                                    eventContent={RenderEventContent}
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
export default TeamCalender