import {useAppDispatch, useAppSelector} from "@/store";
import {positionsSlice} from "@/store/positions.slice.ts";
import {FormEvent, useLayoutEffect, useState, useTransition} from "react";

export const usePositionEdit = (
  positionId: number
) => {
  const position = useAppSelector(state =>
    positionsSlice.selectors.selectPosition(state, positionId));
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState(1);

  const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    setTitle(position.title);
    setSalary(position.salary);
  }, [position]);

  function handleEdit(e: FormEvent) {
    startTransition(() => {
      e.preventDefault();
      dispatch(positionsSlice.actions.edit({
        position: {
          id: position.id,
          title,
          salary
        }
      }));
      dispatch(positionsSlice.actions.select({positionId: undefined}));
    })
  }

  function handleCancel() {
    startTransition(() => {
      dispatch(positionsSlice.actions.select({positionId: undefined}));
    })
  }

  return {
    handleEdit, handleCancel,
    position: { title, salary},
    setTitle, setSalary,
    isPending,
  };
}