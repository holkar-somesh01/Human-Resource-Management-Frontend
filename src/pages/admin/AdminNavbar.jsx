import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutAdminMutation } from '../../redux/apis/authApi'
import { adminLogout } from '../../redux/slices/adminauthSlice'

const AdminNavbar = () => {
    const navigate = useNavigate()
    const { admin } = useSelector(state => state.Adminauth)
    const [logoutAdmin, { data, isSuccess, isError, error, isLoading }] = useLogoutAdminMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSuccess) {
            dispatch(adminLogout())
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
                title: "Failed To Logout",
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
        <nav className="navbar navbar-expand-lg bg-info">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to='/admin'>ADMIN Dashboard</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <li><Link className='text-white text-decoration-none text-dark nav-link' to="/admin/add-hr">AddHR</Link></li>
                        <li><Link className='text-white text-decoration-none text-dark nav-link' to="/admin/profile">Profile</Link></li>
                        <li><Link className='text-white text-decoration-none text-dark nav-link' to="/admin/search">Search</Link></li>
                    </div>

                </div>
                <div class="dropdown dropstart">
                    <b className='bg-info-subtle p-2 rounded-3 btn btn-sm dropdown-toggle' id="dropdownMenuButton1" data-bs-toggle="dropdown">Admin</b>
                    <ul class="dropdown-menu">
                        <li><button type="button" class="btn btn-sm"> <span className='p-2'><i className="fs-5 bi bi-person-circle"></i></span>Update Profile</button></li>
                        {isLoading ? <div className='d-flex justify-content-center align-items-center'>
                            <div class="spinner-border text-primary"></div>
                        </div>
                            : <li>
                                <button
                                    onClick={e => logoutAdmin()}
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
        </nav>
    </>
}

export default AdminNavbar