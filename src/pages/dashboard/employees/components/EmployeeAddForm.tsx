import PositionsOptions from "./PositionsOptions";
import CompaniesOptions from "./CompaniesOptions";
import {useEmployeeAdd} from "@/hooks/useEmployeeAdd";
import {FormEvent, useRef} from "react";

export default function EmployeeAddForm() {
  const {
    handle,
    setName, setBirthdate, setPositionId, setCompanyId,
    isPending
  } = useEmployeeAdd();

  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    handle();
    formRef.current?.reset();
  }

  return (
    <form
      className="flex flex-col m-10"
      ref={formRef}
      onSubmit={handleSubmit}
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
          <CompaniesOptions
            isPending={isPending}
            setCompanyIdCallback={setCompanyId}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Position</label>
          <PositionsOptions
            isPending={isPending}
            setPositionIdCallback={setPositionId}
          />
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