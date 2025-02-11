import EmployeeListItem from "./EmployeeListItem.tsx";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "./store";
import {Employee, removeEmployeeAction} from "./store/employees.slice.ts";

function Form() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [salary, setSalary] = useState(0);

  function handle() {
    console.log([name, birthdate, position, company]);
  }

  return (
    <form className="flex flex-col m-5">
      <div className="flex flex-row gap-4">
        <div className="flex-1">
          <label className="mr-5">Name</label>
          <input
            className="border-2 rounded-sm border-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label className="mr-5">Birth Date</label>
          <input
            type="date"
            className="border-2 rounded-sm border-black"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </div>
        <div className="flex-1">
          <label>Company</label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          >
            <option>Yandex</option>
            <option>Mail</option>
          </select>
        </div>
        <div className="flex-1">
          <label>Position</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option>Developer</option>
            <option>Tester</option>
          </select>
        </div>
        <div className="flex-1">
          <label>Salary</label>
          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div>
        <button type="button" onClick={handle}>Add</button>
      </div>
    </form>
  )
}

function DashboardItem({employeeId}: {employeeId: number}) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-row">
      <div className="flex-5">
        <EmployeeListItem employeeId={employeeId}/>
      </div>
      <button
        className="flex-1 border-1 rounded-sm border-black"
      >
        Edit
      </button>
      <button
        className="flex-1 border-1 border-black"
        onClick={() => dispatch(removeEmployeeAction({employeeId}))}
      >
        Delete
      </button>
    </div>
  )
}

export default function Dashboard(){
  const employees = useAppSelector((state) => state.employees);
  return (
    <div className="flex flex-col">
      <h1>Employees dashboard editor:</h1>
      <Form/>
      <div className="flex flex-col items-center justify-center w-200">
        <div className="flex flex-row items-center w-200 border-b-1">
          <b className="flex-1">Name</b>
          <b className="flex-1">Position</b>
          <b className="flex-1">Title</b>
          <b className="flex-1">Salary</b>
          <b className="flex-1">Birthday</b>
          <b className="flex-1">Edit</b>
          <b className="flex-1">Delete</b>
        </div>
        <ul className="flex flex-col list-none w-full">
          {employees.map((employee: Employee, key) => (
            <DashboardItem employeeId={employee.id} key={key}/>
          ))}
        </ul>
      </div>
    </div>
  )
}