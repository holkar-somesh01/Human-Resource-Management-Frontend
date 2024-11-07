import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import clsx, { } from 'clsx'
import * as yup from "yup"
import { useLoginAdminMutation, useLoginEmployeeMutation, useLoginHRMutation, useLoginTeamLeadMutation } from '../redux/apis/authApi'
import { useNavigate } from 'react-router-dom'
import Notify from 'simple-notify'

const Login = ({ loginData }) => {
    const [navigateCompo, setNavigateCompo] = useState(true)
    const navigate = useNavigate()
    const [AdminLogin, {
        data,
        isSuccess,
        isError,
        error,
        isLoading
    }] = useLoginAdminMutation()
    const [HRLogin, {
        data: hr,
        isSuccess: HrLoginisSuccess,
        isError: HrLoginisError,
        error: HrLoginError,
        isLoading: HrLoginIsLoading
    }] = useLoginHRMutation()
    const [TeamleadLogin, {
        data: TeamLead,
        isSuccess: TeamLeadLoginisSuccess,
        isError: TeamLeadLoginisError,
        error: TeamLeadLoginError,
        isLoading: TeamLeadLoginIsLoading
    }] = useLoginTeamLeadMutation()
    const [EmployeeLogin, {
        data: Employee,
        isSuccess: EmployeeLoginisSuccess,
        isError: EmployeeLoginisError,
        error: EmployeeLoginError,
        isLoading: EmployeeLoginIsLoading
    }] = useLoginEmployeeMutation()
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: yup.object({
            username: yup.string().required("Username Fields is Required"),
            password: yup.string().required("password Fields is Required"),
        }),
        onSubmit: (values, { resetForm }) => {
            if (loginData === "Admin") {
                AdminLogin(values)
            } else if (loginData === "Hr") {
                HRLogin(values)
            } else if (loginData === "TeamLead") {
                TeamleadLogin(values)
            } else if (loginData === "Employee") {
                EmployeeLogin(values)
            }
            resetForm()
        }
    })
    const handleClass = (arg) => clsx({
        "form-control my-2": true,
        "is-invalid": formik.touched[arg] && formik.errors[arg],
        "is-valid": formik.touched[arg] && !formik.errors[arg]
    })
    console.log(data)

    useEffect(() => {
        if (isSuccess || HrLoginisSuccess || TeamLeadLoginisSuccess || EmployeeLoginisSuccess) {
            new Notify({
                status: 'success',
                title: `Loged In Success`,
                text: `WelCome To Your DashBoard.`,
                effect: 'fade',
                speed: 400,
                showIcon: true,
                showCloseButton: true,
                autoclose: true,
                autotimeout: 5000,
                notificationsGap: null,
                notificationsPadding: null,
                type: 'outline',
                position: 'right top',
            })
        }
        if (data && data.role === "admin") {
            navigate("/admin")
        } else if (hr && hr.role === "hr") {
            navigate("/hr")
        } else if (TeamLead && TeamLead.role === "teamLead") {
            navigate("/teamLead")
        } else if (Employee && Employee.role === "employee") {
            navigate("/employee")
        }
    }, [isSuccess, HrLoginisSuccess, TeamLeadLoginisSuccess, EmployeeLoginisSuccess])
    useEffect(() => {
        if (isError || HrLoginisError || TeamLeadLoginisError || EmployeeLoginisError) {
            new Notify({
                status: 'error',
                title: "Login Failed.",
                text: `${error && error.data.message || HrLoginError && HrLoginError.data.message || TeamLeadLoginError && TeamLeadLoginError.data.message || EmployeeLoginError && EmployeeLoginError.data.message}`,
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
    }, [isError, HrLoginisError, TeamLeadLoginisError, EmployeeLoginisError])
    return <>
        <div className="container mt-5">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <pre>{JSON.stringify(loginData, null, 2)}</pre>
                        <div className="card-header">Login</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="card-body">
                                <div>
                                    <label htmlFor="username" className="form-label">First Email</label>
                                    <input
                                        type="text"
                                        className={handleClass("username")}
                                        {...formik.getFieldProps("username")}
                                        id="username"
                                        placeholder="Enter Your Email OR Mobile"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">{formik.errors.username}</div>
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className={handleClass("password")}
                                        {...formik.getFieldProps("password")}
                                        id="password"
                                        placeholder="Enter Your Password"
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                </div>
                                {isLoading || HrLoginIsLoading || TeamLeadLoginIsLoading || EmployeeLoginIsLoading ? <div classNameName='text-center'>
                                    <div className="spinner-border text-primary"></div>
                                </div> : <button type="submit" className="btn btn-primary w-100 mt-3">
                                    Login
                                </button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Login