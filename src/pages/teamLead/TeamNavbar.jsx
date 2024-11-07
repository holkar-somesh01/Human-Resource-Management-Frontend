import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutTeamLeadMutation } from '../../redux/apis/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { TeamLeadLogout } from '../../redux/slices/adminauthSlice'

const TeamNavbar = () => {
    const navigate = useNavigate()
    const { teamLead } = useSelector(state => state.Adminauth)
    const [logout, { data, isSuccess, isError, error, isLoading }] = useLogoutTeamLeadMutation()
    const dispatch = useDispatch()
    useEffect(() => {
        if (isSuccess) {
            dispatch(TeamLeadLogout())
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
                autotimeout: 5000,
                notificationsGap: null,
                notificationsPadding: null,
                type: 'outline',
                position: 'right top',
                customWrapper: ''
            })
        }
    }, [isError])
    return <>
        <nav class="navbar navbar-expand-lg bg-info">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">TeamLead Dashboard</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <Link to="/teamlead" class="nav-link" href="#">Profile</Link>
                    </div>
                </div>
                <div class="dropdown dropstart">
                    <b className='bg-info-subtle p-2 rounded-3 btn btn-sm dropdown-toggle' id="dropdownMenuButton1" data-bs-toggle="dropdown">TeamLead</b>
                    <ul class="dropdown-menu">
                        <li><button type="button" class="btn btn-sm"> <span className='p-2'><i className="fs-5 bi bi-person-circle"></i></span>  Update Profile</button></li>
                        {isLoading
                            ? <div className='d-flex justify-content-center align-items-center'>
                                <div class="spinner-border text-primary"></div>
                            </div>
                            : <li>
                                <button
                                    onClick={e => logout(teamLead)}
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

export default TeamNavbar