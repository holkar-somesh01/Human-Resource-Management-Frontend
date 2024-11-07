import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

const Protected = ({ compo }) => {
    const { admin } = useSelector(state => state.Adminauth)
    const { teamLead } = useSelector(state => state.Adminauth)
    const { employee } = useSelector(state => state.Adminauth)
    const { hr } = useSelector(state => state.Adminauth)
    return <>
        {admin ? <>{compo}</> : <>
            <div className="container 100-vh">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3">
                        <div>
                            <h1>Admin Not Login</h1>
                            <p>Please Login to access Admin Dashboard</p>
                            <Link to="/" type="button" class="btn btn-primary">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>}

    </>
}

export default Protected