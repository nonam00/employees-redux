import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CustomDate, Employee} from "./types";

const employeesArray: Employee[] = [
  {
    id: 1,
    name: 'Bobby',
    birthday: {
      day: 25,
      month: 12,
      year: 2000
    },
    positionId: 1,
    companyId: 1
  },
  {
    id: 2,
    name: 'Sammy',
    birthday: {
      day: 25,
      month: 12,
      year: 2000
    },
    positionId: 1,
    companyId: 1
  },
  {
    id: 3,
    name: 'Sally',
    birthday: {
      day: 25,
      month: 12,
      year: 2000
    },
    positionId: 1,
    companyId: 1
  },
  {
    id: 4,
    name: 'Reggy',
    birthday: {
      day: 25,
      month: 12,
      year: 2000
    },
    positionId: 2,
    companyId: 1
  },
];

type EmployeesState = {
  entities: Record<number, Employee>;
  ids: number[];
  selectedEmployeeId: number | undefined;
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
      positionId: number;
      companyId: number;
      birthday: CustomDate;
    }>) => {
      const id = state.ids[state.ids.length - 1] + 1;
      state.ids.push(id);
      state.entities[id] = {
        id,
        ...action.payload,
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