import {memo} from "react";
import {useEmployeeData} from "@/hooks/useEmployeeData.ts";

const EmployeeListItem = memo(function EmployeeListItem({
  employeeId
}: {
  employeeId: number
}) {
  const employee = useEmployeeData(employeeId);

  return (
    <li className="flex flex-row m-1 gap-1">
      <p className="flex-1">{employee.name}</p>
      <p className="flex-1">{employee.position ?? ""}</p>
      <p className="flex-1">{employee.company ?? ""}</p>
      <p className="flex-1">{employee.salary ?? ""}</p>
      <p className="flex-1">
        {employee.birthday.day}/{employee.birthday.month}/{employee.birthday.year}
      </p>
    </li>
  )
});

export default EmployeeListItem;