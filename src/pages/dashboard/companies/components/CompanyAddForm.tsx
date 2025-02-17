import {FormEvent, useState, useTransition} from "react";
import {useAppDispatch} from "@/store";
import {companiesSlice} from "@/store/companies.slice";

export default function CompanyAddForm() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  function handle(e: FormEvent) {
    startTransition(() => {
      e.preventDefault();
      dispatch(companiesSlice.actions.add({
        title
      }));
    })
  }

  return (
    <form
      className="flex flex-col m-10"
      onSubmit={handle}
    >
      <div className="flex flex-row gap-4">
        <div className="flex flex-col flex-1">
          <label>Title</label>
          <input
            className="border-1 rounded-sm border-black"
            value={title}
            disabled={isPending}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <button
          className="border-1 border-black rounded-sm px-3 py-1 m-1 hover:bg-gray-100"
          type="submit"
          disabled={isPending}
        >
          Add
        </button>
      </div>
    </form>
  )
};