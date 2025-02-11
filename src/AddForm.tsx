import {useState} from "react";
import {useAppDispatch} from "./store";
import {companies, employeesSlice, positions} from "./store/employees.slice.ts";

export default function AddForm() {
  const [name, setName] = useState("");
  //const [birthdate, setBirthdate] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");

  const dispatch = useAppDispatch();
  function handle() {
    dispatch(employeesSlice.actions.add({
      name,
      position: positions[0],
      company: companies[0]
    }));
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
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option>Yandex</option>
            <option>Mail</option>
          </select>
        </div>
        <div className="flex flex-col flex-1">
          <label>Position</label>
          <select
            className="border-1 rounded-sm border-black"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option>Developer</option>
            <option>Tester</option>
          </select>
        </div>
      </div>
      <div>
        <button
          className="border-1 border-black rounded-sm px-3 py-1 m-1 hover:bg-gray-100"
          type="button"
          onClick={handle}>
          Add
        </button>
      </div>
    </form>
  )
}