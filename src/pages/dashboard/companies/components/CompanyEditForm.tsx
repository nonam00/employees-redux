import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import {companiesSlice} from "@/store/companies.slice.ts";

export default function CompanyEditForm({
  companyId
}: {
  companyId: number
}) {
  const company = useAppSelector(state =>
    companiesSlice.selectors.selectCompany(state, companyId));
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(company.title);
  }, [company]);

  function handleEdit(e: FormEvent) {
    e.preventDefault();
    dispatch(companiesSlice.actions.edit({
      company: {
        id: company.id,
        title
      }
    }));
    dispatch(companiesSlice.actions.select({companyId: undefined}));
  }

  function handleCancel() {
    dispatch(companiesSlice.actions.select({companyId: undefined}));
  }

  return (
    <form className="flex flex-col m-10" onSubmit={handleEdit}>
      <div className="flex flex-row gap-4 align-middle">
        <div className="flex flex-col flex-1">
          <label>Title</label>
          <input
            className="border-1 rounded-sm border-black"
            value={title}
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