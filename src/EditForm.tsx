import {useAppDispatch, useAppSelector} from "./store";
import {editEmployeeAction, selectEmployee, selectEmployeeAction} from "./store/employees.slice.ts";
import {useState} from "react";

export default function EditForm({employeeId}: {employeeId: number}) {
  const employee = useAppSelector(state =>
    selectEmployee(state, employeeId));
  const [name, setName] = useState(employee.name);
  //const [position, setPosition] = useState(employee.position);
  //const [company, setCompany] = useState(employee.company);
  const dispatch = useAppDispatch();

  function handleEdit() {
    dispatch(editEmployeeAction({
      employee: {
        id: employeeId,
        name: name,
        position: employee.position,
        company: employee.position
      }
    }));
    dispatch(selectEmployeeAction({employeeId: undefined}));
  }

  function handleCancel() {
    dispatch(selectEmployeeAction({employeeId: undefined}));
  }

  return (
    <form className="flex flex-col m-10">
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <label>Name</label>
          <input
            className="border-1 rounded-sm border-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label>Company</label>
          <select
            className="border-1 rounded-sm border-black"
            //value={company}
            //onChange={(e) => setCompany(e.target.value)}
          >
            <option>Yandex</option>
            <option>Mail</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label>Position</label>
          <select
            className="border-1 rounded-sm border-black"
            //value={position}
            //onChange={(e) => setPosition(e.target.value)}
          >
            <option>Developer</option>
            <option>Tester</option>
          </select>
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
          type="button"
          onClick={handleEdit}
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