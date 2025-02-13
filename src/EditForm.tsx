import {FormEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "./store";
import {companies, employeesSlice, positions} from "./store/employees.slice.ts";

export default function EditForm({employeeId}: {employeeId: number}) {
  const employee = useAppSelector(state =>
    employeesSlice.selectors.selectEmployee(state, employeeId));
  const [name, setName] = useState(employee.name);
  const [birthdate, setBirthdate] = useState(`${employee.birthday.year}-${employee.birthday.month}-${employee.birthday.day}`);
  const [positionId, setPositionId] = useState(employee.position.id - 1);
  const [companyId, setCompanyId] = useState(employee.company.id - 1);
  const dispatch = useAppDispatch();

  function handleEdit(e: FormEvent) {
    e.preventDefault();
    const [year, month, day] = birthdate.split("-").map(Number);
    dispatch(employeesSlice.actions.edit({
      employee: {
        id: employeeId,
        name: name,
        position: positions[positionId + 1],
        company: companies[companyId + 1],
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
      <div className="flex flex-row gap-4">
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
            <option value={0}>Yandex</option>
            <option value={1}>Ozon</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label>Position</label>
          <select
            className="border-1 rounded-sm border-black"
            value={positionId}
            onChange={(e) => setPositionId(parseInt(e.target.value))}
          >
            <option value={0}>Developer</option>
            <option value={1}>Tester</option>
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