import {memo} from "react";
import {useAppSelector} from "./store";
import {employeesSlice} from "./store/employees.slice.ts";

const EmployeeListItem = memo(function EmployeeListItem({
  employeeId
}: {
  employeeId: number
}) {
  const employee = useAppSelector(state =>
    employeesSlice.selectors.selectEmployee(state, employeeId));

  if (!employee) {
    return <p>Error!</p>
  }

  return (
    <li className="flex flex-row m-1 gap-1">
      <p className="flex-1">{employee.name}</p>
      <p className="flex-1">{employee.position.title}</p>
      <p className="flex-1">{employee.company.title}</p>
      <p className="flex-1">{employee.position.salary}</p>
      <p className="flex-1">
        {employee.birthday.day}/{employee.birthday.month}/{employee.birthday.year}
      </p>
    </li>
  )
});

export default EmployeeListItem;