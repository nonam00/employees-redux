import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import EmployeeList from "./EmployeeList.tsx";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import Dashboard from "./Dashboard.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/dashboard" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App
