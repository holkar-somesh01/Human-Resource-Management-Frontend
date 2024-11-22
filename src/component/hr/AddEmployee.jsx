import clsx from 'clsx'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useAddEmployeeMutation } from '../../redux/apis/authApi'
import Notify from 'simple-notify'

const AddEmployee = () => {
    const [addEmployee, { isSuccess, isError, error, isLoading }] = useAddEmployeeMutation()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            role: "",
            mobile: "",
        },
        validationSchema: yup.object({
            name: yup.string().required("Name Field Required"),
            email: yup.string().required("Email Field Required"),
            role: yup.string().required("Role Field Required"),
            mobile: yup.string().required("Mobile Field Required").max(10).min(10),
        }),
        onSubmit: (values, { resetForm }) => {
            addEmployee(values)
            resetForm()
        }
    })
    const handleClass = (arg) => clsx({
        "form-control": true,
        "is-invalid": formik.touched[arg] && formik.errors[arg],
        "is-valid": formik.touched[arg] && !formik.errors[arg],
    })
    useEffect(() => {
        if (isSuccess) {
            new Notify({
                status: 'success',
                title: 'Registration Success.',
                text: "Employee OR Teamlead Registered.",
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
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            new Notify({
                status: 'error',
                title: "",
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
                customWrapper: ''
            })
        }
    }, [isError])
    return <>
        <div className="container mt-3 mb-5">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header text-info text-center"><b>Add Employee's / TeamLead's</b></div>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className='my-2'>
                                            <label for="name" className="form-label mt-1">Employee Name</label>
                                            <input
                                                type="text"
                                                className={handleClass("name")}
                                                {...formik.getFieldProps("name")}
                                                id="name"
                                                name='name'
                                                placeholder="Enter Your Name"
                                            />
                                            <div className="valid-feedback">Looks good!</div>
                                            <div className="invalid-feedback">{formik.errors.name}</div>
                                        </div>
                                    </div>
                                    <div className='my-2 col-sm-6'>
                                        <label for="email" className="form-label mt-1">Employee Email</label>
                                        <input
                                            type="text"
                                            className={handleClass("email")}
                                            {...formik.getFieldProps("email")}
                                            id="email"
                                            placeholder="Enter Your Email"
                                        />
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">{formik.errors.email}</div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="my-2 col-sm-6">
                                        <label for="mobile" className="form-label mt-1">Enter Employee Mobile</label>
                                        <input
                                            type="mobile"
                                            className={handleClass("mobile")}
                                            {...formik.getFieldProps("mobile")}
                                            id="mobile"
                                            placeholder="Enter Your Mobile"
                                        />
                                        <div className="valid-feedback">Looks good!</div>
                                        <div className="invalid-feedback">{formik.errors.mobile}</div>
                                    </div>
                                </div>
                                <div className='my-2'>
                                    <label htmlFor="role">Choose Role</label>
                                    <select
                                        className={`form-select ${formik.touched.role && formik.errors.role ? "is-invalid" : formik.touched.role && !formik.errors.role && "is-valid"}`}
                                        {...formik.getFieldProps("role")}>
                                        <option selected>Choose Role</option>
                                        <option value="teamLead">TeamLead</option>
                                        <option value="employee">Employee</option>
                                    </select>
                                    <div className="valid-feedback">Looks good!</div>
                                    <div className="invalid-feedback">{formik.errors.role}</div>
                                </div>
                                {isLoading ? <>
                                    <div class="spinner-border text-primary"></div>
                                </> : <button type="submit" className="btn btn-info text-white w-100 mt-3">
                                    Register
                                </button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    </>
}
export default AddEmployee
