import {useAppSelector} from "@/store";
import {employeesSlice} from "@/store/employees.slice.ts";
import {positionsSlice} from "@/store/positions.slice.ts";
import {companiesSlice} from "@/store/companies.slice.ts";

export const useEmployeeData = (
  employeeId: number
) => {
  const employee = useAppSelector(state =>
    employeesSlice.selectors.selectEmployee(state, employeeId));
  const employeePosition = useAppSelector(state =>
    positionsSlice.selectors.selectPosition(state, employee.positionId));
  const employeeCompany = useAppSelector(state =>
    companiesSlice.selectors.selectCompany(state, employee.companyId));

  return {
    name: employee.name,
    position: employeePosition.title,
    company: employeeCompany.title,
    salary: employeePosition.salary,
    birthday: employee.birthday,
  }
}