import {memo} from "react";
import EmployeeListItem from "@/components/EmployeeListItem";
import EmployeeEditForm from "./components/EmployeeEditForm";
import EmployeeAddForm from "./components/EmployeeAddForm"
import {employeesSlice} from "@/store/employees.slice";
import {useAppDispatch, useAppSelector} from "@/store";
import DashboardHeader from "@/components/DashboardHeader";

const EmployeeDashboardItem = memo(function EmployeeDashboardItem({
  employeeId
}: {
  employeeId: number
}) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-row">
      <div className="flex-5">
        <EmployeeListItem employeeId={employeeId}/>
      </div>
      <button
        className="
          flex-1
          rounded-sm
          bg-transparent
          text-black
          hover:bg-blue-500
          hover:text-white
          cursor-pointer
          transition
        "
        onClick={() => dispatch(employeesSlice.actions.select({employeeId}))}
      >
        Edit
      </button>
      <button
        className="
          flex-1
          rounded-sm
          bg-transparent
          text-black
          hover:bg-red-500
          hover:text-white
          cursor-pointer
          transition
        "
        onClick={() => dispatch(employeesSlice.actions.remove({employeeId}))}
      >
        Delete
      </button>
    </div>
  )
});

export default function EmployeesDashboard(){
  const employeeIds = useAppSelector(employeesSlice.selectors.selectEmployeeIds);
  const selectedId = useAppSelector(employeesSlice.selectors.selectSelectedEmployeeId);
  return (
    <>
      <DashboardHeader/>
      <div className="flex flex-col m-15">
        <h1 className="text-3xl m-5">Employees dashboard editor:</h1>
        {selectedId === undefined ? <EmployeeAddForm/> : <EmployeeEditForm employeeId={selectedId}/>}
        <div className="flex flex-col items-center justify-center w-200">
          <div className="flex flex-row items-center w-200 border-b-1">
            <b className="flex-1">Name</b>
            <b className="flex-1">Position</b>
            <b className="flex-1">Title</b>
            <b className="flex-1">Salary</b>
            <b className="flex-1">Birthday</b>
            <b className="flex-1">Edit</b>
            <b className="flex-1">Delete</b>
          </div>
          <ul className="flex flex-col list-none w-full">
            {employeeIds.map((employeeId) => (
              <EmployeeDashboardItem employeeId={employeeId} key={employeeId}/>
            ))}
          </ul>
        </div>
      </div>
    </>

  )
}