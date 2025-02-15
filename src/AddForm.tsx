import {FormEvent, memo, useState} from "react";
import {useAppDispatch, useAppSelector} from "./store";
import {employeesSlice} from "./store/employees.slice.ts";
import {companiesSlice} from "./store/companies.slice.ts";
import {positionsSlice} from "./store/positions.slice.ts";
import CompanyItem from "./CompanyItem.tsx";
import PositionItem from "./PositionItem.tsx";

const AddForm = memo(function AddForm() {
  const companiesIds = useAppSelector(companiesSlice.selectors.selectIds);
  const positionsIds = useAppSelector(positionsSlice.selectors.selectIds);
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [positionId, setPositionId] = useState<number>(1);
  const [companyId, setCompanyId] = useState<number>(1);

  function handle(e: FormEvent) {
    e.preventDefault();
    const [year, month, day] = birthdate.split('-').map(Number);
    dispatch(employeesSlice.actions.add({
      name,
      positionId: positionId,
      companyId: companyId,
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
            {companiesIds.map((id) => (<CompanyItem companyId={id} key={id} />))}
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
            {positionsIds.map((id) => (<PositionItem positionId={id} key={id} />))}
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