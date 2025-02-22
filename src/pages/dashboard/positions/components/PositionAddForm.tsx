import {FormEvent, useRef, useState, useTransition} from "react";
import {useAppDispatch} from "@/store";
import {positionsSlice} from "@/store/positions.slice";

export default function PositionAddForm() {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");

  const [isPending, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);

  function handle(e: FormEvent) {
    startTransition(() => {
      e.preventDefault();
      dispatch(positionsSlice.actions.add({
        title,
        salary: parseInt(salary)
      }));
      formRef.current?.reset()
    })
  }

  return (
    <form
      className="flex flex-col m-10"
      ref={formRef}
      onSubmit={handle}
    >
      <div className="flex flex-row gap-4">
        <div className="flex flex-col flex-1">
          <label>Title</label>
          <input
            className="border-1 rounded-sm border-black"
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
            onChange={(e) => setSalary(e.target.value)}
            min={1}
            disabled={isPending}
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