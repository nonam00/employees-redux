import {useAppDispatch, useAppSelector} from "@/store";
import {companiesSlice} from "@/store/companies.slice";
import {FormEvent, useLayoutEffect, useState, useTransition} from "react";

export const useCompanyEdit = (
  companyId: number
) => {
  const company = useAppSelector(state =>
    companiesSlice.selectors.selectCompany(state, companyId));
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [isPending, startTransition] = useTransition();

  useLayoutEffect(() => {
    startTransition(() => setTitle(company.title));
  }, [company]);

  async function handleEdit(e: FormEvent) {
    startTransition(async () => {
      e.preventDefault();

      dispatch(companiesSlice.actions.edit({
        company: {
          id: company.id,
          title
        }
      }));
      //const wait = () => new Promise((resolve) => {
      //setTimeout(resolve, 1000);
      //})
      //await wait();
      dispatch(companiesSlice.actions.select({companyId: undefined}));
    })
  }

  function handleCancel() {
    startTransition(() => {
      dispatch(companiesSlice.actions.select({companyId: undefined}));
    })
  }

  return {title, setTitle, isPending, handleEdit, handleCancel};
}