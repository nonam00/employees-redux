import {FormEvent, memo, useState} from "react";
import {useAppDispatch} from "./store";
import {companies, employeesSlice, positions} from "./store/employees.slice.ts";

const AddForm = memo(function AddForm() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [positionId, setPositionId] = useState<number>(0);
  const [companyId, setCompanyId] = useState<number>(0);

  const dispatch = useAppDispatch();
  function handle(e: FormEvent) {
    e.preventDefault();
    const [year, month, day] = birthdate.split('-').map(Number);
    dispatch(employeesSlice.actions.add({
      name,
      position: positions[positionId],
      company: companies[companyId],
      birthday: {
        year,
        month,
        day
      }
    }));
  }

  return (
    <form
      className="flex flex-col m-10"
      onSubmit={handle}
    >
      <div className="flex flex-row gap-4">
        <div className="flex flex-col flex-1">
          <label>Name</label>
          <input
            className="border-1 rounded-sm border-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            required
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
            required
          >
            <option value={0}>Developer</option>
            <option value={1}>Tester</option>
          </select>
        </div>
      </div>
      <div>
        <button
          className="border-1 border-black rounded-sm px-3 py-1 m-1 hover:bg-gray-100"
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  )
});

export default AddForm;