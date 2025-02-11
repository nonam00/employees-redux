import EmployeeListItem from "./EmployeeListItem.tsx";
import {useAppSelector} from "./store";
import {Employee} from "./store/employees.slice.ts";

export default function EmployeeList() {
  const employees = useAppSelector(state => state.employees);
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
        {employees.map((employee: Employee, key) => (
          <EmployeeListItem employeeId={employee.id} key={key}/>
        ))}
      </ul>
    </div>
  )
}