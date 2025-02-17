import Header from "./Header";
import HeaderLink from "./HeaderLink";

export default function DashboardHeader() {
  return (
    <Header>
      <HeaderLink href="/dashboard/employees" title="Employees" />
      <HeaderLink href="/dashboard/companies" title="Companies" />
      <HeaderLink href="/dashboard/positions" title="Positions" />
    </Header>
  )
}