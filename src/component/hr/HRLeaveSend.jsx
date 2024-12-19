import { useFormik } from 'formik'
import * as yup from 'yup'
import clsx from 'clsx'
import { DownloadTableExcel } from 'react-export-table-to-excel'
import { useEffect, useRef } from 'react'
import Notify from 'simple-notify'
import { useLazyFetchRequestStatusQuery, useSendLeaveRequestMutation } from '../../redux/apis/hrApi'
import { io } from 'socket.io-client'

const ioserver = io(import.meta.env.VITE_BACKEND_URL)

const HRLeaveSend = () => {
    const tableRef = useRef(null)
    const [sendRequest, { isSuccess, isError, error, isLoading }] = useSendLeaveRequestMutation()
    const [Fetchhrstatus, { data }] = useLazyFetchRequestStatusQuery()
    const formik = useFormik({
        initialValues: {
            reason: "",
            fromDate: "",
            dayofLeave: "",
        },
        validationSchema: yup.object({
            reason: yup.string().required("Enter reason"),
            fromDate: yup.string().required("Enter fromDate"),
            dayofLeave: yup.string().required("Enter dayofLeave"),
        }),
        onSubmit: (values, { resetForm }) => {
            sendRequest(values)
            resetForm()
        }
    })
    const handleclass = (arg) => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[arg] && formik.errors[arg],
        "is-valid": formik.touched[arg] && !formik.errors[arg],
    })
    useEffect(() => {
        if (isSuccess) {
            new Notify({
                status: 'success',
                title: `Request send Success`,
                text: `Wait For HR Reply`,
                effect: 'slide',
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
                title: `Faild To send.`,
                text: `${error.data.message}`,
                effect: 'slide',
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
        Fetchhrstatus()
        ioserver.on("leave-update", () => {
            Fetchhrstatus()
        })
    }, [])
    useEffect(() => {
        Fetchhrstatus()
        ioserver.on("SendLeaveRequest", () => {
            Fetchhrstatus()
        })
    }, [])
    return <>
        <div className="container mt-3">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header">Leave Request</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="card-body">
                                <div>
                                    <label for="email" className="form-label">First Reason</label>
                                    <input
                                        type="text"
                                        className={handleclass("reason")}
                                        {...formik.getFieldProps("reason")}
                                        id="email"
                                        placeholder="Enter Your Reason"
                                    />
                                </div>
                                <div className="mt-2">
                                    <label for="password" className="form-label">Date Of Leave</label>
                                    <input
                                        min={new Date().toISOString().split("T")[0]}
                                        type="date"
                                        className={handleclass("fromDate")}
                                        {...formik.getFieldProps("fromDate")}
                                        id="password"
                                        placeholder="Date OF Leave"
                                    />
                                </div>
                                <div className="mt-2">
                                    <label for="leave" className="form-label">Day Of Leave</label>
                                    <input
                                        type="number"
                                        className={handleclass("dayofLeave")}
                                        {...formik.getFieldProps("dayofLeave")}
                                        id="leave"
                                        placeholder="Day Of Leave"
                                    />
                                </div>
                                {isLoading ? <>
                                    <div class="spinner-border text-info"></div>
                                </> : <button type="submit" className="btn btn-info w-100 mt-3">
                                    Send Request
                                </button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <DownloadTableExcel
                filename="Leave"
                sheet="Leave"
                currentTableRef={tableRef.current}
            >

                <button className='btn btn-sm btn-danger'> Export excel </button>

            </DownloadTableExcel>
        </div>
        <div className='p-3'>
            <table ref={tableRef} class="table table-dark table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">Status</th>
                        <th scope="col">name</th>
                        <th scope="col">reason</th>
                        <th scope="col">FromDate</th>
                        <th scope="col">Day Of Leave</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map(item =>
                        <tr>
                            <td>{item.leave}</td>
                            <td>{item.userId.name}</td>
                            <td>{item.reason}</td>
                            <td>{item.fromDate}</td>
                            <td>{item.dayofLeave}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>
}

export default HRLeaveSend