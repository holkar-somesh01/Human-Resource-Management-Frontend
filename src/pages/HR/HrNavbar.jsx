import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutHRMutation } from '../../redux/apis/authApi'
import { HRLogout } from '../../redux/slices/adminauthSlice'

const HrNavbar = () => {
    const navigate = useNavigate()
    const { hr } = useSelector(state => state.Adminauth)
    const [logout, { data, isSuccess, isError, error, isLoading }] = useLogoutHRMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            dispatch(HRLogout())
            navigate("/")
            new Notify({
                status: 'success',
                title: 'Log Out Success',
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
                text: `${JSON.stringify(error, null, 2)}`,
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
        <nav className="navbar navbar-expand-lg bg-info">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to='/hr'>HR Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <li><Link className='text-white text-decoration-none text-dark nav-link' to="/hr/add-employee">Add Employee's</Link></li>
                        <li><Link className='text-white text-decoration-none text-dark nav-link' to="/hr/hr-profile">Profile</Link></li>
                        <li><Link className='text-white text-decoration-none text-dark nav-link' to="/hr/search">Search</Link></li>
                    </div>
                </div>
                <div className=''>
                    {/* <b>Welcome {hr && hr.name}</b> */}
                    <div class="dropdown dropstart">
                        <b className='bg-info-subtle p-2 rounded-3 btn btn-sm dropdown-toggle' id="dropdownMenuButton1" data-bs-toggle="dropdown">HR</b>
                        <ul class="dropdown-menu">
                            <li><Link to="/hr/edit-profile" type="button" class="btn btn-sm"> <span className='p-2'><i className="fs-5 bi bi-person-circle"></i></span>  Update Profile</Link></li>
                            {isLoading
                                ? <div className='d-flex justify-content-center align-items-center'>
                                    <div class="spinner-border text-primary"></div>
                                </div>
                                : <li>
                                    <button
                                        onClick={e => logout(hr)}
                                        type="button"
                                        className="btn btn-sm">
                                        <span className='p-2'>
                                            <i className="fs-5 bi bi-box-arrow-left"></i>
                                        </span>
                                        LogOut
                                    </button>
                                </li>}
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    </>
}

export default HrNavbar