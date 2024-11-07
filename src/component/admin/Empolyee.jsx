import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLazyFetchEmployeesQuery } from '../../redux/apis/hrApi'
import Notify from 'simple-notify'

const Empolyee = () => {
    const { admin } = useSelector(state => state.Adminauth)
    const [FetchEmployee, { data, isError, error, isLoading, isSuccess, isFetching }] = useLazyFetchEmployeesQuery()
    console.log(isFetching)
    useEffect(() => {
        FetchEmployee()
    }, [])
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
    return <>
        <div className='p-3 bg-light'>
            <div>
                <h3>WelCome Admin!</h3>
                <p>Dashboard</p>
                <div className='p-5'>
                    <h1 className='text-decoration-underline text-body-secondary text-center mb-2'>Employes</h1>
                    <div className="container">
                        {isFetching ? <div className=' d-flex justify-content-center align-items-center flex-grow-1'>
                            <div class="spinner-border text-primary"></div>
                        </div> : <div className="row ">
                            {data && data.map(item => <div className="col-sm-4 my-2">
                                <div class="card"><div class="card-body">
                                    <div className='d-flex gap-3'>
                                        <img style={{ height: 100, width: 100, borderRadius: 550, objectFit: "cover" }} src="https://images.unsplash.com/photo-1727950183920-654c2feee258?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                                        <div>
                                            <h5>{item.name}</h5>
                                            <span className='fs-6'>{item.department}</span>
                                            <div className='fs-6'>{item.role}</div>
                                        </div>
                                    </div>
                                    <button type="button" className="btn w-100 my-2 btn-info">View Details</button>
                                </div>
                                </div>
                            </div>)}
                        </div>}
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default Empolyee