import {createAction, createReducer} from "@reduxjs/toolkit";
import {AppState} from "./index.ts";

export interface Position {
  id: number;
  title: string;
  salary: number;
}

export interface Employee {
  id: number;
  name: string;
  position: Position;
  company: Company;
  birthday: Date;
}
export interface Company {
  id: number;
  title: string;
}

export const companies: Company[] = [
  {
    id: 1,
    title: 'Yandex',
  },
  {
    id: 2,
    title: 'Ozon',
  },
  {
    id: 3,
    title: 'Sber',
  }
];

export const positions: Position[] = [
  {
    id: 1,
    title: 'Developer',
    salary: 20000
  },
  {
    id: 2,
    title: 'Manager',
    salary: 30000
  },
  {
    id: 3,
    title: 'Tester',
    salary: 40000
  }
];

export const initialEmployeesState: Employee[] = [
  {
    id: 1,
    name: 'Bobby',
    birthday: new Date(1990, 12, 25),
    position: positions[0],
    company: companies[0]
  },
  {
    id: 2,
    name: 'Sammy',
    birthday: new Date(1999, 5, 23),
    position: positions[0],
    company: companies[0]
  },
  {
    id: 3,
    name: 'Sally',
    birthday: new Date(1980, 6, 12),
    position: positions[0],
    company: companies[0]
  },
  {
    id: 4,
    name: 'Reggy',
    birthday: new Date(2000, 3, 1),
    position: positions[0],
    company: companies[0]
  },
];

export const removeEmployeeAction = createAction<{
  employeeId: number;
}>("employees/remove");

export const editEmployeeAction = createAction<{
  employee: Employee;
}>("employees/update");

export const addEmployeeAction = createAction<{
  employee: Employee;
}>("employees/add");

export const employeesReducer = createReducer(
  initialEmployeesState,
  (builder) => {
    builder.addCase(removeEmployeeAction, (state, action) => {
      const { employeeId } = action.payload;
      const index = state.findIndex(employee => employee.id === employeeId);
      state = state.splice(index, 1)
    });
    builder.addCase(addEmployeeAction, (state, action) => {
      const { employee } = action.payload;
      state = [...state, employee];
    });
    builder.addCase(editEmployeeAction, (state, action) => {
      const { employee } = action.payload;
      const index = state.findIndex(e => e.id === employee.id);
      state = [
        ...state.slice(0, index),
        employee,
        ...state.slice(index + 1)
      ]
    });
  }
);

export const selectEmployee = (state: AppState, employeeId: number) => {
  return state.employees.find(employee => employee.id === employeeId);
}
