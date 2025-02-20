import {FormEvent, useCallback, useLayoutEffect, useState, useTransition} from "react";
import {useAppDispatch, useAppSelector} from "@/store";
import {employeesSlice} from "@/store/employees.slice.ts";

export const useEmployeeEdit = (
  employeeId: number
) => {
  const employee = useAppSelector(state =>
    employeesSlice.selectors.selectEmployee(state, employeeId));
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [positionId, setPositionId] = useState<number>(1);
  const [companyId, setCompanyId] = useState<number>(1);

  const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    startTransition(() => {
      setName(employee.name);

      const {year, month, day} = employee.birthday;
      const monthStr = month > 10 ? month : "0" + month.toString();
      const dayStr = day > 10 ? day : "0" + day.toString();

      setBirthday(`${year}-${monthStr}-${dayStr}`);

      setPositionId(employee.positionId);
      setCompanyId(employee.companyId);
    })
  }, [employee]);

  function handleEdit(e: FormEvent) {
    startTransition(() => {
      e.preventDefault();
      const [year, month, day] = birthday.split("-").map(Number);
      dispatch(employeesSlice.actions.edit({
        employee: {
          id: employeeId,
          name,
          positionId,
          companyId,
          birthday: {
            year,
            month,
            day
          }
        }
      }));
      dispatch(employeesSlice.actions.select({employeeId: undefined}));
    })
  }

  const handleCancel = useCallback(() => {
    startTransition(() => {
      dispatch(employeesSlice.actions.select({employeeId: undefined}))
    })
  }, [dispatch]);

  return {
    handleEdit, handleCancel,
    employee: { name, birthday, positionId, companyId },
    setName, setBirthday, setPositionId, setCompanyId, isPending
  };
}