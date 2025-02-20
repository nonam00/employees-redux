import {useAppDispatch, useAppSelector} from "@/store";
import {companiesSlice} from "@/store/companies.slice";
import {FormEvent, useCallback, useLayoutEffect, useState, useTransition} from "react";

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

  const handleCancel = useCallback(() => {
    startTransition(() => {
      dispatch(companiesSlice.actions.select({companyId: undefined}));
    })
  }, [dispatch]);

  return {title, setTitle, isPending, handleEdit, handleCancel};
}