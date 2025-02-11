import EmployeeListItem from "./EmployeeListItem.tsx";
import {memo} from "react";
import {useAppDispatch, useAppSelector} from "./store";
import {
  removeEmployeeAction,
  selectEmployeeAction,
  selectEmployeeIds,
  selectSelectedEmployeeId,
} from "./store/employees.slice.ts";
import EditForm from "./EditForm.tsx";
import AddForm from "./AddForm.tsx";

const DashboardItem = memo(function DashboardItem({
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
        onClick={() => dispatch(selectEmployeeAction({employeeId}))}
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
        onClick={() => dispatch(removeEmployeeAction({employeeId}))}
      >
        Delete
      </button>
    </div>
  )
});

export default function Dashboard(){
  const employeeIds = useAppSelector(selectEmployeeIds);
  const selectedId = useAppSelector(selectSelectedEmployeeId);

  return (
    <div className="flex flex-col m-15">
      <h1 className="text-3xl m-5">Employees dashboard editor:</h1>
      {selectedId === undefined ? <AddForm/> : <EditForm employeeId={selectedId} />}
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
            <DashboardItem employeeId={employeeId} key={employeeId}/>
          ))}
        </ul>
      </div>
    </div>
  )
}