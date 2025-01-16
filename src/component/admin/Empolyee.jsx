import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Notify from 'simple-notify'
import { useLazyFetchEmployeesQuery } from '../../redux/apis/adminApi'

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
                        </div>
                            : data?.length === 0
                                ? <div className='d-flex justify-content-center align-items-center p-5'>
                                    <h1>
                                        No Employee's Found
                                    </h1>
                                </div>
                                : <div className="row ">
                                    {data && data.map(item => <div className="col-sm-4 my-2">
                                        <div class="card"><div class="card-body">
                                            <div className='d-flex gap-3'>
                                                <img style={{ height: 100, width: 100, borderRadius: 550, objectFit: "cover" }} src={item.documents.photo} alt={`Profile Photo`} />
                                                <div>
                                                    <h5>{item.name}</h5>
                                                    <span className='fs-6'>{item.department}</span>
                                                    <div className='fs-6'>{item.role}</div>
                                                </div>
                                            </div>
                                            <button type="button" className="btn w-100 my-2 btn-info">View Details</button>
                                        </div>
                                        </div>
                                    </div>
                                    )}
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div >
    </>
}

export default Empolyee