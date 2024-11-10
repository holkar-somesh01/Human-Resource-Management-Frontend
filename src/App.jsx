import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'
import Protected from './share/Protected'
import AdminLayout from './pages/admin/AdminLayout'
import AddHR from './component/admin/AddHR'
import Profile from './component/admin/Profile'
import Login from './authentication/Login'
import Empolyee from './component/admin/Empolyee'
import TeamLead from './component/admin/TeamLead'
import HRView from './component/admin/HRView'
import Leaves from './component/admin/Leaves'
import HrLayout from './pages/HR/HrLayout'
import HrDashboard from './pages/HR/HrDashboard'
import AddEmployee from './component/hr/AddEmployee'
import HrEmployee from './component/hr/HrEmployee'
import HrProfile from './pages/HR/HrProfile'
import EditProfile from './component/hr/EditProfile'
import EmployeeDetails from './component/hr/EmployeeDetails'
import Home from './share/Home'
import TeamLayout from './pages/teamLead/TeamLayout'
import TeamProfile from './component/team/TeamProfile'
import TeamProfileEdit from './component/team/teamProfileEdit'
import TeamLeaveRequest from './pages/teamLead/TeamLeaveRequest'
import TeamLeave from './component/team/TeamLeave'
import EmpLayout from './pages/employee/EmpLayout'
import EmpProfile from './component/employee/EmpProfile'
import EmpProfileEdit from './component/employee/EmpProfileEdit'
import EmpLeaveRequest from './pages/employee/EmpLeaveRequest'
import EmpLeave from './component/employee/EmpLeave'
import TeamLeadProtected from './share/TeamLeadProtected'
import HrProtected from './share/HrProtected'
import EmployeeProtected from './share/EmployeeProtected'
import EmployeeAttendence from './component/admin/EmployeeAttendence'
import TeamLeadAttendence from './component/admin/TeamLeadAttendence'
import HRLeaveSend from './component/hr/HRLeaveSend'
import HrLeave from './component/admin/HrLeave'
import Search from './pages/admin/Search'
import SearchHR from './pages/HR/SearchHR'
import EmpCalender from './component/employee/EmpCalender'
import TeamCalender from './component/team/TeamCalender'
import HrCalender from './component/hr/HrCalender'
import LateEmpData from './pages/admin/LateEmpData'
import "./index.css"
import AbsentEmployees from './component/admin/AbsentEmployees'
import HrTeamLead from './component/hr/HrTeamLead'

const App = () => {
  return <>
    {/* <Demo /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/employee" element={<EmployeeProtected compo={<EmpLayout />} />}>
          <Route index element={<EmpProfile />} />
          <Route path='edit-profile' element={<EmpProfileEdit />} />
          <Route path='send-request' element={<EmpLeaveRequest />} />
          <Route path='view-leave' element={<EmpLeave />} />
          <Route path='emp-cal' element={<EmpCalender />} />
          {/* <Route path='emp' element={<Fetch />} /> */}
        </Route>
        <Route path="/teamlead" element={<TeamLeadProtected compo={<TeamLayout />} />}>
          <Route index element={<TeamProfile />} />
          <Route path='edit-profile' element={<TeamProfileEdit />} />
          <Route path='send-request' element={<TeamLeaveRequest />} />
          <Route path='view-leave' element={<TeamLeave />} />
          <Route path='team-cal' element={<TeamCalender />} />
        </Route>
        <Route path="/hr" element={<HrProtected compo={<HrLayout />} />}>
          <Route index element={<HrDashboard />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="leave" element={<Leaves />} />
          <Route path="employee-attendence" element={<EmployeeAttendence />} />
          <Route path="teamlead-attendence" element={<TeamLeadAttendence />} />
          <Route path="employee" element={<HrEmployee />} />
          <Route path="teamLead" element={<HrTeamLead />} />
          <Route path="hr-profile" element={<HrProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="employee-detail" element={<EmployeeDetails />} />
          <Route path="send-request" element={<HRLeaveSend />} />
          <Route path="search" element={<SearchHR />} />
          <Route path='hr-cal' element={<HrCalender />} />
        </Route>
        <Route path="/admin" element={<Protected compo={<AdminLayout />} />}>
          <Route index element={<LateEmpData />} />
          <Route path="employee-attendence" element={<EmployeeAttendence />} />
          <Route path="teamlead-attendence" element={<TeamLeadAttendence />} />
          <Route path="add-hr" element={<AddHR />} />
          <Route path="profile" element={<Profile />} />
          <Route path="employee" element={<Empolyee />} />
          <Route path="teamLead" element={<TeamLead />} />
          <Route path="hr" element={<HRView />} />
          <Route path="leave" element={<HrLeave />} />
          <Route path="search" element={<Search />} />
          <Route path="absent-Employee" element={<AbsentEmployees />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </>
}

export default App