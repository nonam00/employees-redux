import {Position} from "./types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialPositionsArray: Position[] = [
  {
    id: 1,
    title: 'Developer',
    salary: 20000
  },
  {
    id: 2,
    title: 'Tester',
    salary: 40000
  },
  {
    id: 3,
    title: 'Manager',
    salary: 30000
  },
];

type PositionsState = {
  entities: Record<number, Position>;
  ids: number[];
  selectedPositionId: number | undefined;
}

const initialPositionsState: PositionsState = {
  entities: initialPositionsArray.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {} as Record<number, Position>),
  ids: initialPositionsArray.map(p => p.id),
  selectedPositionId: undefined
};

export const positionsSlice = createSlice({
  name: "positions",
  initialState: initialPositionsState,
  selectors: {
    selectIds: (state) => state.ids,
    selectPosition: (state, positionId: number) => state.entities[positionId],
  },
  reducers: {
    add: (state, action: PayloadAction<{
      title: string,
      salary: number
    }>) => {
      const id =  state.ids[state.ids.length - 1] + 1;
      state.ids.push(id);
      state.entities[id] = {
        id,
        ...action.payload
      }
    },
    edit: (state, action: PayloadAction<{ position: Position }>) => {
      const { position } = action.payload;
      state.entities[position.id] = {
        ...position
      };
    },
    remove: (state, action: PayloadAction<{id: number}>) => {
      const { id } = action.payload;
      const index = state.ids.findIndex((e) => e === id);
      state.ids.splice(index, 1);
      delete state.ids[index];
    },
    select: (state, action: PayloadAction<{positionId: number | undefined}>) => {
      const { positionId } = action.payload;
      state.selectedPositionId = positionId;
    },
  }
});