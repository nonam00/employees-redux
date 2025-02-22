import {memo, useLayoutEffect} from "react";
import {useAppSelector} from "@/store";
import {companiesSlice} from "@/store/companies.slice";

const CompanyOptionItem = memo(function CompanyOptionItem({
  companyId,
}: {
  companyId: number;
}) {
  const position = useAppSelector(state =>
    companiesSlice.selectors.selectCompany(state, companyId));
  return (
    <option value={companyId}>
      {position.title}
    </option>
  )
})

export default function CompaniesOptions({
  isPending,
  setCompanyIdCallback,
  value
}: {
  isPending: boolean;
  setCompanyIdCallback: (id: number) => void;
  value?: number
}) {
  const companiesIds = useAppSelector(companiesSlice.selectors.selectCompaniesIds);
  useLayoutEffect(() => {
    setCompanyIdCallback(companiesIds[0]);
  }, [companiesIds, setCompanyIdCallback]);
  return (
    <select
      className="border-1 rounded-sm border-black"
      value={value ?? companiesIds[0]}
      onChange={(e) => setCompanyIdCallback(parseInt(e.target.value))}
      disabled={isPending}
      required
    >
      {companiesIds.map((id) => (
        <CompanyOptionItem
          companyId={id}
          key={id}
        />
      ))}
    </select>
  )
};