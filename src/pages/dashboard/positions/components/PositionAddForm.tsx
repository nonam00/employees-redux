import {FormEvent, useState} from "react";
import {useAppDispatch} from "@/store";
import {positionsSlice} from "@/store/positions.slice.ts";

export default function PositionAddForm() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState(1);

  function handle(e: FormEvent) {
    e.preventDefault();
    dispatch(positionsSlice.actions.add({
      title,
      salary,
    }));
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
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Title</label>
          <input
            className="border-1 rounded-sm border-black"
            type="number"
            value={salary}
            onChange={(e) => setSalary(parseInt(e.target.value))}
            min={1}
            required
          />
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
};