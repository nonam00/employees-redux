import EmployeeListItem from "./EmployeeListItem.tsx";
import {useAppSelector} from "./store";
import {selectEmployeeIds} from "./store/employees.slice.ts";

export default function EmployeeList() {
  const employeeIds = useAppSelector(selectEmployeeIds);
  return (
    <div className="flex flex-col items-center justify-center w-200">
      <div className="flex flex-row gap-1 items-center w-full m-3 border-b-1">
        <b className="flex-1">Name</b>
        <b className="flex-1">Position</b>
        <b className="flex-1">Title</b>
        <b className="flex-1">Salary</b>
        <b className="flex-1">Birthday</b>
      </div>
      <ul className="flex flex-col list-none w-full">
        {employeeIds.map((employeeId) => (
          <EmployeeListItem employeeId={employeeId} key={employeeId}/>
        ))}
      </ul>
    </div>
  )
}