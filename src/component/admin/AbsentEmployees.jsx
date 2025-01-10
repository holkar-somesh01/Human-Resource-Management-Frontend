import React from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from "@fullcalendar/react"
import { useAbsendEmployeesQuery } from '../../redux/apis/adminApi'

const AbsentEmployees = () => {
    const { data } = useAbsendEmployeesQuery()
    console.log(data);


    const events = data?.flatMap(item =>
        item.absentDates.map(date => ({
            title: ` N:${item.name}`,
            start: date,
        }))
    );
    return <>
        <div className='p-4'>
            <h4 className='text-decoration-underline'> Absent Dates</h4>
        </div>

        <div className='container'>
            <div className='row'>
                <div class="card">
                    <div class="card-body">
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView='dayGridMonth'
                            weekends={true}
                            events={events}
                            eventContent={RenderEventContent}
                        />
                    </div>

                </div>
            </div>
        </div>
    </>
}
const RenderEventContent = (eventinfo) => {
    return <>
        <b>{eventinfo.timeText}</b>
        <i>{eventinfo.event.title}</i>
    </>
}

export default AbsentEmployees