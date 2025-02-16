import {FormEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import {positionsSlice} from "@/store/positions.slice.ts";

export default function PositionEditForm({
  positionId
}: {
  positionId: number
}) {
  const position = useAppSelector(state =>
    positionsSlice.selectors.selectPosition(state, positionId));
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState(1);

  useEffect(() => {
    setTitle(position.title);
    setSalary(position.salary);
  }, [position]);

  function handleEdit(e: FormEvent) {
    e.preventDefault();
    dispatch(positionsSlice.actions.edit({
      position: {
        id: position.id,
        title,
        salary
      }
    }));
    dispatch(positionsSlice.actions.select({positionId: undefined}));
  }

  function handleCancel() {
    dispatch(positionsSlice.actions.select({positionId: undefined}));
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