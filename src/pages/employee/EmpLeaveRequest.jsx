import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useEffect } from 'react'
import clsx from 'clsx'
import Notify from 'simple-notify'
import { useEmployeeLeaveRequestSendMutation } from '../../redux/apis/employeeApi'

const EmpLeaveRequest = () => {
    const [sendRequest, { isSuccess, isError, error, isLoading }] = useEmployeeLeaveRequestSendMutation()
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
                title: `Error Occupied While Send Request `,
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
    </>
}

export default EmpLeaveRequest