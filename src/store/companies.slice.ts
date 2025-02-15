import {Company} from "./types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialCompaniesArray: Company[] = [
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

type CompaniesState = {
  entities: Record<number, Company>;
  ids: number[];
  selectedCompanyId: number | undefined;
}

const initialCompaniesState: CompaniesState = {
  entities: initialCompaniesArray.reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
  }, {} as Record<number, Company>),
  ids: initialCompaniesArray.map(e => e.id),
  selectedCompanyId: undefined,
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState: initialCompaniesState,
  selectors: {
    selectIds: (state) => state.ids,
    selectCompany: (state, companyId: number) => state.entities[companyId],
  },
  reducers: {
    add: (state, action: PayloadAction<{title: string}>) => {
      const id =  state.ids[state.ids.length - 1] + 1;
      state.ids.push(id);
      state.entities[id] = {
        id,
        ...action.payload
      }
    },
    edit: (state, action: PayloadAction<{ company: Company }>) => {
      const { company } = action.payload;
      state.entities[company.id] = {
        ...company
      };
    },
    remove: (state, action: PayloadAction<{id: number}>) => {
      const { id } = action.payload;
      const index = state.ids.findIndex((e) => e === id);
      state.ids.splice(index, 1);
      delete state.ids[index];
    },
    select: (state, action: PayloadAction<{companyId: number | undefined}>) => {
      const { companyId } = action.payload;
      state.selectedCompanyId = companyId;
    },
  }
});