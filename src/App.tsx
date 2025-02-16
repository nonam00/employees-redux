import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import EmployeeList from "@/pages/EmployeeList.tsx";
import EmployeesDashboard from "@/pages/dashboard/employees/EmployeesDashboard.tsx";
import CompaniesDashboard from "@/pages/dashboard/companies/CompaniesDashboard.tsx";
import PositionsDashboard from "@/pages/dashboard/positions/PositionsDashboard.tsx";
import MainHeader from "@/components/MainHeader.tsx";
import DashboardHeader from "@/components/DashboardHeader.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <MainHeader />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/dashboard" >
            <Route path="" element={<DashboardHeader />} />
            <Route path="employees" element={<EmployeesDashboard />} />
            <Route path="companies" element={<CompaniesDashboard />} />
            <Route path="positions" element={<PositionsDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
