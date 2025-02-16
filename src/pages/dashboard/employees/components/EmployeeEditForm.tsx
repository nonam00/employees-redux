import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import { employeesSlice} from "@/store/employees.slice.ts";
import {companiesSlice} from "@/store/companies.slice.ts";
import {positionsSlice} from "@/store/positions.slice.ts";
import CompanyOptionItem from "./CompanyOptionItem.tsx";
import PositionOptionItem from "./PositionOptionItem.tsx";

export default function EmployeeEditForm({
  employeeId
}: {
  employeeId: number
}) {
  const employee = useAppSelector(state =>
    employeesSlice.selectors.selectEmployee(state, employeeId));
  const companiesIds = useAppSelector(companiesSlice.selectors.selectCompaniesIds);
  const positionsIds = useAppSelector(positionsSlice.selectors.selectPositionsIds);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [positionId, setPositionId] = useState<number>(1);
  const [companyId, setCompanyId] = useState<number>(1);

  useEffect(() => {
    setName(employee.name);
    setBirthdate(`${employee.birthday.year}-${employee.birthday.month}-${employee.birthday.day}`);
    setPositionId(employee.positionId);
    setCompanyId(employee.companyId);
  }, [employee]);

  function handleEdit(e: FormEvent) {
    e.preventDefault();
    const [year, month, day] = birthdate.split("-").map(Number);
    dispatch(employeesSlice.actions.edit({
      employee: {
        id: employeeId,
        name,
        positionId,
        companyId,
        birthday: {
          year,
          month,
          day
        }
      }
    }));
    dispatch(employeesSlice.actions.select({employeeId: undefined}));
  }

  function handleCancel() {
    dispatch(employeesSlice.actions.select({employeeId: undefined}));
  }

  return (
    <form className="flex flex-col m-10" onSubmit={handleEdit}>
      <div className="flex flex-row gap-4 align-middle">
        <div className="flex flex-col flex-1">
          <label>Name</label>
          <input
            className="border-1 rounded-sm border-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Birthdate</label>
          <input
            className="border-1 rounded-sm border-black"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Company</label>
          <select
            className="border-1 rounded-sm border-black"
            value={companyId}
            onChange={(e) => setCompanyId(parseInt(e.target.value))}
          >
            {companiesIds.map((id) => (<CompanyOptionItem companyId={id} key={id} />))}
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label>Position</label>
          <select
            className="border-1 rounded-sm border-black"
            value={positionId}
            onChange={(e) => setPositionId(parseInt(e.target.value))}
          >
            {positionsIds.map((id) => (<PositionOptionItem positionId={id} key={id} />))}
          </select>
        </div>
      </div>
      <div className="flex flex-row justify-center">
        <button
          className="
            rounded-sm
            px-3
            py-1
            m-1
            text-black
            bg-transparent
            hover:bg-blue-500
            hover:text-white
            cursor-pointer
            transition
          "
          type="submit"
        >
          Edit
        </button>
        <button
          className="
            rounded-sm
            px-3
            py-1
            m-1
            text-black
            bg-transparent
            hover:bg-red-500
            hover:text-white
            cursor-pointer
            transition
          "
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}