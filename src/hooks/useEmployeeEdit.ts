import {useAppDispatch, useAppSelector} from "@/store";
import {employeesSlice} from "@/store/employees.slice.ts";
import {FormEvent, useLayoutEffect, useState, useTransition} from "react";

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

  useLayoutEffect(() => {
    setName(employee.name);
    setBirthday(`${employee.birthday.year}-${employee.birthday.month}-${employee.birthday.day}`);
    setPositionId(employee.positionId);
    setCompanyId(employee.companyId);
  }, [employee]);

  const [isPending, startTransition] = useTransition();

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

  function handleCancel() {
    startTransition(() => {
      dispatch(employeesSlice.actions.select({employeeId: undefined}))
    })
  }

  return {
    handleEdit, handleCancel,
    employee: { name, birthday, positionId, companyId },
    setName, setBirthday, setPositionId, setCompanyId, isPending
  };
}