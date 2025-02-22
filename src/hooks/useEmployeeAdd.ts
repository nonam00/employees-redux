import {useState, useTransition} from "react";
import {useAppDispatch} from "@/store";
import {employeesSlice} from "@/store/employees.slice";

export const useEmployeeAdd = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [positionId, setPositionId] = useState<number>(0);
  const [companyId, setCompanyId] = useState<number>(1);

  const [isPending, startTransition] = useTransition();

  function handle() {
    startTransition(() => {
      const [year, month, day] = birthdate.split('-').map(Number);
      dispatch(employeesSlice.actions.add({
        name,
        positionId: positionId,
        companyId: companyId,
        birthday: {
          year,
          month,
          day
        }
      }))
    })
  }

  return { handle, setName, setBirthdate, setPositionId, setCompanyId, isPending };
}
