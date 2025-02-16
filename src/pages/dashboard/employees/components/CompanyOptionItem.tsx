import {memo} from "react";
import {useAppSelector} from "@/store";
import {companiesSlice} from "@/store/companies.slice.ts";

const CompanyOptionItem = memo(function CompanyItem({
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

export default CompanyOptionItem;