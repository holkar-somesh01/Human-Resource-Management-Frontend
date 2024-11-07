import React, { useEffect, useState } from 'react'
import { useUpdateTeamLeadProfileMutation } from '../../redux/apis/teamLeadApi'
import { useFormik } from 'formik'
import clsx from 'clsx'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import Notify from 'simple-notify'

const TeamProfileEdit = () => {
    const [paggination, setPaggination] = useState("first")
    const [userData, setUserData] = useState({})
    const [screen, setScreen] = useState()
    return <>
        <div class="container mt-5">
            <div class="row">
                <div class="col-sm-8 offset-sm-2">
                    <div class="card">
                        <div class="card-header">Edit Profile</div>
                        <div class="card-body">
                            {paggination === "first" && <First screen={screen} setScreen={setScreen} userData={userData} setUserData={setUserData} setPaggination={setPaggination} paggination={paggination} />}
                            {paggination === "secound" && <Secound screen={screen} setScreen={setScreen} userData={userData} setUserData={setUserData} paggination={paggination} setPaggination={setPaggination} />}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    </>
}
const First = ({ paggination, setPaggination, userData, setUserData, screen, setScreen }) => {
    const { teamLead } = useSelector(state => state.Adminauth)
    const [handleSwitch, setHandleSwitch] = useState(false)
    const [expletterInp, setExpletterInp] = useState([{ id: 1 }])
    const [otherDocs, setOtherDocs] = useState([{ id: 1 }])
    const [expLetter, setExpLetter] = useState([])
    const [otherDocsData, setOtherDocsData] = useState([])
    const formik = useFormik({
        initialValues: {
            mobile: "9988776655",
            department: "FrontEnd",
            gender: "Male",
            dob: "20/05/2003",
            jobtitle: "Developer",
            resume: "",
            photo: "",
            expletter: [],
            other: [],
            isExpirence: false,
            _id: teamLead._id
        },
        validationSchema: yup.object({
            mobile: yup.string().required(),
            department: yup.string().required(),
            gender: yup.string().required(),
            dob: yup.string().required(),
            jobtitle: yup.string().required(),
            resume: yup.string().required(),
            photo: yup.string().required(),
            expletter: yup.array().required(),
            other: yup.array().required(),
            isExpirence: yup.boolean().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            setScreen({ ...screen, ...values })
            setPaggination("secound")
            // resetForm()
        }
    })
    const handleClass = (arg) => clsx({
        "form-control": true,
        "is-invalid": formik.touched[arg] && formik.errors[arg],
        "is-valid": formik.touched[arg] && !formik.errors[arg]
    })
    const handleOther = async (e, index) => {
        const copy = [...otherDocsData]
        copy[index] = e.target.files[0]
        setOtherDocsData(copy)
        formik.setFieldValue("other", copy)
    }
    const handleExpLetter = async (e, index) => {
        const copy = [...expLetter]
        copy[index] = e.target.files[0]
        setExpLetter(copy)
        formik.setFieldValue("expletter", copy)
    }

    return <>
        <h5>Personal Details</h5>
        <form onSubmit={formik.handleSubmit}>
            <div className="row">
                <pre>{JSON.stringify(screen, null, 2)}</pre>
                <div className='col-sm-4 my-2'>
                    <label htmlFor="">Enter Department</label>
                    <input className={handleClass("department")}
                        {...formik.getFieldProps("department")}
                        type="text" placeholder='Enter Department' />
                </div>
                <div className='col-sm-4 my-2'>
                    <label htmlFor="">Enter DOB</label>
                    <input className={handleClass("dob")}
                        onChange={e => formik.setFieldValue("dob", e.target.value)}
                        type="date" placeholder='Enter DOB' />
                </div>
                <div className='col-sm-4 my-2'>
                    <label htmlFor="">Enter Mobile</label>
                    <input className={handleClass("mobile")}
                        {...formik.getFieldProps("mobile")}
                        type="text" placeholder='Enter Mobile' />
                </div>
                <div className='col-sm-4 my-2'>
                    <label htmlFor="">Enter Gender</label>
                    <input className={handleClass("gender")}
                        {...formik.getFieldProps("gender")}
                        type="text" placeholder='Enter Gender' />
                </div>
                <div className='col-sm-4 my-2'>
                    <label htmlFor="">Enter Jobtitle</label>
                    <input className={handleClass("jobtitle")}
                        {...formik.getFieldProps("jobtitle")}
                        type="text" placeholder='Enter JobTitle' />
                </div>
                <div className='col-sm-4 my-2'>
                    <div class="form-check form-switch">

                        <input
                            {...formik.getFieldProps("isExpirence")}
                            onClick={e => {
                                handleSwitch ? setHandleSwitch(false) : setHandleSwitch(e.target.value)
                            }}
                            className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Expirence</label>
                    </div>
                </div>
                <div>
                    <div className='d-flex gap-2'>
                        <div className='col-sm-6'>
                            <button onClick={e => { setOtherDocs([...otherDocs, { id: otherDocs.length + 1 }]) }
                            } type='button' className='btn btn-sm bg-info w-100 my-2'>+1 other</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-4 my-2'>
                            <label className="form-check-label" htmlFor="resume">Your Resume</label>
                            <input
                                onChange={async (e) => await formik.setFieldValue("resume", e.target.files[0])}
                                id='resume'
                                className={handleClass("resume")} type="file" />
                        </div>
                        <div className='col-sm-4 my-2'>
                            <label className="form-check-label" htmlFor="photo">Your Photo</label>
                            <input
                                onChange={async (e) => await formik.setFieldValue("photo", e.target.files[0])}
                                id='photo' className={handleClass("photo")} type="file" />
                        </div>

                        {otherDocs && otherDocs.map((item, index) => <div className='col-sm-4 my-2'>
                            <label className="form-check-label" htmlFor="photo">other Docs</label>
                            <input
                                onChange={e => handleOther(e, index)}
                                id='photo' className='form-control' type="file" />
                        </div>)}
                    </div>
                </div>
                {handleSwitch && <div>
                    <div className='row'>
                        <div className='col-sm-6'>
                            <button onClick={e => { setExpletterInp([...expletterInp, { id: expletterInp.length + 1 }]) }
                            } type='button' className='btn btn-sm bg-info w-100 my-2'>+1 ExpLetter</button>
                        </div>
                    </div>
                    <div className='row'>
                        {expletterInp && expletterInp.map((item, index) => <div className='col-sm-4 my-2'>
                            <label className="form-check-label" htmlFor="photo">Expirence Letter</label>
                            <input id='photo' onChange={e => handleExpLetter(e, index)} className='form-control' type="file" />
                        </div>)}
                    </div>
                </div>
                }
            </div>
            <div className='d-flex justify-content-between'>
                <button disabled={paggination === "first"} onClick={e => setPaggination("first")} type="button" class="btn btn-primary mt-3">
                    Prev
                </button>
                <button
                    onClick={async (e) => {
                        await formik.setFieldTouched("mobile", true);
                        await formik.setFieldTouched("department", true);
                        await formik.setFieldTouched("gender", true);
                        await formik.setFieldTouched("dob", true);
                        await formik.setFieldTouched("jobtitle", true);
                        await formik.setFieldTouched("resume", true);
                        await formik.setFieldTouched("photo", true);
                        await formik.setFieldTouched("expletter", true);
                        await formik.setFieldTouched("other", true);
                        await formik.setFieldTouched("isExpirence", true);
                        if (formik.touched.mobile &&
                            !formik.errors.mobile &&
                            formik.touched.department &&
                            !formik.errors.department &&
                            !formik.errors.gender &&
                            formik.touched.gender &&
                            !formik.errors.dob &&
                            formik.touched.dob &&
                            !formik.errors.jobtitle &&
                            formik.touched.jobtitle &&
                            !formik.errors.photo &&
                            formik.touched.photo &&
                            !formik.errors.expletter &&
                            formik.touched.expletter &&
                            !formik.errors.other &&
                            formik.touched.other &&
                            !formik.errors.resume &&
                            formik.touched.resume) {
                            formik.handleSubmit()
                        }
                    }}
                    type="submit" class="btn btn-primary mt-3">
                    Next
                </button>
            </div>
        </form >
    </>
}
const Secound = ({ paggination, setPaggination, userData, setUserData, screen, setScreen }) => {
    const [updateProfile, { isSuccess, isError, error, isLoading }] = useUpdateTeamLeadProfileMutation()
    const [jobHistory, setJobHistory] = useState([{ id: 1 }])
    const [tech, setTech] = useState([{ id: 1 }])
    const [techData, setTechData] = useState([])
    const [jobInfo, setJobInfo] = useState({})
    const [jobHistoryArr, setJobHistoryArr] = useState([])
    const handleTech = (e, techindex, index) => {
        console.log(techindex)
        const copy = [...techData]
        copy[techindex] = e.target.value;
        setTechData(copy)
        setJobInfo({ ...jobInfo, tech: copy })
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setJobInfo({ ...jobInfo, [name]: value })
    }
    const handlePush = (e, index) => {
        console.log(index)
        const copy = [...jobHistoryArr]
        copy[index] = jobInfo
        setJobHistoryArr(copy)
        setScreen({ ...screen, jobHistory: copy, })
    }
    const handleSubmit = e => {
        const fd = new FormData()
        for (const key in screen) {
            if (key === "jobHistory") {
                let techh = []
                jobHistoryArr && jobHistoryArr.map((item, index) => (
                    item.tech.map((tech, index) =>
                        (techh[index] = tech)
                    ),
                    fd.append("company", item.company),
                    fd.append("joindate", item.joindate),
                    fd.append("resigndate", item.resigndate),
                    fd.append("jobrole", item.jobrole),
                    fd.append("tech", techh)
                )
                )
            } else if (key === "expletter") {
                screen.expletter.map(item =>
                    fd.append("expletter", item)
                )
            } else if (key === "other") {
                screen.other.map(item =>
                    fd.append("other", item)
                )
            } else if (screen[key] === "jobHistory") {
                fd.append(key, screen[key])
            } else if (screen[key] !== "expletter") {
                fd.append(key, screen[key])
            }
        }
        updateProfile({ _id: screen._id, fd })
    }
    useEffect(() => {
        if (isSuccess) {
            new Notify({
                status: 'success',
                title: `Profile Edit Success`,
                text: `Your Profile SuccesFully Updated.`,
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
    }, [isSuccess])
    useEffect(() => {
        if (isError) {
            new Notify({
                status: 'error',
                title: `Failed To Update Profile.`,
                text: `${error.data.message}`,
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
    }, [isError])
    return <>
        <div className='d-flex justify-content-between'>
            <h5>Add Your Job History</h5>
            <button onClick={e => setJobHistory([...jobHistory, { id: jobHistory.length + 1 }])} type="button" class="btn btn-primary">+ Add</button>
        </div>
        <pre>{JSON.stringify(jobInfo, null, 2)}</pre>
        {jobHistory.map((item, index) => <div>
            <div className='row'>
                <div className='col-sm-4 my-2'>
                    <label className="form-check-label" htmlFor="#company">Company</label>
                    <input
                        onChange={e => handleChange(e)}
                        className='form-control'
                        type="text"
                        name='company'
                        id='company'
                        placeholder='Enter Company' />
                </div>
                <div className='col-sm-4 my-2'>
                    <label className="form-check-label" htmlFor="#join">Join Date</label>
                    <input
                        onChange={e => handleChange(e)}
                        className='form-control'
                        name='joindate'
                        type="date"
                        id='join'
                        placeholder='Enter join date' />
                </div>
                <div className='col-sm-4 my-2'>
                    <label className="form-check-label" htmlFor="#Resign">Resign Date</label>
                    <input
                        onChange={e => handleChange(e)}
                        className='form-control'
                        type="date"
                        name='resigndate'
                        id="Resign"
                        placeholder='Enter resign date' />
                </div>
                <div className='col-sm-4 my-2'>
                    <label className="form-check-label" htmlFor="#role">Job Role</label>
                    <input
                        onChange={e => handleChange(e)}
                        className='form-control'
                        type="text"
                        name='jobrole'
                        id="role"
                        placeholder='Enter Job Role' />
                </div>
                <div className='row'>
                    <div className='row'>
                        <div className='col-sm-4 my-2'>
                            <button
                                onClick={e => setTech([...tech, { id: tech.length + 1 }])}
                                type="button" class="btn btn-info">+1 Tech</button>
                        </div>
                    </div>
                    {tech.map((item, techindex) => <div className='col-sm-4 my-2'>
                        <label className="form-check-label" htmlFor="#role">technology</label>
                        <input
                            onChange={e => handleTech(e, techindex, index)}
                            className='form-control'
                            type="text"
                            id="role"
                            placeholder='Enter tech'
                        />
                        <button disabled={techindex === 0} type="button" onClick={e => setTech(tech.filter(tech => tech.id !== item.id))} className="btn btn-sm w-100 my-1 btn-danger">Remove</button>
                    </div>)}
                </div>
            </div>
            <button type="button" onClick={e => {
                handlePush(e, index)
                setJobHistory([...jobHistory, { id: jobHistory.length + 1 }])
            }} class="btn btn-primary btn-sm w-100 my-2">Add </button>
            <button type="button"
                disabled={index === 0}
                onClick={e => setJobHistory(jobHistory.filter(JH => JH.id !== item.id))}
                className="btn btn-sm btn-danger w-100 mb-4">
                Remove
            </button>
        </div>)}
        <div className='d-flex justify-content-between'>
            <button disabled={paggination === "first"} onClick={e => setPaggination("first")} type="button" class="btn btn-primary mt-3">
                Prev
            </button>
            <button onClick={handleSubmit} type="submit" class="btn btn-primary mt-3">
                Submit
            </button>
        </div>
    </>
}
export default TeamProfileEdit