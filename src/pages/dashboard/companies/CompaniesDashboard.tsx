import {memo} from "react";
import {companiesSlice} from "@/store/companies.slice";
import {useAppDispatch, useAppSelector} from "@/store";
import CompanyAddForm from "./components/CompanyAddForm";
import CompanyEditForm from "./components/CompanyEditForm";
import DashboardHeader from "@/components/DashboardHeader";

const CompanyDashboardItem = memo(function CompanyDashboardItem({
  companyId
}: {
  companyId: number
}) {
  const company = useAppSelector(state =>
    companiesSlice.selectors.selectCompany(state, companyId))
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-row">
      <p className="flex-1">{company.title}</p>
      <button
        className="
          flex-1
          rounded-sm
          bg-transparent
          text-black
          hover:bg-blue-500
          hover:text-white
          cursor-pointer
          transition
        "
        onClick={() => dispatch(companiesSlice.actions.select({companyId}))}
      >
        Edit
      </button>
      <button
        className="
          flex-1
          rounded-sm
          bg-transparent
          text-black
          hover:bg-red-500
          hover:text-white
          cursor-pointer
          transition
        "
        onClick={() => dispatch(companiesSlice.actions.remove({companyId}))}
      >
        Delete
      </button>
    </div>
  )
});

export default function CompaniesDashboard(){
  const companiesIds = useAppSelector(companiesSlice.selectors.selectCompaniesIds);
  const selectedId = useAppSelector(companiesSlice.selectors.selectSelectedCompanyId);
  return (
    <>
      <DashboardHeader/>
      <div className="flex flex-col m-15">
        <h1 className="text-3xl m-5">Employees dashboard editor:</h1>
        {selectedId === undefined ? <CompanyAddForm/> : <CompanyEditForm companyId={selectedId}/>}
        <div className="flex flex-col items-center justify-center w-100">
          <div className="flex flex-row items-center w-100 border-b-1">
            <b className="flex-1">Title</b>
            <b className="flex-1">Edit</b>
            <b className="flex-1">Delete</b>
          </div>
          <ul className="flex flex-col list-none w-full">
            {companiesIds.map((companyId) => (
              <CompanyDashboardItem companyId={companyId} key={companyId}/>
            ))}
          </ul>
        </div>
      </div>
    </>

  )
}