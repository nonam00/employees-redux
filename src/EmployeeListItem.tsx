import {useAppSelector} from "./store";
import {selectEmployee} from "./store/employees.slice.ts";

export default function EmployeeListItem({employeeId}: {employeeId: number}) {
  const employee = useAppSelector(state =>
    selectEmployee(state, employeeId));

  if (!employee) {
    return <p>Error</p>
  }

  return (
    <li className="flex flex-row m-1 gap-1">
      <p className="flex-1">{employee.name}</p>
      <p className="flex-1">{employee.position.title}</p>
      <p className="flex-1">{employee.company.title}</p>
      <p className="flex-1">{employee.position.salary}</p>
    </li>
  )
}