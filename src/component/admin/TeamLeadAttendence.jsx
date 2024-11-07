import { useEffect, useRef } from "react"
import { useTeamLeadAttendenceFetchQuery } from "../../redux/apis/hrApi"
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Notify from "simple-notify";

const TeamLeadAttendence = () => {
    const { data, isSuccess, isError, isLoading, error } = useTeamLeadAttendenceFetchQuery()
    let excelData = data && data.map(item => ({
        name: item.userId.name, CheckIn: item.checkIn, CheckOut: item.checkOut, Date: item.date, Role: item.userId.role
    }))
    const exportToExcel = ({ excelData, fileName }) => {
        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendence');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, `${fileName}.xlsx`);
    };
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
        <div className='p-4'>
            <div className="d-flex justify-content-between">
                <h3 className='text-decoration-underline'>TeamLead Attendence</h3>
            </div>
            <button type="button" onClick={e => exportToExcel({ excelData, fileName: "TeamLead Attendence" })} class="btn btn-danger btn-sm">Export Data</button>
            {data && data.length === 0
                ? <div>
                    <div className='d-flex flex-grow-1 justify-content-center align-items-center'>
                        <h1>No Attendence Found</h1>
                    </div>
                </div>
                : isLoading ? <>
                    <div class="spinner-border text-primary"></div>
                </>
                    : <table
                        class="table table-dark table-striped table-hover"
                    >
                        <thead>
                            <tr>
                                <th scope="col">name</th>
                                <th scope="col">CheckIn</th>
                                <th scope="col">CheckOut</th>
                                <th scope="col">Date</th>
                                <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map(item => <tr>
                                <th scope="row">{item.userId.name}</th>
                                <td>{item.checkIn ? item.checkIn : "-"}</td>
                                <td>{item.checkOut ? item.checkOut : "-"}</td>
                                <td>{item.date}</td>
                                <td>{item.userId.role}</td>
                            </tr>)}
                        </tbody>
                    </table>}
        </div >
    </>
}

export default TeamLeadAttendence