import { useFormik } from 'formik'
import * as yup from 'yup'
import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useAddHRMutation } from '../../redux/apis/authApi'
import Notify from 'simple-notify'

const AddHR = () => {
  const [RegisterHR, { isSuccess, isError, isLoading, error }] = useAddHRMutation()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      role: "hr",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name Field Required"),
      email: yup.string().required("Email Field Required"),
      mobile: yup.string().required("Mobile Field Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      RegisterHR(values)
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
        title: `HR Registered`,
        text: `New HR has been added.`,
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
  }, [isSuccess])
  useEffect(() => {
    if (isError) {
      new Notify({
        status: 'error',
        title: "HR Registration Failed.",
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
    <div className="container mt-3">
      <div className="row">
        <div className="col-sm-6 offset-sm-3">
          <div className="card">
            <div className="card-header text-info text-center"><b>Add Company HR</b></div>
            <form onSubmit={formik.handleSubmit}>
              <div className="card-body">
                <div className='my-2'>
                  <label for="name" className="form-label mt-1">HR Name</label>
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
                <div className='my-2'>
                  <label for="email" className="form-label mt-1">HR Email</label>
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
                <div className="my-2">
                  <label for="mobile" className="form-label mt-1">Enter HR Mobile</label>
                  <input
                    type="mobile"
                    className={handleClass("mobile")}
                    {...formik.getFieldProps("mobile")}
                    id="mobile"
                    placeholder="Enter Your mobile"
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">{formik.errors.mobile}</div>
                </div>
                {isLoading ? <div className='d-flex justify-content-center align-items-center p-2'>
                  <div class="spinner-border text-primary"></div>
                </div> : <button type="submit" className="btn btn-info text-white w-100 mt-3">
                  Register HR
                </button>}
              </div>
            </form>
          </div>
        </div>
      </div >
    </div >
  </>
}

export default AddHR