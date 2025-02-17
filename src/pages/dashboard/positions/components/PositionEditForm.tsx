import {usePositionEdit} from "@/hooks/usePositionEdit";

export default function PositionEditForm({
  positionId
}: {
  positionId: number
}) {
  const {
    handleEdit, handleCancel,
    position, setTitle, setSalary,
    isPending
  } = usePositionEdit(positionId);
  return (
    <form className="flex flex-col m-10" onSubmit={handleEdit}>
      <div className="flex flex-row gap-4 align-middle">
        <div className="flex flex-col flex-1">
          <label>Title</label>
          <input
            className="border-1 rounded-sm border-black"
            value={position.title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Salary</label>
          <input
            className="border-1 rounded-sm border-black"
            type="number"
            value={position.salary}
            onChange={(e) => setSalary(parseInt(e.target.value))}
            min={1}
            disabled={isPending}
            required
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
          type="submit"
          disabled={isPending}
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