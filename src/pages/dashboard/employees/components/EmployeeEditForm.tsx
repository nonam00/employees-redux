import CompaniesOptions from "./CompaniesOptions.tsx";
import PositionsOptions from "./PositionsOptions.tsx";
import {useEmployeeEdit} from "@/hooks/useEmployeeEdit";

export default function EmployeeEditForm({
  employeeId
}: {
  employeeId: number
}) {
  const {
    handleEdit, handleCancel,
    employee,
    setName, setBirthday, setPositionId, setCompanyId,
    isPending
  } = useEmployeeEdit(employeeId);
  return (
    <form className="flex flex-col m-10" onSubmit={handleEdit}>
      <div className="flex flex-row gap-4 align-middle">
        <div className="flex flex-col flex-1">
          <label>Name</label>
          <input
            className="border-1 rounded-sm border-black"
            value={employee.name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Birthdate</label>
          <input
            className="border-1 rounded-sm border-black"
            type="date"
            value={employee.birthday}
            onChange={(e) => setBirthday(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Company</label>
          <CompaniesOptions
            isPending={isPending}
            setCompanyIdCallback={setCompanyId}
            value={employee.companyId}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Position</label>
          <PositionsOptions
            isPending={isPending}
            setPositionIdCallback={setPositionId}
            value={employee.positionId}
          />
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
          disabled={isPending}
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
          disabled={isPending}
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}