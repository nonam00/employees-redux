export type CustomDate = { day: number, month: number, year: number };

export type Company = { id: number; title: string; }

export type Position = {
  id: number;
  title: string;
  salary: number;
}

export type Employee = {
  id: number;
  name: string;
  positionId: number;
  companyId: number;
  birthday: CustomDate;
}