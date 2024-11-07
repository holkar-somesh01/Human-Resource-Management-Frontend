import React, { useEffect, useState } from 'react'
import { useHandleSearchMutation } from '../../redux/apis/hrApi'

const SearchHR = () => {
    const [HandleSearch, { data, isSuccess, isLoading, isError, error }] = useHandleSearchMutation()
    const [SearchData, setSearchData] = useState()
    useEffect(() => {
        if (isSuccess) {
            new Notify({
                status: 'success',
                title: 'Search Success',
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
    return <>
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <div className="card">
                        <div className="card-header">Search</div>
                        <div className="card-body">
                            <pre>{JSON.stringify(SearchData, null, 2)}</pre>
                            <input onChange={e => setSearchData(e.target.value)} type="text" className='form-control my-2' placeholder='Search' />
                            <button onClick={e => {
                                console.log("Cliced")
                                HandleSearch({ search: SearchData })
                            }} type="button" class="btn btn-sm btn-info w-100">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <table class="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Email</th>
                    <th scope="col">Department</th>
                    <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    data && data.result.map(item => <tr>
                        <td>{item.name}</td>
                        <td>{item.role}</td>
                        <td>{item.email}</td>
                        <td>{item.department}</td>
                        <td>{item.status}</td>
                    </tr>)
                }
            </tbody>
        </table>
    </>
}

export default SearchHR