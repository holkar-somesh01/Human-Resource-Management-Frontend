import React from 'react'
import { useGetHrProfileQuery } from '../../redux/apis/hrApi'

const HRDetails = () => {
    const { data } = useGetHrProfileQuery()
    return <>
        <div className='mt-5'>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {data && data.map(item => <div className="col-sm-6 my-2">
                <div className="card">
                    <img style={{ height: 300, width: "100%", }} className='img-fluid' src={item.documents.resume} alt="" />
                </div>
            </div>)}
            <div className="container mt-5 mb-5">
                <div className="row">
                    <h1 className=' text-decoration-underline'>Expirence Letter</h1>
                    {data && data.map(item => item.documents.expletter.map(exp =>
                        <div className="col-sm-6 my-2">
                            <div className="card people-1">
                                <img className='img-fluid position-absolute h-100 w-100' src={exp} alt="" />
                                <div class="card-body">

                                    <div className='position-relative'>
                                        <div className='d-flex gap-4 mt-4'>
                                            <i className="people bi bi-people-fill"></i>
                                            <strong>{item.department}</strong>
                                        </div>
                                        <div className='mt-5'>
                                            <p>Find a teacher, coach, or expert for your hobby interest in your locality.  Find a partner, teammate, accompanist or collaborator.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                    <h1 className='mt-5 text-decoration-underline'>Other Documents</h1>
                    {data && data.map(item => item.documents.other.map(other =>
                        <div className="col-sm-6 my-2">
                            <div className="card people-1">
                                <img className='img-fluid position-absolute h-100 w-100' src={other} alt="" />
                                <div class="card-body">

                                    <div className='position-relative'>
                                        <div className='d-flex gap-4 mt-4'>
                                            <i className="people bi bi-people-fill"></i>
                                            <strong>{item.department}</strong>
                                        </div>
                                        <div className='mt-5'>
                                            <p>Find a teacher, coach, or expert for your hobby interest in your locality.  Find a partner, teammate, accompanist or collaborator.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    )}
                    <h2 className='mt-4'>Job History</h2>
                    {data && data.map(item =>
                        item.jobHistory.map((other, index) =>
                            <div className="col-sm-6 my-2">
                                <div className={`card people-${index + 1}`}>
                                    <div class="card-body">
                                        <div className='position-relative'>
                                            <div className='d-flex gap-4 mt-4'>
                                                <i className="people bi bi-people-fill"></i>
                                                <strong>{other.company && other.company}</strong>
                                                <strong>{other.jobrole}</strong>
                                            </div>
                                            <div className='d-flex gap-4 mt-4'>
                                                <span><span>Join Date : </span>{other.joindate}</span>
                                                <span><span>Resign Date : </span>{other.resigndate}</span>
                                            </div>
                                            <div className='mt-5'>
                                                {
                                                    other.tech.map(tech =>
                                                        <span className="p-2">{tech}</span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div >
    </>
}

export default HRDetails