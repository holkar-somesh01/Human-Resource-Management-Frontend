import React, { useState } from 'react'
import { useFetchTeamLeadRequestQuery } from '../../redux/apis/teamLeadApi'

const TeamLeave = () => {
    const [employeeCompo, setEmployeeCompo] = useState(false)
    const { data, isSuccess, isLoading } = useFetchTeamLeadRequestQuery()
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
                                <th scope="col" className='text-center'>Status</th>
                                <th scope="col" className='text-center'>Leave Date</th>
                                <th scope="col" className='text-center'>Day Of Leave</th>
                                <th scope="col" className='text-center'>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map(item => <tr >
                                <th className='text-center'>{item.leave}</th>
                                <td className='text-center'>{item.fromDate}</td>
                                <td className='text-center'>{item.dayofLeave}</td>
                                <td className='text-center'>{item.reason}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    </>
}

export default TeamLeave