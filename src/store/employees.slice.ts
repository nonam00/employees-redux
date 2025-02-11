import {createSlice, PayloadAction} from "@reduxjs/toolkit";

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

const initialEmployeesState: EmployeesState = {
  entities: employeesArray.reduce((acc, employee) => {
    acc[employee.id] = employee;
    return acc;
  }, {} as Record<number, Employee>),
  ids: employeesArray.map(e => e.id),
  selectedEmployeeId: undefined
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState: initialEmployeesState,
  selectors: {
    selectEmployeeIds: (state) => state.ids,
    selectEmployee: (state, employeeId: number) => state.entities[employeeId],
    selectSelectedEmployeeId: (state) => state.selectedEmployeeId
  },
  reducers: {
    remove: (state, action: PayloadAction<{employeeId: number}>) => {
      const { employeeId } = action.payload;
      const index = state.ids.findIndex(id => id === employeeId);
      state.ids.splice(index, 1);
      delete state.entities[employeeId];
    },
    add: (state, action: PayloadAction<{
      name: string;
      position: Position;
      company: Company;
    }>) => {
      const id = state.ids.length + 1;
      state.ids.push(id);
      state.entities[id] = {
        id,
        ...action.payload
      };
    },
    edit: (state, action: PayloadAction<{employee: Employee}>) => {
      const { employee } = action.payload;
      state.entities[employee.id] = { ...employee };
    },
    select: (state, action: PayloadAction<{employeeId: number | undefined}>) => {
      const { employeeId } = action.payload;
      state.selectedEmployeeId = employeeId;
    },
  }
});