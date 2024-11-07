import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const EmployeeProtected = ({ compo }) => {
    const { employee } = useSelector(state => state.Adminauth)
    const { hr } = useSelector(state => state.Adminauth)
    return <>
        {employee ? <>{compo}</> : <>
            <div className="container 100-vh">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div>
                            <h1>Employee Not Login</h1>
                            <p>Please Login to access Admin Dashboard</p>
                            <Link to="/" type="button" class="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
        }
    </>
}

export default EmployeeProtected