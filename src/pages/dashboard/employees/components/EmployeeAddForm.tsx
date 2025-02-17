import PositionsOptions from "./PositionsOptions";
import CompaniesOptions from "./CompaniesOptions";
import {useEmployeeAdd} from "@/hooks/useEmployeeAdd";

export default function EmployeeAddForm() {
  const {
    handle,
    setName, setBirthdate, setPositionId, setCompanyId,
    isPending
  } = useEmployeeAdd();

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
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Birthdate</label>
          <input
            className="border-1 rounded-sm border-black"
            type="date"
            onChange={(e) => setBirthdate(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Company</label>
          <select
            className="border-1 rounded-sm border-black"
            onChange={(e) => setCompanyId(parseInt(e.target.value))}
            disabled={isPending}
            required
          >
            <CompaniesOptions />
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label>Position</label>
          <select
            className="border-1 rounded-sm border-black"
            onChange={(e) => setPositionId(parseInt(e.target.value))}
            disabled={isPending}
            required
          >
            <PositionsOptions />
          </select>
        </div>
      </div>
      <div>
        <button
          className="border-1 border-black rounded-sm px-3 py-1 m-1 hover:bg-gray-100"
          disabled={isPending}
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  )
};