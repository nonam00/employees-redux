import {memo} from "react";
import {useAppSelector} from "@/store";
import {employeesSlice} from "@/store/employees.slice";
import {positionsSlice} from "@/store/positions.slice";
import {companiesSlice} from "@/store/companies.slice";

const EmployeeListItem = memo(function EmployeeListItem({
  employeeId
}: {
  employeeId: number
}) {
  const employee = useAppSelector(state =>
    employeesSlice.selectors.selectEmployee(state, employeeId));
  const employeePosition = useAppSelector(state =>
    positionsSlice.selectors.selectPosition(state, employee.positionId));
  const employeeCompany = useAppSelector(state =>
    companiesSlice.selectors.selectCompany(state, employee.companyId));

  if (!employee) {
    return <p>Error!</p>
  }

  return (
    <li className="flex flex-row m-1 gap-1">
      <p className="flex-1">{employee.name}</p>
      <p className="flex-1">{employeePosition?.title}</p>
      <p className="flex-1">{employeeCompany?.title}</p>
      <p className="flex-1">{employeePosition?.salary}</p>
      <p className="flex-1">
        {employee.birthday.day}/{employee.birthday.month}/{employee.birthday.year}
      </p>
    </li>
  )
});

export default EmployeeListItem;