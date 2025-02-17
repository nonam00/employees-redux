import {useCompanyEdit} from "@/hooks/useCompanyEdit";

export default function CompanyEditForm({
  companyId
}: {
  companyId: number
}) {
  const {title, setTitle, isPending, handleEdit, handleCancel} = useCompanyEdit(companyId);
  return (
    <form className="flex flex-col m-10" onSubmit={handleEdit}>
      <div className="flex flex-row gap-4 align-middle">
        <div className="flex flex-col flex-1">
          <label>Title</label>
          <input
            className="border-1 rounded-sm border-black"
            value={title}
            disabled={isPending}
            onChange={(e) => setTitle(e.target.value)}
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
          className={`
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
            ${isPending ? 'bg-gray-100' : ''}
          `}
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