import {memo} from "react";
import {useAppSelector} from "@/store";
import {companiesSlice} from "@/store/companies.slice";

const CompanyOptionItem = memo(function CompanyOptionItem({
  companyId
}: {
  companyId: number
}) {
  const position = useAppSelector(state =>
    companiesSlice.selectors.selectCompany(state, companyId));
  return (
    <option value={companyId}>{position.title}</option>
  )
})

export default function CompaniesOptions() {
  const companiesIds = useAppSelector(companiesSlice.selectors.selectCompaniesIds);
  return (
    <>
      { companiesIds.map((id) => (<CompanyOptionItem companyId={id} key={id} />))}
    </>
  )
};