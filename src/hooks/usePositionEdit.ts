import {FormEvent, useCallback, useLayoutEffect, useState, useTransition} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import {positionsSlice} from "@/store/positions.slice.ts";

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
    startTransition(() => {
      setTitle(position.title);
      setSalary(position.salary);
    })
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

  const handleCancel = useCallback(() => {
    startTransition(() => {
      dispatch(positionsSlice.actions.select({positionId: undefined}));
    })
  }, [dispatch]);

  return {
    handleEdit, handleCancel,
    position: { title, salary},
    setTitle, setSalary,
    isPending,
  };
}