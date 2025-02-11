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
  //birthday: Date;
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

export const employeesArray: Employee[] = [
  {
    id: 1,
    name: 'Bobby',
    //birthday: new Date(1990, 12, 25),
    position: positions[0],
    company: companies[0]
  },
  {
    id: 2,
    name: 'Sammy',
    //birthday: new Date(1999, 5, 23),
    position: positions[0],
    company: companies[0]
  },
  {
    id: 3,
    name: 'Sally',
    //birthday: new Date(1980, 6, 12),
    position: positions[0],
    company: companies[0]
  },
  {
    id: 4,
    name: 'Reggy',
    //birthday: new Date(2000, 3, 1),
    position: positions[0],
    company: companies[0]
  },
];

type EmployeesState = {
  entities: Record<number, Employee>,
  ids: number[]
  selectedEmployeeId: number | undefined,
}

export const removeEmployeeAction = createAction<{
  employeeId: number;
}>("employees/remove");

export const editEmployeeAction = createAction<{
  employee: Employee;
}>("employees/update");

export const addEmployeeAction = createAction<{
  name: string;
  position: Position;
  company: Company;
}>("employees/add");

export const selectEmployeeAction = createAction<{
  employeeId: number | undefined;
}>("employees/selectEmployee");

export const employeesReducer = createReducer<EmployeesState>(
  {
    entities: employeesArray.reduce((acc, employee) => {
      acc[employee.id] = employee;
      return acc;
    }, {} as Record<number, Employee>),
    ids: employeesArray.map(e => e.id),
    selectedEmployeeId: undefined
  },
  (builder) => {
    builder.addCase(removeEmployeeAction, (state, action) => {
      const { employeeId } = action.payload;
      const index = state.ids.findIndex(id => id === employeeId);
      state.ids.splice(index, 1);
      delete state.entities[employeeId];
    });
    builder.addCase(addEmployeeAction, (state, action) => {
      const id = state.ids.length + 1;
      state.ids.push(id);
      state.entities[id] = {
        id,
        ...action.payload
      };
    });
    builder.addCase(editEmployeeAction, (state, action) => {
      const { employee } = action.payload;
      state.entities[employee.id] = { ...employee };
    });
    builder.addCase(selectEmployeeAction, (state, action) => {
      const { employeeId } = action.payload;
      state.selectedEmployeeId = employeeId;
    })
  }
);

export const selectEmployeeIds = (state: AppState) => {
  return state.employees.ids;
}

export const selectEmployee = (state: AppState, employeeId: number) => {
  return state.employees.entities[employeeId];
}

export const selectSelectedEmployeeId = (state: AppState)=> {
  return state.employees.selectedEmployeeId;
}